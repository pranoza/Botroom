'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/lib/seo';

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-emerald-700"
            >
              <span className="text-sm sm:text-base font-semibold text-slate-900">
                {item.question}
              </span>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 ${
                  isOpen ? 'rotate-180 text-emerald-700' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-7 text-slate-600">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
