/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

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
  pagesLength?: number;
  children: React.ReactNode;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
};

const Slider = ({
  setCurrentPage,
  pagesLength,
  children,
  title,
  subtitle,
  isReviews,
  isExcursions
}: SliderProps) => {
  const sliderRef = useRef(null);

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
    <div
      className={`relative  ${
        isReviews ? 'h-[30%] lg:h-[40%]' : 'h-[75vh] lg:h-full'
      } 
      ${isExcursions ? 'h-[45%]' : 'h-[75vh] lg:h-full'} 
      `}
    >
      <div
        className={`mx-auto mb-8 mt-4 flex ${
          isReviews ? 'w-full' : 'w-[90%]'
        }  items-center justify-between`}
      >
        {title && <h2 className="text-[64px] font-medium">{title}</h2>}
        {subtitle && (
          <h2 className="text-lg font-semibold leading-6 md:text-xl md:font-bold lg:text-2xl">
            {subtitle}
          </h2>
        )}
        <div className="flex gap-4">
          <div onClick={handlePrev} className="cursor-pointer ">
            <ArrowLeft />
          </div>
          <div className="cursor-pointer" onClick={handleNext}>
            <ArrowRight />
          </div>
        </div>
      </div>
      <div
        className={`my-8 flex w-full items-start justify-start ${
          isReviews ? 'h-[50%]' : 'h-full'
        }`}
      >
        <Swiper
          className={`relative flex ${
            isReviews ? 'h-[165px] pt-11 md:h-[230px]' : 'h-[600px]'
          } w-[1000vw] md:w-[768px] lg:w-[1198px] ${
            isExcursions ? 'h-[350px]' : 'h-[600px]'
          }
          `}
          spaceBetween={50}
          slidesPerView={1}
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          loop={true}
          onActiveIndexChange={(swiperCore) => {
            setCurrentPage!(swiperCore.activeIndex + 1);
          }}
          onSwiper={(swiper) => {
            (sliderRef.current as any) = swiper;
          }}
        >
          {[...Array(slidesLength)].map((_, index) => (
            <SwiperSlide
              key={index}
              className=" bottom-10 flex h-full w-full items-center justify-center"
            >
              <div className="absolute left-[50%] top-[50%] w-full -translate-x-[50%] -translate-y-[50%] ">
                {children}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
