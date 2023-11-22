import SingInForm from './SingInForm';

const SignIn = () => {
  return (
    <section className="flex w-[1280px] border-2 border-green-600">
      <div className="w-[620px] pt-[60px] ">
        <h2 className="mb-10 text-center text-4xl font-bold">
          Адміністрування сайту
        </h2>
        <h3 className=" mb-4 text-center text-[1.375rem]">
          Підтвердіть свій акаунт
        </h3>
        <SingInForm />
        {/* <div className="flex justify-center gap-2">
          <p>Не маєте акаунту? </p>
          <NavLink className="text-darkyellow" to="/signup">
            Зареєструватись
          </NavLink>
        </div> */}
      </div>
      <img src="/admin/img-login.png" width="660px" alt="cow" />
    </section>
  );
};
export default SignIn;
