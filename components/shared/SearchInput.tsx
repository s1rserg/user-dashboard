'use client';

import { Search } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks';
import { FC, useEffect, useState } from 'react';

interface Props {
  placeholder: string;
}

export const SearchInput: FC<Props> = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [text, setText] = useState(searchParams.get('query')?.toString() || '');
  const query = useDebounce(text, 300);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    const currentQuery = searchParams.get('query') || '';
    if (currentQuery === query) return;

    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [query, pathname, replace, searchParams]);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        {placeholder}
      </label>
      <input
        id="search"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
        placeholder={placeholder}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <Search className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 transition-colors" />
    </div>
  );
};
