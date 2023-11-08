import icon_privat from '@/assets/icons/icon_privat.svg';
import icon_mono from '@/assets/icons/icon_mono.svg';
import icon_paypal from '@/assets/icons/icon_paypal.svg';
import icon_western_union from '@/assets/icons/icon_western_union.svg';
import icon_swift from '@/assets/icons/icon_swift.svg';

type WayOfHelping = {
  value: string;
  title: string;
  url?: string;
};

export const wayOfHelping: Array<WayOfHelping> = [
  { value: 'one-time', title: 'donate:methods.one_time' },
  { value: 'monthly', title: 'donate:methods.monthly' }
];

export const amountDonate: Array<WayOfHelping> = [
  { value: '50', title: 'donate:amounts.one' },
  { value: '100', title: 'donate:amounts.two' },
  { value: '200', title: 'donate:amounts.three' },
  { value: '', title: '' }
];

export const paySystems: Array<WayOfHelping> = [
  {
    value: 'Privatbank',
    title: 'donate:pay_systems.one',
    url: icon_privat
  },
  { value: 'Monobank', title: 'donate:pay_systems.two', url: icon_mono },
  { value: 'PayPal', title: 'donate:pay_systems.three', url: icon_paypal },
  {
    value: 'Western',
    title: 'donate:pay_systems.four',
    url: icon_western_union
  },
  { value: 'Swift', title: 'donate:pay_systems.fife', url: icon_swift }
];
