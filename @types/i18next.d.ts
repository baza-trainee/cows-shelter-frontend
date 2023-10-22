import enJSON from '../src/locales/en/en.json';
import ukJSON from '../src/locales/uk/uk.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      uk: typeof ukJSON;
      en: typeof enJSON;
    };
  }
}
