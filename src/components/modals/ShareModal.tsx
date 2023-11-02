import { Dispatch, SetStateAction } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';

type ShareModalProps = {
  activeImage: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const ShareModal = ({ activeImage, setShowModal }: ShareModalProps) => {
  return (
    <div className="absolute left-[50%] top-[50%] z-[9999] flex h-[30vh] w-[30vw] -translate-x-[50%] -translate-y-[50%] items-center justify-center bg-white p-4 text-black">
      <button
        onClick={() => setShowModal(false)}
        className="absolute right-2 top-2"
      >
        X
      </button>
      <FacebookShareButton url={activeImage} quote={'Share it'} hashtag="#cows">
        <FacebookIcon iconFillColor="white" round={true} />
      </FacebookShareButton>
    </div>
  );
};

export default ShareModal;
