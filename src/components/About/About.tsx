// import { useWidth } from '@/hooks/useWidth';

import image1 from '../../assets/images/about-img1.jpg';
import image2 from '../../assets/images/about-img2.jpg';
import image3 from '../../assets/images/about-img3.jpg';
import arrorIcon from '../../assets/icons/arrow-right.svg';
import { useTranslation } from 'react-i18next';



import { useState } from 'react';

const About = () => {
  const [isOpened1, setIsOpened1] = useState(false);
  const [isOpened2, setIsOpened2] = useState(false);
  const [isOpened3, setIsOpened3] = useState(false);

  const { t } = useTranslation();

  return (
    <>
      <section className="bg-[#FDFDFF] px-[3rem] pt-20 min-[1280px]:px-[7.5rem] ">
        <h2 className="mb-10 text-[4rem] font-medium leading-normal">
          {t('about_us:header')}
        </h2>
        <div className=" max-w-[1098px] text-[1.375rem] font-normal leading-normal">
          <p>{t('about_us:main_text')}</p>
        </div>
        {/* ------- 1 SECTION */}
        <div className="mt-20 flex gap-6 divide-solid border-b border-[#A9A9A9] pb-6 lg:pb-20">
          <div className="max-w-[690px]">
            <h3 className="mb-5 text-[1.5rem] font-bold leading-normal lg:mb-6 ">
              {t('about_us:s1_header')}
            </h3>
            {/* ------- FOR DESKTOP */}
            <div className="mb-6 hidden lg:block">
              <p className="mb-6">{t('about_us:desktop.s1.p1')}</p>
              <p>{t('about_us:desktop.s1.p2')}</p>
            </div>
            {/* ------- FOR TABLET */}
            <div className="lock flex min-h-[243px]  flex-col justify-between lg:hidden">
              <div className="flex flex-col">
                <p className="text-base leading-normal">
                  {t('about_us:tablet.s1.p1')}
                </p>
                <p
                  className={` transition-[max-height, opacity] duration-[1s] ${
                    isOpened1 ? 'max-h-[170px] opacity-100 ' : ''
                  }  inline-block max-h-0 overflow-hidden opacity-0`}
                >
                  {t('about_us:tablet.s1.p2')}
                </p>
              </div>
              <button
                className="mt-4 flex w-[236px] justify-center border border-neutral-950 py-[0.75rem] pl-5 pr-4 transition-all duration-500 hover:border-accent active:border-accent"
                onClick={() => setIsOpened1((prevState) => !prevState)}
              >
                {isOpened1 ? (
                  <div className="flex gap-3">
                    <span>
                      <img
                        src={arrorIcon}
                        alt="arror"
                        className="scale-x-[-1]"
                      />
                    </span>
                    <span className="text-lg font-medium leading-[1.2]">
                      <p>{t('about_us:btn.show_less')}</p>
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <span>
                      <p className="text-lg font-medium leading-[1.2]">
                        {t('about_us:btn.show_more')}
                      </p>
                    </span>
                    <span>
                      <img src={arrorIcon} alt="arror" />
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="mt-14 h-[243px] min-w-[208px] max-w-[486px] lg:mt-0 lg:h-[320px] lg:min-w-[486px] ">
            <img
              src={image1}
              alt="about"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {/* ------- 2 SECTION */}
        <div className="mt-20 flex gap-6 divide-solid border-b border-[#A9A9A9] pb-20">
          <div className="mt-14 h-[243px] min-w-[208px] max-w-[486px] lg:mt-0 lg:h-[320px] lg:min-w-[486px] ">
            <img
              src={image2}
              alt="about"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="max-w-[690px]">
            <h3 className="mb-6 text-[1.5rem] font-bold leading-normal">
              {t('about_us:s2_header')}
            </h3>
            {/* ------- FOR DESKTOP */}
            <p className="mb-6 hidden lg:block">
              {t('about_us:desktop.s2.p1')}
            </p>
            {/* ------- FOR TABLET */}
            <div className="lock flex min-h-[243px]  flex-col justify-between lg:hidden">
              <div className="flex flex-col">
                <p className="text-base leading-normal">
                  {t('about_us:tablet.s2.p1')}
                </p>
                <p
                  className={` transition-[max-height, opacity] duration-[1s] ${
                    isOpened2 ? 'max-h-[170px] opacity-100 ' : ''
                  }  inline-block max-h-0 overflow-hidden opacity-0`}
                >
                  {t('about_us:tablet.s2.p2')}
                </p>
              </div>
              <button
                className="mt-4 flex w-[236px] justify-center border border-neutral-950 py-[0.75rem] pl-5 pr-4 transition-all duration-500 hover:border-accent active:border-accent"
                onClick={() => setIsOpened2((prevState) => !prevState)}
              >
                {isOpened2 ? (
                  <div className="flex gap-3">
                    <span>
                      <img
                        src={arrorIcon}
                        alt="arror"
                        className="scale-x-[-1]"
                      />
                    </span>
                    <span className="text-lg font-medium leading-[1.2]">
                      <p>{t('about_us:btn.show_less')}</p>
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <span>
                      <p className="text-lg font-medium leading-[1.2]">
                        {t('about_us:btn.show_more')}
                      </p>
                    </span>
                    <span>
                      <img src={arrorIcon} alt="arror" />
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* ------- 3 SECTION */}
        <div className="mt-20 flex gap-6 pb-20">
          <div className="max-w-[690px]">
            <h3 className="mb-6 text-[1.5rem] font-bold leading-normal">
              {t('about_us:s3_header')}
            </h3>
            {/* ------- FOR DESKTOP */}
            <div className="mb-6 hidden lg:block">
              <p className="mb-6 ">{t('about_us:desktop.s3.p1')}</p>
              <p className="mb-6">{t('about_us:desktop.s3.p2')}</p>
              <p>{t('about_us:desktop.s3.p3')}</p>
            </div>
            {/* ------- FOR TABLET */}
            <div className="lock flex min-h-[243px]  flex-col justify-between lg:hidden">
              <div className="flex flex-col">
                <p className="text-base leading-normal">
                  {t('about_us:tablet.s3.p1')}
                </p>
                <p
                  className={` transition-[max-height, opacity] duration-[1s] ${
                    isOpened3 ? 'max-h-[170px] opacity-100 ' : ''
                  }  inline-block max-h-0 overflow-hidden opacity-0`}
                >
                  {t('about_us:tablet.s3.p2')}
                </p>
              </div>
              <button
                className="mt-4 flex w-[236px] justify-center border border-neutral-950 py-[0.75rem] pl-5 pr-4 transition-all duration-500 hover:border-accent active:border-accent"
                onClick={() => setIsOpened3((prevState) => !prevState)}
              >
                {isOpened3 ? (
                  <div className="flex gap-3">
                    <span>
                      <img
                        src={arrorIcon}
                        alt="arror"
                        className="scale-x-[-1]"
                      />
                    </span>
                    <span className="text-lg font-medium leading-[1.2]">
                      <p>{t('about_us:btn.show_less')}</p>
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <span>
                      <p className="text-lg font-medium leading-[1.2]">
                        {t('about_us:btn.show_more')}
                      </p>
                    </span>
                    <span>
                      <img src={arrorIcon} alt="arror" />
                    </span>
                  </div>
                )}
              </button>
            </div>
          </div>
          <div className="mt-14 h-[243px] min-w-[208px] max-w-[486px] lg:mt-0 lg:h-[320px] lg:min-w-[486px] ">
            <img
              src={image3}
              alt="about"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <div
        className={`relative h-[80vh] bg-[url('@/assets/imgs/img_cow_about.jpg')] bg-cover bg-fixed bg-center bg-no-repeat`}
      ></div>
    </>
  );
};
export default About;
