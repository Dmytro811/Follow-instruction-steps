# N8N Workflow Setup Guide

Детальні інструкції для налаштування всіх необхідних n8n workflows.

## 📋 Передумови

1. N8N інстанс (self-hosted або cloud)
2. Stripe API ключ (secret key: `sk_...`)
3. База даних (PostgreSQL рекомендовано)
4. Email сервіс (опціонально: SendGrid, Resend)
5. File storage (S3, Cloudflare R2, або локально)

## 🔧 Загальні налаштування N8N

### 1. Додайте Credentials

В N8N додайте наступні credentials:

#### Stripe API
- Type: `Stripe API`
- Secret Key: `sk_test_...` або `sk_live_...`

#### Database (PostgreSQL)
- Type: `PostgreSQL`
- Host, Port, Database, User, Password

#### Email Service (опціонально)
- Type: `SendGrid` або інший
- API Key

#### Storage (опціонально)
- Type: `AWS S3` або `Cloudflare R2`
- Access Key, Secret Key, Bucket

### 2. Створіть таблиці в БД

```sql
-- Таблиця замовлень
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  payment_intent_id VARCHAR(255) UNIQUE NOT NULL,
  website_url TEXT NOT NULL,
  plan VARCHAR(50) NOT NULL,
  amount INTEGER NOT NULL,
  currency VARCHAR(10) DEFAULT 'usd',
  email VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблиця аналізів
CREATE TABLE analyses (
  id VARCHAR(255) PRIMARY KEY,
  payment_intent_id VARCHAR(255) REFERENCES orders(payment_intent_id),
  website_url TEXT NOT NULL,
  plan VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  pdf_url TEXT,
  error_message TEXT,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Індекси
CREATE INDEX idx_orders_payment_intent ON orders(payment_intent_id);
CREATE INDEX idx_analyses_status ON analyses(status);
CREATE INDEX idx_analyses_payment_intent ON analyses(payment_intent_id);
```

## 🎯 Workflow 1: Create Payment Intent

**Webhook URL**: `https://your-n8n.com/webhook/create-payment-intent`  
**Method**: POST

### Nodes:

1. **Webhook** (Trigger)
   - HTTP Method: POST
   - Path: `/webhook/create-payment-intent`
   - Response: Immediately

2. **Validate Input** (Function)
   ```javascript
   // Валідація вхідних даних
   const { amount, currency, plan, websiteUrl } = $input.item.json.body;
   
   if (!amount || amount < 100) {
     throw new Error('Invalid amount');
   }
   
   if (!websiteUrl || !websiteUrl.startsWith('http')) {
     throw new Error('Invalid website URL');
   }
   
   if (!['single', 'professional', 'optimization'].includes(plan)) {
     throw new Error('Invalid plan');
   }
   
   return {
     json: {
       amount,
       currency: currency || 'usd',
       plan,
       websiteUrl
     }
   };
   ```

3. **Stripe - Create Payment Intent**
   - Resource: `Payment Intent`
   - Operation: `Create`
   - Amount: `{{ $json.amount }}`
   - Currency: `{{ $json.currency }}`
   - Metadata:
     - plan: `{{ $json.plan }}`
     - websiteUrl: `{{ $json.websiteUrl }}`

4. **Save to Database** (PostgreSQL)
   ```sql
   INSERT INTO orders (
     payment_intent_id,
     website_url,
     plan,
     amount,
     currency,
     status
   ) VALUES (
     '{{ $json.id }}',
     '{{ $json.metadata.websiteUrl }}',
     '{{ $json.metadata.plan }}',
     {{ $json.amount }},
     '{{ $json.currency }}',
     'pending'
   );
   ```

5. **Return Response** (Respond to Webhook)
   ```json
   {
     "clientSecret": "{{ $json.client_secret }}",
     "paymentIntentId": "{{ $json.id }}"
   }
   ```

### Error Handling:

Додайте `Error Trigger` node, який повертає:
```json
{
  "error": "{{ $json.message }}"
}
```

---

## 🎯 Workflow 2: Verify Payment

**Webhook URL**: `https://your-n8n.com/webhook/verify-payment`  
**Method**: POST

### Nodes:

1. **Webhook** (Trigger)
   - HTTP Method: POST
   - Path: `/webhook/verify-payment`

2. **Stripe - Retrieve Payment Intent**
   - Resource: `Payment Intent`
   - Operation: `Get`
   - Payment Intent ID: `{{ $json.body.payment_intent }}`

3. **Check Status** (IF Node)
   - Condition: `{{ $json.status === 'succeeded' }}`

4. **Update Order Status** (PostgreSQL) - True branch
   ```sql
   UPDATE orders 
   SET 
     status = 'paid',
     email = '{{ $json.receipt_email }}',
     updated_at = NOW()
   WHERE payment_intent_id = '{{ $json.id }}'
   RETURNING *;
   ```

5. **Send Email Notification** (опціонально)
   - To: `{{ $json.receipt_email }}`
   - Subject: `Payment Confirmed - Analysis Starting`
   - Body: Template з деталями замовлення

6. **Return Success Response**
   ```json
   {
     "status": "succeeded",
     "websiteUrl": "{{ $json.metadata.websiteUrl }}",
     "plan": "{{ $json.metadata.plan }}"
   }
   ```

7. **Return Failed Response** - False branch
   ```json
   {
     "status": "failed",
     "error": "Payment not successful"
   }
   ```

---

## 🎯 Workflow 3: Start Analysis

**Webhook URL**: `https://your-n8n.com/webhook/start-analysis`  
**Method**: POST

### Nodes:

1. **Webhook** (Trigger)
   - HTTP Method: POST
   - Path: `/webhook/start-analysis`

2. **Generate Analysis ID** (Function)
   ```javascript
   const analysisId = 'analysis_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
   
   return {
     json: {
       analysisId,
       paymentIntentId: $input.item.json.body.paymentIntentId,
       websiteUrl: $input.item.json.body.websiteUrl,
       plan: $input.item.json.body.plan
     }
   };
   ```

3. **Create Analysis Record** (PostgreSQL)
   ```sql
   INSERT INTO analyses (
     id,
     payment_intent_id,
     website_url,
     plan,
     status,
     progress,
     started_at
   ) VALUES (
     '{{ $json.analysisId }}',
     '{{ $json.paymentIntentId }}',
     '{{ $json.websiteUrl }}',
     '{{ $json.plan }}',
     'pending',
     0,
     NOW()
   )
   RETURNING *;
   ```

4. **Trigger Async Analysis** (HTTP Request або Webhook)
   - Method: POST
   - URL: `https://your-n8n.com/webhook/run-analysis`
   - Body:
     ```json
     {
       "analysisId": "{{ $json.analysisId }}",
       "websiteUrl": "{{ $json.websiteUrl }}",
       "plan": "{{ $json.plan }}"
     }
     ```
   - Async: true (не чекати відповіді)

5. **Return Response**
   ```json
   {
     "analysisId": "{{ $json.analysisId }}",
     "status": "pending"
   }
   ```

---

## 🎯 Workflow 4: Run Analysis (Background)

**Webhook URL**: `https://your-n8n.com/webhook/run-analysis`  
**Method**: POST

Це workflow виконує фактичний аналіз (може тривати довго).

### Nodes:

1. **Webhook** (Trigger)

2. **Update Status to Analyzing** (PostgreSQL)
   ```sql
   UPDATE analyses 
   SET status = 'analyzing', progress = 10
   WHERE id = '{{ $json.body.analysisId }}';
   ```

3. **Fetch Website Content** (HTTP Request)
   - URL: `{{ $json.body.websiteUrl }}`
   - Method: GET

4. **Extract Data** (HTML Extract/Function)
   - Витягнути title, meta tags, headings, content

5. **Update Progress 30%** (PostgreSQL)
   ```sql
   UPDATE analyses 
   SET progress = 30
   WHERE id = '{{ $json.body.analysisId }}';
   ```

6. **Analyze with AI Models** (Loop)
   Для кожної AI моделі (ChatGPT, Claude, Gemini, etc.):
   - HTTP Request до AI API
   - Аналіз контенту
   - Збір результатів

7. **Update Progress 70%** (PostgreSQL)

8. **Generate PDF Report** (Function/HTTP Request)
   - Використайте puppeteer або API для генерації PDF
   - Або викличте зовнішній сервіс

9. **Upload PDF to Storage** (S3/R2)
   - Завантажте PDF в сховище
   - Отримайте публічний URL

10. **Update Analysis to Complete** (PostgreSQL)
    ```sql
    UPDATE analyses 
    SET 
      status = 'complete',
      progress = 100,
      pdf_url = '{{ $json.pdfUrl }}',
      completed_at = NOW()
    WHERE id = '{{ $json.body.analysisId }}';
    ```

11. **Get Order Email** (PostgreSQL)
    ```sql
    SELECT o.email, a.pdf_url 
    FROM analyses a
    JOIN orders o ON a.payment_intent_id = o.payment_intent_id
    WHERE a.id = '{{ $json.body.analysisId }}';
    ```

12. **Send Completion Email**
    - To: `{{ $json.email }}`
    - Subject: `Your Analysis is Ready!`
    - Body: Link to dashboard + PDF download

### Error Handling:

На кожному етапі додайте error handling:
```sql
UPDATE analyses 
SET 
  status = 'failed',
  error_message = '{{ $json.error }}'
WHERE id = '{{ $json.body.analysisId }}';
```

---

## 🎯 Workflow 5: Get Report Status

**Webhook URL**: `https://your-n8n.com/webhook/get-report`  
**Method**: GET

### Nodes:

1. **Webhook** (Trigger)
   - HTTP Method: GET
   - Path: `/webhook/get-report`

2. **Get Analysis from DB** (PostgreSQL)
   ```sql
   SELECT 
     id,
     status,
     progress,
     pdf_url,
     error_message,
     website_url,
     plan
   FROM analyses
   WHERE id = '{{ $json.query.analysisId }}';
   ```

3. **Return Response**
   ```json
   {
     "status": "{{ $json.status }}",
     "progress": {{ $json.progress }},
     "pdfUrl": "{{ $json.pdf_url }}",
     "error": "{{ $json.error_message }}"
   }
   ```

---

## 🎯 Workflow 6: Download PDF

**Webhook URL**: `https://your-n8n.com/webhook/download-pdf`  
**Method**: GET

### Nodes:

1. **Webhook** (Trigger)
   - HTTP Method: GET
   - Path: `/webhook/download-pdf`

2. **Get PDF URL from DB** (PostgreSQL)
   ```sql
   SELECT pdf_url 
   FROM analyses
   WHERE id = '{{ $json.query.analysisId }}'
   AND status = 'complete';
   ```

3. **Download from Storage** (HTTP Request/S3)
   - Get file from storage
   - Return as binary

4. **Return PDF File**
   - Content-Type: `application/pdf`
   - Content-Disposition: `attachment; filename="report.pdf"`

---

## 🔒 Безпека

### Додайте Header Authentication:

На кожен webhook додайте перевірку:

```javascript
// Validate API Key
const apiKey = $input.item.json.headers['x-api-key'];
const validKey = 'your-secret-key-here'; // Зберігайте в Environment Variables

if (apiKey !== validKey) {
  throw new Error('Unauthorized');
}
```

### Rate Limiting:

Додайте Redis або in-memory rate limiting для захисту від DDoS.

---

## 📊 Моніторинг

Додайте логування в кожен workflow:

```javascript
console.log('Workflow started:', {
  workflow: 'create-payment',
  timestamp: new Date().toISOString(),
  data: $input.item.json
});
```

---

## 🧪 Тестування

Тестові дані для кожного webhook:

### Create Payment Intent:
```json
{
  "amount": 14900,
  "currency": "usd",
  "plan": "professional",
  "websiteUrl": "https://example.com"
}
```

### Verify Payment:
```json
{
  "payment_intent": "pi_test_xxx",
  "client_secret": "pi_test_xxx_secret_xxx"
}
```

### Start Analysis:
```json
{
  "paymentIntentId": "pi_test_xxx",
  "websiteUrl": "https://example.com",
  "plan": "professional"
}
```

---

## 📝 Налаштування завершено!

Після налаштування всіх workflows:

1. Протестуйте кожен endpoint окремо
2. Перевірте логи в n8n
3. Перевірте записи в БД
4. Тестуйте повний флоу з фронтенду
