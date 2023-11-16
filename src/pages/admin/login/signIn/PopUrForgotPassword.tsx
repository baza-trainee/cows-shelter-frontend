import CloseIcon from '@/components/icons/CloseIconMenu';
import { ForgotPasswordProps } from '@/types';

const PopUpForgotPassword = ({ email, closePopup }: ForgotPasswordProps) => {
  return (
    <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-black bg-opacity-40">
      <div className="relative h-[180px] w-[492px] bg-white px-[51px] py-[56px] ">
        <button
          className="absolute right-5 top-5 text-black"
          onClick={closePopup}
        >
          <CloseIcon />
        </button>
        <p className=" text-[1.063rem] font-medium">
          Забули пароль? На вашу адресу{' '}
          <span className=" text-darkyellow">{email}</span> відправлено листа з
          новим паролем для входу.
        </p>
      </div>
    </div>
  );
};
export default PopUpForgotPassword;
