import image1 from '@/assets/imgs/news_1.jpg';
import image2 from '@/assets/imgs/news_2.jpg';
import image3 from '@/assets/imgs/news_3.jpg';
import image4 from '@/assets/imgs/news_4.jpg';
import image5 from '@/assets/imgs/news_5.jpg';

const NewsBlock = () => {
  const newsItems = [
    {
      image: image5,
      title: 'Вітаємо наших однодумців!',
      description:
        'Коли корови перебувають в умовах любові, вони реалізують свою природну функцію'
    },
    {
      image: image2,
      title: 'Провели генеральне чищення загонів!',
      description:
        'Коли корови перебувають в умовах любові, вони реалізують свою природну функцію'
    },
    {
      image: image3,
      title: 'Благодійна грошова допомога від UAnimals',
      description:
        'Коли корови перебувають в умовах любові, вони реалізують свою природну функцію'
    },
    {
      image: image4,
      title: 'Вдалося виростити вітамінні смаколики!',
      description:
        'Коли корови перебувають в умовах любові, вони реалізують свою природну функцію'
    },
    {
      image: image1,
      title: 'Зробили першу закупівлю кормів',
      description:
        'Коли корови перебувають в умовах любові, вони реалізують свою природну функцію'
    }
  ];

  return (
    <div>
      <ul className="grid grid-cols-3 gap-6">
        {newsItems.map((news, index) => (
          <li
            key={index}
            className={`group relative cursor-pointer  ${
              index === 0 ? 'h-586 w-46 row-span-2' : ''
            }`}
          >
            <img
              src={news.image}
              alt={`News Image`}
              className=" h-full w-full object-cover "
            />
            <div className="absolute inset-0 z-20 cursor-pointer bg-black/40 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100"></div>
            <div className="  via-opacity-30 absolute inset-0 z-30 flex cursor-pointer flex-col bg-gradient-to-b from-transparent to-black/40  ">
              <div className="flex h-full flex-col justify-end text-white">
                <div className=" translate-y-14  space-y-3 p-4 duration-300 ease-in-out group-hover:translate-y-0">
                  <h2 className="text-2xl font-normal">{news.title}</h2>
                  <div className="text-sm opacity-0 group-hover:opacity-100 ">
                    {news.description}
                  </div>
                </div>
              </div>
              <div className=" ">
                <button className="relative mb-6 ml-6 mt-5 border-2 border-transparent py-1 text-white group-hover:border-yellow-500">
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
        ))}
      </ul>
    </div>
  );
};

export default NewsBlock;
