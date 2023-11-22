import CloseIcon from '@/components/icons/CloseIconMenu';

const PopUpForgotPassword = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40">
      <div className="relative h-[180px] w-[492px]  bg-white px-[51px] py-[56px] ">
        <button
          className="absolute right-5 top-5 text-black"
          //   onClick={closePopup}
        >
          <CloseIcon />
        </button>
        <p className=" text-[1.063rem] font-medium">
          Ви впевнені, що хочете змінити свій пароль?
        </p>
      </div>
    </div>
  );
};
export default PopUpForgotPassword;
