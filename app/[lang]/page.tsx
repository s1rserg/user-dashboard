import { getUsers } from '@/lib/api';

interface Props {
  params: Promise<{ lang: string }>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Home({ params }: Props) {
  const users = await getUsers();
  return (
    <main className="p-6">
      {users.map((u) => (
        <div key={u.id}>{u.name}</div>
      ))}
    </main>
  );
}
