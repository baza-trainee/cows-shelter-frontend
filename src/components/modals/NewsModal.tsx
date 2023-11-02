import iconCalendar from '@/assets/icons/icon_calendar.svg';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { closeModal } from '@/store/slices/modalSlice';
import CloseIcon from '../icons/CloseIcon';

const NewsModal = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.modals.data);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClick={() => dispatch(closeModal())}
      >
        <div className="fixed inset-0 bg-black opacity-40 transition-all duration-500 ease-out"></div>
        <div className="fixed z-50 max-h-[582px] overflow-y-auto bg-white px-5 pb-6 pt-9 opacity-100 transition-all duration-500 ease-out md:max-h-[832px] lg:w-[1136px] ">
          <h2 className="text-lg font-semibold lg:divide-y-4 lg:text-2xl lg:font-bold">
            {news?.title}
          </h2>
          <hr className=" my-2 h-px border-t-0 bg-slate-300 opacity-0 md:opacity-100" />
          <div className="pb-4">
            <div className="flex  items-center">
              <img src={iconCalendar} alt="Image" className="mr-3" />
              <p className="text-sm font-normal">Опубліковано {news?.date}</p>
            </div>
          </div>
          <div className="w-full text-justify text-sm lg:columns-2 lg:px-4">
            <img
              className=" mx-auto mb-4 h-52 object-contain md:h-52 md:w-[582px] md:object-cover lg:h-[572px] lg:w-[488px] lg:object-cover  "
              src={news?.url}
            />
            <p>{news?.text}</p>
          </div>
          <CloseIcon />
        </div>
      </div>
    </>
  );
};

export default NewsModal;

// columns-2 gap-10 text-justify text-sm
