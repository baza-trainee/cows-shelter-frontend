import { useAppDispatch } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { Post } from '@/store/slices/newsSlice';

import { useTranslation } from 'react-i18next';
import LittleArrow from '../icons/LittleArrow';

const NewsBlock = ({ posts }: { posts: Post[] }) => {
  const { language } = useTranslation().i18n;
  const dispatch = useAppDispatch();

  const openNewsModal = (item: Post) => {
    dispatch(openModal({ data: item, type: 'news' }));
  };

  return (
    <div>
      <ul className=" grid h-[210px] gap-8 pt-[3rem] md:h-[586px] md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {posts.map((post, index) => (
          <li
            key={post.id}
            className={`group relative cursor-pointer  ${
              index === 0
                ? 'row-span-2 max-h-[250px] min-w-[302px] max-w-[384px] md:max-h-[586px]'
                : 'h-[254px] max-w-[384px]'
            }`}
          >
            <img
              src={post.image_url}
              alt={`News Image`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 z-20 cursor-pointer bg-black/40 opacity-0 transition duration-300 ease-in-out md:group-hover:opacity-100"></div>
            <div className="  via-opacity-30 absolute inset-0 z-30 flex cursor-pointer flex-col bg-gradient-to-b from-transparent to-black/40  ">
              <div className="flex h-full flex-col justify-end text-white">
                <div className=" translate-y-14  space-y-3 p-4 duration-300 ease-in-out md:group-hover:translate-y-0">
                  <h2 className="text-sm font-normal md:text-2xl">
                    {language === 'uk' ? post.title_ua : post.title_en}
                  </h2>
                  <div className="text-sm opacity-0 md:text-xl md:group-hover:opacity-100 ">
                    {language === 'uk' ? post.subtitle_ua : post.subtitle_en}
                  </div>
                </div>
              </div>
              <div>
                <button
                  onClick={() => openNewsModal(post)}
                  className="relative mb-6 ml-6 mt-5 border border-white text-white hover:border-yellow-500  md:border-transparent  "
                >
                  <div className="flex gap-3 px-5 py-2.5 ">
                    <p>Показати більше</p>
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
// div className="flex gap-3 border border-transparent px-5 py-2.5 hover:border-yellow-500 md:group-hover:border-white ">
