'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { APP_URL, MAIN_NAV } from '@/lib/site';
import { BrandMark } from './BrandMark';

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Brand Wordmark */}
        <Link
          href="/"
          className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 rounded-md"
          aria-label="صفحه اصلی باتروم"
        >
          <BrandMark />
        </Link>

        {/* Zone 2: Primary Navigation Links */}
        <nav
          aria-label="منوی اصلی"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          {MAIN_NAV.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap shrink-0 transition-colors hover:text-slate-900 ${
                  isActive
                    ? 'text-emerald-800 font-semibold underline decoration-emerald-700 underline-offset-8'
                    : 'hover:underline hover:decoration-slate-300 hover:underline-offset-8'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-sm font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap shrink-0 transition-colors"
          >
            ورود به پنل
          </a>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 whitespace-nowrap shrink-0"
          >
            شروع رایگان
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'بستن منو' : 'باز کردن منو'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav
            aria-label="منوی موبایل"
            className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3"
          >
            {MAIN_NAV.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 rounded-lg border border-slate-200 px-3 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              ورود به پنل کاربری
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
