import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpLeft, Check } from 'lucide-react';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { APP_URL } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = buildMetadata({
  title: 'درباره باتروم (BotRoom) | پلتفرم ساخت بازوهای هوشمند بله',
  description:
    'آشنایی با ماموریت باتروم (BotRoom) در توانمندسازی فروشگاه‌ها، کلینیک‌ها و کسب‌وکارهای ایرانی برای ساخت و مدیریت بدون کد بازوهای پیام‌رسان بله.',
  path: '/about',
  keywords: ['درباره باتروم', 'BotRoom', 'پلتفرم بازوهای بله'],
});

const BREADCRUMBS = [
  { name: 'خانه', path: '/' },
  { name: 'درباره باتروم', path: '/about' },
];

export default function AboutPage() {
  return (
    <div className="bg-slate-50">
      <JsonLd data={breadcrumbSchema(BREADCRUMBS)} />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14 space-y-12">
        <div>
          <Breadcrumbs items={BREADCRUMBS} />
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              درباره باتروم (BotRoom)
            </h1>
            <p className="text-base leading-8 text-slate-600">
              باتروم یک پلتفرم ابری ایرانی برای ساخت و مدیریت بدون کد بازوهای هوشمند پیام‌رسان بله است؛ تا فروشگاه‌ها، کلینیک‌ها و تیم‌های پشتیبانی بتوانند بدون درگیری با سرور، وبهوک و کدنویسی، تعامل حرفه‌ای با مشتریان خود بسازند.
            </p>
          </div>
        </div>

        <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5">
          <h2 className="text-xl font-bold text-slate-900">
            چرا باتروم را برای پیام‌رسان بله طراحی کردیم؟
          </h2>
          <p className="text-sm sm:text-base leading-8 text-slate-600">
            بسیاری از ابزارهای ربات‌ساز عمومی برای نیازهای بومی کسب‌وکارهای ایرانی مثل تقویم شمسی، قیمت‌گذاری تومانی، دریافت شماره تماس تاییدشده درون بله یا صف پایدار پردازش وبهوک‌ها طراحی نشده‌اند. باتروم تمام این اجزا را از پایه متناسب با ساختار پیام‌رسان بله یکپارچه کرده است.
          </p>
          <ul className="space-y-3 text-sm text-slate-700">
            {[
              'اتصال سریع بازوی بله با توکن @BotFather، اعتبارسنجی getMe و فعال‌سازی وبهوک با یک کلیک',
              'طراحی گراف جریان گفتگو با ۱۱ گره عملیاتی و شبیه‌ساز زنده پیش از انتشار',
              'فروشگاه و کاتالوگ درون‌بله با مدیریت موجودی، وضعیت سفارش و خروجی اکسل/CSV',
              'سامانه نوبت‌دهی تقویم شمسی ۳۰ روزه بدون تداخل ظرفیت به همراه یادآور خودکار',
              'CRM مشتریان بله با برچسب VIP، نظرسنجی CSAT و ارسال پیام گروهی زمانبندی‌شده',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <Check
                  className="mt-1 h-4 w-4 shrink-0 text-emerald-700"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">
              نیاز به مشاوره یا راه‌اندازی سازمانی دارید؟
            </h2>
            <p className="text-sm text-slate-600">
              با تیم باتروم گفتگو کنید یا همین حالا رایگان در پنل شروع کنید.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              <span>تماس با ما</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              <span>ورود به پنل</span>
              <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
