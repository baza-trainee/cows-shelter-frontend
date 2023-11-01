import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@/store/hook';
import { closeModal } from '@/store/slices/modalSlice';
import { useEffect } from 'react';
import icon_close from '@/assets/icons/icon_close_light.svg';
import icon_mail from '@/assets/icons/icon_envelope.svg';
import icon_phone from '@/assets/icons/icon_phone.svg';
import icon_cow from '@/assets/icons/icon_cow.svg';

import cow from '@/assets/images/cow_image.jpg';
const PartnersModal = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="relative flex w-[672px] justify-between bg-white text-black lg:w-[1044px]">
        <button onClick={handleCloseModal} className="absolute right-6 top-6">
          <img src={icon_close} width="24" height={24} alt="icon close modal" />
        </button>
        <div className=" flex flex-col justify-around py-[3.75rem] lg:py-16">
          <div className="w-full pl-12 lg:pl-20 lg:pr-14">
            <h2 className="mb-5 text-xl	font-bold lg:mb-8 lg:text-4xl">
              {t('partners:partners_modal.heading')}
            </h2>
            <p className="mb-[50px] w-[350px] text-graphite lg:mb-[3.5rem] lg:w-auto lg:text-[17px]">
              {t('partners:partners_modal.text')}
            </p>
            <ul className="flex flex-col gap-6 ">
              <li>
                <a
                  href="mailto:zdravejutta@gmail.com"
                  rel="noopener noreferrer"
                  className="default-text flex gap-5"
                >
                  <img src={icon_mail} alt="icon email" /> zdravejutta@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+380987675765"
                  rel="noopener noreferrer"
                  className="default-text flex gap-5"
                >
                  <img src={icon_phone} alt="icon phone" /> +380 987 675 765
                </a>
              </li>
            </ul>
          </div>{' '}
          <div className="mt-auto">
            <img
              className="ml-auto mr-auto"
              src={icon_cow}
              alt="icon cow"
              width={40}
              height={40}
            />
          </div>{' '}
        </div>
        <div className="relative h-[426px] w-[271px] lg:h-[491px] lg:w-[420px]">
          <img
            src={cow}
            alt="cow photo"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PartnersModal;
