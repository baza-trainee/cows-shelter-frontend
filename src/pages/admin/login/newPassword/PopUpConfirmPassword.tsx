import CloseIcon from '@/components/icons/CloseIconMenu';
import { NavLink } from 'react-router-dom';

type ConfirmPasswordProps = {
  onSubmit: () => void;
  closeConfirmPassword: () => void;
};

const PopUpConfirmPassword = ({
  onSubmit,
  closeConfirmPassword
}: ConfirmPasswordProps) => {
  return (
    <div
      onClick={closeConfirmPassword}
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40"
    >
      <div className="relative h-[236px] w-[492px]  bg-white p-[56px] ">
        <button
          onClick={closeConfirmPassword}
          className="absolute right-5 top-5 text-black"
        >
          <CloseIcon />
        </button>
        <p className=" mb-7 text-[1.063rem] font-medium">
          Ви впевнені, що хочете змінити свій пароль?
        </p>
        <div className="flex gap-5 text-lg font-medium">
          <button
            onClick={onSubmit}
            type="button"
            className="w-[183px] bg-accent px-5 py-3 transition-all duration-300 hover:bg-lemon focus:bg-lemon active:bg-darkyellow  disabled:bg-disabled  disabled:text-white"
          >
            Змінити
          </button>
          <NavLink
            to="/admin"
            className="w-[183px] border border-black px-5 py-3 text-center transition-all duration-300 hover:border-transparent hover:bg-lemon  focus:bg-lemon  active:bg-darkyellow "
          >
            Скасувати
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PopUpConfirmPassword;
