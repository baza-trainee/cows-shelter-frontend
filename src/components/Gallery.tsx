import { useEffect, useState } from 'react';

import { slides } from '@/data/gallery';

import SliderSection from './SliderSection';

import { usePaginatedData } from '@/hooks/usePaginatedData';

import '@/styles/gallery.css';

const Gallery = () => {
  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const pagesLength = slides.length / itemsPerPage;

  const data = usePaginatedData(slides, start, finish);

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
    <SliderSection
      title="Галерея"
      setCurrentPage={setCurrentPage}
      pagesLength={pagesLength}
    >
      <div className="gridContainer container m-auto grid h-full grid-cols-3 grid-rows-2 gap-4">
        {data.map((block: string, index: number) => (
          <div
            key={index}
            className={`gridItem relative h-[281px] w-full min-w-[282px] gridItem--${
              index + 1
            }`}
          >
            <img
              src={block}
              alt="foto"
              className="h-full max-h-[281px] w-full object-cover"
            />
          </div>
        ))}
      </div>
    </SliderSection>
  );
};

export default Gallery;