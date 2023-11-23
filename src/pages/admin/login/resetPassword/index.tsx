import ReserPasswordForm from './ResetPasswordForm';

const ResetPassword = () => {
  return (
    <section className="flex w-[1280px]">
      <div className="w-[620px] pt-[60px] ">
        <h3 className=" mb-4 text-center text-[1.375rem]">Скидання паролю</h3>
        <ReserPasswordForm />
      </div>
      <img src="/admin/img-login.png" width="660px" alt="cow" />
    </section>
  );
};
export default ResetPassword;
