import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useAppDispatch } from '@/store/hook';
import { closeModal } from '@/store/slices/modalSlice';

import LightBoxArrowLeft from '@/components/icons/LightBoxArrowLeft';
import LightBoxArrowRight from '@/components/icons/LightBoxArrowRight';
import ShareIcon from '@/components/icons/ShareIcon';
import CloseIcon from '@/components/icons/CloseIcon';
import ShareModal from '@/components/modals/ShareModal';

import 'swiper/css';
import 'swiper/css/navigation';
import { Image } from '@/store/slices/gallerySlice';

type LightBoxProps = {
  images: Image[];
  image: number;
};

const LightBox = ({ images, image }: LightBoxProps) => {
  const [activeImage, setActiveImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setActiveImage(images[image].image_url);
  }, [image, images]);

  return (
    <div className="fixed left-0 top-0 z-20 h-full w-full bg-[rgba(0,0,0,0.6)]">
      <div className="fixed left-[50%] top-[50%] z-[9999] flex h-full w-full -translate-x-[50%] -translate-y-[50%] items-center justify-center ">
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute right-4 top-4 z-50 cursor-pointer text-3xl text-white"
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
          className=" h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide
              className=" relative flex w-full items-center justify-center"
              key={index}
            >
              <div className="relative max-h-[480px] w-[480px] lg:max-h-[590px] lg:w-[590px]">
                <img src={image.image_url} className="w-full object-cover" />
                <div
                  onClick={() => setShowModal(true)}
                  className="absolute bottom-2 right-2 flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-[rgba(150,150,150,0.5)]"
                  title="Share in Social Media"
                >
                  <ShareIcon />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="prev absolute left-[3%] top-[50%] z-50 -translate-y-[30%]  cursor-pointer lg:left-[18%]">
            <LightBoxArrowLeft />
          </div>
          <div className="next absolute right-[3%] top-[50%] z-50 -translate-y-[50%]   cursor-pointer lg:right-[18%]">
            <LightBoxArrowRight />
          </div>
        </Swiper>
        {showModal && (
          <ShareModal activeImage={activeImage} setShowModal={setShowModal} />
        )}
      </div>
    </div>
  );
};

export default LightBox;
