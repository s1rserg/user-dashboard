import { ITEMS_PER_PAGE } from './constants';
import { SearchInput, Pagination } from '@/components/shared';
import { UserTable } from './components';
import { User } from '@/types';
import { FC } from 'react';

interface Props {
  users: User[];
  searchParams: { [key: string]: string | string[] | undefined };
  dict: {
    search: { placeholder: string };
    table: { headers: { name: string; email: string; company: string } };
    pagination: { previous: string; next: string; page: string; of: string };
    home: { notFound: string; title: string };
  };
}

export const Dashboard: FC<Props> = ({ users, searchParams, dict }) => {
  const query = (searchParams?.query as string) || '';
  const currentPage = Number(searchParams?.page) || 1;

  const filteredUsers = users.filter((u) => {
    const lowerQuery = query.toLowerCase();
    return u.name.toLowerCase().includes(lowerQuery) || u.email.toLowerCase().includes(lowerQuery);
  });

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <SearchInput placeholder={dict.search.placeholder} />

      {paginatedUsers.length === 0 ? (
        <p className="text-gray-500">
          {dict.home.notFound} {query}
        </p>
      ) : (
        <UserTable users={paginatedUsers} headers={dict.table.headers} />
      )}

      <Pagination totalPages={totalPages} labels={dict.pagination} />
    </div>
  );
};
