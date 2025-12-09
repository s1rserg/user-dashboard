'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FC } from 'react';

interface Props {
  totalPages: number;
  labels: {
    previous: string;
    next: string;
    page: string;
    of: string;
  };
}

export const Pagination: FC<Props> = ({ totalPages, labels }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-8 pb-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
        {labels.previous}
      </button>

      <span className="text-sm font-medium">
        {labels.page} {currentPage} {labels.of} {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md shadow-sm transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        {labels.next}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};
