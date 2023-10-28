import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Scrollbar, Navigation, Pagination } from 'swiper/modules';

import NewsBlock from '@/components/News/NewsBlock';

const News = () => {
  return (
    <div className=" container mx-auto flex flex-col">
      <div className="mb-10 mt-20 flex">
        <h1 className=" text-6xl tracking-wide "> Новини</h1>
      </div>

      <div>
        <Swiper
          modules={[Pagination, Navigation, Scrollbar]}
          spaceBetween={10}
          loop={true}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <NewsBlock />
          </SwiperSlide>
          <SwiperSlide>
            <NewsBlock />
          </SwiperSlide>
          <SwiperSlide>
            <NewsBlock />
          </SwiperSlide>

          <div className="mt-3 flex justify-end gap-5"></div>
        </Swiper>
      </div>
    </div>
  );
};

export default News;
