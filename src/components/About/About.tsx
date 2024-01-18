import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { setActiveLink } from '@/store/slices/observationSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import LittleArrow from '@/components/icons/LittleArrow';

import { useTranslation } from 'react-i18next';
import { about } from '@/data/about';

import { AboutData } from '@/types';
import { openModal } from '@/store/slices/modalSlice';
import AboutModal from '@/components/modals/AboutModal';

const About = () => {
  const dispatch = useAppDispatch();
  const [isOpened1, setIsOpened1] = useState(false);
  const [isOpened2, setIsOpened2] = useState(false);
  const [isOpened3, setIsOpened3] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const openAboutModalClick = (item: AboutData) => {
    dispatch(openModal({ data: item, type: 'about' }));
  };
  const openAboutModal = () => {
    dispatch(openModal({ data: {}, type: 'about' }));
  };

  const [showModal, setShowModal] = useState(false);
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  useEffect(() => {
    if (isModalOpen) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isModalOpen]);

  const handleChangedSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleChangedSize);
    return () => {
      window.removeEventListener('resize', handleChangedSize);
    };
  }, []);

  const { ref, inView } = useInView({
    threshold: 0
  });

  const { t } = useTranslation();

  useEffect(() => {
    if (inView) {
      dispatch(setActiveLink('#about-us'));
    } else {
      dispatch(setActiveLink(''));
    }
  }, [inView, dispatch]);

  return (
    <>
      <section
        id="about-us"
        ref={ref}
        className=" bg-[#FDFDFF]  py-6 md:py-12 min-[1280px]:py-20"
      >
        <div className="mx-auto px-5 sm:w-[480px] md:w-[768px] md:px-12 lg:w-[1280px] lg:px-[120px] xl:w-[1440px]">
          <h2 className="mb-5 flex gap-2 text-[1.5rem] font-medium leading-normal md:mb-6 md:text-[44px] lg:text-[54px]">
            {t('about_us:header')}
            <img src="/cow.svg" alt="" className="w-[5rem]" />
          </h2>
          <div className="mb-5 max-w-[1098px] text-[0.875rem] font-normal leading-normal md:mb-10 md:text-[1.25rem] lg:mb-10 lg:text-[1.375rem]">
            <p>{t('about_us:main_text')}</p>
          </div>
          {/* ------- FOR MOBILE */}
          {windowWidth < 768 && (
            <ul className="mb-5 flex flex-col items-center gap-4 ">
              <li>
                <div className="relative">
                  <div className="after:absolute after:bottom-0 after:left-0 after:h-full after:w-full after:bg-[rgba(0,0,0,0.3)] after:content-['']">
                    <img
                      src="about/about-img1.jpg"
                      alt="image"
                      className="h-[210px] w-[272px] object-cover "
                    ></img>
                  </div>
                  <div className="absolute bottom-0 left-0 flex flex-col gap-3 pb-5 pl-5 text-white">
                    <p className="text-lg leading-normal">
                      {t('about_us:s1_header')}
                    </p>
                    <a>
                      <button
                        className="flex gap-3 border border-solid border-white py-2.5 pl-5 pr-4"
                        onClick={() => {
                          openAboutModalClick(about[0]);
                        }}
                      >
                        <span className="text-base leading-tight">
                          {t('about_us:btn.show_more')}
                        </span>
                        <LittleArrow />
                      </button>
                    </a>
                  </div>
                </div>
              </li>
              <li className="">
                <div className="relative">
                  <div className="after:absolute after:bottom-0 after:left-0 after:h-full after:w-full after:bg-[rgba(0,0,0,0.3)] after:content-['']">
                    <img
                      src="about/about-img2.jpg"
                      alt="image"
                      className="h-[210px] w-[272px] object-cover"
                    ></img>
                  </div>

                  <div className="absolute bottom-0 left-0 flex flex-col gap-3 pb-5 pl-5 text-white">
                    <p className="text-lg leading-normal">
                      {t('about_us:s2_header')}
                    </p>
                    <a>
                      <button
                        className="flex gap-3 border border-solid border-white py-2.5 pl-5 pr-4"
                        onClick={() => {
                          openAboutModalClick(about[1]);
                        }}
                      >
                        <span className="text-base leading-tight">
                          {t('about_us:btn.show_more')}
                        </span>
                        <LittleArrow />
                      </button>
                    </a>
                  </div>
                </div>
              </li>
              <li className="">
                <div className="relative">
                  <div className="after:absolute after:bottom-0 after:left-0 after:h-full after:w-full after:bg-[rgba(0,0,0,0.3)] after:content-['']">
                    <img
                      src="about/about-img3.jpg"
                      alt="image"
                      className="h-[210px] w-[272px] object-cover"
                    ></img>
                  </div>

                  <div className="absolute bottom-0 left-0 flex flex-col gap-3 pb-5 pl-5 text-white">
                    <p className="text-lg leading-normal">
                      {t('about_us:s3_header')}
                    </p>
                    <a>
                      <button
                        className="flex gap-3 border border-solid border-white py-2.5 pl-5 pr-4"
                        onClick={() => {
                          openAboutModalClick(about[2]);
                        }}
                      >
                        <span className="text-base leading-tight">
                          {t('about_us:btn.show_more')}
                        </span>
                        <LittleArrow />
                      </button>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          )}
          {windowWidth >= 768 && (
            <>
              {/* ------- 1 SECTION */}
              <div className="flex gap-6 divide-solid border-b border-[#A9A9A9] pb-6 lg:pb-20">
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
                  {windowWidth < 1280 && windowWidth >= 768 && (
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
                                src="about/arrow-right.svg"
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
                              <img src="about/arrow-right.svg" alt="arror" />
                            </span>
                          </div>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* ------- IMAGE */}
                {windowWidth >= 768 && (
                  <div className="mt-14 h-[243px] min-w-[208px] max-w-[486px] lg:mt-0 lg:h-[320px] lg:min-w-[486px] ">
                    <img
                      src="about/about-img1.jpg"
                      alt="about"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              {/* ------- 2 SECTION */}
              <div className="mt-20 flex gap-6 divide-solid border-b border-[#A9A9A9] pb-6 lg:pb-20">
                <div className="mt-14 h-[243px] min-w-[208px] max-w-[486px] lg:mt-0 lg:h-[320px] lg:min-w-[486px] ">
                  <img
                    src="about/about-img2.jpg"
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
                              src="about/arrow-right.svg"
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
                            <img src="about/arrow-right.svg" alt="arror" />
                          </span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              {/* ------- 3 SECTION */}
              <div className="mt-20 flex gap-6 pb-6 lg:pb-20">
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
                              src="about/arrow-right.svg"
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
                            <img src="about/arrow-right.svg" alt="arror" />
                          </span>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
                <div className="mt-14 h-[243px] min-w-[208px] max-w-[486px] lg:mt-0 lg:h-[320px] lg:min-w-[486px] ">
                  <img
                    src="about/about-img3.jpg"
                    alt="about"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </>
          )}
          {/* ------- MODAL */}
          {isModalOpen && type === 'about' && (
            <AboutModal isOpen={showModal} setShowModal={openAboutModal} />
          )}
        </div>
      </section>
      <div
        className={`relative h-[240px] w-full bg-[url('/about/bg_cow_about.webp')] bg-cover   bg-no-repeat sm:bg-fixed md:h-[240px] lg:h-[460px]`}
      ></div>
    </>
  );
};
export default About;
