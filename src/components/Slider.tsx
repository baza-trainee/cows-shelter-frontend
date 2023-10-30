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
  title: string;
  pagesLength?: number;
  children: React.ReactNode;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
};

const Slider = ({
  setCurrentPage,
  pagesLength,
  children,
  title
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

  return (
    <div className="relative">
      <div className="mx-[80px] mb-8 mt-4 flex items-center justify-between">
        <h2 className="text-[64px] font-medium">{title}</h2>
        <div className="flex gap-4">
          <div onClick={handlePrev} className="cursor-pointer ">
            <ArrowLeft />
          </div>
          <div className="cursor-pointer" onClick={handleNext}>
            <ArrowRight />
          </div>
        </div>
      </div>
      <div className="my-8 flex h-screen w-full  items-start justify-start">
        <Swiper
          className="relative flex h-[100%] w-[1198px] flex-col items-center justify-center"
          spaceBetween={50}
          slidesPerView={1}
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          loop={true}
          // onActiveIndexChange={(swiperCore) => {
          //   setCurrentPage!(swiperCore.activeIndex + 1);
          // }}
          onSwiper={(swiper) => {
            (sliderRef.current as any) = swiper;
          }}
        >
          {[...Array(pagesLength)].map((_, index) => (
            <SwiperSlide
              key={index}
              className="bottom-10 flex h-full w-full items-center justify-center"
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
