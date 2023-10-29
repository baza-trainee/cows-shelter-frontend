import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import NewsBlock from '@/components/News/NewsBlock';

const News = () => {
  return (
    <section id="news" className="container mx-auto flex flex-col px-28  ">
      <div className="mb-10 mt-20 flex">
        <h1 className="text-6xl tracking-wide">Новини</h1>
      </div>
      <div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          loop={true}
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="mb-20"
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

          {/* Add more SwiperSlides as needed for the NewsBlock components */}

          {/* Pagination will be automatically handled by Swiper */}
          <div className=" mt-20 flex justify-end gap-5"></div>
        </Swiper>
      </div>
    </section>
  );
};

export default News;
