'use client';

import { useState } from 'react';
import {
  Zap,
  ShoppingBag,
  Calendar,
  Star,
  Phone,
  UserCheck,
  RotateCcw,
  ChevronLeft,
  Check,
  Layers,
  Tag,
} from 'lucide-react';
import { formatToman, toPersianDigits } from '@/lib/site';

type ScenarioId = 'shop' | 'booking' | 'survey';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  productCard?: {
    title: string;
    category: string;
    price: number;
    stock: number;
  };
}

const SCENARIO_TABS: { id: ScenarioId; label: string }[] = [
  { id: 'shop', label: 'فروشگاه و کاتالوگ' },
  { id: 'booking', label: 'نوبت‌دهی شمسی' },
  { id: 'survey', label: 'نظرسنجی CSAT' },
];

const SHOP_PRODUCTS = [
  {
    title: 'قهوه‌ساز اسپرسو مدل خانگی',
    category: 'لوازم آشپزخانه',
    price: 4850000,
    stock: 7,
  },
  {
    title: 'آسیاب قهوه دستی استیل',
    category: 'لوازم جانبی',
    price: 1290000,
    stock: 14,
  },
];

export function HeroInteractiveMockup() {
  const [scenario, setScenario] = useState<ScenarioId>('shop');
  const [isVip, setIsVip] = useState(false);
  // step 0 = Start (/start), step 1 = Node 2 (Catalog/Booking/CSAT), step 2 = Node 3 (Phone), step 3 = Node 4 (CRM & Done)
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [productIdx, setProductIdx] = useState(0);
  const [bookedLabel, setBookedLabel] = useState('فردا ساعت ۱۰:۰۰');
  const [csatScore, setCsatScore] = useState<number | null>(null);
  const [crmTags, setCrmTags] = useState<string[]>([]);
  const [sessionSummary, setSessionSummary] = useState('شروع گفتگو (/start)');

  const switchScenario = (next: ScenarioId) => {
    setScenario(next);
    setStep(0);
    setProductIdx(0);
    setCsatScore(null);
    setCrmTags([]);
    setSessionSummary('شروع گفتگو (/start)');
  };

  const resetSimulation = () => {
    setStep(0);
    setProductIdx(0);
    setCsatScore(null);
    setCrmTags([]);
    setSessionSummary('شروع گفتگو (/start)');
  };

  const toggleVip = () => {
    setIsVip((prev) => !prev);
  };

  // Build realistic conversation bubbles based on current scenario & step
  const buildMessages = (): ChatMessage[] => {
    const messages: ChatMessage[] = [
      { id: 'u-start', sender: 'user', text: '/start' },
    ];

    if (scenario === 'shop') {
      messages.push({
        id: 'b-welcome',
        sender: 'bot',
        text: isVip
          ? 'سلام مشتری گرامی VIP، خوش آمدید. دسترسی سریع به کاتالوگ فروشگاه برای شما آماده است:'
          : 'سلام! به فروشگاه بله خوش آمدید. برای مشاهده محصولات یا پیگیری سفارش گزینه‌ای را انتخاب کنید:',
      });

      if (step >= 1) {
        messages.push({
          id: 'u-cat',
          sender: 'user',
          text: 'مشاهده کاتالوگ',
        });
        const prod = SHOP_PRODUCTS[productIdx];
        messages.push({
          id: 'b-cat',
          sender: 'bot',
          text: `کالای ${toPersianDigits(productIdx + 1)} از ${toPersianDigits(SHOP_PRODUCTS.length)} در مرورگر کاتالوگ:`,
          productCard: prod,
        });
      }

      if (step >= 2) {
        messages.push({
          id: 'u-add',
          sender: 'user',
          text: `افزودن ${SHOP_PRODUCTS[productIdx].title} به سبد خرید`,
        });
        messages.push({
          id: 'b-phone',
          sender: 'bot',
          text: 'کالا به سبد خرید اضافه شد. برای ثبت نهایی سفارش و ذخیره در CRM، شماره موبایل تاییدشده خود را ارسال کنید:',
        });
      }

      if (step >= 3) {
        messages.push({
          id: 'u-phone',
          sender: 'user',
          text: '۰۹۱۲۳۴۵۶۷۸۹',
        });
        messages.push({
          id: 'b-done',
          sender: 'bot',
          text: `سفارش شما با کد #۱۰۴۸ ثبت شد و برچسب «خریدار» در پروفایل CRM ذخیره گردید.${
            isVip ? ' ارسال با اولویت VIP انجام می‌شود.' : ''
          }`,
        });
      }
    }

    if (scenario === 'booking') {
      messages.push({
        id: 'b-welcome',
        sender: 'bot',
        text: isVip
          ? 'سلام مشتری گرامی VIP، برای رزرو نوبت با تقویم شمسی کلینیک یکی از زمان‌های آزاد را انتخاب کنید:'
          : 'سلام! به سامانه نوبت‌دهی شمسی خوش آمدید. ساعت‌های آزاد پیش‌رو در پیام‌رسان بله:',
      });

      if (step >= 1) {
        messages.push({
          id: 'u-slot',
          sender: 'user',
          text: `رزرو نوبت ${bookedLabel}`,
        });
        messages.push({
          id: 'b-slot',
          sender: 'bot',
          text: `بازه «${bookedLabel}» (ظرفیت بدون تداخل) برای شما انتخاب شد. لطفاً با دکمه زیر شماره تماس خود را تایید کنید:`,
        });
      }

      if (step >= 2) {
        messages.push({
          id: 'u-phone',
          sender: 'user',
          text: '۰۹۱۲۳۴۵۶۷۸۹',
        });
        messages.push({
          id: 'b-done',
          sender: 'bot',
          text: `نوبت شما برای «${bookedLabel}» قطعی شد، برچسب «نوبت رزروشده» در CRM ثبت گردید و یادآور خودکار پیش از موعد ارسال می‌شود.`,
        });
      }
    }

    if (scenario === 'survey') {
      messages.push({
        id: 'b-welcome',
        sender: 'bot',
        text: isVip
          ? 'سلام مشتری گرامی VIP، از همراهی شما سپاسگزاریم. میزان رضایت خود از خدمات امروز را از ۱ تا ۵ ستاره انتخاب کنید:'
          : 'سلام! نظر شما برای ما ارزشمند است. به تجربه خرید یا دریافت خدمات خود چند ستاره می‌دهید؟',
      });

      if (step >= 1 && csatScore !== null) {
        messages.push({
          id: 'u-score',
          sender: 'user',
          text: `امتیاز ${toPersianDigits(csatScore)} از ۵ ستاره`,
        });
        messages.push({
          id: 'b-score',
          sender: 'bot',
          text:
            csatScore <= 3
              ? 'از اینکه تجربه کاملی نداشتید متاسفیم. برای پیگیری مستقیم توسط مدیر مجموعه، لطفاً شماره تماس خود را تایید کنید:'
              : 'از امتیاز عالی شما متشکریم! برای ثبت نظر در پرونده باشگاه مشتریان، شماره موبایل خود را تایید کنید:',
        });
      }

      if (step >= 2) {
        messages.push({
          id: 'u-phone',
          sender: 'user',
          text: '۰۹۱۲۳۴۵۶۷۸۹',
        });
        messages.push({
          id: 'b-done',
          sender: 'bot',
          text:
            csatScore !== null && csatScore <= 3
              ? 'شماره شما ثبت شد و درخواست با برچسب «نیاز به پیگیری مدیر» در CRM به کارتابل مدیریت ارجاع گردید.'
              : 'اطلاعات شما در CRM با برچسب «مشتری راضی» ثبت شد و امتیاز در میانگین رضایت (CSAT) منظور گردید.',
        });
      }
    }

    return messages;
  };

  const messages = buildMessages();

  // Map active step to one of the 4 visual canvas nodes (0..3)
  const activeNodeIndex =
    scenario === 'shop'
      ? step
      : step === 0
        ? 0
        : step === 1
          ? 2
          : 3;

  // Displayed CRM tags in bottom bar
  const displayTags = [
    ...(isVip ? ['VIP'] : []),
    ...crmTags,
  ];

  const node2Config =
    scenario === 'shop'
      ? {
          icon: ShoppingBag,
          title: 'مرورگر کاتالوگ محصولات',
          subtitle: 'نمایش ورق‌زدنی عکس، قیمت تومانی و سبد خرید',
        }
      : scenario === 'booking'
        ? {
            icon: Calendar,
            title: 'تقویم نوبت‌دهی شمسی',
            subtitle: 'نمایش ۳۰ روز آینده، ظرفیت و ساعت‌های آزاد',
          }
        : {
            icon: Star,
            title: 'نظرسنجی ۱ تا ۵ ستاره',
            subtitle: 'امتیازدهی CSAT و تشخیص خودکار نارضایتی',
          };

  const Node2Icon = node2Config.icon;

  return (
    <div
      id="hero-simulator"
      className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
    >
      {/* 1. Top Bar of Preview Window */}
      <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        {/* Right side (RTL start): Title & status */}
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-sm font-bold text-slate-900">
            طراح جریان گفتگو · فروشگاه و نوبت‌دهی
          </h2>
          <span className="text-xs text-slate-300" aria-hidden="true">
            |
          </span>
          <span className="text-xs font-medium text-emerald-800 tabular-nums">
            ۶ گره متصل · آماده انتشار
          </span>
        </div>

        {/* Left side (RTL end): Scenario Switcher Tabs */}
        <div
          role="tablist"
          aria-label="انتخاب سناریوی پیش‌نمایش"
          className="inline-flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1"
        >
          {SCENARIO_TABS.map((tab) => {
            const active = scenario === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => switchScenario(tab.id)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-emerald-700 text-white'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Interactive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* 2. Main Column: Visual Flow Canvas with subtle dot grid */}
        <div
          className="border-b border-slate-200 bg-slate-50 p-5 sm:p-7 lg:col-span-7 lg:border-b-0 lg:border-l"
          style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        >
          <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
            <span>بوم بصری جریان گفتگو (بدون نیاز به کدنویسی)</span>
            <span>برای مشاهده جزئیات روی هر گره کلیک کنید</span>
          </div>

          {/* 4 Connected Node Cards with SVG Bezier Curves */}
          <div className="mx-auto max-w-xl">
            {/* Node 1 */}
            <button
              type="button"
              onClick={() => {
                setStep(0);
                setSessionSummary('شروع گفتگو (/start)');
              }}
              className={`w-full rounded-xl border bg-white p-4 text-right transition-all ${
                activeNodeIndex === 0
                  ? 'border-emerald-700 ring-1 ring-emerald-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 border border-amber-200/70">
                    <Zap className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      شروع گفتگو (/start)
                    </p>
                    <p className="text-xs text-slate-500">
                      ورود کاربر در پیام‌رسان بله و بررسی وضعیت VIP
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-400 tabular-nums">
                  گره ۱
                </span>
              </div>
            </button>

            {/* SVG Bezier Connector 1 -> 2 */}
            <div className="flex justify-center" aria-hidden="true">
              <svg
                width="120"
                height="28"
                viewBox="0 0 120 28"
                fill="none"
                className="overflow-visible"
              >
                <path
                  d="M60 0 C60 12, 60 16, 60 28"
                  stroke={activeNodeIndex >= 1 ? '#047857' : '#cbd5e1'}
                  strokeWidth="2"
                  strokeDasharray={activeNodeIndex >= 1 ? '0' : '4 3'}
                />
                <circle
                  cx="60"
                  cy="25"
                  r="3"
                  fill={activeNodeIndex >= 1 ? '#047857' : '#94a3b8'}
                />
              </svg>
            </div>

            {/* Node 2 */}
            <button
              type="button"
              onClick={() => {
                if (scenario === 'shop') {
                  setStep(1);
                  setSessionSummary('مرور کاتالوگ محصولات');
                } else if (scenario === 'booking') {
                  setStep(1);
                  setSessionSummary(`انتخاب نوبت ${bookedLabel}`);
                } else {
                  setCsatScore(5);
                  setStep(1);
                  setSessionSummary('ثبت امتیاز نظرسنجی');
                }
              }}
              className={`w-full rounded-xl border bg-white p-4 text-right transition-all ${
                activeNodeIndex === 1
                  ? 'border-emerald-700 ring-1 ring-emerald-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                    <Node2Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {node2Config.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {node2Config.subtitle}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-400 tabular-nums">
                  گره ۲
                </span>
              </div>
            </button>

            {/* SVG Bezier Connector 2 -> 3 */}
            <div className="flex justify-center" aria-hidden="true">
              <svg
                width="160"
                height="30"
                viewBox="0 0 160 30"
                fill="none"
                className="overflow-visible"
              >
                <path
                  d="M80 0 C80 14, 48 16, 48 30"
                  stroke={activeNodeIndex >= 2 ? '#047857' : '#cbd5e1'}
                  strokeWidth="2"
                  strokeDasharray={activeNodeIndex >= 2 ? '0' : '4 3'}
                />
                <path
                  d="M80 0 C80 14, 112 16, 112 30"
                  stroke="#e2e8f0"
                  strokeWidth="1.5"
                />
                <circle
                  cx="48"
                  cy="27"
                  r="3"
                  fill={activeNodeIndex >= 2 ? '#047857' : '#94a3b8'}
                />
              </svg>
            </div>

            {/* Node 3 */}
            <button
              type="button"
              onClick={() => {
                if (scenario === 'shop') {
                  setStep(2);
                  setSessionSummary('درخواست تایید شماره موبایل');
                } else if (scenario === 'booking') {
                  setStep(1);
                  setSessionSummary('درخواست تایید شماره موبایل');
                } else {
                  setCsatScore((s) => s ?? 5);
                  setStep(1);
                  setSessionSummary('درخواست تایید شماره موبایل');
                }
              }}
              className={`w-full rounded-xl border bg-white p-4 text-right transition-all ${
                activeNodeIndex === 2
                  ? 'border-emerald-700 ring-1 ring-emerald-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-slate-900">
                        دریافت شماره موبایل
                      </p>
                      <span className="text-[11px] font-medium text-emerald-800">
                        · تایید شماره بله
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      ارسال ایمن شماره تاییدشده کاربر با یک لمس
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-400 tabular-nums">
                  گره ۳
                </span>
              </div>
            </button>

            {/* SVG Bezier Connector 3 -> 4 */}
            <div className="flex justify-center" aria-hidden="true">
              <svg
                width="120"
                height="28"
                viewBox="0 0 120 28"
                fill="none"
                className="overflow-visible"
              >
                <path
                  d="M60 0 C60 12, 60 16, 60 28"
                  stroke={activeNodeIndex >= 3 ? '#047857' : '#cbd5e1'}
                  strokeWidth="2"
                  strokeDasharray={activeNodeIndex >= 3 ? '0' : '4 3'}
                />
                <circle
                  cx="60"
                  cy="25"
                  r="3"
                  fill={activeNodeIndex >= 3 ? '#047857' : '#94a3b8'}
                />
              </svg>
            </div>

            {/* Node 4 */}
            <button
              type="button"
              onClick={() => {
                if (scenario === 'shop') {
                  setStep(3);
                  setCrmTags(['خریدار']);
                  setSessionSummary('سفارش #۱۰۴۸ ثبت شد');
                } else if (scenario === 'booking') {
                  setStep(2);
                  setCrmTags(['نوبت رزروشده']);
                  setSessionSummary(`نوبت قطعی: ${bookedLabel}`);
                } else {
                  const score = csatScore ?? 5;
                  setCsatScore(score);
                  setStep(2);
                  setCrmTags([
                    score <= 3 ? 'نیاز به پیگیری مدیر' : 'مشتری راضی',
                  ]);
                  setSessionSummary('نظرسنجی و شماره تماس در CRM ثبت شد');
                }
              }}
              className={`w-full rounded-xl border bg-white p-4 text-right transition-all ${
                activeNodeIndex === 3
                  ? 'border-emerald-700 ring-1 ring-emerald-700'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                    <UserCheck className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      برچسب‌گذاری در CRM و ثبت نهایی
                    </p>
                    <p className="text-xs text-slate-500">
                      {scenario === 'shop'
                        ? 'ثبت سفارش در پنل و افزودن برچسب «خریدار»'
                        : scenario === 'booking'
                          ? 'ثبت قطعی نوبت شمسی و برچسب «نوبت رزروشده»'
                          : 'ذخیره امتیاز CSAT و ارجاع خودکار در صورت نارضایتی'}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-400 tabular-nums">
                  گره ۴
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* 3. Side Column: Live Bale Messenger Simulator */}
        <div className="flex flex-col justify-between bg-white lg:col-span-5">
          {/* Simulator Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-3">
            <span className="text-sm font-bold text-slate-900">
              شبیه‌ساز چت بله
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleVip}
                aria-pressed={isVip}
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isVip
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-800'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <UserCheck className="h-3.5 w-3.5" aria-hidden="true" />
                <span>شبیه‌سازی مشتری VIP</span>
              </button>

              <button
                type="button"
                onClick={resetSimulation}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>شروع مجدد</span>
              </button>
            </div>
          </div>

          {/* Chat Body with Persian Bubbles & Interactive Inline Keyboards */}
          <div className="flex-1 space-y-3 bg-slate-50/50 p-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-start' : 'items-end'
                }`}
              >
                <div
                  className={`max-w-[90%] rounded-xl px-3.5 py-2.5 text-xs leading-6 ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white'
                      : 'border border-slate-200 bg-white text-slate-800'
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.productCard && (
                    <div className="mt-2.5 rounded-lg border border-slate-200 bg-slate-50 p-2.5 space-y-1">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>{msg.productCard.category}</span>
                        <span className="tabular-nums">
                          موجودی: {toPersianDigits(msg.productCard.stock)}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900">
                        {msg.productCard.title}
                      </p>
                      <p className="text-xs font-semibold text-emerald-800 tabular-nums">
                        {formatToman(msg.productCard.price)} تومان
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Interactive Inline Keyboard Buttons below the latest bot message */}
            <div className="pt-1 space-y-1.5">
              {scenario === 'shop' && step === 0 && (
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setSessionSummary('مرور کاتالوگ محصولات');
                    }}
                    className="flex items-center justify-between rounded-lg border border-emerald-700/30 bg-white px-3.5 py-2 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
                  >
                    <span>مشاهده کاتالوگ</span>
                    <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}

              {scenario === 'shop' && step === 1 && (
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      setProductIdx((i) => (i === 0 ? 1 : 0))
                    }
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    ورق‌زدن محصول بعدی
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStep(2);
                      setSessionSummary('سبد خرید تایید شد · انتظار شماره');
                    }}
                    className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
                  >
                    افزودن و ادامه
                  </button>
                </div>
              )}

              {scenario === 'shop' && step === 2 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep(3);
                    setCrmTags(['خریدار']);
                    setSessionSummary('سفارش #۱۰۴۸ ثبت شد');
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-3.5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-800"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>ارسال شماره موبایل من</span>
                </button>
              )}

              {scenario === 'booking' && step === 0 && (
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setBookedLabel('فردا ساعت ۱۰:۰۰');
                      setStep(1);
                      setSessionSummary('انتخاب نوبت فردا ساعت ۱۰:۰۰');
                    }}
                    className="flex items-center justify-between rounded-lg border border-emerald-700/30 bg-white px-3.5 py-2 text-xs font-semibold text-emerald-800 transition-colors hover:bg-emerald-50 tabular-nums"
                  >
                    <span>رزرو نوبت فردا ساعت ۱۰:۰۰</span>
                    <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setBookedLabel('سه‌شنبه ۲۸ آبان ساعت ۱۵:۳۰');
                      setStep(1);
                      setSessionSummary('انتخاب نوبت سه‌شنبه ۲۸ آبان');
                    }}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 tabular-nums"
                  >
                    <span>رزرو نوبت سه‌شنبه ۲۸ آبان ساعت ۱۵:۳۰</span>
                    <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}

              {scenario === 'booking' && step === 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep(2);
                    setCrmTags(['نوبت رزروشده']);
                    setSessionSummary(`نوبت قطعی: ${bookedLabel}`);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-3.5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-800"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>ارسال شماره موبایل من</span>
                </button>
              )}

              {scenario === 'survey' && step === 0 && (
                <div className="grid grid-cols-1 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setCsatScore(5);
                      setStep(1);
                      setSessionSummary('امتیاز ۵ ستاره ثبت شد');
                    }}
                    className="flex items-center justify-between rounded-lg border border-emerald-700/30 bg-white px-3.5 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 tabular-nums"
                  >
                    <span>۵ ستاره (کاملاً راضی)</span>
                    <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCsatScore(2);
                      setStep(1);
                      setSessionSummary('امتیاز پایین (۲ ستاره) · ارجاع به مدیر');
                    }}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 tabular-nums"
                  >
                    <span>۲ ستاره (نیاز به پیگیری)</span>
                    <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}

              {scenario === 'survey' && step === 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setStep(2);
                    setCrmTags([
                      csatScore !== null && csatScore <= 3
                        ? 'نیاز به پیگیری مدیر'
                        : 'مشتری راضی',
                    ]);
                    setSessionSummary('نظرسنجی و شماره تماس در CRM ثبت شد');
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-700 px-3.5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-emerald-800"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>ارسال شماره موبایل من</span>
                </button>
              )}

              {((scenario === 'shop' && step === 3) ||
                (scenario === 'booking' && step === 2) ||
                (scenario === 'survey' && step === 2)) && (
                <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-900">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <Check className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                    <span>جریان گفتگو با موفقیت تکمیل شد.</span>
                  </span>
                  <button
                    type="button"
                    onClick={resetSimulation}
                    className="font-semibold text-emerald-800 underline underline-offset-4"
                  >
                    تست دوباره
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Slim Bottom Bar: Session Memory & CRM Tags */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-white px-4 py-2.5 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              <span className="font-semibold text-slate-700">حافظه نشست:</span>
              <span className="tabular-nums">{sessionSummary}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
              <span className="font-semibold text-slate-700">برچسب CRM:</span>
              <span className="font-semibold text-emerald-800">
                {displayTags.length > 0 ? displayTags.join(' · ') : 'بدون برچسب'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
