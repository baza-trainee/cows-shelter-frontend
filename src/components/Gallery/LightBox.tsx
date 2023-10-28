import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { GalleryItem } from '@/types';

import LightBoxArrowLeft from '../icons/LightBoxArrowLeft';
import LightBoxArrowRight from '../icons/LightBoxArrowRight';
import CloseIcon from '../icons/CloseIcon';

import 'swiper/css';
import 'swiper/css/navigation';
import ShareIcon from '../icons/ShareIcon';

type LightBoxProps = {
  onClose: () => void;
  images: GalleryItem[];
  image: number;
};

const LightBox = ({ onClose, images, image }: LightBoxProps) => {
  return (
    <>
      <div className="absolute left-[50%] top-[50%] z-40 flex h-full w-full -translate-x-[50%] -translate-y-[50%] items-center justify-center ">
        <button
          onClick={onClose}
          className="absolute right-4 top-0 z-50 cursor-pointer text-3xl text-white"
        >
          <CloseIcon />
        </button>
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => {
            swiper.slideTo(image);
          }}
          navigation={{
            prevEl: '.prev',
            nextEl: '.next'
          }}
          className="h-full w-[60%]"
        >
          {images.map((image, index) => (
            <SwiperSlide
              className=" relative flex w-full items-center justify-center"
              key={index}
            >
              <div className="relative w-[590px]">
                <img src={image.url} className="w-full object-cover" />
                <div className="absolute bottom-4 right-4 cursor-pointer">
                  <ShareIcon />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="prev absolute left-2 top-[50%] z-50 -translate-y-[50%] cursor-pointer">
            <LightBoxArrowLeft />
          </div>
          <div className="next absolute right-2 top-[50%] z-50  -translate-y-[50%] cursor-pointer">
            <LightBoxArrowRight />
          </div>
        </Swiper>
      </div>
    </>
  );
};

export default LightBox;
