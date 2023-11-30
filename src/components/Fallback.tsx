const Fallback = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <p className="absolute left-[5%] top-[30%] z-0 text-3xl font-bold">
        Something went wrong... Please, try again later.
      </p>
      <img
        src="/admin/bg.svg"
        alt="cow"
        className="absolute bottom-0 left-0 right-0 z-0 w-full"
      />
    </div>
  );
};

export default Fallback;
