import { useAppDispatch } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { newsItems } from '@/data/newsItems';
import { NewsData } from '@/types';
import { useWidth } from '@/hooks/useWidth';
import { useState, useEffect } from 'react';

const NewsBlock = () => {
  const dispatch = useAppDispatch();
  const screenWidth = useWidth();
  const [itemsPerPage, setItemsPerPage] = useState(3); // Update as needed based on screen size
  const [currentPage, setCurrentPage] = useState(1);

  const openNewsModal = (item: NewsData) => {
    dispatch(openModal({ data: item, type: 'news' }));
  };

  useEffect(() => {
    if (screenWidth > 1280) {
      setItemsPerPage(5);
    } else if (screenWidth <= 1280 && screenWidth > 768) {
      setItemsPerPage(5);
      setItemsPerPage(1);
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
            className={`group relative cursor-pointer ${
              index === 0 ? 'h-586 w-46 row-span-2' : ''
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
                  <h2 className="text-2xl font-normal">{news.title}</h2>
                  <div className="text-sm opacity-0 group-hover:opacity-100">
                    {news.description}
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => openNewsModal(news)}
                  className="relative mb-6 ml-6 mt-5 border-2 border-transparent py-1 text-white group-hover:border-yellow-500"
                >
                  <div className="flex items-center">
                    <p className="px-4">Показати більше</p>
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
