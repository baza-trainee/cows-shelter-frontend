import { useAppSelector } from '@/store/hook';

const ShareModal = () => {
  const data = useAppSelector((state) => state.modals.data);

  return (
    <div className="absolute left-[50%] top-[50%] z-[9999] flex h-[30vh] w-[30vw] -translate-x-[50%] -translate-y-[50%] items-center justify-center bg-white p-4 text-black">
      {Array.isArray(data) &&
        data.length &&
        data.map((item: string, index: number) => <p key={index}>{item}</p>)}
    </div>
  );
};

export default ShareModal;
