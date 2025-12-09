'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const labels: Record<string, { title: string; retry: string }> = {
  en: { title: 'Something went wrong!', retry: 'Try again' },
  fr: { title: "Une erreur s'est produite!", retry: 'Réessayer' },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const lang = pathname.split('/')[1] || 'en';
  const dict = labels[lang] || labels['en'];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
      <h2 className="text-xl font-bold">{dict.title}</h2>

      <button
        onClick={() => reset()}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        {dict.retry}
      </button>
    </div>
  );
}
