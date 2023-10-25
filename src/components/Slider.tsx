/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, forwardRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

type SliderProps = {
  pagesLength?: number;
  children: React.ReactNode;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const Slider = (props: SliderProps, ref: any) => {
  const { setCurrentPage, pagesLength, children } = props;
  return (
    <Swiper
      className="relative mt-[10vh] flex h-[110vh] w-5/6 flex-col items-center justify-center"
      spaceBetween={10}
      slidesPerView={1}
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      loop={true}
      onActiveIndexChange={(swiperCore) => {
        setCurrentPage(swiperCore.activeIndex + 1);
      }}
      onSwiper={(swiper) => {
        ref.current = swiper;
      }}
    >
      {[...Array(pagesLength)].map((_, index) => (
        <SwiperSlide
          key={index}
          className="flex h-full w-full items-center justify-center"
        >
          <div className="absolute left-[50%] top-[50%] w-full -translate-x-[50%] -translate-y-[50%] ">
            {children}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default forwardRef(Slider);
