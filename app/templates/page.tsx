import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { TemplatesCatalogClient } from '@/components/TemplatesCatalogClient';

export const metadata: Metadata = buildMetadata({
  title: 'قالب‌های آماده بازوی پیام‌رسان بله | باتروم (BotRoom)',
  description:
    '۵ قالب آماده ساخت ربات بله با راه‌اندازی یک‌کلیکی: کاتالوگ محصولات و سبد خرید، فروشگاه با تشخیص مشتری VIP، نوبت‌دهی شمسی کلینیک، پشتیبانی فنی و نظرسنجی CSAT.',
  path: '/templates',
  keywords: [
    'قالب آماده ربات بله',
    'قالب فروشگاه بله',
    'قالب نوبت‌دهی کلینیک بله',
    'قالب نظرسنجی CSAT بله',
  ],
});

const BREADCRUMBS = [
  { name: 'خانه', path: '/' },
  { name: 'قالب‌های آماده', path: '/templates' },
];

export default function TemplatesPage() {
  return (
    <div className="bg-slate-50">
      <JsonLd data={breadcrumbSchema(BREADCRUMBS)} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14 space-y-10">
        <div>
          <Breadcrumbs items={BREADCRUMBS} />
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              قالب‌های آماده بازوی پیام‌رسان بله با نصب یک‌کلیکی
            </h1>
            <p className="text-base leading-8 text-slate-600">
              به جای طراحی جریان گفتگو از صفر، قالب متناسب با کسب‌وکار خود را انتخاب کنید، با یک کلیک در پنل باتروم بسازید، در شبیه‌ساز تست بگیرید و منتشر کنید.
            </p>
          </div>
        </div>

        <TemplatesCatalogClient />
      </div>
    </div>
  );
}
