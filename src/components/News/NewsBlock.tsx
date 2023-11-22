import { useAppDispatch } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { newsItems } from '@/data/newsItems';
import { NewsData } from '@/types';
import { useWidth } from '@/hooks/useWidth';
import { useState, useEffect } from 'react';
import LittleArrow from '../icons/LittleArrow';

const NewsBlock = () => {
  const dispatch = useAppDispatch();
  const screenWidth = useWidth();
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const openNewsModal = (item: NewsData) => {
    dispatch(openModal({ data: item, type: 'news' }));
  };

  useEffect(() => {
    if (screenWidth > 1280) {
      setItemsPerPage(5);
    } else if (screenWidth <= 1280 && screenWidth > 768) {
      setItemsPerPage(3);
      setItemsPerPage(3);
    }
  }, [screenWidth]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = newsItems.slice(startIndex, endIndex);

  return (
    <div>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((news, index) => (
          <li
            key={news.id}
            className={`group relative cursor-pointer${
              index === 0 ? 'h-300 w-46 row-span-5' : ''
            } ${index >= 3 ? 'hidden lg:block' : ''}`}
          >
            <img
              src={news.url}
              alt={`News Image`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 z-20 cursor-pointer bg-black/40 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100"></div>
            <div className="via-opacity-30 absolute inset-0 z-30 flex cursor-pointer flex-col bg-gradient-to-b from-transparent  to-black/70  sm:to-black/10   ">
              <div className="flex h-full flex-col justify-end text-white">
                <div className="translate-y-14 space-y-3 p-4 duration-300 ease-in-out group-hover:translate-y-0">
                  <h2 className="text-lg font-normal lg:text-2xl">
                    {news.title}
                  </h2>
                  <div className="text-sm opacity-0 group-hover:opacity-100">
                    {news.description}
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => openNewsModal(news)}
                  className="relative mb-6 ml-6 mt-5 border py-1 text-white sm:group-hover:border-yellow-500 md:border-none lg:border-transparent"
                >
                  <div className="color-white flex items-center px-4 py-1">
                    <p className="pr-2">Показати більше</p>
                    <LittleArrow />
                  </div>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsBlock;
