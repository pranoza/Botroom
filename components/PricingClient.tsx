'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import {
  PRICING_PLANS,
  PRICING_COMPARISON,
  PRICING_FAQS,
} from '@/data/pricing';
import { APP_URL, formatToman } from '@/lib/site';
import { FaqAccordion } from './FaqAccordion';

export function PricingClient() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <div className="space-y-16">
      {/* Billing Period Switch */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div
          role="group"
          aria-label="انتخاب دوره پرداخت"
          className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-1"
        >
          <button
            type="button"
            aria-pressed={billing === 'monthly'}
            onClick={() => setBilling('monthly')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              billing === 'monthly'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            پرداخت ماهانه
          </button>
          <button
            type="button"
            aria-pressed={billing === 'annual'}
            onClick={() => setBilling('annual')}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
              billing === 'annual'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            پرداخت سالانه (۲ ماه تخفیف)
          </button>
        </div>
        <p className="text-xs text-slate-500">
          {billing === 'annual'
            ? 'در دوره سالانه هزینه ۱۰ ماه محاسبه می‌شود و ۲ ماه استفاده رایگان هدیه می‌گیرید.'
            : 'تمام پلن‌ها بدون هزینه راه‌اندازی بوده و در هر زمان قابل ارتقا هستند.'}
        </p>
      </div>

      {/* 3 Plan Cards */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PRICING_PLANS.map((plan) => {
          const displayMonthly =
            billing === 'monthly'
              ? plan.monthlyPrice
              : plan.annualMonthlyEquivalent;

          return (
            <section
              key={plan.id}
              className={`flex flex-col justify-between rounded-xl border bg-white p-6 sm:p-7 ${
                plan.recommended
                  ? 'border-emerald-700 ring-1 ring-emerald-700'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-xl font-bold text-slate-900">
                    {plan.name}
                  </h2>
                  {plan.recommended && (
                    <span className="text-xs font-semibold text-emerald-800">
                      پیشنهاد ویژه کسب‌وکارها
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {plan.subtitle}
                </p>

                <div className="mt-6 border-y border-slate-100 py-5">
                  <div className="flex items-baseline gap-1.5 tabular-nums">
                    <span className="text-3xl font-extrabold text-slate-900">
                      {formatToman(displayMonthly)}
                    </span>
                    <span className="text-sm text-slate-600">
                      تومان / ماهانه
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500 tabular-nums">
                    {plan.monthlyPrice === 0
                      ? 'رایگان برای همیشه تا سقف پلن'
                      : billing === 'annual'
                        ? `پرداخت یکجا سالانه: ${formatToman(plan.annualTotalPrice)} تومان (۲ ماه تخفیف)`
                        : `در صورت پرداخت سالانه: ${formatToman(plan.annualTotalPrice)} تومان`}
                  </p>
                </div>

                <ul className="mt-6 space-y-3 text-sm text-slate-700">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-emerald-700"
                        aria-hidden="true"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <a
                  href={`${APP_URL}/billing?plan=${plan.id}&period=${billing}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold transition-colors whitespace-nowrap ${
                    plan.recommended
                      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                      : 'border border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {plan.ctaLabel}
                </a>
              </div>
            </section>
          );
        })}
      </div>

      {/* Detailed Feature Comparison Table */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            مقایسه دقیق امکانات پلن‌های باتروم
          </h2>
          <p className="text-sm text-slate-600">
            تمامی محدودیت‌ها و قابلیت‌های واقعی پنل به تفکیک ماژول‌ها در جدول زیر آمده است.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[680px] border-collapse text-right text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-900">
                <th className="px-4 py-3.5 font-semibold">قابلیت پلتفرم</th>
                <th className="px-4 py-3.5 font-semibold">رایگان</th>
                <th className="px-4 py-3.5 font-semibold text-emerald-800">
                  حرفه‌ای
                </th>
                <th className="px-4 py-3.5 font-semibold">سازمانی</th>
              </tr>
            </thead>
            {PRICING_COMPARISON.map((group) => (
              <tbody key={group.groupTitle} className="divide-y divide-slate-200">
                <tr className="bg-slate-50/70">
                  <td
                    colSpan={4}
                    className="px-4 py-2.5 text-xs font-bold text-slate-700"
                  >
                    {group.groupTitle}
                  </td>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.feature} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 text-slate-800 font-medium">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-slate-600 tabular-nums">
                      {row.free}
                    </td>
                    <td className="px-4 py-3 font-medium text-emerald-900 tabular-nums">
                      {row.pro}
                    </td>
                    <td className="px-4 py-3 text-slate-800 font-medium tabular-nums">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">
            سوالات متداول درباره تعرفه‌ها و ارتقا
          </h2>
        </div>
        <FaqAccordion items={PRICING_FAQS} />
      </section>
    </div>
  );
}
