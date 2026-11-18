# راهنمای دیپلوی باتروم (BotRoom) روی Coolify

این پروژه به‌صورت کامل برای دیپلوی روی **Coolify** و سرورهای دارای محدودیت اینترنت (داخل ایران) بهینه‌سازی شده است:

- **عدم وابستگی به Google Fonts**: فونت `Vazirmatn Variable` از طریق پکیج محلی `@fontsource-variable/vazirmatn` درون باندل نهایی قرار می‌گیرد و در زمان بیلد یا اجرا هیچ درخواستی به `fonts.googleapis.com` ارسال نمی‌شود.
- **غیرفعال‌سازی تله‌متری Next.js**: مقدار `NEXT_TELEMETRY_DISABLED=1` در تمام مراحل بیلد و اجرا تنظیم شده است.
- **Healthcheck داخلی بدون نیاز به ابزار اضافه**: مسیر `/api/health` با `fetch` داخلی Node.js بررسی می‌شود و نیازی به دانلود `curl` یا `wget` با `apk` نیست.

## ۱. تنظیمات پیشنهادی در Coolify

1. **Build Pack**: گزینه `Dockerfile` را انتخاب کنید.
2. **Ports Exposes**: عدد `3000` را وارد کنید.
3. **Health Check**:
   - Path: `/api/health`
   - Port: `3000`
   - Method: `GET`
4. **Environment Variables**:
   مقادیر زیر را در بخش Environment Variables وارد کنید (و تیک **Build Variable** را برای هر دو فعال کنید):
   - `NEXT_PUBLIC_SITE_URL=https://botroom.ir`
   - `NEXT_PUBLIC_APP_URL=https://app.botroom.ir`

## ۲. تنظیمات سرورهای دارای محدودیت اینترنت / تحریم (اختیاری)

اگر سرور شما در دانلود ایمیج از Docker Hub یا دریافت پکیج از `registry.npmjs.org` با کندی یا خطا مواجه شد، می‌توانید از **Build Arguments** در Coolify استفاده کنید:

- **تغییر رجیستری npm به میرور داخلی یا سریع**:
  ```
  NPM_REGISTRY=https://mirror-npm.runflare.com
  ```
- **تغییر ایمیج پایه Node به رجیستری میرور**:
  ```
  NODE_IMAGE=docker.arvancloud.ir/node:20-alpine
  ```
  *(یا هر میرور داکر فعال روی سرور شما)*

همچنین بهتر است فایل `package-lock.json` را پس از یک بار اجرای `npm install` در ریپازیتوری نگه دارید تا سرعت نصب در Coolify با `npm ci` بیشتر شود.
