import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useWidth } from '@/hooks/useWidth';
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
import { fetchImagesWithPagination } from '@/store/slices/gallerySlice';

const Gallery = () => {
  const screenWidth = useWidth();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [image, setImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);
  const type = useAppSelector((state) => state.modals.type);
  const { images, totalLength } = useAppSelector(
    (state) => state.gallery.paginatedData
  );
  const [pagesLength, setPagesLength] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0.5
  });

  useEffect(() => {
    if (screenWidth > 1280) {
      setItemsPerPage(6);
    }
    if (screenWidth >= 768 && screenWidth < 1280) {
      setItemsPerPage(4);
    }
    if (screenWidth > 320 && screenWidth < 768) {
      setItemsPerPage(1);
    }
  }, [screenWidth]);

  useEffect(() => {
    const pagesNumber = totalLength / itemsPerPage;
    setPagesLength(pagesNumber < 5 ? pagesNumber : 5);
  }, [totalLength, itemsPerPage]);

  useEffect(() => {
    const pagesNumber = totalLength / itemsPerPage;
    setPagesLength(pagesNumber < 5 ? pagesNumber : 5);
  }, [totalLength, itemsPerPage]);

  useEffect(() => {
    dispatch(
      fetchImagesWithPagination({ page: currentPage, limit: itemsPerPage })
    )
      .unwrap()
      .then(() => {
        return [];
      })
      .catch((error) => alert(error));
  }, [currentPage, dispatch, itemsPerPage]);

  useEffect(() => {
    if (inView) {
      dispatch(setActiveLink('#gallery'));
    } else {
      dispatch(setActiveLink(''));
    }
  }, [inView, dispatch]);

  console.log(images);

  return (
    <section id="gallery" ref={ref} className="relative">
      <div className="mx-auto px-5 sm:w-[480px] md:w-[768px] md:px-8 md:py-12 lg:w-[1280px] lg:px-[55px]">
        {isModalOpen && type === 'lightbox' && (
          <LightBox images={images} image={image} />
        )}

        {screenWidth >= 768 && (
          <Slider
            title={t('gallery:gallery')}
            setCurrentPage={setCurrentPage}
            pagesLength={pagesLength}
          >
            <div className="gridContainer ml-4 w-full ">
              {images && Array.isArray(images) ? (
                images.map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className={`gridItem relative h-[281px] min-w-[282px] max-w-[456px] overflow-hidden gridItem--${
                      index + 1
                    }`}
                  >
                    <img
                      src={item.image_url}
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
                ))
              ) : (
                <p className="text-black">Сервер не відповідає</p>
              )}
            </div>
          </Slider>
        )}
        {screenWidth < 768 && (
          <Slider
            title={t('gallery:gallery')}
            setCurrentPage={setCurrentPage}
            pagesLength={pagesLength}
          >
            <div
              className={`relative mx-auto h-[281px] w-full  min-w-[282px] overflow-hidden sm:w-[70%]`}
            >
              <img
                src={(images && images[0]?.image_url) || ''}
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
                  activeImage={(images && images[0]?.image_url) || ''}
                  setShowModal={setShowModal}
                />
              )}
            </div>
          </Slider>
        )}
      </div>
    </section>
  );
};

export default Gallery;
