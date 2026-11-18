import Link from 'next/link';
import { APP_URL, BRAND, FOOTER_COLUMNS } from '@/lib/site';
import { BrandMark } from './BrandMark';

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <BrandMark />
            </Link>
            <p className="max-w-sm text-sm leading-7 text-slate-600">
              پلتفرم ابری ساخت و مدیریت بدون کد بازوهای هوشمند پیام‌رسان بله؛ طراحی جریان گفتگو، فروشگاه و کاتالوگ درون‌بله، نوبت‌دهی شمسی و CRM یکپارچه.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>
                ایمیل ارتباطی:{' '}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="font-medium text-slate-700 hover:text-emerald-800"
                >
                  {BRAND.email}
                </a>
              </p>
              <p>
                پنل کاربری:{' '}
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-slate-700 hover:text-emerald-800"
                >
                  app.botroom.ir
                </a>
              </p>
            </div>
          </div>

          {/* SEO Internal Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title} className="space-y-3">
                <h2 className="text-sm font-semibold text-slate-900">
                  {col.title}
                </h2>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  {col.links.map((link) => (
                    <li key={`${col.title}-${link.label}`}>
                      {'external' in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors hover:text-emerald-800"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="transition-colors hover:text-emerald-800"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-200 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p className="tabular-nums">
            © ۱۴۰۵ باتروم (BotRoom) — پلتفرم ساخت بازوهای هوشمند پیام‌رسان بله. تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-slate-900">
              درباره ما
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/pricing" className="hover:text-slate-900">
              تعرفه‌ها
            </Link>
            <span aria-hidden="true">·</span>
            <Link href="/contact" className="hover:text-slate-900">
              مشاوره و تماس
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
