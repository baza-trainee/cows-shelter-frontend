import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { GalleryItem } from '@/types';
import { images } from '@/data/gallery';
import { usePaginatedData } from '@/hooks/usePaginatedData';

import Slider from './Slider';

import '@/styles/gallery.css';

const Gallery = () => {
  const itemsPerPage = 6;
  const { t } = useTranslation();
  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <Slider
      title={t('gallery:gallery')}
      setCurrentPage={setCurrentPage}
      pagesLength={pagesLength}
    >
      <div className="gridContainer">
        {data.map((item: GalleryItem, index: number) => (
          <div
            key={item.id}
            className={`gridItem relative h-[281px] min-w-[282px] max-w-[486px] gridItem--${
              index + 1
            }`}
          >
            <img
              src={item.url}
              alt="cow"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </Slider>
  );
};

export default Gallery;
