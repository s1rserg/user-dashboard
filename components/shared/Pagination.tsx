'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC } from 'react';

interface Props {
  totalPages: number;
}

export const Pagination: FC<Props> = ({ totalPages }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex w-full justify-center gap-2 mt-5">
      <Link
        href={createPageURL(currentPage - 1)}
        className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
      >
        <ChevronLeft className="w-6 h-6" />
      </Link>
      <div className="flex items-center gap-1">
        <span>Page</span>
        <span className="font-bold">{currentPage}</span>
        <span>of</span>
        <span className="font-bold">{totalPages}</span>
      </div>
      <Link
        href={createPageURL(currentPage + 1)}
        className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
      >
        <ChevronRight className="w-6 h-6" />
      </Link>
    </div>
  );
};
