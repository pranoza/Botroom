import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageSquare, ArrowUpLeft } from 'lucide-react';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { APP_URL, BRAND } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactForm } from '@/components/ContactForm';

export const metadata: Metadata = buildMetadata({
  title: 'تماس با باتروم و مشاوره پلن سازمانی | BotRoom',
  description:
    'ارتباط با تیم باتروم (BotRoom) برای مشاوره راه‌اندازی بازوی پیام‌رسان بله، فروشگاه درون‌بله، نوبت‌دهی شمسی و انتخاب پلن سازمانی.',
  path: '/contact',
  keywords: ['تماس با باتروم', 'پشتیبانی باتروم', 'مشاوره ربات بله سازمانی'],
});

const BREADCRUMBS = [
  { name: 'خانه', path: '/' },
  { name: 'تماس و مشاوره', path: '/contact' },
];

export default function ContactPage() {
  return (
    <div className="bg-slate-50">
      <JsonLd data={breadcrumbSchema(BREADCRUMBS)} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14 space-y-12">
        <div>
          <Breadcrumbs items={BREADCRUMBS} />
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              تماس با باتروم و مشاوره راه‌اندازی بازوی بله
            </h1>
            <p className="text-base leading-8 text-slate-600">
              اگر برای انتخاب پلن سازمانی (تا ۱۰ بازوی همزمان)، انتقال جریان‌های فعلی یا طراحی سناریوی اختصاصی فروشگاه و کلینیک خود نیاز به راهنمایی دارید، پیام خود را ارسال کنید.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                راه‌های ارتباط مستقیم
              </h2>

              <div className="space-y-3 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">ایمیل فروش و سازمانی</p>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-slate-600 hover:text-emerald-800"
                    >
                      {BRAND.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">پشتیبانی فنی</p>
                    <a
                      href={`mailto:${BRAND.supportEmail}`}
                      className="text-slate-600 hover:text-emerald-800"
                    >
                      {BRAND.supportEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">پشتیبانی در پیام‌رسان بله</p>
                    <p dir="ltr" className="text-right font-mono text-xs text-slate-600">
                      {BRAND.baleSupportId}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
              <h2 className="text-base font-bold text-slate-900">
                شروع سریع بدون انتظار
              </h2>
              <p className="text-xs sm:text-sm leading-6 text-slate-600">
                برای آزمایش امکانات می‌توانید هم‌اکنون با پلن رایگان وارد پنل شوید یا قالب‌های آماده را بررسی کنید.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
                >
                  <span>ورود به پنل کاربری</span>
                  <ArrowUpLeft className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <Link
                  href="/pricing"
                  className="text-xs font-semibold text-slate-700 hover:text-emerald-800"
                >
                  مقایسه تعرفه‌ها
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
