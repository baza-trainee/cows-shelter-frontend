import { Dispatch, SetStateAction } from 'react';

type ConfirmProps = {
  title: string;
  onConfirm: () => void;
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
};

const Confirm = ({ title, onConfirm, setShowConfirm }: ConfirmProps) => {
  return (
    <div
      className={`absolute left-0 top-0 z-[9999] flex h-full min-h-screen w-full items-center justify-center bg-black/70`}
    >
      <div className="absolute flex h-[236px] w-[492px] flex-col items-center justify-center gap-8 bg-white p-4 text-black shadow-2xl">
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
    </div>
  );
};

export default Confirm;
