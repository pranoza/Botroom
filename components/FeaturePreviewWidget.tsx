'use client';

import { useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  ShoppingBag,
  Users,
  Send,
  Star,
  Workflow,
} from 'lucide-react';
import type { FeatureSlug } from '@/data/features';
import { formatToman, toPersianDigits } from '@/lib/site';

export function FeaturePreviewWidget({ type }: { type: FeatureSlug }) {
  const [flowStep, setFlowStep] = useState<'draft' | 'validated' | 'published'>('validated');
  const [productIdx, setProductIdx] = useState(0);
  const [cartQty, setCartQty] = useState(1);
  const [dayChoice, setDayChoice] = useState('چهارشنبه ۲۹ آبان');
  const [timeChoice, setTimeChoice] = useState('۱۱:۰۰');
  const [crmFilter, setCrmFilter] = useState<'VIP' | 'همه'>('VIP');
  const [surveyRating, setSurveyRating] = useState(2);

  const products = [
    { title: 'دستگاه بخور سرد اولتراسونیک', cat: 'لوازم خانگی', price: 2350000, stock: 9 },
    { title: 'فیلتر تصفیه هوای خانگی', cat: 'قطعات مصرفی', price: 780000, stock: 22 },
  ];

  if (type === 'flow-builder') {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Workflow className="h-4 w-4 text-emerald-700" aria-hidden="true" />
            <span>چرخه اعتبارسنجی و انتشار جریان</span>
          </div>
          <span className="text-xs text-slate-500">شبیه‌ساز آماده تست</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { id: 'draft', label: 'طراحی بوم' },
              { id: 'validated', label: 'اعتبارسنجی و شبیه‌ساز' },
              { id: 'published', label: 'انتشار و تاریخچه' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFlowStep(item.id)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                flowStep === item.id
                  ? 'border-emerald-700 bg-emerald-700 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-700">
          {flowStep === 'draft' &&
            'گره‌ها را با کشیدن و رها کردن روی بوم متصل کنید؛ در صورت نیاز ساختار گراف را به نمای لیستی/درختی یا ویرایشگر JSON تغییر دهید.'}
          {flowStep === 'validated' &&
            'مسیرهای بدون خروجی بررسی شدند. می‌توانید پیام‌ها، دکمه‌های شیشه‌ای، دریافت شماره موبایل و برچسب VIP را همین‌جا در شبیه‌ساز تست کنید.'}
          {flowStep === 'published' &&
            'نسخه جدید روی وبهوک بله منتشر شد. نسخه‌های قبلی در تاریخچه نسخه‌ها نگهداری می‌شوند و با یک کلیک قابل بازگشت هستند.'}
        </div>
      </div>
    );
  }

  if (type === 'bale-shop') {
    const prod = products[productIdx];
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <ShoppingBag className="h-4 w-4 text-emerald-700" aria-hidden="true" />
            <span>پیش‌نمایش مرورگر کاتالوگ درون‌بله</span>
          </div>
          <span className="text-xs font-medium text-emerald-800 tabular-nums">
            مجموع سبد: {formatToman(prod.price * cartQty)} تومان
          </span>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>{prod.cat}</span>
            <span className="tabular-nums">موجودی: {toPersianDigits(prod.stock)} عدد</span>
          </div>
          <p className="text-base font-bold text-slate-900">{prod.title}</p>
          <p className="text-sm font-semibold text-emerald-800 tabular-nums">
            {formatToman(prod.price)} تومان
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setProductIdx((i) => (i === 0 ? 1 : 0))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              محصول قبلی
            </button>
            <button
              type="button"
              onClick={() => setProductIdx((i) => (i === 0 ? 1 : 0))}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              محصول بعدی
              <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setCartQty((q) => (q >= 5 ? 1 : q + 1))}
            className="rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 tabular-nums"
          >
            تعداد در سبد: {toPersianDigits(cartQty)} (+۱)
          </button>
        </div>
      </div>
    );
  }

  if (type === 'jalali-booking') {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Calendar className="h-4 w-4 text-emerald-700" aria-hidden="true" />
            <span>شبیه‌ساز تقویم شمسی کلینیک</span>
          </div>
          <span className="text-xs text-slate-500">ظرفیت بدون تداخل</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {['سه‌شنبه ۲۸ آبان', 'چهارشنبه ۲۹ آبان', 'پنجشنبه ۳۰ آبان'].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDayChoice(d)}
              className={`rounded-lg border px-2 py-2 text-xs font-medium tabular-nums transition-colors ${
                dayChoice === d
                  ? 'border-emerald-700 bg-emerald-700 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {['۰۹:۰۰', '۱۱:۰۰', '۱۵:۳۰'].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTimeChoice(t)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium tabular-nums ${
                timeChoice === t
                  ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              ساعت {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-900 tabular-nums">
          <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            نوبت انتخابی: {dayChoice} ساعت {timeChoice} · یادآور خودکار پیش از نوبت ارسال می‌شود.
          </span>
        </div>
      </div>
    );
  }

  if (type === 'crm-broadcast') {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Users className="h-4 w-4 text-emerald-700" aria-hidden="true" />
            <span>فیلتر برچسب CRM و ارسال کمپین</span>
          </div>
          <Send className="h-4 w-4 text-slate-400" aria-hidden="true" />
        </div>

        <div className="flex gap-2">
          {(['VIP', 'همه'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setCrmFilter(f)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                crmFilter === f
                  ? 'border-emerald-700 bg-emerald-700 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              فیلتر مخاطب: {f}
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs space-y-2 tabular-nums">
          <p className="font-semibold text-slate-900">
            تعداد گیرندگان واجد شرایط:{' '}
            {crmFilter === 'VIP' ? '۴۲۰ مشتری دارای برچسب VIP' : '۳,۱۲۰ کاربر ثبت‌شده در CRM'}
          </p>
          <p className="text-slate-600">
            محتوای کمپین: تصویر + متن اختصاصی · زمانبندی یا ارسال فوری با کنترل نرخ ارسال و گزارش آمار تحویل.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Star className="h-4 w-4 text-emerald-700" aria-hidden="true" />
          <span>شبیه‌ساز مسیر شرطی نظرسنجی CSAT</span>
        </div>
        <span className="text-xs text-slate-500 tabular-nums">امتیاز ۱ تا ۵ ستاره</span>
      </div>

      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSurveyRating(s)}
            className={`h-9 w-10 rounded-lg border text-xs font-semibold tabular-nums transition-colors ${
              surveyRating === s
                ? 'border-emerald-700 bg-emerald-700 text-white'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {toPersianDigits(s)}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs leading-6 text-slate-800">
        {surveyRating <= 3 ? (
          <span>
            امتیاز {toPersianDigits(surveyRating)} ثبت شد: گره شرطی، کاربر را به فرم پیگیری مستقیم مدیر هدایت می‌کند تا مشکل او سریع برطرف شود.
          </span>
        ) : (
          <span>
            امتیاز {toPersianDigits(surveyRating)} ثبت شد: پیام تشکر ارسال و امتیاز مثبت در آمار میانگین رضایت (CSAT) منظور می‌شود.
          </span>
        )}
      </div>
    </div>
  );
}
