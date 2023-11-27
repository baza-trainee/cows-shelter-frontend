import { useTranslation } from 'react-i18next';
import { questionsList } from '@/data/questionsList';
import PlusIcon from './icons/PlusIcon';
import CloseAnswer from './icons/CloseAnswer';
import { useState } from 'react';

type Answer = Array<number>;
const FAQ = () => {
  const [answer, setAnswer] = useState<Answer>([]);
  const { t } = useTranslation();

  const currentAnswer = (id: number) => answer.find((item) => item === id);

  const showAnswer = (id: number) => {
    setAnswer((prev) => [...prev, id]);
  };

  const closeAnswer = (id: number) => {
    setAnswer((prev) => prev.filter((item) => item !== id));
  };

  return (
    <section className="bg-lightgrey">
      <div className="mx-auto w-[100%] px-5 py-8 sm:w-[480px] md:w-[768px] md:px-12 md:py-16 lg:w-[1280px] lg:px-[120px] lg:py-20 xl:w-[1440px]">
        <h2 className="lg:text-[4rem mb-6 text-2xl text-black md:mb-8 md:text-[3.375rem] md:leading-[5.063rem] lg:leading-[6rem]">
          {t('faq:title')}
        </h2>
        <ul className="flex flex-wrap gap-3 md:gap-[14px] lg:gap-5">
          {questionsList.map(({ question, answers, id }) => (
            <li key={id} className="w-[100%] sm:w-[435px] md:w-[100%]">
              <a
                onClick={() => {
                  if (currentAnswer(id)) {
                    return closeAnswer(id);
                  }
                  showAnswer(id);
                }}
                className={`flex items-center justify-between border border-disabled ${
                  currentAnswer(id) ? ' bg-lightyellow' : 'bg-white'
                }  px-4 py-3 transition-all duration-300 hover:border-[2px] hover:border-darkyellow focus:border-dashed md:gap-4 md:px-12 md:py-6 md:font-bold lg:px-[60px]`}
              >
                <p>{t(question)}</p>
                {currentAnswer(id) ? (
                  <button type="button" className="pl-3">
                    <CloseAnswer />
                  </button>
                ) : (
                  <button type="button" className="pl-3">
                    <PlusIcon />
                  </button>
                )}
              </a>
              {currentAnswer(id) && (
                <p className="text-4 border border-disabled bg-white px-4 py-3 md:gap-4 md:px-12 md:py-6 lg:px-[60px] lg:text-[1.063rem]">
                  {t(answers)}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
