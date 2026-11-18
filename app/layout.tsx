import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';
import { BRAND, SITE_URL } from '@/lib/site';
import { organizationSchema, softwareApplicationSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

const vazirmatn = Vazirmatn({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-vazirmatn',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'باتروم | پلتفرم ساخت ربات و بازوی هوشمند پیام‌رسان بله',
    template: '%s',
  },
  description:
    'با باتروم (BotRoom) بدون کدنویسی بازوی هوشمند پیام‌رسان بله بسازید: طراح بصری جریان گفتگو، فروشگاه و کاتالوگ درون‌بله، نوبت‌دهی تقویم شمسی، CRM و ارسال پیام گروهی.',
  applicationName: `${BRAND.faName} (${BRAND.enName})`,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: SITE_URL,
    siteName: `${BRAND.faName} (${BRAND.enName})`,
    title: 'باتروم | پلتفرم ساخت ربات و بازوی هوشمند پیام‌رسان بله',
    description:
      'ساخت ربات بله بدون کد با طراح بصری جریان گفتگو، شبیه‌ساز زنده، کاتالوگ فروشگاه، نوبت‌دهی شمسی، CRM و ارسال گروهی.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'باتروم | پلتفرم ساخت ربات و بازوی هوشمند پیام‌رسان بله',
    description:
      'ساخت بازوی هوشمند پیام‌رسان بله با طراح بصری جریان گفتگو، فروشگاه درون‌بله، نوبت‌دهی شمسی و CRM.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body
        suppressHydrationWarning
        className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col"
      >
        <JsonLd data={organizationSchema()} />
        <JsonLd data={softwareApplicationSchema()} />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
