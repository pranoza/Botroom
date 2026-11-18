import { Workflow } from 'lucide-react';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white shrink-0">
        <Workflow className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="text-base font-bold tracking-tight text-slate-900">
        {compact ? 'باتروم' : 'باتروم | BotRoom'}
      </span>
    </span>
  );
}
