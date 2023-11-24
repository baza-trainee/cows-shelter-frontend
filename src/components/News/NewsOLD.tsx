import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAppDispatch, useAppSelector } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';

import Slider from '@/components/Slider';
import NewsBlock from '@/components/News/NewsBlock';
import NewsModal from '@/components/modals/NewsModal';

import 'swiper/css/pagination';
import 'swiper/css';
import { setActiveLink } from '@/store/slices/observationSlice';
import { useWidth } from '@/hooks/useWidth';

const News = () => {
  const dispatch = useAppDispatch();

  const screenWidth = useWidth();
  const [start, setStart] = useState(0);
  const [finish, setFinish] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [showModal, setShowModal] = useState(false);
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);
  const { ref, inView } = useInView({
    threshold: 0.5
  });

  const openNewsModal = () => {
    dispatch(openModal({ data: {}, type: 'news' }));
  };

  useEffect(() => {
    if (isModalOpen) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (inView) {
      dispatch(setActiveLink('#news'));
    } else {
      dispatch(setActiveLink(''));
    }
  }, [inView, dispatch]);

  useEffect(() => {
    if (screenWidth > 1280) {
      setItemsPerPage(5);
      if (currentPage === 1) {
        setStart(0);
        setFinish(5);
      }
      if (currentPage === 2) {
        setStart(5);
        setFinish(10);
      }
      if (currentPage === 3) {
        setStart(10);
        setFinish(15);
      }
    }
    if (screenWidth > 768 && screenWidth <= 1280) {
      setItemsPerPage(3);
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
      if (currentPage === 4) {
        setStart(9);
        setFinish(12);
      }
    }
    if (screenWidth > 320 && screenWidth < 768) {
      setItemsPerPage(1);
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
      if (currentPage === 5) {
        setStart(4);
        setFinish(5);
      }
      if (currentPage === 6) {
        setStart(5);
        setFinish(6);
      }
      if (currentPage === 7) {
        setStart(6);
        setFinish(7);
      }
      if (currentPage === 8) {
        setStart(7);
        setFinish(8);
      }
    }
  }, [screenWidth, currentPage]);

  return (
    <section id="news" ref={ref}>
      <div className="mx-auto px-5 sm:w-[480px] md:w-[768px] md:px-12 md:py-12 lg:w-[1280px] lg:px-[120px] xl:w-[1440px]">
        {screenWidth > 768 && (
          <Slider title="Новини" pagesLength={1}>
            <NewsBlock />
          </Slider>
        )}
        {screenWidth < 768 && (
          <Slider title="Новини" pagesLength={3}>
            <NewsBlock />
          </Slider>
        )}

        {isModalOpen && type === 'news' && (
          <NewsModal isOpen={showModal} setShowModal={openNewsModal} />
        )}
      </div>
    </section>
  );
};

export default News;

// import { useEffect, useState } from 'react';
// import { useInView } from 'react-intersection-observer';

// import { useAppDispatch, useAppSelector } from '@/store/hook';
// import { openModal } from '@/store/slices/modalSlice';

// import Slider from '@/components/Slider';
// import NewsBlock from '@/components/News/NewsBlock';
// import NewsModal from '@/components/modals/NewsModal';

// import 'swiper/css/pagination';
// import 'swiper/css';
// import { setActiveLink } from '@/store/slices/observationSlice';
// import { useWidth } from '@/hooks/useWidth';

// const News = () => {
//   const dispatch = useAppDispatch();

//   const screenWidth = useWidth();
//   const [start, setStart] = useState(0);
//   const [finish, setFinish] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(6);
//   const [showModal, setShowModal] = useState(false);
//   const type = useAppSelector((state) => state.modals.type);
//   const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);
//   const { ref, inView } = useInView({
//     threshold: 0.5
//   });

//   const openNewsModal = () => {
//     dispatch(openModal({ data: {}, type: 'news' }));
//   };

//   useEffect(() => {
//     if (isModalOpen) {
//       setShowModal(true);
//     } else {
//       setShowModal(false);
//     }
//   }, [isModalOpen]);

//   useEffect(() => {
//     if (inView) {
//       dispatch(setActiveLink('#news'));
//     } else {
//       dispatch(setActiveLink(''));
//     }
//   }, [inView, dispatch]);
//   useEffect(() => {
//     if (screenWidth > 1280) {
//       setItemsPerPage(6);
//       if (currentPage === 1) {
//         setStart(0);
//         setFinish(6);
//       }
//       if (currentPage === 2) {
//         setStart(6);
//         setFinish(12);
//       }
//       if (currentPage === 3) {
//         setStart(12);
//         setFinish(18);
//       }
//     }
//     if (screenWidth > 768 && screenWidth <= 1280) {
//       setItemsPerPage(4);
//       if (currentPage === 1) {
//         setStart(0);
//         setFinish(4);
//       }
//       if (currentPage === 2) {
//         setStart(4);
//         setFinish(8);
//       }
//       if (currentPage === 3) {
//         setStart(8);
//         setFinish(12);
//       }
//       if (currentPage === 4) {
//         setStart(12);
//         setFinish(16);
//       }
//       if (currentPage === 5) {
//         setStart(14);
//         setFinish(18);
//       }
//     }
//     if (screenWidth > 320 && screenWidth < 768) {
//       setItemsPerPage(1);
//       if (currentPage === 1) {
//         setStart(0);
//         setFinish(1);
//       }
//       if (currentPage === 2) {
//         setStart(1);
//         setFinish(2);
//       }
//       if (currentPage === 3) {
//         setStart(2);
//         setFinish(3);
//       }
//       if (currentPage === 4) {
//         setStart(3);
//         setFinish(4);
//       }
//     }
//   }, [screenWidth, currentPage]);

//   return (
//     <section id="news" ref={ref}>
//       <div className="mx-auto px-5 sm:w-[480px] md:w-[768px] md:px-12 md:py-12 lg:w-[1280px] lg:px-[120px] xl:w-[1440px]">
//         {screenWidth > 768 && (
//           <Slider title="Новини" pagesLength={3}>
//             <NewsBlock />
//           </Slider>
//         )}
//         {screenWidth < 768 && (
//           <Slider title="Новини" pagesLength={3}>
//             <NewsBlock />
//           </Slider>
//         )}

//         {isModalOpen && type === 'news' && (
//           <NewsModal isOpen={showModal} setShowModal={openNewsModal} />
//         )}
//       </div>
//     </section>
//   );
// };

// export default News;
