import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useWidth } from '@/hooks/useWidth';
import { GalleryItem } from '@/types';
import { images } from '@/data/gallery';
import { usePaginatedData } from '@/hooks/usePaginatedData';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';

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
  const pagesLength = images.length / itemsPerPage;
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);
  const type = useAppSelector((state) => state.modals.type);

  const data = usePaginatedData(images, start, finish);

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
    if (screenWidth > 320 && screenWidth < 1280) {
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
  }, [screenWidth, currentPage]);

  return (
    <section id="gallery" className="relative p-[23px]">
      {isModalOpen && type === 'lightbox' && (
        <LightBox images={data} image={image} />
      )}
      <Slider
        title={t('gallery:gallery')}
        setCurrentPage={setCurrentPage}
        pagesLength={pagesLength}
      >
        <div className="gridContainer ml-2 pr-8">
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
    </section>
  );
};

export default Gallery;
