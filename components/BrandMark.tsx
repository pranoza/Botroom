import Image from 'next/image';

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0">
      <Image
        src="/logo.png"
        alt="لوگوی باتروم"
        width={32}
        height={32}
        priority
        referrerPolicy="no-referrer"
        className="h-8 w-8 object-contain shrink-0"
      />
      <span className="text-base font-bold tracking-tight text-slate-900">
        {compact ? 'باتروم' : 'باتروم | BotRoom'}
      </span>
    </span>
  );
}
