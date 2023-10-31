import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';

import { Reviews } from '@/types';
import { reviews } from '@/data/reviews';
import { usePaginatedData } from '@/hooks/usePaginatedData';

import Slider from '../Slider';

const ExcursionsReviews = () => {
  const itemsPerPage = 3;
  //   const { t } = useTranslation();
  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const pagesLength = reviews.length / itemsPerPage;

  const data = usePaginatedData(reviews, start, finish);
  useEffect(() => {
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
  }, [currentPage]);

  return (
    <Slider
      subtitle={'Відгуки відвідувачів'}
      setCurrentPage={setCurrentPage}
      pagesLength={pagesLength}
      isReviews={true}
    >
      <ul className="mb-10 flex gap-6">
        {data.map((item: Reviews) => (
          <li key={item.id} className="h-40 border-r border-disabled pr-16">
            <p className="subtitle-text mb-2.5">{item.name}</p>
            <p className="default-text"> {item.review}</p>
          </li>
        ))}
      </ul>
    </Slider>
  );
};

export default ExcursionsReviews;
