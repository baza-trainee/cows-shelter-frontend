import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { setActiveLink } from '@/store/slices/observationSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';

import icon_privat from '@/assets/icons/icon_privat.svg';
import icon_mono from '@/assets/icons/icon_mono.svg';
import icon_paypal from '@/assets/icons/icon_paypal.svg';
import icon_western_union from '@/assets/icons/icon_western_union.svg';
import icon_swift from '@/assets/icons/icon_swift.svg';
import Map from './Map';
import { FaFacebook } from 'react-icons/fa';
import { fetchContacts } from '@/store/slices/contactsSlice';
import Loader from '../admin/Loader';

const Contacts = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector((state) => state.contacts.contacts);
  const isLoading = useAppSelector((state) => state.contacts.loading);

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

  useEffect(() => {
    dispatch(fetchContacts())
      .unwrap()
      .then(() => {
        return [];
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  if (isLoading) return <Loader />;
  return (
    <section>
      <div
        className={`relative h-[240px] w-full bg-[url('/img_cow_contacts.webp')] bg-cover bg-center bg-no-repeat sm:bg-fixed md:h-[240px] lg:h-[460px]`}
      />
      <div
        className="mx-auto flex px-5 py-6 xs:w-[320px] xs:flex-col-reverse sm:w-[480px] sm:py-6 md:w-[768px] md:flex-row md:gap-6 md:p-12 md:px-12 lg:w-[1280px] lg:px-[120px] lg:py-20 xl:w-[1440px]"
        id="contacts"
        ref={ref}
      >
        <div className="basis-1/2">
          <h3 className="mb-5 font-bold xs:text-lg md:text-xl lg:text-2xl">
            {t('contacts:titles.contacts')}
          </h3>
          <ul className="mb-6 flex flex-col gap-2 text-graphite xs:text-sm md:text-base lg:text-[17px]">
            <li>
              <a
                href={`mailto://${contacts[0] ? contacts[0].email : ''}`}
                rel="noopener noreferrer"
              >
                {contacts[0] ? contacts[0].email : ''}
              </a>
            </li>
            <li>
              <a
                href={`tel:${contacts[0] ? contacts[0].phone : ''}`}
                rel="noopener noreferrer"
              >
                {contacts[0] ? contacts[0].phone : ''}
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/people/%D0%97%D0%B0%D1%85%D0%B8%D1%81%D1%82-%D0%9A%D0%BE%D1%80%D1%96%D0%B2/pfbid0c6Wv1uqMhwa8s7Anh6dDHp2arjjqo8QfSuPvMyADtPgBcwamCFNnfuVbDFLaL6NSl/"
                rel="noopener noreferrer"
                className="flex items-center justify-start gap-2"
              >
                <FaFacebook className="text-xl text-blue-500" />
                Facebook
              </a>
            </li>
          </ul>
          <h4 className="mb-5 font-bold xs:text-lg md:text-xl lg:text-2xl">
            {t('contacts:titles.working_hours')}
          </h4>
          <ul className="mb-6 flex flex-col gap-2 text-graphite xs:text-sm md:text-base lg:text-[17px]">
            <li>
              <p>{t('contacts:working_days')}</p>
            </li>
            <li>
              <p>10:00 - 20:00</p>
            </li>
          </ul>
          <h4 className="mb-5 font-bold xs:text-lg md:text-xl lg:text-2xl">
            {t('contacts:titles.location')}
          </h4>
          <p className="mb-2 text-graphite xs:text-sm md:text-base lg:text-[17px]">
            {t('contacts:location_main')}
          </p>
          <p className="text-graphite xs:text-sm md:text-base lg:text-[17px]">
            {t('contacts:location_secondary')}
          </p>
        </div>
        <div className="basis-1/2 xs:mb-3">
          <h4 className="mb-5 font-bold xs:text-lg md:text-xl lg:text-2xl">
            {t('contacts:titles.payment')}
          </h4>
          <ul className="text-graphite xs:text-sm md:text-base lg:text-[17px]">
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
