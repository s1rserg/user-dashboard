import { ITEMS_PER_PAGE } from './constants';
import { SearchInput, Pagination } from '@/components/shared';
import { UserTable } from './components';
import { User } from '@/types';
import { FC } from 'react';

interface Props {
  users: User[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export const Dashboard: FC<Props> = ({ users, searchParams }) => {
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
      <SearchInput placeholder="Search..." />

      {paginatedUsers.length === 0 ? (
        <p className="text-gray-500">Not found {query}</p>
      ) : (
        <UserTable users={paginatedUsers} />
      )}

      <Pagination totalPages={totalPages} />
    </div>
  );
};
