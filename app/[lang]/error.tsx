'use client';

import { useEffect } from 'react';
import { useCurrentLocale } from 'next-i18n-router/client';
import i18nConfig from '@/i18nConfig';

const ERROR_LABELS = {
  en: {
    title: 'Something went wrong!',
    defaultMessage: 'An unexpected error occurred.',
    retryButton: 'Try again',
    details: 'Error details:',
  },
  fr: {
    title: 'Une erreur s’est produite!',
    defaultMessage: 'Une erreur inattendue s’est produite.',
    retryButton: 'Réessayer',
    details: 'Détails de l’erreur:',
  },
};

type LocaleKey = keyof typeof ERROR_LABELS;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const currentLocale = useCurrentLocale(i18nConfig);

  const locale =
    currentLocale && ERROR_LABELS[currentLocale as LocaleKey]
      ? (currentLocale as LocaleKey)
      : (i18nConfig.defaultLocale as LocaleKey);

  const t = ERROR_LABELS[locale];

  useEffect(() => {
    console.error('Next.js Error Boundary caught an error:', error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-gray-50 p-4 text-center dark:bg-gray-900">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-red-600 dark:text-red-500">
          {t.title}
        </h2>

        <p className="text-gray-500 dark:text-gray-400">{error.message || t.defaultMessage}</p>

        {error.digest && (
          <p className="text-xs text-gray-400 font-mono mt-2">Digest: {error.digest}</p>
        )}
      </div>

      <button
        onClick={() => reset()}
        className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
      >
        {t.retryButton}
      </button>
    </div>
  );
}
