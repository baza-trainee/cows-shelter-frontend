import { Dispatch, SetStateAction } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import ArrowLeft from './icons/ArrowLeft';
import ArrowRight from './icons/ArrowRight';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

type SliderProps = {
  title: string;
  data?: string[];
  pagesLength?: number;
  children: React.ReactNode;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const Slider = ({
  title,
  setCurrentPage,
  pagesLength,
  children
}: SliderProps) => {
  return (
    <Swiper
      className="relative flex h-full w-5/6 flex-col items-center justify-center"
      spaceBetween={10}
      slidesPerView={1}
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      onActiveIndexChange={(swiperCore) => {
        setCurrentPage(swiperCore.activeIndex + 1);
      }}
      navigation={{
        prevEl: '.prev',
        nextEl: '.next'
      }}
    >
      <h2 className="absolute -top-1 left-0 text-6xl">{title}</h2>
      {[...Array(pagesLength)].map((_, index) => (
        <SwiperSlide
          key={index}
          className="flex h-full w-full items-center justify-center "
        >
          <div className="absolute left-[50%] top-[50%] h-[80%] w-full -translate-x-[50%] -translate-y-[50%] ">
            {children}
          </div>
        </SwiperSlide>
      ))}
      <div className="prev absolute right-12 top-2 z-50 cursor-pointer ">
        <ArrowLeft />
      </div>
      <div className="next absolute right-0 top-2 z-50 cursor-pointer">
        <ArrowRight />
      </div>
    </Swiper>
  );
};

export default Slider;
