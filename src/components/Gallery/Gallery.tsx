import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GalleryItem } from '@/types';
import { images } from '@/data/gallery';
import { usePaginatedData } from '@/hooks/usePaginatedData';

import ZoomArrow from '@/components/icons/ZoomArrow';
import Slider from '@/components/Slider';

import '@/styles/gallery.css';
import LightBox from './LightBox';

const Gallery = () => {
  const itemsPerPage = 6;
  const { t } = useTranslation();
  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLightBox, setIsLightBox] = useState(false);
  const [image, setImage] = useState(0);
  const pagesLength = images.length / itemsPerPage;

  const data = usePaginatedData(images, start, finish);

  useEffect(() => {
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
  }, [currentPage]);

  useEffect(() => {
    if (isLightBox === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isLightBox]);

  return (
    <section id="gallery" className="relative">
      {isLightBox && (
        <div className="fixed left-0 top-0 z-20 h-full w-full bg-[rgba(0,0,0,0.6)]">
          <LightBox
            images={data}
            image={image}
            onClose={() => setIsLightBox(false)}
          />
        </div>
      )}
      <Slider
        title={t('gallery:gallery')}
        setCurrentPage={setCurrentPage}
        pagesLength={pagesLength}
      >
        <div className="gridContainer">
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
                  setImage(index), setIsLightBox(true);
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
