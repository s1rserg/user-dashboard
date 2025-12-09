import { Suspense } from 'react';
import { getUsers } from '@/lib/api';
import { Dashboard } from '@/components/dashboard';
import { Loader } from '@/components/shared';
import { getDictionary } from '@/lib/dictionaries';

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ params, searchParams }: Props) {
  const { lang } = await params;
  const resolvedParams = await searchParams;

  const [dict, users] = await Promise.all([getDictionary(lang), getUsers()]);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{dict.home.title}</h1>

      <Suspense fallback={<Loader />}>
        <Dashboard users={users} searchParams={resolvedParams} dict={dict} />
      </Suspense>
    </main>
  );
}
