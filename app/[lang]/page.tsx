import { getUsers } from '@/lib/api';
import { SearchInput, Pagination } from '@/components/shared';

const ITEMS_PER_PAGE = 5;

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: Props) {
  const users = await getUsers();
  const resolvedParams = await searchParams;
  const query = (resolvedParams?.query as string) || '';
  const currentPage = Number(resolvedParams?.page) || 1;

  const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()));

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <main className="p-6">
      <div className="mb-4 w-full md:w-1/3">
        <SearchInput placeholder="Search users..." />
      </div>
      <div className="space-y-2">
        {paginatedUsers.map((u) => (
          <div key={u.id} className="p-2 border">
            {u.name}
          </div>
        ))}
      </div>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
