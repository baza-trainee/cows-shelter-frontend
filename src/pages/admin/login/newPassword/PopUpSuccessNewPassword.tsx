import CloseIcon from '@/components/icons/CloseIconMenu';
import { NavLink, useNavigate } from 'react-router-dom';
type PopUpSuccessProps = {
  password: string;
};

const PopUpSuccessNewPassword = ({ password }: PopUpSuccessProps) => {
  const navigate = useNavigate();
  const closePopUp = () => navigate('/admin');
  return (
    <div
      onClick={closePopUp}
      className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-40"
    >
      <div className="relative h-[245px] w-[492px] bg-white px-[51px] py-[68px] ">
        <NavLink
          to={'/admin'}
          className="absolute right-5 top-5 z-20 flex h-10  w-10 items-center justify-center rounded-full bg-accent text-black"
        >
          <CloseIcon />
        </NavLink>
        <p className=" mb-3 w-[380px] text-lg font-medium">
          Пароль успішно змінено.{' '}
        </p>
        <p className="w-[380px]">Ваш новий пароль: </p>
        <span className="text-lg font-medium">{password}</span>
        <img
          src="/admin/bg.svg"
          alt="cow"
          className="absolute bottom-0 left-0 right-0 z-0"
        />
      </div>
    </div>
  );
};

export default PopUpSuccessNewPassword;
