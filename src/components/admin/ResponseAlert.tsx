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
        className={`relative flex h-[220px] w-[492px] items-center justify-center border-b border-b-4 bg-white text-[17px] shadow-xl ${
          isErrorMessage ? 'border-b-red' : 'border-b-green-500'
        }`}
      >
        <p className="absolute left-[5%] top-[20%] z-[9999] w-1/2 text-xl font-bold">
          {message}
        </p>
        <img
          src="/admin/bg.svg"
          alt="cow"
          className="absolute bottom-0 left-0 right-0 z-0"
        />
      </div>
    </div>
  );
};

export default ResponseAlert;
