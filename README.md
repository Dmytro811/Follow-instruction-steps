# GEO AI Website Analysis Platform

Платформа для аналізу видимості веб-сайтів в AI моделях з інтеграцією Stripe платежів та n8n автоматизації.

## 🚀 Функціонал

### ✅ Реалізовано:

1. **Головна сторінка аналізу** (`/analyze`)
   - Введення URL сайту для аналізу
   - Вибір тарифного плану
   - Валідація URL
   - Перехід до оплати

2. **Система оплати** (`/payment`)
   - Інтеграція Stripe Payment Intent
   - Безпечна обробка платежів
   - Підтримка карток через Stripe Elements
   - Підсумок замовлення

3. **Підтвердження оплати** (`/payment-success`)
   - Верифікація платежу через n8n
   - Автоматичний запуск аналізу після оплати
   - Редірект на Dashboard

4. **Dashboard** (`/dashboard`)
   - Відстеження статусу аналізу в реальному часі
   - Автоматичне оновлення кожні 10 секунд
   - Прогрес-бар під час аналізу
   - Завантаження PDF звіту після завершення

5. **API Інтеграція**
   - n8n webhooks для всіх операцій
   - Обробка помилок
   - Валідація даних

## 📋 Передумови

- Node.js 18+ 
- pnpm (або npm/yarn)
- Stripe акаунт
- n8n інстанс (self-hosted або cloud)

## 🛠 Налаштування

### 1. Встановлення залежностей

```bash
pnpm install
```

### 2. Налаштування змінних оточення

Створіть файл `.env` на основі `.env.example`:

```bash
cp .env.example .env
```

Заповніть необхідні змінні:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key_here

# N8N Webhooks
VITE_N8N_BASE_URL=https://your-n8n-instance.com
VITE_N8N_CREATE_PAYMENT_WEBHOOK=/webhook/create-payment-intent
VITE_N8N_VERIFY_PAYMENT_WEBHOOK=/webhook/verify-payment
VITE_N8N_START_ANALYSIS_WEBHOOK=/webhook/start-analysis
VITE_N8N_GET_REPORT_WEBHOOK=/webhook/get-report
VITE_N8N_DOWNLOAD_PDF_WEBHOOK=/webhook/download-pdf
```

### 3. Налаштування Stripe

1. Створіть акаунт на [stripe.com](https://stripe.com)
2. Отримайте API ключі в [Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
3. Додайте публічний ключ (`pk_test_...` для тесту або `pk_live_...` для продакшена) в `.env`
4. **Важливо**: Секретний ключ (`sk_...`) використовуйте ТІЛЬКИ на бекенді (n8n)

### 4. Налаштування n8n Webhooks

Створіть наступні workflow в n8n:

#### 4.1 Create Payment Intent

**Endpoint**: `/webhook/create-payment-intent`  
**Method**: POST

**Вхідні дані**:
```json
{
  "amount": 14900,
  "currency": "usd",
  "plan": "professional",
  "websiteUrl": "https://example.com"
}
```

**Дії**:
1. Створити Payment Intent через Stripe API
2. Зберегти дані замовлення в БД
3. Повернути `clientSecret` та `paymentIntentId`

**Відповідь**:
```json
{
  "clientSecret": "pi_xxx_secret_xxx",
  "paymentIntentId": "pi_xxx"
}
```

#### 4.2 Verify Payment

**Endpoint**: `/webhook/verify-payment`  
**Method**: POST

**Вхідні дані**:
```json
{
  "payment_intent": "pi_xxx",
  "client_secret": "pi_xxx_secret_xxx"
}
```

**Дії**:
1. Перевірити статус платежу через Stripe API
2. Оновити статус замовлення в БД
3. Повернути дані замовлення

**Відповідь**:
```json
{
  "status": "succeeded",
  "websiteUrl": "https://example.com",
  "plan": "professional"
}
```

#### 4.3 Start Analysis

**Endpoint**: `/webhook/start-analysis`  
**Method**: POST

**Вхідні дані**:
```json
{
  "paymentIntentId": "pi_xxx",
  "websiteUrl": "https://example.com",
  "plan": "professional"
}
```

**Дії**:
1. Створити запис аналізу в БД
2. Запустити процес аналізу (асинхронно)
3. Надіслати email клієнту про початок аналізу

**Відповідь**:
```json
{
  "analysisId": "analysis_xxx",
  "status": "pending"
}
```

#### 4.4 Get Report

**Endpoint**: `/webhook/get-report`  
**Method**: GET  
**Query Params**: `?analysisId=analysis_xxx`

**Відповідь**:
```json
{
  "status": "analyzing",
  "progress": 45,
  "pdfUrl": null
}
```

або після завершення:

```json
{
  "status": "complete",
  "progress": 100,
  "pdfUrl": "https://storage.example.com/reports/analysis_xxx.pdf"
}
```

#### 4.5 Download PDF

**Endpoint**: `/webhook/download-pdf`  
**Method**: GET  
**Query Params**: `?analysisId=analysis_xxx`

**Дії**:
1. Отримати PDF з сховища
2. Повернути PDF файл

**Відповідь**: PDF file (binary)

## 🏃 Запуск

### Розробка

```bash
pnpm dev
```

Сайт буде доступний на `http://localhost:5173`

### Production Build

```bash
pnpm build
```

Білд буде в папці `dist/`

### Preview Production Build

```bash
pnpm preview
```

## 🌐 Деплой

### Vercel

1. Встановіть Vercel CLI:
```bash
npm i -g vercel
```

2. Деплой:
```bash
vercel
```

3. Додайте змінні оточення в Vercel Dashboard

### Netlify

1. Встановіть Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Деплой:
```bash
netlify deploy --prod
```

3. Додайте змінні оточення в Netlify Dashboard

### Cloudflare Pages

1. Підключіть репозиторій до Cloudflare Pages
2. Build command: `pnpm build`
3. Output directory: `dist`
4. Додайте змінні оточення

## 🔒 Безпека

### Важливо:

1. **Ніколи не комітьте `.env` файл** - він вже в `.gitignore`
2. **Секретний Stripe ключ** - використовуйте ТІЛЬКИ на сервері (n8n), ніколи на фронтенді
3. **Валідація даних** - всі вхідні дані валідуються на фронтенді та бекенді
4. **HTTPS** - використовуйте тільки HTTPS для продакшена
5. **Webhook безпека** - додайте автентифікацію для n8n webhooks

## 📁 Структура проєкту

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── payment/         # CheckoutForm, OrderSummary
│   ├── sections/        # Hero, Pricing, FAQ, etc.
│   └── ui/              # Button, Card, Badge, etc.
├── pages/
│   ├── HomePage.tsx
│   ├── AnalyzePage.tsx  # Введення URL
│   ├── PaymentPage.tsx  # Оплата
│   ├── PaymentSuccessPage.tsx
│   ├── DashboardPage.tsx # Статус аналізу
│   └── ...
├── services/
│   └── api.ts           # API функції
├── utils/
│   └── validation.ts    # Валідація
├── types/
│   └── index.ts         # TypeScript типи
└── constants/
    └── index.ts         # Константи
```

## 🎯 Флоу користувача

1. Користувач заходить на `/analyze`
2. Вводить URL сайту та обирає план
3. Натискає "Продовжити до оплати" → `/payment`
4. Вводить email та дані картки
5. Натискає "Оплатити" → Stripe обробляє платіж
6. Після успіху → `/payment-success`
7. n8n верифікує платіж та запускає аналіз
8. Автоматичний редірект на `/dashboard?analysisId=xxx`
9. Dashboard показує прогрес аналізу (polling кожні 10 сек)
10. Після завершення → кнопка "Завантажити PDF"

## 🐛 Troubleshooting

### Stripe не підключається

- Перевірте чи правильний публічний ключ в `.env`
- Переконайтесь що використовуєте `pk_test_` для тестування
- Перевірте чи n8n webhook створює Payment Intent правильно

### n8n webhooks не працюють

- Перевірте чи правильні URL в `.env`
- Переконайтесь що n8n інстанс доступний
- Перевірте CORS налаштування в n8n
- Подивіться логи в n8n для деталей помилок

### Dashboard не оновлюється

- Перевірте чи webhook `/get-report` повертає правильний статус
- Подивіться Network tab в DevTools
- Переконайтесь що `analysisId` передається правильно

## 📞 Підтримка

Якщо виникли питання:
1. Перевірте цей README
2. Подивіться логи в консолі браузера
3. Перевірте логи n8n workflow
4. Перевірте Stripe Dashboard для деталей платежів

## 📝 Ліцензія

Proprietary - Всі права захищені

## 🔄 Наступні кроки

Після базового налаштування:

1. Додайте реальну логіку аналізу в n8n
2. Налаштуйте сховище для PDF файлів (AWS S3, Cloudflare R2, etc.)
3. Додайте email сповіщення (SendGrid, Resend, etc.)
4. Налаштуйте моніторинг (Sentry, LogRocket)
5. Додайте аналітику (Google Analytics, Plausible)
6. Налаштуйте CI/CD pipeline
