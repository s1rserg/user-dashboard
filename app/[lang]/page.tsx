import { Suspense } from 'react';
import { getUsers } from '@/lib/api';
import { Dashboard } from '@/components/dashboard';
import { Loader } from '@/components/shared';
import { getTranslation } from '@/lib/i18n';

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ params, searchParams }: Props) {
  const { lang } = await params;
  const resolvedParams = await searchParams;

  const [{ t, i18n }, users] = await Promise.all([getTranslation(lang), getUsers()]);

  const dict = i18n.getResourceBundle(lang, 'translation');

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">{t('home.title')}</h1>

      <Suspense fallback={<Loader />}>
        <Dashboard users={users} searchParams={resolvedParams} dict={dict} />
      </Suspense>
    </main>
  );
}
