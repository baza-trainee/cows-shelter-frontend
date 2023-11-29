import { useAppSelector, useAppDispatch } from '@/store/hook';
import { closeAlert } from '@/store/slices/responseAlertSlice';
import { useEffect } from 'react';

const ResponseAlert = () => {
  const dispatch = useAppDispatch();
  const message = useAppSelector((state) => state.alert.message);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        dispatch(closeAlert());
      }, 2000);
    }
  }, [dispatch, message]);

  const isErrorMessage = message.includes('не вдалося');

  return (
    <div className="absolute left-0 top-0 z-[9999] flex h-screen w-full items-center justify-center">
      <div
        className={` flex h-[180px] w-[492px] items-center justify-center border-b border-b-4 border-b-green-500 bg-white text-[17px] shadow-xl ${
          isErrorMessage ? 'border-b-red' : 'border-b-green-500'
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ResponseAlert;
