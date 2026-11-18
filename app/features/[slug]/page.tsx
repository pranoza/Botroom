import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpLeft, Check } from 'lucide-react';
import {
  ELEVEN_FLOW_NODES,
  FEATURE_LIST,
  FEATURE_PAGES,
  type FeatureSlug,
} from '@/data/features';
import { BOT_TEMPLATES } from '@/data/templates';
import { getArticleBySlug } from '@/data/blog';
import { APP_URL } from '@/lib/site';
import { buildMetadata, breadcrumbSchema, faqSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FaqAccordion } from '@/components/FaqAccordion';
import { FeaturePreviewWidget } from '@/components/FeaturePreviewWidget';

export function generateStaticParams() {
  return FEATURE_LIST.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = FEATURE_PAGES[slug as FeatureSlug];
  if (!page) {
    return {};
  }

  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/features/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function FeatureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = FEATURE_PAGES[slug as FeatureSlug];

  if (!feature) {
    notFound();
  }

  const relatedNodes = ELEVEN_FLOW_NODES.filter((n) =>
    feature.relatedNodeIds.includes(n.id)
  );
  const relatedTemplate = BOT_TEMPLATES.find(
    (t) => t.id === feature.relatedTemplateId
  );
  const relatedArticle = getArticleBySlug(feature.relatedArticleSlug);

  const breadcrumbs = [
    { name: 'خانه', path: '/' },
    { name: 'امکانات', path: '/features' },
    { name: feature.navTitle, path: `/features/${feature.slug}` },
  ];

  return (
    <div className="bg-slate-50">
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={faqSchema(feature.faqs)} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:py-14 space-y-14">
        {/* Hero Header + Interactive Feature Preview */}
        <section className="space-y-8">
          <Breadcrumbs items={breadcrumbs} />

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-6">
              <h1 className="text-2xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
                {feature.h1}
              </h1>
              <p className="text-base leading-8 text-slate-600">
                {feature.lead}
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 whitespace-nowrap shrink-0"
                >
                  <span>راه‌اندازی رایگان در پنل باتروم</span>
                  <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link
                  href="/templates"
                  className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-100 whitespace-nowrap shrink-0"
                >
                  مشاهده قالب‌های آماده
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <FeaturePreviewWidget type={feature.previewType} />
            </div>
          </div>
        </section>

        {/* Core Capabilities Grid */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            قابلیت‌های کلیدی این ماژول در پیام‌رسان بله
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {feature.highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-6 space-y-2.5"
              >
                <h3 className="text-lg font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Scenarios */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            سناریوهای کاربردی واقعی در کسب‌وکارها
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {feature.scenarios.map((scenario) => (
              <div
                key={scenario.title}
                className="rounded-xl border border-slate-200 bg-white p-6 space-y-4"
              >
                <div>
                  <span className="text-xs font-semibold text-emerald-800">
                    {scenario.role}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-slate-900">
                    {scenario.title}
                  </h3>
                </div>
                <ul className="space-y-2.5 text-sm leading-6 text-slate-700">
                  {scenario.steps.map((step) => (
                    <li key={step} className="flex items-start gap-2.5">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-emerald-700"
                        aria-hidden="true"
                      />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Related Flow Nodes */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            گره‌های مرتبط طراح جریان برای اجرای این سناریو
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedNodes.map((node) => (
              <div
                key={node.id}
                className="rounded-xl border border-slate-200 bg-white p-5 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-emerald-800 tabular-nums">
                    گره {node.order}
                  </span>
                  <span dir="ltr" className="font-mono text-[11px]">
                    {node.techKey}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {node.title}
                </h3>
                <p className="text-xs leading-6 text-slate-600">
                  {node.summary}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Template & Blog Internal Links */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {relatedTemplate && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
              <span className="text-xs font-semibold text-emerald-800">
                قالب آماده پیشنهادی
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {relatedTemplate.title}
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                {relatedTemplate.shortDesc}
              </p>
              <div className="flex items-center gap-4 pt-2 text-sm">
                <a
                  href={`${APP_URL}/templates?use=${relatedTemplate.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-800 hover:text-emerald-900"
                >
                  استفاده با یک کلیک
                </a>
                <Link
                  href="/templates"
                  className="text-slate-600 hover:text-slate-900"
                >
                  همه قالب‌ها
                </Link>
              </div>
            </div>
          )}

          {relatedArticle && (
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
              <span className="text-xs font-semibold text-emerald-800">
                راهنمای آموزشی مرتبط
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                {relatedArticle.title}
              </h3>
              <p className="text-sm leading-6 text-slate-600">
                {relatedArticle.excerpt}
              </p>
              <div className="pt-2">
                <Link
                  href={`/blog/${relatedArticle.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 hover:text-emerald-900"
                >
                  <span>مطالعه آموزش کامل</span>
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
        </section>

        {/* Dedicated FAQ */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">
            سوالات متداول درباره {feature.navTitle}
          </h2>
          <FaqAccordion items={feature.faqs} />
        </section>
      </div>
    </div>
  );
}
