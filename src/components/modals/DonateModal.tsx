import { wayOfHelping, amountDonate, paySystems } from '@/data/dataForm';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import radio_icon_active from '@/assets/icons/radio_active_icon.svg';
import radio_icon from '@/assets/icons/radio_icon.svg';
import { useState, MouseEvent } from 'react';

type State = {
  method: string | null;
  amount: string | null;
  pay: string | null;
  customAmount: string | null;
};

const DonateModal = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, control, setValue } = useForm<State>();
  const onSubmitForm = (data: State) => {
    // const selectedMethod = watch('method');
    // const selectedAmount = watch('amount');
    // const selectedPay = watch('pay');

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

  return (
    <div className="fixed left-0 top-0 z-[9999] h-screen w-screen bg-black bg-opacity-40">
      <div className="absolute left-[50%] top-[50%] max-h-[90vh] w-[300px] -translate-x-[50%]  -translate-y-[50%] overflow-auto bg-white px-3  py-[42px] md:w-[480px] md:px-20">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <p className="mb-5 text-xl font-bold">{t('donate:methode')}</p>
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
          <p className="mb-5 text-xl font-bold">{t('donate:amount')}</p>
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
          <p className="mb-5 text-xl font-bold">{t('donate:pay')}</p>
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
