import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { GalleryItem } from '@/types';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';

import LightBoxArrowLeft from '@/components/icons/LightBoxArrowLeft';
import LightBoxArrowRight from '@/components/icons/LightBoxArrowRight';
import ShareIcon from '@/components/icons/ShareIcon';
import CloseIcon from '@/components/icons/CloseIcon';
import ShareModal from '@/components/modals/ShareModal';

import 'swiper/css';
import 'swiper/css/navigation';

type LightBoxProps = {
  onClose: () => void;
  images: GalleryItem[];
  image: number;
};

// const links = ['facebook', 'instagram'];

const LightBox = ({ onClose, images, image }: LightBoxProps) => {
  const [activeImage, setActiveImage] = useState('');
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  useEffect(() => {
    setActiveImage(images[image].url);
  }, [image, images]);

  const openShareModal = () => {
    dispatch(openModal({ data: activeImage, type: 'share' }));
  };

  useEffect(() => {
    if (isModalOpen === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);

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
          className=" h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide
              className=" relative flex w-full items-center justify-center"
              key={index}
            >
              <div className="relative max-h-[590px] w-[590px]">
                <img src={image.url} className="w-full object-cover" />
                <div
                  onClick={openShareModal}
                  className="absolute bottom-2 right-2 flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-[rgba(150,150,150,0.8)]"
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
        {isModalOpen && type === 'share' && <ShareModal />}
      </div>
    </>
  );
};

export default LightBox;
