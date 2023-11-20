import { useTranslation } from 'react-i18next';
import CloseIcon from '../icons/CloseIconMenu';

import { useAppDispatch } from '@/store/hook';
import { closeModal } from '@/store/slices/modalSlice';
import { Dispatch, SetStateAction, useEffect } from 'react';
import close_icon_light from '@/assets/icons/icon_close_light.svg';
import icon_mail from '@/assets/icons/icon_envelope.svg';
import icon_phone from '@/assets/icons/icon_phone.svg';
import icon_cow from '@/assets/icons/icon_cow.svg';

import cow from '@/assets/images/cow_image.jpg';
import cow_mobile from '@/assets/images/cow_mobile.png';

type PartnersModalProps = {
  isOpen: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const PartnersModal = ({ isOpen, setShowModal }: PartnersModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setShowModal(false);
    setTimeout(() => {
      dispatch(closeModal());
    }, 300);
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
  });

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-screen w-screen bg-black transition-all duration-700 ${
        isOpen ? 'bg-opacity-40' : 'bg-opacity-0'
      } `}
      onClick={handleCloseModal}
    >
      {' '}
      {/* mobile */}
      <div
        className={`  absolute left-1/2 top-1/2 ${
          isOpen ? 'translate-x-0' : 'translate-x-[150%]'
        } duration-400 flex w-[320px] translate-x-[-50%] translate-y-[-50%] justify-between overflow-auto bg-white text-black transition-all md:hidden`}
      >
        <div className="md:py-3.75rem flex flex-col justify-around pb-9 pt-7 lg:py-16">
          <div className="w-full px-5">
            <h2 className="mb-5 text-lg font-bold">
              {t('partners:partners_modal.heading')}
            </h2>
            <img
              src={cow_mobile}
              alt="cow photo"
              className="animate__animated animate__fadeInUp mb-3"
              width={280}
              height={220}
            />

            <p className="animate__animated animate__fadeInUp mb-4 text-graphite">
              {t('partners:partners_modal.text')}
            </p>
            <ul className="animate__animated animate__fadeInUp mb-7 flex flex-col gap-4">
              <li>
                <a
                  href="mailto:zdravejutta@gmail.com"
                  rel="noopener noreferrer"
                  className="default-text flex gap-2"
                >
                  <img src={icon_mail} alt="icon email" /> zdravejutta@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+380987675765"
                  rel="noopener noreferrer"
                  className="default-text flex gap-2"
                >
                  <img src={icon_phone} alt="icon phone" /> +380 987 675 765
                </a>
              </li>
            </ul>
          </div>
          <div>
            <img
              className="ml-auto mr-auto"
              src={icon_cow}
              alt="icon cow"
              width={40}
              height={40}
            />
          </div>
        </div>

        <button
          onClick={handleCloseModal}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center"
        >
          <CloseIcon />
        </button>
      </div>
      {/* tablet and desktop */}
      <div
        className={`absolute left-1/2 top-1/2 ${
          isOpen ? 'translate-x-0' : 'translate-x-[120%]'
        } hidden translate-x-[-50%]   translate-y-[-50%]   justify-between bg-white text-black  transition-all duration-700 md:flex md:w-[672px] lg:w-[1044px]`}
      >
        <div className="md:py-3.75rem flex flex-col justify-around pb-9 pt-7 lg:py-16">
          <div className="w-full px-5 md:pl-12 lg:pl-20 lg:pr-14">
            <h2 className="mb-5 text-xl font-bold lg:mb-8 lg:text-4xl">
              {t('partners:partners_modal.heading')}
            </h2>
            <p className="lg:mb-3.5rem mb-6 w-72 text-graphite lg:w-auto lg:text-[17px]">
              {t('partners:partners_modal.text')}
            </p>
            <ul className="animate__animated animate__fadeInUp flex flex-col gap-6">
              <li>
                <a
                  href="mailto:zdravejutta@gmail.com"
                  rel="noopener noreferrer"
                  className="default-text flex gap-2"
                >
                  <img src={icon_mail} alt="icon email" /> zdravejutta@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+380987675765"
                  rel="noopener noreferrer"
                  className="default-text flex gap-2"
                >
                  <img src={icon_phone} alt="icon phone" /> +380 987 675 765
                </a>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <img
              className="ml-auto mr-auto"
              src={icon_cow}
              alt="icon cow"
              width={40}
              height={40}
            />
          </div>
        </div>
        <div className="animate__animated animate__fadeInUp relative h-[426px] w-[271px] lg:h-[491px] lg:w-[420px]">
          <img
            src={cow}
            alt="cow photo"
            className="h-full w-full object-cover"
          />
        </div>
        <button
          onClick={handleCloseModal}
          className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center"
        >
          <img
            src={close_icon_light}
            width={24}
            height={24}
            alt="close icon"
          ></img>
        </button>
      </div>
    </div>
  );
};

export default PartnersModal;
