import { useAppSelector, useAppDispatch } from '@/store/hook';
import { closeModal } from '@/store/slices/modalSlice';
import { FacebookShareButton, FacebookIcon } from 'react-share';

const ShareModal = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.modals.data);

  return (
    <div className="absolute left-[50%] top-[50%] z-[9999] flex h-[30vh] w-[30vw] -translate-x-[50%] -translate-y-[50%] items-center justify-center bg-white p-4 text-black">
      <button
        onClick={() => dispatch(closeModal())}
        className="absolute right-2 top-2"
      >
        X
      </button>
      <FacebookShareButton
        url={data as string}
        quote={'Share it'}
        hashtag="#cows"
      >
        <FacebookIcon iconFillColor="white" round={true} />
      </FacebookShareButton>
    </div>
  );
};

export default ShareModal;
