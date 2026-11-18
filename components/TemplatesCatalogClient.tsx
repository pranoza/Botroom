'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpLeft, Check } from 'lucide-react';
import {
  BOT_TEMPLATES,
  type TemplateCategory,
} from '@/data/templates';
import { APP_URL, toPersianDigits } from '@/lib/site';

const CATEGORIES: TemplateCategory[] = [
  'همه',
  'فروشگاه',
  'نوبت‌دهی',
  'پشتیبانی',
  'نظرسنجی',
];

export function TemplatesCatalogClient() {
  const [selectedCategory, setSelectedCategory] =
    useState<TemplateCategory>('همه');

  const filteredTemplates =
    selectedCategory === 'همه'
      ? BOT_TEMPLATES
      : BOT_TEMPLATES.filter((tpl) => tpl.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter Bar */}
      <div
        role="tablist"
        aria-label="فیلتر دسته‌بندی قالب‌های آماده"
        className="flex flex-wrap items-center gap-2"
      >
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg border px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'border-emerald-700 bg-emerald-700 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredTemplates.map((tpl) => (
          <article
            key={tpl.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6"
          >
            <div className="space-y-4">
              {/* Clean unboxed metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 tabular-nums">
                <span className="font-semibold text-emerald-800">
                  {tpl.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{toPersianDigits(tpl.nodeCount)} گره عملیاتی</span>
                <span aria-hidden="true">·</span>
                <span>راه‌اندازی حدود {toPersianDigits(tpl.setupMinutes)} دقیقه</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900">{tpl.title}</h2>
              <p className="text-sm leading-7 text-slate-600">
                {tpl.description}
              </p>

              {/* Highlights */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <h3 className="text-xs font-semibold text-slate-900">
                  ویژگی‌های کلیدی این قالب:
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {tpl.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nodes Used */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <h3 className="text-xs font-semibold text-slate-900">
                  گره‌های استفاده‌شده در جریان گفتگو:
                </h3>
                <p className="text-xs leading-6 text-slate-600">
                  {tpl.nodesUsed.join(' ← ')}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
              <Link
                href={tpl.relatedFeatureHref}
                className="text-xs font-medium text-slate-600 hover:text-emerald-800"
              >
                {tpl.relatedFeatureLabel}
              </Link>
              <a
                href={`${APP_URL}/templates?use=${tpl.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-4 py-2 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-emerald-800 whitespace-nowrap shrink-0"
              >
                <span>استفاده با یک کلیک در پنل</span>
                <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
