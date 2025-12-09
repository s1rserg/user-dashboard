import { Suspense } from 'react';
import { getUsers } from '@/lib/api';
import { Dashboard } from '@/components/dashboard';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: Props) {
  const resolvedParams = await searchParams;

  const users = await getUsers();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <Suspense fallback="Loading...">
        <Dashboard users={users} searchParams={resolvedParams} />
      </Suspense>
    </main>
  );
}
