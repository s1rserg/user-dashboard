import { getUsers } from '@/lib/api';
import { SearchInput } from '@/components/shared';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: Props) {
  const users = await getUsers();
  const resolvedParams = await searchParams;
  const query = (resolvedParams?.query as string) || '';

  const filteredUsers = users.filter((u) => {
    return u.name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <main className="p-6">
      <div className="mb-4 w-full md:w-1/3">
        <SearchInput placeholder="Search users..." />
      </div>
      <ul>
        {filteredUsers.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </main>
  );
}
