import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpLeft, Check } from 'lucide-react';
import { BLOG_ARTICLES, getArticleBySlug } from '@/data/blog';
import { APP_URL, toPersianDigits } from '@/lib/site';
import {
  articleSchema,
  breadcrumbSchema,
  buildMetadata,
} from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export function generateStaticParams() {
  return BLOG_ARTICLES.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return {};
  }

  return buildMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/blog/${article.slug}`,
    keywords: article.keywords,
    type: 'article',
    publishedTime: article.publishedAtIso,
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'خانه', path: '/' },
    { name: 'وبلاگ', path: '/blog' },
    { name: article.title, path: `/blog/${article.slug}` },
  ];

  const otherArticles = BLOG_ARTICLES.filter((a) => a.slug !== article.slug);

  return (
    <div className="bg-slate-50">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.metaDescription,
          slug: article.slug,
          datePublished: article.publishedAtIso,
        })}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14 space-y-12">
        <article className="space-y-8">
          <header className="space-y-4 border-b border-slate-200 pb-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 tabular-nums">
              <span className="font-semibold text-emerald-800">
                {article.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>انتشار: {article.publishedAtJalali}</span>
              <span aria-hidden="true">·</span>
              <span>زمان مطالعه: {toPersianDigits(article.readMinutes)} دقیقه</span>
            </div>

            <h1 className="text-2xl font-extrabold leading-snug text-slate-900 sm:text-4xl">
              {article.title}
            </h1>
            <p className="text-base leading-8 text-slate-600">
              {article.excerpt}
            </p>
          </header>

          {/* Article Body Sections */}
          <div className="space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="space-y-3 text-sm sm:text-base leading-8 text-slate-700">
                  {section.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="space-y-2.5 rounded-xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5">
                        <Check
                          className="mt-1.5 h-4 w-4 shrink-0 text-emerald-700"
                          aria-hidden="true"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.tip && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-950">
                    <strong className="font-semibold">نکته کاربردی: </strong>
                    {section.tip}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Related Feature & CTA */}
          <aside className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-emerald-800">
                اجرای عملی این آموزش در باتروم
              </p>
              <h2 className="text-lg font-bold text-slate-900">
                {article.relatedTemplateTitle}
              </h2>
              <p className="text-sm leading-7 text-slate-600">
                می‌توانید این ساختار را مستقیماً در پنل باتروم انتخاب کنید یا جزئیات ماژول{' '}
                <Link
                  href={article.relatedFeatureHref}
                  className="font-semibold text-emerald-800 underline underline-offset-4"
                >
                  {article.relatedFeatureTitle}
                </Link>{' '}
                را بررسی نمایید.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
              >
                <span>ورود به پنل و شروع رایگان</span>
                <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/templates"
                className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100"
              >
                مشاهده قالب‌های آماده
              </Link>
            </div>
          </aside>
        </article>

        {/* Other Articles */}
        <section className="space-y-5 border-t border-slate-200 pt-10">
          <h2 className="text-xl font-bold text-slate-900">
            سایر راهنماهای ساخت بازوی پیام‌رسان بله
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {otherArticles.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 space-y-3 transition-colors hover:border-emerald-700"
              >
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-emerald-800">
                    {other.category}
                  </span>
                  <h3 className="text-sm font-bold leading-6 text-slate-900">
                    {other.title}
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
                  <span>مطالعه</span>
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
