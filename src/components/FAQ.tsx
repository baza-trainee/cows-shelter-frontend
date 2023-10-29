import { useTranslation } from 'react-i18next';
import { questionsList } from '@/data/questionsList';
import PlusIcon from './icons/PlusIcon';

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-lightgrey">
      <div className="mx-auto w-[320px] px-5 py-8 md:w-[768px] md:px-12 md:py-16 lg:w-[1440px]  lg:px-[120px] lg:py-20">
        <h2 className="lg:text-[4rem mb-6 text-2xl leading-[5.063rem] text-black md:mb-8 md:text-[3.375rem] lg:leading-[6rem]">
          {t('faq:title')}
        </h2>
        <ul className="flex flex-wrap gap-3 md:gap-[14px] lg:gap-5">
          {questionsList.map(({ title }) => (
            <li
              key={title}
              className="flex items-center justify-between border border-disabled bg-white px-4 py-3 md:gap-4 md:px-12 md:py-6 md:font-bold lg:px-[60px]"
            >
              <p className="w-[212px] md:w-[528px] lg:w-[1040px]">{t(title)}</p>
              <button type="button" className="">
                <PlusIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
