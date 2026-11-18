import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import type { BreadcrumbItem } from '@/lib/seo';

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="مسیر صفحه" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={item.path} className="inline-flex items-center gap-1.5">
              {idx > 0 && (
                <ChevronLeft className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
              )}
              {isLast ? (
                <span className="font-medium text-slate-800" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="transition-colors hover:text-emerald-800"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
