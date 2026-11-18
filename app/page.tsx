import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  Zap,
  ShieldCheck,
  Play,
  Calendar,
} from 'lucide-react';
import { APP_URL, formatToman, toPersianDigits } from '@/lib/site';
import { buildMetadata, faqSchema } from '@/lib/seo';
import { HOME_FAQS } from '@/data/home-faq';
import { BOT_TEMPLATES } from '@/data/templates';
import { PRICING_PLANS } from '@/data/pricing';
import { BLOG_ARTICLES } from '@/data/blog';
import { JsonLd } from '@/components/JsonLd';
import { HeroInteractiveMockup } from '@/components/HeroInteractiveMockup';
import { FeatureShowcaseTabs } from '@/components/FeatureShowcaseTabs';
import { FaqAccordion } from '@/components/FaqAccordion';

export const metadata: Metadata = buildMetadata({
  title: 'باتروم | پلتفرم ساخت ربات و بازوی هوشمند پیام‌رسان بله',
  description:
    'ساخت ربات بله و بازوی هوشمند پیام‌رسان بله بدون کدنویسی در باتروم (BotRoom): طراح بصری جریان گفتگو، شبیه‌ساز زنده، فروشگاه درون‌بله، نوبت‌دهی شمسی و CRM.',
  path: '/',
  keywords: [
    'ساخت ربات بله',
    'ربات ساز بله',
    'ساخت بازوی پیام‌رسان بله',
    'باتروم',
    'BotRoom',
  ],
});

const ARCHITECTURE_HIGHLIGHTS = [
  {
    icon: Zap,
    title: 'اتصال سریع با توکن BotFather',
    description:
      'ثبت بازو با توکن @BotFather، اعتبارسنجی خودکار getMe و فعال‌سازی یا قطع وبهوک تنها با یک کلیک.',
  },
  {
    icon: ShieldCheck,
    title: 'پردازش ناهمگام وبهوک بدون افت سرعت',
    description:
      'صف ناهمگام برای جلوگیری از تایم‌اوت سرور بله به همراه گزارش زنده وبهوک‌ها، زمان پاسخگویی و نشست‌ها.',
  },
  {
    icon: Play,
    title: 'شبیه‌ساز زنده قبل از انتشار',
    description:
      'تست تعاملی پیام‌ها، دکمه‌های شیشه‌ای، دریافت شماره موبایل و برچسب VIP درون پنل پیش از انتشار عمومی.',
  },
  {
    icon: Calendar,
    title: 'کاملاً فارسی و تقویم شمسی',
    description:
      'رابط تمام‌فارسی، قیمت‌گذاری تومانی و نمایش تقویم شمسی تا ۳۰ روز آینده برای رزرو نوبت درون بله.',
  },
];

const THREE_STEPS = [
  {
    step: '۰۱',
    title: 'دریافت توکن از @BotFather و ثبت در باتروم',
    description:
      'بازوی خود را در @BotFather بله بسازید و توکن را در پنل باتروم وارد کنید تا اعتبارسنجی خودکار (getMe) انجام شود.',
  },
  {
    step: '۰۲',
    title: 'انتخاب قالب یا طراحی جریان و تست در شبیه‌ساز',
    description:
      'یکی از ۵ قالب آماده را انتخاب کنید یا با کشیدن و رها کردن ۱۱ گره عملیاتی جریان بسازید و در شبیه‌ساز زنده بله تست بگیرید.',
  },
  {
    step: '۰۳',
    title: 'اتصال وبهوک با یک کلیک و مدیریت مشتریان',
    description:
      'وبهوک بازو را با یک کلیک فعال کنید و سفارش‌ها، نوبت‌های شمسی، فرم‌ها و گزارش زنده وبهوک‌ها را در پنل رصد کنید.',
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQS)} />

      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="mx-auto max-w-3xl text-center space-y-5">
            <p className="text-xs sm:text-sm font-semibold text-emerald-800">
              پلتفرم ابری بدون کد برای بازوهای هوشمند پیام‌رسان بله
            </p>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              بازوی هوشمند پیام‌رسان بله را بدون کدنویسی طراحی، تست و منتشر کنید
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              باتروم (BotRoom) طراح بصری جریان گفتگو، شبیه‌ساز زنده، فروشگاه و مرورگر کاتالوگ، نوبت‌دهی تقویم شمسی، CRM و ارسال پیام گروهی را در یک پنل یکپارچه برای پیام‌رسان بله در اختیار شما می‌گذارد.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 whitespace-nowrap shrink-0"
              >
                <span>ساخت اولین بازو در پنل</span>
                <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#hero-simulator"
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
              >
                مشاهده پیش‌نمایش طراح جریان
              </a>
            </div>
          </div>

          {/* Interactive Flow Builder + Bale Chat Simulator Mockup */}
          <div className="mt-10 lg:mt-12">
            <HeroInteractiveMockup />
          </div>
        </div>
      </section>

      {/* Architecture Highlights Strip */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ARCHITECTURE_HIGHLIGHTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5"
                >
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h2 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h2>
                  <p className="text-xs leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 Core Capabilities Interactive Tabs */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20 space-y-8">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              تمامی ابزارهای ساخت ربات بله در یک پنل یکپارچه
            </h2>
            <p className="text-sm sm:text-base leading-7 text-slate-600">
              از طراحی بصری جریان با ۱۱ گره عملیاتی تا مدیریت سفارش‌ها، تقویم شمسی و نظرسنجی CSAT — روی هر قابلیت کلیک کنید تا عملکرد واقعی آن را ببینید.
            </p>
          </div>

          <FeatureShowcaseTabs />
        </div>
      </section>

      {/* 3 Steps Activation Section */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20 space-y-10">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              چطور در ۳ قدم بازوی بله خود را در باتروم فعال کنید؟
            </h2>
            <p className="text-sm sm:text-base leading-7 text-slate-600">
              بدون نیاز به خرید سرور، تنظیم گواهی یا نوشتن حتی یک خط کد؛ کل فرآیند اتصال و انتشار چند دقیقه زمان می‌برد.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {THREE_STEPS.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-slate-200 bg-white p-6 space-y-3"
              >
                <span className="inline-block text-xs font-bold text-emerald-800 tabular-nums">
                  قدم {item.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Ready-to-Use Templates Showcase */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                ۵ قالب آماده بازوی بله با راه‌اندازی یک‌کلیکی
              </h2>
              <p className="text-sm sm:text-base leading-7 text-slate-600">
                ساختار جریان گفتگوی آماده را در پنل انتخاب کنید، متن‌ها یا محصولات خود را جایگزین کرده و بلافاصله منتشر کنید.
              </p>
            </div>
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-900 whitespace-nowrap shrink-0"
            >
              <span>مشاهده همه قالب‌ها و گره‌ها</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {BOT_TEMPLATES.map((tpl) => (
              <article
                key={tpl.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500 tabular-nums">
                    <span className="font-semibold text-emerald-800">
                      {tpl.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{toPersianDigits(tpl.nodeCount)} گره</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">
                    {tpl.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-6 text-slate-600">
                    {tpl.shortDesc}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-3.5 text-xs">
                  <Link
                    href={tpl.relatedFeatureHref}
                    className="font-medium text-slate-600 hover:text-slate-900"
                  >
                    توضیحات سناریو
                  </Link>
                  <a
                    href={`${APP_URL}/templates?use=${tpl.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-800 hover:text-emerald-900"
                  >
                    استفاده در پنل
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Pricing Section */}
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                تعرفه‌های شفاف متناسب با رشد بازوی بله شما
              </h2>
              <p className="text-sm sm:text-base leading-7 text-slate-600">
                با پلن رایگان شروع کنید و در پرداخت سالانه ۲ ماه اشتراک رایگان دریافت کنید.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-900 whitespace-nowrap shrink-0"
            >
              <span>جدول کامل مقایسه پلن‌ها</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PRICING_PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`flex flex-col justify-between rounded-xl border bg-white p-6 ${
                  plan.recommended
                    ? 'border-emerald-700 ring-1 ring-emerald-700'
                    : 'border-slate-200'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900">
                      {plan.name}
                    </h3>
                    {plan.recommended && (
                      <span className="text-xs font-semibold text-emerald-800">
                        محبوب‌ترین پلن
                      </span>
                    )}
                  </div>
                  <p className="text-xs leading-6 text-slate-600">
                    {plan.subtitle}
                  </p>
                  <div className="border-y border-slate-100 py-4 tabular-nums">
                    <span className="text-2xl font-extrabold text-slate-900">
                      {formatToman(plan.monthlyPrice)}
                    </span>{' '}
                    <span className="text-xs text-slate-600">تومان / ماهانه</span>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {plan.features.slice(0, 5).map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                          aria-hidden="true"
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <Link
                    href="/pricing"
                    className={`flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                      plan.recommended
                        ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                        : 'border border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    مشاهده جزئیات و انتخاب
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Guides & Blog Preview */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20 space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                راهنمای ساخت و رشد بازوهای پیام‌رسان بله
              </h2>
              <p className="text-sm sm:text-base leading-7 text-slate-600">
                آموزش‌های عملی دریافت توکن BotFather، راه‌اندازی فروشگاه، نوبت‌دهی شمسی کلینیک و دسته‌بندی مشتریان VIP.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-900 whitespace-nowrap shrink-0"
            >
              <span>همه مقالات وبلاگ</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {BLOG_ARTICLES.map((post) => (
              <article
                key={post.slug}
                className="rounded-xl border border-slate-200 bg-slate-50/40 p-6 space-y-3"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 tabular-nums">
                  <span className="font-semibold text-emerald-800">
                    {post.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{post.publishedAtJalali}</span>
                  <span aria-hidden="true">·</span>
                  <span>مطالعه {toPersianDigits(post.readMinutes)} دقیقه</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-emerald-800 transition-colors"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm leading-7 text-slate-600">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20 space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              پرسش‌های متداول درباره باتروم و ساخت ربات بله
            </h2>
            <p className="text-sm text-slate-600">
              پاسخ سوالات رایج درباره اتصال بازو، طراح جریان، فروشگاه، نوبت‌دهی شمسی و تعرفه‌ها
            </p>
          </div>
          <FaqAccordion items={HOME_FAQS} />
        </div>
      </section>
    </>
  );
}
