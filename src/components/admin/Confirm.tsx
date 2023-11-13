import { Dispatch, SetStateAction } from 'react';

type ConfirmProps = {
  setShowConfirm: Dispatch<SetStateAction<boolean>>;
};

const Confirm = ({ setShowConfirm }: ConfirmProps) => {
  return (
    <div className="absolute left-[50%] top-[50%] z-[9999] flex h-[30vh] w-[30vw] -translate-x-[50%] -translate-y-[50%] flex-col items-center justify-center gap-8 bg-[#232323] p-4 text-white shadow-2xl">
      <h1 className="text-xl font-bold">Are you sure?</h1>
      <div className="buttons flex items-center justify-center gap-4 text-black">
        <button
          onClick={() => setShowConfirm(false)}
          className="border border-green-700 bg-green-100 px-4 py-2"
        >
          Yes I`m sure
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className="border border-red-700 bg-red-100 px-4 py-2"
        >
          No, I have doubts
        </button>
      </div>
    </div>
  );
};

export default Confirm;
