import 'swiper/css';
import 'swiper/css/pagination';

import Slider from './Slider';
import NewsBlock from '@/components/News/NewsBlock';
import NewsModal from './News/NewsModal';
import { useAppSelector } from '@/store/hook';

const News = () => {
  const type = useAppSelector((state) => state.modals.type);
  const isModalOpen = useAppSelector((state) => state.modals.isModalOpen);

  return (
    <section id="news" className="container mx-auto flex flex-col ">
      <Slider title="Новини" pagesLength={3}>
        <NewsBlock></NewsBlock>
      </Slider>
      {isModalOpen && type === 'news' && <NewsModal />}
    </section>
  );
};

export default News;
