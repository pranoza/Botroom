export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://botroom.ir'
).replace(/\/$/, '');

export const APP_URL = (
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.APP_URL_PANEL ||
  'https://app.botroom.ir'
).replace(/\/$/, '');

export const BRAND = {
  faName: 'باتروم',
  enName: 'BotRoom',
  fullTitle: 'باتروم | BotRoom',
  tagline: 'پلتفرم ابری ساخت و مدیریت بدون کد بازوهای هوشمند پیام‌رسان بله',
  email: 'hello@botroom.ir',
  supportEmail: 'support@botroom.ir',
  baleSupportId: '@BotRoomSupport',
} as const;

export const MAIN_NAV = [
  { label: 'امکانات', href: '/features' },
  { label: 'قالب‌ها', href: '/templates' },
  { label: 'تعرفه‌ها', href: '/pricing' },
  { label: 'وبلاگ', href: '/blog' },
  { label: 'تماس', href: '/contact' },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: 'امکانات تخصصی',
    links: [
      { label: 'طراح بصری جریان گفتگو', href: '/features/flow-builder' },
      { label: 'فروشگاه و کاتالوگ بله', href: '/features/bale-shop' },
      { label: 'نوبت‌دهی تقویم شمسی', href: '/features/jalali-booking' },
      { label: 'CRM و ارسال پیام گروهی', href: '/features/crm-broadcast' },
      { label: 'نظرسنجی رضایت مشتری', href: '/features/survey' },
    ],
  },
  {
    title: 'مسیرهای پلتفرم',
    links: [
      { label: 'همه قابلیت‌های باتروم', href: '/features' },
      { label: 'قالب‌های آماده بازوی بله', href: '/templates' },
      { label: 'تعرفه‌ها و مقایسه پلن‌ها', href: '/pricing' },
      { label: 'ورود به پنل کاربری', href: APP_URL, external: true },
    ],
  },
  {
    title: 'راهنما و وبلاگ',
    links: [
      { label: 'همه مقالات و آموزش‌ها', href: '/blog' },
      {
        label: 'دریافت توکن BotFather بله',
        href: '/blog/bale-botfather-token-webhook-guide',
      },
      {
        label: 'ساخت ربات فروشگاه در بله',
        href: '/blog/build-bale-shop-bot-catalog-cart',
      },
      {
        label: 'راه‌اندازی نوبت‌دهی شمسی کلینیک',
        href: '/blog/jalali-booking-bot-bale-clinics',
      },
      {
        label: 'دسته‌بندی VIP و پیام گروهی',
        href: '/blog/vip-crm-segmentation-bale-broadcast',
      },
    ],
  },
  {
    title: 'باتروم',
    links: [
      { label: 'درباره باتروم', href: '/about' },
      { label: 'تماس و مشاوره سازمانی', href: '/contact' },
      { label: 'شروع رایگان در پنل', href: APP_URL, external: true },
    ],
  },
] as const;

export function toPersianDigits(value: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(value).replace(/\d/g, (digit) => persianDigits[Number(digit)]);
}

export function formatToman(amount: number): string {
  if (amount === 0) return '۰';
  return toPersianDigits(amount.toLocaleString('en-US'));
}
