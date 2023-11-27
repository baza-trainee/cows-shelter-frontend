import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reviews } from '@/types';
import { reviews } from '@/data/reviews';
import { usePaginatedData } from '@/hooks/usePaginatedData';

import Slider from '@/components/Slider';

const ExcursionsReviews = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleChangedSize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleChangedSize);
    return () => {
      window.removeEventListener('resize', handleChangedSize);
    };
  }, []);

  const { t } = useTranslation();
  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [pagesLength, setPagesLength] = useState(reviews.length / itemsPerPage);

  const data = usePaginatedData(reviews, start, finish);

  useEffect(() => {
    if (windowWidth >= 1280) {
      setItemsPerPage(3);
      setPagesLength(reviews.length / itemsPerPage);
      if (currentPage === 1) {
        setStart(0);
        setFinish(3);
      }
      if (currentPage === 2) {
        setStart(3);
        setFinish(6);
      }
      if (currentPage === 3) {
        setStart(6);
        setFinish(9);
      }
    }
    if (windowWidth >= 768 && windowWidth < 1280) {
      setItemsPerPage(2);
      setPagesLength(5);
      if (currentPage === 1) {
        setStart(0);
        setFinish(2);
      }
      if (currentPage === 2) {
        setStart(2);
        setFinish(4);
      }
      if (currentPage === 3) {
        setStart(4);
        setFinish(6);
      }
      if (currentPage === 4) {
        setStart(6);
        setFinish(8);
      }
      if (currentPage === 5) {
        setStart(8);
        setFinish(9);
      }
    }
    if (windowWidth >= 320 && windowWidth < 768) {
      setItemsPerPage(1);
      setPagesLength(4);
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
  }, [windowWidth, currentPage, itemsPerPage]);

  return (
    <section className="mb-0 px-5 md:-mb-10 md:px-12 lg:mb-0">
      <Slider
        subtitle={t('reviews:reviews_title')}
        setCurrentPage={setCurrentPage}
        pagesLength={pagesLength}
        isReviews={true}
      >
        <ul className="flex gap-6">
          {data.map((item: Reviews) => (
            <li
              key={item.id}
              className="border-r border-disabled pr-5 md:h-40 md:max-w-[50%] md:pr-10 lg:max-w-[33.3%] lg:pr-16"
            >
              <p className="mb-2.5 text-lg leading-tight md:text-xl md:leading-6 lg:text-[22px]">
                {t(item.name)}
              </p>
              <p className="default-text md:text-base"> {t(item.review)}</p>
            </li>
          ))}
        </ul>
      </Slider>
    </section>
  );
};

export default ExcursionsReviews;
