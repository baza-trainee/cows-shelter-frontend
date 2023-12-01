import { useAppDispatch } from '@/store/hook';
import { openModal } from '@/store/slices/modalSlice';
import { Post } from '@/store/slices/newsSlice';

import { useTranslation } from 'react-i18next';

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
      <ul className="grid h-[281px] gap-4 pt-[3rem] md:h-[586px] md:grid-cols-2 lg:grid-cols-3">
        {posts && Array.isArray(posts) ? (
          posts?.map((post, index) => (
            <li
              key={post.id}
              className={`group relative cursor-pointer  ${
                index === 0
                  ? 'row-span-2 max-h-[201px] min-w-[302px] max-w-[384px] md:max-h-[586px]'
                  : 'h-[254px] max-w-[384px]'
              }`}
            >
              <img
                src={post.image_url}
                alt={`News Image`}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 z-20 cursor-pointer bg-black/40 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100"></div>
              <div className="  via-opacity-30 absolute inset-0 z-30 flex cursor-pointer flex-col bg-gradient-to-b from-transparent to-black/40  ">
                <div className="flex h-full flex-col justify-end text-white">
                  <div className=" translate-y-14  space-y-3 p-4 duration-300 ease-in-out group-hover:translate-y-0">
                    <h2 className="text-2xl font-normal">
                      {language === 'uk' ? post.title_ua : post.title_en}
                    </h2>
                    <div className="text-sm opacity-0 group-hover:opacity-100 ">
                      {language === 'uk' ? post.subtitle_ua : post.subtitle_en}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => openNewsModal(post)}
                    className="relative mb-6 ml-6 mt-5 border-2 border-transparent py-1 text-white group-hover:border-yellow-500"
                  >
                    <div className="flex items-center">
                      <p
                        className=" px-4 
"
                      >
                        Показати більше
                      </p>
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
// div className="flex gap-3 border border-transparent px-5 py-2.5 hover:border-yellow-500 md:group-hover:border-white ">
