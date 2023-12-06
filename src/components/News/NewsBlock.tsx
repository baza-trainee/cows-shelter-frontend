import { useAppDispatch } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { Post } from '@/store/slices/newsSlice';

import { useTranslation } from 'react-i18next';
import LittleArrow from '../icons/LittleArrow';

type NewsBlockProps = {
  posts: Post[];
};

const NewsBlock = ({ posts }: NewsBlockProps) => {
  const { language } = useTranslation().i18n;
  const dispatch = useAppDispatch();

  const openNewsModal = (item: Post) => {
    dispatch(openModal({ data: item, type: 'news' }));
  };

  return (
    <div>
      <ul className="grid h-[210px] pt-[3rem] md:h-[586px] md:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {posts && Array.isArray(posts) ? (
          posts?.map((post, index) => (
            <li
              key={post.id}
              className={`group relative cursor-pointer  ${
                index === 0
                  ? 'row-span-2 max-h-[201px] min-w-[302px] max-w-[384px] md:max-h-[531px]'
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
                    <div className="text-sm opacity-0 md:group-hover:opacity-100 lg:text-sm ">
                      {language === 'uk' ? post.subtitle_ua : post.subtitle_en}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => openNewsModal(post)}
                    className="relative mb-6 ml-6 mt-5 flex gap-3 border border-solid border-white py-2 pl-6 pr-2.5 text-white transition-all duration-300 lg:border-transparent lg:focus:border-accent lg:active:border-accent lg:group-hover:border-white lg:group-hover:hover:border-accent"
                  >
                    <div className="flex items-center">
                      <span className="text-md px-4 font-medium leading-tight">
                        {language === 'uk' ? 'Показати більше' : 'Show more'}
                      </span>
                    </div>
                    <div className="pr-4">
                      <LittleArrow />
                    </div>
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>Сервер не відповідає</p>
        )}
      </ul>
    </div>
  );
};

export default NewsBlock;
