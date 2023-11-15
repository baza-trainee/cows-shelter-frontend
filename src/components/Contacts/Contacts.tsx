import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { setActiveLink } from '@/store/slices/observationSlice';
import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hook';

import icon_privat from '@/assets/icons/icon_privat.svg';
import icon_mono from '@/assets/icons/icon_mono.svg';
import icon_paypal from '@/assets/icons/icon_paypal.svg';
import icon_western_union from '@/assets/icons/icon_western_union.svg';
import icon_swift from '@/assets/icons/icon_swift.svg';
import Map from './Map';

const Contacts = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (inView) {
      dispatch(setActiveLink('#contacts'));
    } else {
      dispatch(setActiveLink(''));
    }
  }, [inView, dispatch]);

  return (
    <section className="container mx-auto max-w-[1440px]">
      <div
        className={`relative h-[240px] w-full bg-[url('/img_cow_contacts.webp')] bg-cover bg-center bg-no-repeat sm:bg-fixed md:h-[240px] lg:h-[460px]`}
      />
      <div
        className="flex flex-row md:gap-6 md:p-12 lg:px-56 lg:py-20"
        id="contacts"
        ref={ref}
      >
        <div className="basis-1/2">
          <h3 className="mb-5 text-2xl font-bold">
            {t('contacts:titles.contacts')}
          </h3>
          <ul className="mb-6 flex flex-col gap-2 text-graphite sm:text-sm md:text-base lg:text-[17px]">
            <li>
              <a href="mailto:zdravejutta@gmail.com">zdravejutta@gmail.com</a>
            </li>
            <li>
              <a href="tel:+380987675765">+380 987 675 765</a>
            </li>
          </ul>
          <h4 className="mb-5 font-bold sm:text-lg md:text-xl lg:text-2xl">
            {t('contacts:titles.working_hours')}
          </h4>
          <ul className="mb-6 flex flex-col gap-2 text-graphite sm:text-sm md:text-base lg:text-[17px]">
            <li>
              <p>{t('contacts:working_days')}</p>
            </li>
            <li>
              <p>10:00 - 20:00</p>
            </li>
          </ul>
          <h4 className="mb-5 font-bold sm:text-lg md:text-xl lg:text-2xl">
            {t('contacts:titles.location')}
          </h4>
          <p className="mb-2 text-graphite sm:text-sm md:text-base lg:text-[17px]">
            {t('contacts:location_main')}
          </p>
          <p className="text-graphite sm:text-sm md:text-base lg:text-[17px]">
            {t('contacts:location_secondary')}
          </p>
        </div>
        <div className="basis-1/2 sm:mb-3">
          <h4 className="mb-5 font-bold sm:text-lg md:text-xl lg:text-2xl">
            {t('contacts:titles.payment')}
          </h4>
          <ul className="text-graphite sm:text-sm md:text-base lg:text-[17px]">
            <li className="mb-3 flex gap-4 border-b border-disabled py-2">
              <img src={icon_privat} alt="privat bank" />
              <p>{t('donate:pay_systems.one')}: 4149 6293 8909 9391</p>
            </li>
            <li className="mb-3 flex gap-4 border-b border-disabled py-2">
              <img src={icon_mono} alt="mono bank" />
              <p>{t('donate:pay_systems.two')}: 4441 1144 6464 4952</p>
            </li>
            <li className="mb-3 flex gap-4 border-b border-disabled py-2">
              <img src={icon_paypal} alt="paypal" />
              <p>PayPal: Irrazdravaja@ukr.net</p>
            </li>
            <li className="mb-3 flex gap-4 border-b border-disabled py-2">
              <img src={icon_western_union} alt="western union" />
              <p>Western Union: {t('contacts:payment_name')}</p>
            </li>
            <li className="mb-3 flex gap-4 border-b border-disabled py-2">
              <img src={icon_swift} alt="swift" />
              <p>Swift /BIC {t('contacts:code')} - PBANUA2X</p>
            </li>
          </ul>
        </div>
      </div>
      <Map />
    </section>
  );
};

export default Contacts;
