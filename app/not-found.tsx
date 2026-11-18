import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-slate-50 py-20">
      <div className="mx-auto max-w-xl px-4 text-center space-y-5">
        <p className="text-sm font-bold text-emerald-800 tabular-nums">خطای ۴۰۴</p>
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          صفحه مورد نظر در باتروم پیدا نشد
        </h1>
        <p className="text-sm leading-7 text-slate-600">
          ممکن است نشانی صفحه تغییر کرده باشد. می‌توانید به صفحه اصلی برگردید یا امکانات و قالب‌های آماده را ببینید.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            <span>بازگشت به صفحه اصلی</span>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/templates"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            مشاهده قالب‌های آماده
          </Link>
        </div>
      </div>
    </div>
  );
}
