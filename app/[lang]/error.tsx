'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Next.js Error Boundary caught an error:', error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-gray-50 p-4 text-center dark:bg-gray-900">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-red-600 dark:text-red-500">Error</h2>

        <p className="text-gray-500 dark:text-gray-400">{error.message}</p>

        {error.digest && (
          <p className="text-xs text-gray-400 font-mono mt-2">Digest: {error.digest}</p>
        )}
      </div>

      <button
        onClick={() => reset()}
        className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
      >
        Retry
      </button>
    </div>
  );
}
