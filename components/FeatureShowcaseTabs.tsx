'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Workflow,
  ShoppingBag,
  Calendar,
  Users,
  Send,
  Star,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
} from 'lucide-react';
import { formatToman, toPersianDigits } from '@/lib/site';

type TabId =
  | 'flow'
  | 'shop'
  | 'booking'
  | 'crm'
  | 'broadcast'
  | 'survey';

const TABS: {
  id: TabId;
  label: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  bullets: string[];
  icon: typeof Workflow;
}[] = [
  {
    id: 'flow',
    label: 'طراح بصری جریان',
    title: 'طراحی گراف گفتگو با ۱۱ گره عملیاتی و تاریخچه نسخه‌ها',
    description:
      'مسیرهای گفتگو را با کشیدن و رها کردن بسازید، در نمای لیستی یا JSON ویرایش کنید، از چیدمان خودکار و اعتبارسنجی پیش از انتشار بهره ببرید و هر زمان به نسخه‌های قبلی برگردید.',
    href: '/features/flow-builder',
    linkLabel: 'جزئیات کامل طراح جریان گفتگو',
    bullets: [
      'چیدمان خودکار گراف، نمای درختی و ویرایشگر JSON',
      'نسخه‌بندی (Version History) با امکان انتشار یا بازگشت فوری',
      'شبیه‌ساز زنده پیام، دکمه شیشه‌ای، شماره تماس و برچسب VIP',
    ],
    icon: Workflow,
  },
  {
    id: 'shop',
    label: 'فروشگاه و کاتالوگ',
    title: 'مرورگر کاتالوگ درون‌بله، سبد خرید و خروجی اکسل سفارش‌ها',
    description:
      'محصولات را با عکس، قیمت به تومان، موجودی و دسته‌بندی ثبت کنید. مشتریان کاتالوگ را بدون شلوغ شدن صفحه چت ورق می‌زنند و سفارش‌ها با تغییر وضعیت و خروجی CSV مدیریت می‌شوند.',
    href: '/features/bale-shop',
    linkLabel: 'بررسی امکانات فروشگاه درون‌بله',
    bullets: [
      'نمایش ورق‌زدنی محصولات در بله بدون ارسال پیام‌های مزاحم',
      'کنترل خودکار موجودی کالا و محاسبه سبد خرید به تومان',
      'وضعیت‌های در انتظار، تاییدشده و لغوشده + دانلود اکسل/CSV',
    ],
    icon: ShoppingBag,
  },
  {
    id: 'booking',
    label: 'نوبت‌دهی شمسی',
    title: 'رزرواسیون با تقویم شمسی ۳۰ روزه و جلوگیری از تداخل ظرفیت',
    description:
      'خدمات را با مدت‌زمان، ظرفیت اسلات، برنامه هفتگی شنبه تا جمعه و روزهای تعطیل تعریف کنید. سیستم از رزرو همزمان جلوگیری کرده و یادآور خودکار می‌فرستد.',
    href: '/features/jalali-booking',
    linkLabel: 'مشاهده سامانه نوبت‌دهی شمسی',
    bullets: [
      'نمایش تقویم شمسی تا ۳۰ روز آینده داخل پیام‌رسان بله',
      'تنظیم برنامه کاری شنبه تا جمعه و مسدودسازی روزهای تعطیل',
      'جلوگیری از ثبت همزمان روی یک ظرفیت و یادآور خودکار نوبت',
    ],
    icon: Calendar,
  },
  {
    id: 'crm',
    label: 'CRM و فرم‌ساز',
    title: 'پروفایل خودکار مشتریان بله، برچسب VIP و فرم‌های تاییدشده',
    description:
      'برای هر کاربر بله پرونده CRM ساخته می‌شود. شماره موبایل تاییدشده با request_contact، فیلدهای سفارشی و برچسب‌ها ذخیره می‌شوند و گفتگو بر اساس آن‌ها انشعاب می‌گیرد.',
    href: '/features/crm-broadcast',
    linkLabel: 'آشنایی با CRM پیام‌رسان بله',
    bullets: [
      'ذخیره شماره موبایل تاییدشده با دکمه بومی request_contact',
      'برچسب‌گذاری (VIP، خریدار قبلی) و مسدودسازی کاربر',
      'مشاهده و بررسی تمام فرم‌های جمع‌آوری‌شده در پنل',
    ],
    icon: Users,
  },
  {
    id: 'broadcast',
    label: 'ارسال گروهی و زمانبندی',
    title: 'کمپین پیام گروهی فوری یا زمانبندی‌شده با فیلتر برچسب‌ها',
    description:
      'پیام‌های متنی و تصویری خود را برای همه مخاطبان یا فقط برچسب‌های منتخب ارسال کنید. ارسال با کنترل نرخ انجام شده و گزارش دقیق آمار ارسال در پنل ثبت می‌گردد.',
    href: '/features/crm-broadcast',
    linkLabel: 'مشاهده جزئیات ارسال پیام گروهی',
    bullets: [
      'فیلتر دقیق گیرندگان بر اساس برچسب‌های CRM',
      'پشتیبانی از تصویر و متن با ارسال فوری یا زمانبندی‌شده',
      'کنترل نرخ ارسال و مشاهده گزارش آمار تحویل در پنل',
    ],
    icon: Send,
  },
  {
    id: 'survey',
    label: 'نظرسنجی و آمار',
    title: 'سنجش رضایت ۱ تا ۵ ستاره (CSAT) و ارجاع امتیاز پایین به مدیر',
    description:
      'نظرسنجی ستاره‌ای و چندسوالی را داخل بله اجرا کنید، میانگین امتیاز رضایت را ببینید و مشتریان ناراضی را خودکار به مسیر پیگیری مدیر هدایت نمایید.',
    href: '/features/survey',
    linkLabel: 'جزئیات ربات نظرسنجی CSAT',
    bullets: [
      'نظرسنجی ۱ تا ۵ ستاره و چندسوالی با دکمه‌های شیشه‌ای بله',
      'تحلیل میانگین امتیاز و گزارش پاسخ‌های مشتریان',
      'هدایت خودکار امتیازهای پایین به مسیر پیگیری مدیر',
    ],
    icon: Star,
  },
];

export function FeatureShowcaseTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('flow');
  const [shopIndex, setShopIndex] = useState(0);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState<'در انتظار' | 'تاییدشده' | 'لغوشده'>('تاییدشده');
  const [selectedDay, setSelectedDay] = useState('سه‌شنبه ۲۸ آبان');
  const [selectedTime, setSelectedTime] = useState('۱۰:۳۰');
  const [crmVip, setCrmVip] = useState(true);
  const [broadcastTag, setBroadcastTag] = useState<'همه مخاطبان' | 'VIP' | 'خریدار قبلی'>('VIP');
  const [csatScore, setCsatScore] = useState(2);

  const activeConfig = TABS.find((t) => t.id === activeTab) || TABS[0];

  const shopItems = [
    { name: 'ست مراقبت پوستی ۴ تکه', cat: 'آرایشی و بهداشتی', price: 1450000, stock: 12 },
    { name: 'سرم ویتامین سی ۳۰ میل', cat: 'مراقبت پوست', price: 680000, stock: 5 },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Controls */}
      <div
        role="tablist"
        aria-label="قابلیت‌های کلیدی باتروم"
        className="flex flex-wrap gap-2 border-b border-slate-200 pb-4"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'border-emerald-700 bg-emerald-700 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content & Interactive Mockup */}
      <div className="grid grid-cols-1 items-stretch gap-6 rounded-xl border border-slate-200 bg-white p-5 sm:p-8 lg:grid-cols-12">
        <div className="flex flex-col justify-between space-y-6 lg:col-span-6">
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {activeConfig.title}
            </h3>
            <p className="text-sm sm:text-base leading-7 text-slate-600">
              {activeConfig.description}
            </p>
            <ul className="space-y-2.5 pt-1 text-sm text-slate-700">
              {activeConfig.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-emerald-700"
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <Link
              href={activeConfig.href}
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-900"
            >
              <span>{activeConfig.linkLabel}</span>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Interactive Feature Mockup Card */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-5 lg:col-span-6">
          {activeTab === 'flow' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>تاریخچه نسخه‌های جریان گفتگو</span>
                <span className="tabular-nums">۱۱ گره پشتیبانی‌شده</span>
              </div>
              <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white text-xs">
                {[
                  { ver: 'نسخه ۴ (منتشرشده)', date: 'امروز · ۱۴:۲۰', active: true },
                  { ver: 'نسخه ۳ (تست شبیه‌ساز)', date: 'دیروز · ۱۸:۰۵', active: false },
                  { ver: 'نسخه ۲ (ساختار اولیه)', date: '۲۰ آبان · ۱۱:۱۰', active: false },
                ].map((item) => (
                  <div
                    key={item.ver}
                    className="flex items-center justify-between px-3.5 py-3"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{item.ver}</p>
                      <p className="text-slate-500 tabular-nums">{item.date}</p>
                    </div>
                    <span
                      className={`text-xs font-medium ${
                        item.active ? 'text-emerald-800' : 'text-slate-600'
                      }`}
                    >
                      {item.active ? 'نسخه فعال روی بله' : 'آماده بازگشت'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600">
                اعتبارسنجی پیش از انتشار: تمام مسیرها به گره پایانی متصل هستند و خطای ساختاری وجود ندارد.
              </div>
            </div>
          )}

          {activeTab === 'shop' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>کاتالوگ درون‌بله</span>
                <span className="inline-flex items-center gap-1 text-emerald-800 font-medium">
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  خروجی CSV سفارش‌ها
                </span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{shopItems[shopIndex].cat}</span>
                  <span className="tabular-nums">
                    موجودی: {toPersianDigits(shopItems[shopIndex].stock)} عدد
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-bold text-slate-900">
                  {shopItems[shopIndex].name}
                </p>
                <p className="mt-1 text-sm font-semibold text-emerald-800 tabular-nums">
                  {formatToman(shopItems[shopIndex].price)} تومان
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShopIndex((i) => (i === 0 ? 1 : 0))}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                    قبلی
                  </button>
                  <button
                    type="button"
                    onClick={() => setShopIndex((i) => (i === 0 ? 1 : 0))}
                    className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    بعدی
                    <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-3">
                <p className="text-xs font-semibold text-slate-800">
                  تغییر وضعیت سفارش #۱۰۴۲:
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {(['در انتظار', 'تاییدشده', 'لغوشده'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setSelectedOrderStatus(status)}
                      className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
                        selectedOrderStatus === status
                          ? 'border-emerald-700 bg-emerald-700 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'booking' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>تقویم شمسی ۳۰ روزه کلینیک</span>
                <span>برنامه شنبه تا جمعه</span>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'سه‌شنبه ۲۸ آبان',
                    'چهارشنبه ۲۹ آبان',
                    'پنجشنبه ۳۰ آبان',
                    'جمعه ۱ آذر (تعطیل)',
                  ].map((day) => {
                    const isHoliday = day.includes('تعطیل');
                    return (
                      <button
                        key={day}
                        type="button"
                        disabled={isHoliday}
                        onClick={() => setSelectedDay(day)}
                        className={`rounded-md border px-2.5 py-2 text-xs font-medium tabular-nums transition-colors ${
                          isHoliday
                            ? 'cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400'
                            : selectedDay === day
                              ? 'border-emerald-700 bg-emerald-700 text-white'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {['۰۹:۳۰', '۱۰:۳۰', '۱۴:۰۰'].map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-md border px-3 py-1.5 text-xs tabular-nums ${
                        selectedTime === time
                          ? 'border-emerald-700 bg-emerald-50 font-semibold text-emerald-800'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {time} (ظرفیت: ۲ نفر)
                    </button>
                  ))}
                </div>

                <p className="text-xs text-emerald-800 font-medium tabular-nums">
                  نوبت انتخابی: {selectedDay} ساعت {selectedTime} — یادآور خودکار ۲۴ ساعت قبل فعال است.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'crm' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>پرونده خودکار کاربر در CRM</span>
                <span className="tabular-nums">موبایل تاییدشده با بله</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-900">سارا محمدی</p>
                    <p className="text-slate-500 tabular-nums">۰۹۱۲۴۸۰۲۹۱۰ · تهران</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCrmVip((v) => !v)}
                    className={`rounded-md border px-2.5 py-1 font-medium transition-colors ${
                      crmVip
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    برچسب VIP: {crmVip ? 'فعال' : 'حذف‌شده'}
                  </button>
                </div>
                <div className="border-t border-slate-200 pt-2.5 text-slate-600 space-y-1">
                  <p>برچسب‌ها: خریدار قبلی {crmVip ? '· VIP' : ''}</p>
                  <p className="tabular-nums">فرم‌های ثبت‌شده: ۲ فرم تاییدشده</p>
                  <p>
                    مسیر گفتگو: {crmVip ? 'هدایت خودکار به پشتیبانی اولویت‌دار VIP' : 'مسیر استاندارد کاربران'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'broadcast' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>سازنده کمپین پیام گروهی</span>
                <span>فوری یا زمانبندی‌شده</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3 text-xs">
                <p className="font-semibold text-slate-900">فیلتر مخاطبان هدف:</p>
                <div className="flex flex-wrap gap-1.5">
                  {(['همه مخاطبان', 'VIP', 'خریدار قبلی'] as const).map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setBroadcastTag(tag)}
                      className={`rounded-md border px-2.5 py-1 font-medium transition-colors ${
                        broadcastTag === tag
                          ? 'border-emerald-700 bg-emerald-700 text-white'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-slate-700 tabular-nums">
                  <p className="font-medium text-slate-900">
                    گیرندگان واجد شرایط ({broadcastTag}):{' '}
                    {broadcastTag === 'همه مخاطبان'
                      ? '۲,۴۸۰'
                      : broadcastTag === 'VIP'
                        ? '۳۹۰'
                        : '۹۴۰'}{' '}
                    کاربر بله
                  </p>
                  <p className="mt-1 text-slate-500">
                    نوع محتوا: تصویر + متن · ارسال با کنترل نرخ و گزارش تحویل
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'survey' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>تست منطق نظرسنجی CSAT</span>
                <span className="tabular-nums">میانگین کل بازو: ۴.۶ از ۵</span>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3 text-xs">
                <p className="font-semibold text-slate-900">
                  امتیاز مشتری را انتخاب کنید تا مسیر شرطی را ببینید:
                </p>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCsatScore(num)}
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-md border font-semibold tabular-nums transition-colors ${
                        csatScore === num
                          ? 'border-emerald-700 bg-emerald-700 text-white'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {toPersianDigits(num)}
                    </button>
                  ))}
                </div>
                <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-slate-800">
                  {csatScore <= 3 ? (
                    <p>
                      نتیجه امتیاز {toPersianDigits(csatScore)}: کاربر ناراضی تشخیص داده شد و خودکار به{' '}
                      <strong className="text-slate-900">مسیر پیگیری مدیر</strong>{' '}
                      هدایت می‌شود.
                    </p>
                  ) : (
                    <p>
                      نتیجه امتیاز {toPersianDigits(csatScore)}: رضایت بالا ثبت شد و پیام تشکر به همراه برچسب مشتری راضی اعمال می‌گردد.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
