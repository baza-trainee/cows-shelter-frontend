import { Dispatch, SetStateAction, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { useWidth } from '@/hooks/useWidth';

import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

type SliderProps = {
  title?: string;
  subtitle?: string;
  isReviews?: boolean;
  isExcursions?: boolean;
  isPartners?: boolean;
  pagesLength?: number;
  children: React.ReactNode;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
};

const Slider = ({
  pagesLength,
  children,
  title,
  subtitle,
  isReviews,
  isExcursions,
  isPartners,
  setCurrentPage
}: SliderProps) => {
  const sliderRef = useRef(null);
  const screenWidth = useWidth();

  const handlePrev = () => {
    if (sliderRef && sliderRef.current) {
      (sliderRef.current as any).slidePrev();
    }
  };
  const handleNext = () => {
    if (sliderRef && sliderRef.current) {
      (sliderRef.current as any).slideNext();
    }
  };

  const slidesLength = Number(pagesLength?.toFixed());

  return (
    <>
      <div
        className={`mx-auto mb-8 mt-4 flex w-full items-center ${
          isPartners ? 'justify-end' : 'justify-between'
        }`}
      >
        {title && (
          <h2 className="text-[24px] font-medium md:text-[54px] lg:text-[64px] ">
            {title}
          </h2>
        )}
        {subtitle && (
          <h2 className="text-lg font-semibold leading-6 md:text-xl md:font-bold lg:text-2xl">
            {subtitle}
          </h2>
        )}
        {screenWidth > 768 && (
          <div
            className={`${isPartners && 'hidden'} flex
            gap-4`}
          >
            <div onClick={handlePrev} className="cursor-pointer ">
              <ArrowLeft />
            </div>
            <div className="cursor-pointer" onClick={handleNext}>
              <ArrowRight />
            </div>
          </div>
        )}
        {isPartners && screenWidth > 1200 && (
          <div
            className="flex
            gap-4"
          >
            <div onClick={handlePrev} className="cursor-pointer ">
              <ArrowLeft />
            </div>
            <div className="cursor-pointer" onClick={handleNext}>
              <ArrowRight />
            </div>
          </div>
        )}
      </div>

      <div
        className={`my-8 flex w-full items-start  justify-start ${
          isReviews ? 'h-[50%] ' : 'h-full'
        } ${isExcursions ? 'h-[50%]' : 'h-full'}`}
      >
        <Swiper
          className={`relative flex w-full items-center ${
            isReviews ? 'max-h-[165px] pt-11 md:max-h-[230px]' : 'h-full'
          } w-full md:w-[768px] lg:w-full ${
            isExcursions ? 'max-h-[350px]' : 'h-full'
          }
          `}
          spaceBetween={10}
          slidesPerView={1}
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          loop={true}
          onActiveIndexChange={(swiper) => {
            if (setCurrentPage !== undefined) {
              setCurrentPage(swiper.activeIndex + 1);
            }
          }}
          onSwiper={(swiper) => {
            (sliderRef.current as any) = swiper;
          }}
        >
          {[...Array(slidesLength)].map((_, index) => (
            <SwiperSlide
              key={index}
              className={`${
                isPartners ? 'bottom-0' : 'bottom-[40px]'
              }  flex h-full w-full items-center justify-center`}
            >
              {children}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Slider;
