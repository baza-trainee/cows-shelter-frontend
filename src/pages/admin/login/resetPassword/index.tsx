import ReserPasswordForm from './ResetPasswordForm';

const ResetPassword = () => {
  return (
    <section className="flex w-[1280px]">
      <div className="w-[620px] pt-[60px] ">
        <h2 className=" mb-[59px] text-center text-[2rem] font-semibold">
          Скидання пароля
        </h2>
        <ReserPasswordForm />
      </div>
      <img src="/admin/img-login.png" width="660px" alt="cow" />
    </section>
  );
};
export default ResetPassword;
