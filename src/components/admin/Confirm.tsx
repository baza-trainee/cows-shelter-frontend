import { Dispatch, SetStateAction } from 'react';

type ConfirmProps = {
  title: string;
  onConfirm: () => void;
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
};

const Confirm = ({ title, onConfirm, setShowConfirm }: ConfirmProps) => {
  return (
    <div className="absolute left-[50%] top-[50%] z-[9999] flex h-[236px] w-[492px] -translate-x-[50%] -translate-y-[50%] flex-col items-center justify-center gap-8 bg-white p-4 p-[56px] text-black shadow-2xl">
      <h1 className="text-center text-xl">{title}</h1>
      <div className="buttons flex items-center justify-center gap-4 text-black">
        <button
          onClick={onConfirm}
          className="w-[180px] border bg-accent px-4 py-2 hover:bg-lemon"
        >
          Видалити
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="w-[180px] border px-4 py-2 hover:bg-gray-200"
        >
          Скасувати
        </button>
      </div>
    </div>
  );
};

export default Confirm;
