import React from 'react';
import iconCalendar from '@/assets/icons/icon_calendar.svg';
import image2 from '@/assets/imgs/news_2.jpg';

interface NewsModalProps {
  open: boolean;
  handleClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ open }) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed left-0 top-0 z-40 h-full w-full bg-black opacity-40 outline-none ">
        <div className=" fixed left-1/2 top-1/2 z-50 h-full  w-full -translate-x-1/2 -translate-y-1/2 bg-white p-16">
          <h2 className="divide-y-4 text-2xl font-bold">
            Провели генеральне чищення загонів
          </h2>
          <hr className=" m-8 my-2 h-px border-t-0 bg-slate-300 opacity-100 " />
          <div className="flex items-center pb-4 ">
            <img src={iconCalendar} alt="Your SVG Image" className="mr-3" />
            <p className="font-2xl  divide-y-4 ">
              Опубліковано 13 грудня, 2023
            </p>
          </div>

          <div className="">
            <p className="columns-2 gap-10 text-justify text-lg ">
              <img className="mb-8 h-80" src={image2} />
              Підопічні в захваті, особливо Ярила. Навіть маленькі досягнення це
              якісна мотивація, проте, як і раніше, головним елементом, що
              гальмує процес, стає критична ситуація з фінансами. Збір гостро
              необхідних коштів практично не рухається. Якщо не виправиться
              ситуація, що склалася на сьогодні, притулок зануриться в
              непіднімні борги. Потрібно зрозуміти, що суми, якої бракує зараз,
              у минулих сезонах збиралися значно легше. Сьогодні ж через значне
              перенаправлення великих потоків пожертвувань у військовий сектор,
              інші благодійні напрямки ризикують бути просто знищені через
              відсутність коштів для життя. В особливо складному становищі
              перебувають притулки з такими великими істотами, як корови та
              коні. Військовий сектор, крім приватних пожертвувань, отримує
              величезну допомогу від інших країн, навіть притулки котикiв і
              собак отримують значну підтримку, якщо порівнювати їх із
              притулками істот, що належать до сільськогосподарського сектору,
              але при цьому не є комерційними підприємствами напрямки ризикують
              бути просто знищені через відсутність коштів для життя. В особливо
              складному становищі перебувають притулки з такими великими
              істотами, як корови та коні. Військовий сектор, крім приватних
              пожертвувань, отримує величезну допомогу від інших країн, навіть
              притулки котикiв і собак отримують значну підтримку, якщо
              порівнювати їх із притулками істот, що належать до
              сільськогосподарського сектору, але при цьому не є комерційними
              підприємствами
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsModal;
