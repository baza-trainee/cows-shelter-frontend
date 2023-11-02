import iconCalendar from '@/assets/icons/icon_calendar.svg';

import { useAppDispatch, useAppSelector } from '@/store/hook';

import { closeModal } from '@/store/slices/modalSlice';
import CloseIcon from '../icons/CloseIcon';

const NewsModal = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.modals.data);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={() => dispatch(closeModal())}
      >
        <div className="fixed inset-0 bg-black opacity-40 transition-all duration-500 ease-out"></div>
        <div className="fixed z-50 max-h-[677px] max-w-[1136px] bg-white p-16 opacity-100 transition-all duration-500 ease-out ">
          <h2 className="divide-y-4 text-2xl font-bold">{data?.title}</h2>
          <hr className=" m-8 my-2 h-px border-t-0 bg-slate-300 opacity-100 " />
          <div className="flex items-center pb-4 ">
            <img src={data?.url} alt="Your SVG Image" className="mr-3" />
            <p className="font-2xl  divide-y-4 ">{data?.date}</p>
          </div>

          <div className="">
            <p className="columns-2 gap-10 text-justify text-sm ">
              <img className="mb-8 h-80" />
              {data?.description}
            </p>
          </div>

          <CloseIcon />
        </div>
      </div>

      {/* <div
        className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black opacity-40 transition-opacity"
        onClick={handleCloseModal}
      >
        <div className=" fixed z-50 max-h-[677px] max-w-[1136px] bg-white p-16 opacity-100  ">
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
            <p className="columns-2 gap-10 text-justify text-sm ">
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
      </div> */}
    </>
  );
};

export default NewsModal;
