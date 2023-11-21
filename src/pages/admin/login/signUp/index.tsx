import { NavLink } from 'react-router-dom';
import SingUpForm from './SignUpForm';

const SignUp = () => {
  return (
    <section className="flex w-[1280px] border-2 border-green-600">
      <div className="w-[620px] pt-[60px] ">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Адміністрування сайту
        </h2>
        <h3 className=" mb-4 text-center text-[1.375rem]">
          Зареєструйтесь в системі
        </h3>
        <SingUpForm />
        <div className="flex justify-center gap-2">
          <p>Вже маєте акаунт? </p>
          <NavLink className="text-darkyellow" to="/signin">
            Авторизуватись
          </NavLink>
        </div>
      </div>
      <img src="/admin/img-login.png" width="660px" alt="cow" />
    </section>
  );
};
export default SignUp;
