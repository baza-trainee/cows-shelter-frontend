import enJSON from '../src/locales/en.json';
import ukJSON from '../src/locales/uk.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: {
      uk: typeof ukJSON;
      en: typeof enJSON;
    };
  }
}
