import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Slider from '@/components/Slider';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  Review,
  fetchReviewsWithPagination
} from '@/store/slices/reviewsSlice';
import { useWidth } from '@/hooks/useWidth';

const ExcursionsReviews = () => {
  const screenWidth = useWidth();
  const dispatch = useAppDispatch();
  const { language } = useTranslation().i18n;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [pagesLength, setPagesLength] = useState(0);

  const { reviews, totalLength } = useAppSelector(
    (state) => state.reviews.paginatedData
  );

  useEffect(() => {
    if (screenWidth >= 1280) {
      setItemsPerPage(3);
    }
    if (screenWidth >= 768 && screenWidth < 1280) {
      setItemsPerPage(2);
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
    dispatch(
      fetchReviewsWithPagination({ page: currentPage, limit: itemsPerPage })
    )
      .unwrap()
      .then(() => {
        return [];
      })
      .catch((error) => alert(error));
  }, [currentPage, dispatch, itemsPerPage]);

  return (
    <section className="mb-0 px-5 md:-mb-10 md:px-12 lg:mb-0">
      <Slider
        subtitle={language === 'uk' ? 'Відгуки' : 'Reviews'}
        setCurrentPage={setCurrentPage}
        pagesLength={pagesLength}
        isReviews={true}
      >
        <ul className="flex gap-6">
          {reviews && Array.isArray(reviews) ? (
            reviews.map((review: Review) => (
              <li
                key={review.id}
                className="border-r border-disabled pr-5 md:h-40 md:max-w-[50%] md:pr-10 lg:max-w-[33.3%] lg:pr-16"
              >
                <p className="mb-2.5 text-lg leading-tight md:text-xl md:leading-6 lg:text-[22px]">
                  {language === 'uk' ? review.name_ua : review.name_en}
                </p>
                <p className="default-text md:text-base">
                  {' '}
                  {language === 'uk' ? review.review_ua : review.review_en}
                </p>
              </li>
            ))
          ) : (
            <p>Сервер не відповідає</p>
          )}
        </ul>
      </Slider>
    </section>
  );
};

export default ExcursionsReviews;
