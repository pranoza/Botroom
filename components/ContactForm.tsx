'use client';

import { useState, type FormEvent } from 'react';
import { Check, Send } from 'lucide-react';

export function ContactForm() {
  const [fullName, setFullName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [topic, setTopic] = useState('مشاوره پلن سازمانی (تا ۱۰ بازو)');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (fullName.trim().length < 2) {
      setError('لطفاً نام و نام خانوادگی خود را وارد کنید.');
      return;
    }

    const contactVal = phoneOrEmail.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactVal);
    const isIranMobile = /^(09\d{9}|9\d{9})$/.test(contactVal.replace(/\s+/g, ''));
    if (!isEmail && !isIranMobile) {
      setError('لطفاً شماره موبایل معتبر (مانند 09123456789) یا ایمیل صحیح وارد کنید.');
      return;
    }

    if (message.trim().length < 10) {
      setError('لطفاً توضیح کوتاهی درباره نیاز بازوی بله خود بنویسید (حداقل ۱۰ کاراکتر).');
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 space-y-3">
        <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
          <Check className="h-5 w-5 text-emerald-700" aria-hidden="true" />
          <span>درخواست شما با موفقیت ثبت شد</span>
        </div>
        <p className="text-sm leading-7 text-emerald-900/90">
          {fullName} عزیز، پیام شما با موضوع «{topic}» ثبت گردید. کارشناسان باتروم از طریق {phoneOrEmail} با شما تماس خواهند گرفت.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFullName('');
            setPhoneOrEmail('');
            setOrganization('');
            setMessage('');
          }}
          className="rounded-lg border border-emerald-700 bg-white px-4 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
        >
          ارسال پیام جدید
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-xl border border-slate-200 bg-white p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="block text-xs font-semibold text-slate-800">
            نام و نام خانوادگی
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="مثلاً علی رضایی"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="phoneOrEmail" className="block text-xs font-semibold text-slate-800">
            شماره موبایل یا ایمیل
          </label>
          <input
            id="phoneOrEmail"
            type="text"
            dir="ltr"
            value={phoneOrEmail}
            onChange={(e) => setPhoneOrEmail(e.target.value)}
            placeholder="09123456789 / name@company.ir"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 text-left focus:border-emerald-700 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="organization" className="block text-xs font-semibold text-slate-800">
            نام مجموعه یا فروشگاه (اختیاری)
          </label>
          <input
            id="organization"
            type="text"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="کلینیک / فروشگاه شما"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="topic" className="block text-xs font-semibold text-slate-800">
            موضوع درخواست
          </label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
          >
            <option value="مشاوره پلن سازمانی (تا ۱۰ بازو)">
              مشاوره پلن سازمانی (تا ۱۰ بازو)
            </option>
            <option value="راه‌اندازی فروشگاه و کاتالوگ بله">
              راه‌اندازی فروشگاه و کاتالوگ بله
            </option>
            <option value="راه‌اندازی نوبت‌دهی شمسی کلینیک">
              راه‌اندازی نوبت‌دهی شمسی کلینیک
            </option>
            <option value="پشتیبانی فنی و سوالات عمومی">
              پشتیبانی فنی و سوالات عمومی
            </option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-semibold text-slate-800">
          توضیحات نیاز شما
        </label>
        <textarea
          id="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="تعداد بازوهای مورد نیاز، حجم تقریبی مخاطبان در بله یا سناریوی مورد نظرتان را بنویسید..."
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-700 focus:bg-white focus:outline-none"
        />
      </div>

      {error && (
        <p role="alert" className="text-xs font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-800"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        <span>ارسال درخواست مشاوره</span>
      </button>
    </form>
  );
}
