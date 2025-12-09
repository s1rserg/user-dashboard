import { createInstance } from 'i18next';
import i18nConfig from '@/i18nConfig';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  fr: () => import('@/dictionaries/fr.json').then((module) => module.default),
};

export async function getTranslation(locale: string) {
  const i18nInstance = createInstance();

  const validLocale = i18nConfig.locales.includes(locale) ? locale : i18nConfig.defaultLocale;

  const resources = await dictionaries[validLocale as keyof typeof dictionaries]();

  await i18nInstance.init({
    lng: validLocale,
    resources: {
      [validLocale]: {
        translation: resources,
      },
    },
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false,
    },
  });

  return { t: i18nInstance.t, i18n: i18nInstance };
}
