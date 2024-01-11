import { wayOfHelping, amountDonate, paySystems } from '@/data/dataForm';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import radio_icon_active from '@/assets/icons/radio_active_icon.svg';
import radio_icon from '@/assets/icons/radio_icon.svg';
import { useState, MouseEvent, Dispatch, SetStateAction } from 'react';
import CloseIcon from '../icons/CloseIconMenu';
import { closeModal } from '@/store/slices/modalSlice';
import { useAppDispatch } from '@/store/hook';

type State = {
  method: string | null;
  amount: string | null;
  pay: string | null;
  customAmount: string | null;
};

type DonateModalProps = {
  isOpen: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const DonateModal = ({ isOpen, setShowModal }: DonateModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, control, setValue } = useForm<State>();

  const onSubmitForm = (data: State) => {
    if (!data.method) {
      alert('Оберіть спосіб допомоги');
      return;
    }

    if (!data.amount && !data.customAmount) {
      alert('Введіть або виберіть суму');
      return;
    }

    if (!data.pay) {
      alert('Оберіть спосіб оплати');
      return;
    }
    console.log(data);
  };

  type Text = [string | null, string | null, string | null, string];
  const [text, setText] = useState<Text>(['', null, '', 'true']);

  const handleClick = (ev: string | null, position: number) => {
    setText((prev: Text) => {
      const updatedText = [...prev];
      updatedText[position] = ev;
      return updatedText as Text;
    });
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      dispatch(closeModal());
    }, 500);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className={`fixed left-0 top-0 z-[9999] h-screen w-screen bg-black transition-all duration-700 ${
        isOpen ? 'bg-opacity-40' : 'bg-opacity-0'
      } `}
    >
      <div
        className={`absolute ${
          isOpen ? 'right-0' : '-right-[500px]'
        } scrollbar scrollbar-thumb-accent scrollbar-thin top-[45%] max-h-[95vh] w-full -translate-y-[50%] overflow-auto bg-white px-[37px] py-[40px] transition-all duration-700 md:top-[50%] md:w-[480px] md:px-20`}
      >
        <button
          onClick={handleClose}
          type="button"
          className="absolute right-4 top-4"
        >
          <CloseIcon />
        </button>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <p className=" mb-4 text-lg font-semibold md:mb-5 md:text-xl md:font-bold">
            {t('donate:methode')}
          </p>
          <div role="group" className="mb-10 flex flex-wrap gap-3">
            {wayOfHelping.map(({ value, title }) => (
              <label
                key={value}
                onClick={(event: MouseEvent<HTMLLabelElement>) => {
                  handleClick(event.currentTarget.textContent, 0);
                  setValue('method', t(title));
                }}
                className="relative flex items-center gap-5"
              >
                <Controller
                  name="method"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="radio"
                      {...field}
                      value={value}
                      className="opacity-0"
                    />
                  )}
                />
                <img
                  className="absolute"
                  src={text[0] === t(title) ? radio_icon_active : radio_icon}
                  alt="radio icon"
                  width="24px"
                  height="24px"
                />
                {t(title)}
              </label>
            ))}
          </div>
          <p className=" mb-4 text-lg font-semibold md:mb-5 md:text-xl md:font-bold">
            {t('donate:amount')}
          </p>
          <div role="group" className="relative mb-10 flex flex-wrap gap-3">
            {amountDonate.map(({ value, title }) => (
              <label
                key={value}
                className="flex w-[200px] items-center gap-5"
                onClick={(event: MouseEvent<HTMLLabelElement>) => {
                  handleClick(event.currentTarget.textContent, 1);
                  setValue('customAmount', null);
                }}
              >
                <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="radio"
                      {...field}
                      value={value}
                      className="opacity-0"
                    />
                  )}
                />
                <img
                  className="absolute"
                  src={text[1] === t(title) ? radio_icon_active : radio_icon}
                  alt="radio icon"
                  width="24px"
                  height="24px"
                />
                {t(title)}
              </label>
            ))}
            <label className="absolute -bottom-3 left-8 block text-black">
              <input
                type="text"
                {...register('customAmount')}
                placeholder={t('donate:amounts.four')}
                className="block w-[213px] border-b border-disabled bg-inherit px-[14px] py-1 text-black placeholder:text-disabled"
                onClick={() => {
                  handleClick('', 1);
                  setValue('method', null);
                }}
              />
            </label>
          </div>
          <p className=" mb-4 text-lg font-semibold md:mb-5 md:text-xl md:font-bold">
            {t('donate:pay')}
          </p>
          <div role="group" className="mb-10 flex w-[200px] flex-wrap gap-3">
            {paySystems.map(({ value, title, url }) => (
              <label
                key={value}
                className="flex items-center gap-5"
                onClick={(event: MouseEvent<HTMLLabelElement>) =>
                  handleClick(event.currentTarget.textContent, 2)
                }
              >
                <Controller
                  name="pay"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="radio"
                      {...field}
                      value={value}
                      className="opacity-0"
                    />
                  )}
                />
                <img
                  className="absolute"
                  src={text[2] === t(title) ? radio_icon_active : radio_icon}
                  alt="radio icon"
                  width="24px"
                  height="24px"
                />
                <img
                  src={url}
                  alt={`${title} icon`}
                  width="20px"
                  height="20px"
                />
                {t(title)}
              </label>
            ))}
          </div>
          <button
            type="submit"
            className="block w-[276px] bg-accent px-5 py-3 text-center font-medium"
          >
            {t('donate:btn')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateModal;
