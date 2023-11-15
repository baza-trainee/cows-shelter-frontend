import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useWidth } from '@/hooks/useWidth';
import { GalleryItem } from '@/types';
import { images } from '@/data/gallery';
import { usePaginatedData } from '@/hooks/usePaginatedData';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { setActiveLink } from '@/store/slices/observationSlice';
import { useInView } from 'react-intersection-observer';

import ShareIcon from '../icons/ShareIcon';
import ShareModal from '../modals/ShareModal';
import ZoomArrow from '@/components/icons/ZoomArrow';
import Slider from '@/components/Slider';
import LightBox from './LightBox';

import '@/styles/gallery.css';

const Gallery = () => {
  const screenWidth = useWidth();
  const { t } = useTranslation();
  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [image, setImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const pagesLength = images.length / itemsPerPage;
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);
  const type = useAppSelector((state) => state.modals.type);
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (screenWidth > 1280) {
      setItemsPerPage(6);
      if (currentPage === 1) {
        setStart(0);
        setFinish(6);
      }
      if (currentPage === 2) {
        setStart(6);
        setFinish(12);
      }
      if (currentPage === 3) {
        setStart(12);
        setFinish(18);
      }
    }
    if (screenWidth > 768 && screenWidth < 1280) {
      setItemsPerPage(4);
      if (currentPage === 1) {
        setStart(0);
        setFinish(4);
      }
      if (currentPage === 2) {
        setStart(4);
        setFinish(8);
      }
      if (currentPage === 3) {
        setStart(8);
        setFinish(12);
      }
      if (currentPage === 4) {
        setStart(12);
        setFinish(16);
      }
      if (currentPage === 5) {
        setStart(14);
        setFinish(18);
      }
    }
    if (screenWidth > 320 && screenWidth < 768) {
      setItemsPerPage(1);
      if (currentPage === 1) {
        setStart(0);
        setFinish(1);
      }
      if (currentPage === 2) {
        setStart(1);
        setFinish(2);
      }
      if (currentPage === 3) {
        setStart(2);
        setFinish(3);
      }
      if (currentPage === 4) {
        setStart(3);
        setFinish(4);
      }
    }
  }, [screenWidth, currentPage]);

  const data = usePaginatedData(images, start, finish);

  useEffect(() => {
    if (inView) {
      dispatch(setActiveLink('#gallery'));
    } else {
      dispatch(setActiveLink(''));
    }
  }, [inView, dispatch]);

  return (
    <section
      id="gallery"
      ref={ref}
      className="px-[20px] md:px-[48px] lg:px-[120px]"
    >
      {isModalOpen && type === 'lightbox' && (
        <LightBox images={data} image={image} />
      )}

      {screenWidth > 768 && (
        <Slider
          title={t('gallery:gallery')}
          setCurrentPage={setCurrentPage}
          pagesLength={pagesLength}
        >
          <div className="gridContainer ml-4 w-full overflow-hidden pr-8 lg:ml-0 lg:pr-0 ">
            {data.map((item: GalleryItem, index: number) => (
              <div
                key={item.id}
                className={`gridItem relative h-[281px] min-w-[282px] max-w-[486px] overflow-hidden gridItem--${
                  index + 1
                }`}
              >
                <img
                  src={item.url}
                  alt="cow"
                  className="h-full w-full object-cover transition duration-500 ease-in hover:scale-110"
                />
                <div
                  onClick={() => {
                    setImage(index),
                      dispatch(openModal({ data: {}, type: 'lightbox' }));
                  }}
                  className="absolute bottom-4 left-4 z-50 cursor-pointer"
                >
                  <ZoomArrow />
                </div>
              </div>
            ))}
          </div>
        </Slider>
      )}
      {screenWidth < 768 && (
        <Slider
          title={t('gallery:gallery')}
          setCurrentPage={setCurrentPage}
          pagesLength={4}
        >
          <div
            className={`relative mx-auto h-[281px] w-full  min-w-[282px] overflow-hidden sm:w-[70%]`}
          >
            <img
              src={data[0].url}
              alt="cow"
              className="h-full w-full object-cover transition duration-500 ease-in hover:scale-110"
            />
            <div
              onClick={() => setShowModal(true)}
              className="absolute bottom-2 left-2 flex cursor-pointer items-center justify-center rounded-full p-2 hover:bg-[rgba(150,150,150,0.5)]"
              title="Share in Social Media"
            >
              <ShareIcon />
            </div>
            {showModal && (
              <ShareModal
                activeImage={data[0].url}
                setShowModal={setShowModal}
              />
            )}
          </div>
        </Slider>
      )}
    </section>
  );
};

export default Gallery;
