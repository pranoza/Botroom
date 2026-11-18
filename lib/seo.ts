import type { Metadata } from 'next';
import { BRAND, SITE_URL } from './site';

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
  type = 'website',
  publishedTime,
}: PageMetadataOptions): Metadata {
  const normalizedPath = path === '/' ? '' : path;
  const canonicalUrl = `${SITE_URL}${normalizedPath}`;

  return {
    title,
    description,
    keywords: [
      'باتروم',
      'BotRoom',
      'ساخت ربات بله',
      'ربات ساز بله',
      'ساخت بازوی پیام‌رسان بله',
      ...keywords,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      locale: 'fa_IR',
      url: canonicalUrl,
      siteName: `${BRAND.faName} (${BRAND.enName})`,
      title,
      description,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${BRAND.faName} (${BRAND.enName})`,
    alternateName: ['BotRoom', 'باتروم'],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: BRAND.email,
    description: BRAND.tagline,
    sameAs: [SITE_URL],
  };
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${BRAND.faName} (BotRoom)`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'fa-IR',
    url: SITE_URL,
    description:
      'پلتفرم ابری ساخت و مدیریت بدون کد بازوهای هوشمند پیام‌رسان بله شامل طراح بصری جریان گفتگو، فروشگاه و کاتالوگ درون‌بله، نوبت‌دهی تقویم شمسی، CRM و ارسال پیام گروهی.',
    offers: [
      {
        '@type': 'Offer',
        name: 'پلن رایگان',
        price: '0',
        priceCurrency: 'IRR',
      },
      {
        '@type': 'Offer',
        name: 'پلن حرفه‌ای',
        price: '2900000',
        priceCurrency: 'IRR',
      },
      {
        '@type': 'Offer',
        name: 'پلن سازمانی',
        price: '6900000',
        priceCurrency: 'IRR',
      },
    ],
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.path === '/' ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

export function articleSchema({
  title,
  description,
  slug,
  datePublished,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    inLanguage: 'fa-IR',
    datePublished,
    dateModified: datePublished,
    author: {
      '@type': 'Organization',
      name: `${BRAND.faName} (BotRoom)`,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: `${BRAND.faName} (BotRoom)`,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
  };
}
