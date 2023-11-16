import { Dispatch, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { nanoid } from 'nanoid';

import { AboutData } from '@/types';
import { closeModal } from '@/store/slices/modalSlice';

import CloseIcon from '../icons/CloseIconMenu';
import { useTranslation } from 'react-i18next';

type AboutModalProps = {
  isOpen: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const AboutModal = ({ isOpen, setShowModal }: AboutModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const about = useAppSelector((state) => state.modals.data) as AboutData;

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(closeModal());
  };

  return (
    <div className="fixed inset-0 z-50 flex  items-center justify-center overflow-hidden">
      <div
        className={`absolute inset-0 overflow-hidden bg-black opacity-40 transition-all  duration-700  ${
          isOpen ? 'bg-opacity-40' : 'bg-opacity-0'
        } `}
        onClick={handleCloseModal}
      ></div>
      <div
        className={` absolute transition-all duration-700 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } max-h-full max-w-full overflow-scroll bg-white  px-5 pt-6  `}
      >
        <div className="mb-3 flex justify-between ">
          <h2 className="text-lg font-semibold">{t(`${about.title}`)}</h2>
          <button type="button" onClick={handleCloseModal}>
            <CloseIcon />
          </button>
        </div>

        <div className="flex w-full flex-col items-center overflow-scroll">
          <img
            className="mb-[18px] min-h-[210px] min-w-[280px] object-cover"
            src={t(`${about.mainImg}`)}
          />
          <ul>
            {about.description.map((item) => (
              <li key={nanoid()}>
                <p className="mb-6 text-sm">{t(`${item}`)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;
