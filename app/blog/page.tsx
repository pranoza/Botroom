import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { buildMetadata, breadcrumbSchema } from '@/lib/seo';
import { BLOG_ARTICLES } from '@/data/blog';
import { toPersianDigits } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const metadata: Metadata = buildMetadata({
  title: 'وبلاگ و آموزش ساخت ربات پیام‌رسان بله | باتروم (BotRoom)',
  description:
    'مقالات تخصصی و راهنماهای گام‌به‌گام ساخت بازوی پیام‌رسان بله: دریافت توکن BotFather، فروشگاه درون‌بله، نوبت‌دهی شمسی کلینیک و دسته‌بندی مشتریان VIP.',
  path: '/blog',
  keywords: [
    'آموزش ساخت ربات بله',
    'وبلاگ باتروم',
    'راهنمای BotFather بله',
    'نوبت‌دهی بله کلینیک',
  ],
});

const BREADCRUMBS = [
  { name: 'خانه', path: '/' },
  { name: 'وبلاگ و آموزش‌ها', path: '/blog' },
];

export default function BlogIndexPage() {
  return (
    <div className="bg-slate-50">
      <JsonLd data={breadcrumbSchema(BREADCRUMBS)} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14 space-y-10">
        <div>
          <Breadcrumbs items={BREADCRUMBS} />
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              وبلاگ آموزشی ساخت و بهینه‌سازی بازوهای پیام‌رسان بله
            </h1>
            <p className="text-base leading-8 text-slate-600">
              راهنماهای گام‌به‌گام برای راه‌اندازی سریع بازوی بله، طراحی فروشگاه و کاتالوگ محصولات، رزرواسیون تقویم شمسی و بازاریابی هدفمند با CRM.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {BLOG_ARTICLES.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 space-y-5"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 tabular-nums">
                  <span className="font-semibold text-emerald-800">
                    {post.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{post.publishedAtJalali}</span>
                  <span aria-hidden="true">·</span>
                  <span>مطالعه {toPersianDigits(post.readMinutes)} دقیقه</span>
                </div>

                <h2 className="text-xl font-bold leading-8 text-slate-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-emerald-800"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm leading-7 text-slate-600">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
                <Link
                  href={post.relatedFeatureHref}
                  className="text-xs font-medium text-slate-500 hover:text-slate-800"
                >
                  {post.relatedFeatureTitle}
                </Link>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-900 whitespace-nowrap shrink-0"
                >
                  <span>خواندن مقاله</span>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
