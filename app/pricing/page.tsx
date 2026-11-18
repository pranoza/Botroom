import type { Metadata } from 'next';
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { PRICING_FAQS } from '@/data/pricing';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { PricingClient } from '@/components/PricingClient';

export const metadata: Metadata = buildMetadata({
  title: 'تعرفه‌ها و مقایسه پلن‌های ساخت ربات بله | باتروم (BotRoom)',
  description:
    'تعرفه ماهانه و سالانه پلتفرم باتروم: پلن رایگان (۰ تومان)، پلن حرفه‌ای (۲۹۰ هزار تومان) و پلن سازمانی (۶۹۰ هزار تومان) همراه با ۲ ماه تخفیف سالانه.',
  path: '/pricing',
  keywords: [
    'تعرفه ساخت ربات بله',
    'قیمت ربات ساز بله',
    'پلن رایگان ربات بله',
    'خرید اشتراک باتروم',
  ],
});

const BREADCRUMBS = [
  { name: 'خانه', path: '/' },
  { name: 'تعرفه‌ها', path: '/pricing' },
];

export default function PricingPage() {
  return (
    <div className="bg-slate-50">
      <JsonLd data={breadcrumbSchema(BREADCRUMBS)} />
      <JsonLd data={faqSchema(PRICING_FAQS)} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14 space-y-10">
        <div>
          <Breadcrumbs items={BREADCRUMBS} />
          <div className="mx-auto max-w-3xl text-center space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              تعرفه‌های شفاف باتروم برای ساخت و مدیریت بازوهای بله
            </h1>
            <p className="text-base leading-8 text-slate-600">
              با پلن رایگان شروع کنید و هر زمان تعداد بازوها، مخاطبین CRM، پیام‌های گروهی یا خدمات نوبت‌دهی شمسی شما افزایش یافت، پلن خود را ارتقا دهید.
            </p>
          </div>
        </div>

        <PricingClient />
      </div>
    </div>
  );
}
