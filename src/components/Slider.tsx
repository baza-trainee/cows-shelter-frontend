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
  pagesLength,
  children,
  title,
  subtitle,
  isReviews,
  isExcursions,
  setCurrentPage
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
    <div className={``}>
      <div className={`mx-auto mb-8 mt-4 flex  items-center justify-between`}>
        {title && <h2 className="text-[64px] font-medium ">{title}</h2>}
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
        className={`my-8 flex items-start justify-start ${
          isReviews ? 'h-[50%] ' : 'h-full'
        } ${isExcursions ? 'h-[50%]' : 'h-full'}`}
      >
        <Swiper
          className={`relative flex ${
            isReviews ? 'max-h-[250px] pt-11' : 'h-[600px]'
          } w-[100%] md:w-[768px] lg:w-full ${
            isExcursions ? 'max-h-[320px]' : 'h-[600px]'
          }`}
          spaceBetween={100}
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
              className="bottom-10 flex h-full w-full items-center justify-center"
            >
              <div className="w-full">{children}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
