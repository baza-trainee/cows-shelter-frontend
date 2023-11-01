import { useTranslation } from 'react-i18next';
import { cards, steps } from '@/data/support';
import Card from './Card';

const Support = () => {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto max-w-[1440px] p-[80px]">
      <div
        className={`relative h-[80vh] bg-[url('support/support_bg.png')] bg-cover bg-fixed bg-center bg-no-repeat `}
      />
      <div className="flex flex-col items-start justify-center">
        <h2 className="mb-10 mt-20 text-[64px] font-medium">
          {t('support:title')}
        </h2>
        <p className="mb-10 w-[1020px] text-[22px] text-darkgray">
          {t('support:text')}
        </p>
        <div className="flex w-full justify-center gap-4 text-white">
          <Card card={cards[0]} />;
          <Card card={cards[1]} />;
        </div>
        <div className="relative mt-10 flex w-full ">
          <ul className="flex-1 ">
            {steps.map((step, index) => (
              <li
                key={index}
                className="mb-[24px] flex items-center justify-start gap-4"
              >
                <span className="flex h-[59px] w-[58px] items-center justify-center rounded-full border border-yellowshadow text-[2rem]">
                  {index + 1}
                </span>
                <p className="text-[22px]">{t(`support:${step}`)}</p>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center ">
            <button className=" flex  h-[100px] w-[100px] items-center justify-center rounded-full bg-accent  p-2 text-sm font-medium leading-[121%] text-black transition-all duration-300 hover:scale-105 focus:bg-lemon active:bg-darkyellow md:relative md:bottom-0 md:h-[130px] md:w-[130px] md:text-lg">
              {t('support:support')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;
