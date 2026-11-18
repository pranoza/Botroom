import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpLeft } from 'lucide-react';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { FEATURE_LIST, ELEVEN_FLOW_NODES } from '@/data/features';
import { APP_URL } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = buildMetadata({
  title: 'امکانات پلتفرم باتروم | ساخت ربات بله، فروشگاه، نوبت‌دهی شمسی و CRM',
  description:
    'آشنایی با تمام ماژول‌های واقعی باتروم (BotRoom) برای پیام‌رسان بله: طراح بصری جریان با ۱۱ گره عملیاتی، فروشگاه و کاتالوگ، نوبت‌دهی شمسی، CRM، پیام گروهی و نظرسنجی CSAT.',
  path: '/features',
  keywords: [
    'امکانات ربات ساز بله',
    'گره‌های جریان گفتگو بله',
    'فروشگاه پیام‌رسان بله',
    'نوبت‌دهی شمسی بله',
  ],
});

const BREADCRUMBS = [
  { name: 'خانه', path: '/' },
  { name: 'امکانات و کاربردها', path: '/features' },
];

export default function FeaturesOverviewPage() {
  return (
    <div className="bg-slate-50">
      <JsonLd data={breadcrumbSchema(BREADCRUMBS)} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14 space-y-14">
        <div>
          <Breadcrumbs items={BREADCRUMBS} />
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              امکانات و ماژول‌های تخصصی باتروم برای بازوهای پیام‌رسان بله
            </h1>
            <p className="text-base leading-8 text-slate-600">
              باتروم به جای ابزارهای پراکنده، تمام نیازهای اتصال وبهوک، طراحی جریان گفتگو، مدیریت مشتریان (CRM)، فروش درون‌بله، رزرواسیون شمسی و نظرسنجی CSAT را یکجا در اختیار شما می‌گذارد.
            </p>
          </div>
        </div>

        {/* 5 Specialized Feature Landing Cards */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            صفحات تخصصی قابلیت‌های پلتفرم
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FEATURE_LIST.map((feat, idx) => (
              <article
                key={feat.slug}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 space-y-5"
              >
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-emerald-800 tabular-nums">
                    ۰{idx + 1}. ماژول تخصصی
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">
                    {feat.navTitle}
                  </h3>
                  <p className="text-sm leading-7 text-slate-600">
                    {feat.lead}
                  </p>
                </div>
                <div className="border-t border-slate-100 pt-4">
                  <Link
                    href={`/features/${feat.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-900"
                  >
                    <span>مشاهده سناریوها و جزئیات</span>
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* All 11 Operational Nodes */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">
              ۱۱ گره عملیاتی در طراح بصری جریان گفتگو (Flow Builder)
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              هر گره یک وظیفه مشخص در پیام‌رسان بله انجام می‌دهد و می‌توانید آن‌ها را با کشیدن و رها کردن به هم متصل کنید.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ELEVEN_FLOW_NODES.map((node) => (
              <div
                key={node.id}
                className="rounded-xl border border-slate-200 bg-white p-5 space-y-2"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-emerald-800 tabular-nums">
                    گره {node.order}
                  </span>
                  <span dir="ltr" className="font-mono text-[11px]">
                    {node.techKey}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {node.title}
                </h3>
                <p className="text-xs sm:text-sm leading-6 text-slate-600">
                  {node.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              آماده ساخت اولین بازوی بله خود هستید؟
            </h2>
            <p className="text-sm text-slate-600">
              همین حالا با پلن رایگان وارد پنل شوید و جریان گفتگو را در شبیه‌ساز تست کنید.
            </p>
          </div>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 whitespace-nowrap shrink-0"
          >
            <span>ورود به پنل و شروع رایگان</span>
            <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
          </a>
        </section>
      </div>
    </div>
  );
}
