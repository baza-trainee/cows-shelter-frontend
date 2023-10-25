import { useEffect, useState } from 'react';

import Slider from './Slider';
import { slides } from '../data/gallery';

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
    <div className="my-8 flex h-screen w-full items-center justify-center">
      <Slider
        title="Галерея"
        setCurrentPage={setCurrentPage}
        pagesLength={pagesLength}
      >
        <div className="gridContainer container m-auto grid h-full grid-cols-3 grid-rows-2 gap-4">
          {data.map((block: string, index: number) => (
            <div
              key={index}
              className={`gridItem relative w-full  max-w-[80vw] gridItem--${
                index + 1
              }`}
            >
              <img
                src={block}
                alt="foto"
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </Slider>
    </div>
  );
};

export default Gallery;
