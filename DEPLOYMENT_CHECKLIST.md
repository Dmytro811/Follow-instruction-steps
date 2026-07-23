# 🚀 Deployment Checklist

Перед запуском сайту в production перевірте всі пункти.

## ✅ Frontend

- [ ] **Environment Variables**
  - [ ] `.env` створено на основі `.env.example`
  - [ ] `VITE_STRIPE_PUBLISHABLE_KEY` - встановлено продакшен ключ (`pk_live_...`)
  - [ ] `VITE_N8N_BASE_URL` - вказано реальний URL n8n інстансу
  - [ ] Всі webhook endpoints правильні
  - [ ] `.env` додано в `.gitignore` ✓

- [ ] **Build & Test**
  - [ ] `pnpm install` - залежності встановлено
  - [ ] `pnpm build` - білд успішний
  - [ ] `pnpm preview` - перевірено локально
  - [ ] Всі сторінки відкриваються без помилок
  - [ ] Форми валідуються коректно

- [ ] **Code Quality**
  - [ ] Немає console.log в продакшен коді
  - [ ] Немає hardcoded API keys
  - [ ] TypeScript помилок немає
  - [ ] Responsive design перевірено

## ✅ Stripe

- [ ] **Account Setup**
  - [ ] Stripe акаунт активовано
  - [ ] Business details заповнено
  - [ ] Bank account підключено (для виплат)
  - [ ] Тестові платежі пройшли успішно

- [ ] **API Keys**
  - [ ] Production publishable key (`pk_live_...`) отримано
  - [ ] Production secret key (`sk_live_...`) збережено (для n8n)
  - [ ] Test keys відключено в production

- [ ] **Webhooks** (опціонально)
  - [ ] Stripe webhook налаштовано для додаткової безпеки
  - [ ] Endpoint: `https://your-n8n.com/webhook/stripe-webhook`
  - [ ] Events: `payment_intent.succeeded`, `payment_intent.payment_failed`

## ✅ N8N

- [ ] **Instance Setup**
  - [ ] N8N інстанс запущено і доступний
  - [ ] HTTPS налаштовано (обов'язково!)
  - [ ] Domain/subdomain налаштовано

- [ ] **Workflows Created**
  - [ ] Create Payment Intent workflow
  - [ ] Verify Payment workflow
  - [ ] Start Analysis workflow
  - [ ] Run Analysis workflow (background)
  - [ ] Get Report Status workflow
  - [ ] Download PDF workflow

- [ ] **Database**
  - [ ] PostgreSQL підключено
  - [ ] Таблиці `orders` та `analyses` створено
  - [ ] Індекси створено
  - [ ] Backup налаштовано

- [ ] **Credentials Added**
  - [ ] Stripe API (secret key)
  - [ ] Database credentials
  - [ ] Email service (якщо використовується)
  - [ ] Storage credentials (S3/R2)

- [ ] **Testing**
  - [ ] Кожен workflow протестовано окремо
  - [ ] End-to-end тест з фронтенду пройшов успішно
  - [ ] Логи перевірено на помилки

## ✅ Storage (для PDF)

- [ ] **Setup**
  - [ ] AWS S3 / Cloudflare R2 / інше сховище налаштовано
  - [ ] Bucket створено
  - [ ] Public access налаштовано (для читання PDF)
  - [ ] CORS налаштовано

- [ ] **Integration**
  - [ ] N8N може завантажувати файли
  - [ ] N8N може генерувати public URLs
  - [ ] URLs доступні з браузера

## ✅ Email (опціонально)

- [ ] **Service**
  - [ ] SendGrid / Resend / інший сервіс налаштовано
  - [ ] API ключ отримано
  - [ ] From email верифіковано

- [ ] **Templates**
  - [ ] Payment confirmation email
  - [ ] Analysis started email
  - [ ] Analysis completed email (з PDF посиланням)

## ✅ Domain & Hosting

- [ ] **Domain**
  - [ ] Domain куплено
  - [ ] DNS налаштовано
  - [ ] SSL сертифікат активний

- [ ] **Hosting Platform**
  - [ ] Vercel / Netlify / Cloudflare Pages налаштовано
  - [ ] Build успішний
  - [ ] Environment variables додано в платформі
  - [ ] Custom domain підключено

## ✅ Security

- [ ] **API Keys**
  - [ ] Secret keys ніколи не в git
  - [ ] Environment variables використовуються правильно
  - [ ] N8N webhooks захищено (API key / authentication)

- [ ] **HTTPS**
  - [ ] Всі endpoints використовують HTTPS
  - [ ] HTTP redirects на HTTPS

- [ ] **Validation**
  - [ ] URL валідація працює
  - [ ] Email валідація працює
  - [ ] Amount валідація на бекенді

- [ ] **Rate Limiting**
  - [ ] Захист від DDoS (Cloudflare або інше)
  - [ ] Rate limiting на n8n webhooks

## ✅ Monitoring & Analytics

- [ ] **Error Tracking**
  - [ ] Sentry / LogRocket / інший сервіс налаштовано
  - [ ] Errors відстежуються

- [ ] **Analytics**
  - [ ] Google Analytics / Plausible налаштовано
  - [ ] Conversion tracking налаштовано

- [ ] **Uptime Monitoring**
  - [ ] UptimeRobot / Pingdom налаштовано
  - [ ] Alerts налаштовано

## ✅ Legal & Compliance

- [ ] **Pages Created**
  - [ ] Privacy Policy
  - [ ] Terms of Service
  - [ ] Refund Policy

- [ ] **Stripe Compliance**
  - [ ] Business info правильне
  - [ ] Tax info заповнено

## ✅ Testing Before Launch

- [ ] **Full User Flow**
  - [ ] Відкрити `/analyze`
  - [ ] Ввести test URL
  - [ ] Обрати план
  - [ ] Перейти до payment
  - [ ] Ввести test card (Stripe test mode)
  - [ ] Підтвердити платіж
  - [ ] Перевірити redirect на success
  - [ ] Перевірити redirect на dashboard
  - [ ] Перевірити polling статусу
  - [ ] (Після завершення аналізу) Завантажити PDF

- [ ] **Test Cards (Stripe Test Mode)**
  - Success: `4242 4242 4242 4242`
  - Decline: `4000 0000 0000 0002`
  - 3D Secure: `4000 0027 6000 3184`

- [ ] **Edge Cases**
  - [ ] Некоректний URL
  - [ ] Платіж declined
  - [ ] Платіж cancelled
  - [ ] Analysis failed
  - [ ] Повторний візит на dashboard

## ✅ Post-Launch

- [ ] **Monitoring First Week**
  - [ ] Перевіряти логи щодня
  - [ ] Перевіряти Stripe dashboard
  - [ ] Відповідати на emails клієнтів швидко

- [ ] **Backup**
  - [ ] Database backup налаштовано
  - [ ] PDF files backup налаштовано

- [ ] **Marketing**
  - [ ] SEO meta tags перевірено
  - [ ] Open Graph tags додано
  - [ ] Social media posts готові

## 🎉 Ready to Launch!

Коли всі пункти перевірено - ви готові до запуску!

### Launch Day Checklist:

1. Переключити `.env` на production keys
2. Rebuild з production налаштуваннями
3. Deploy на hosting
4. Перевірити live site
5. Зробити тестову транзакцію
6. Оголосити запуск!

### Emergency Contacts:

- Stripe Support: https://support.stripe.com
- Hosting Support: (залежно від платформи)
- N8N Community: https://community.n8n.io

### Rollback Plan:

Якщо щось пішло не так:
1. Повернутися до попередньої версії через hosting dashboard
2. Або відключити webhooks в n8n
3. Показати maintenance page

---

**Last Updated**: 2026-07-23
