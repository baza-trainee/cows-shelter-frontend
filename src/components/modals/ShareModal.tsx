import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { TelegramShareButton, TelegramIcon } from 'react-share';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import { EmailShareButton, EmailIcon } from 'react-share';

type ShareModalProps = {
  activeImage: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const ShareModal = ({ activeImage, setShowModal }: ShareModalProps) => {
  const { t } = useTranslation();
  return (
    <div className="absolute left-[50%] top-[57%] z-[9999] flex h-[70%] w-[90%] -translate-x-[50%] -translate-y-[50%] flex-col items-center justify-center bg-white p-4 text-center text-black md:top-[50%] md:h-[15rem] md:w-[50%] lg:h-[30%] lg:w-[30%]">
      <button
        onClick={() => setShowModal(false)}
        className="absolute right-4 top-4"
      >
        <img src="/gallery/vector.png" alt="close share modal" />
      </button>
      <h1 className="mb-4">{t('gallery:share')}</h1>
      <div className="flex items-center justify-center gap-2">
        <FacebookShareButton
          url={activeImage}
          quote={'Share it on Facebook'}
          hashtag="#zdrave_juttia"
        >
          <FacebookIcon iconFillColor="white" round={true} size={35} />
        </FacebookShareButton>
        <TelegramShareButton url={activeImage} title="Здраве Життя">
          <TelegramIcon iconFillColor="white" round={true} size={35} />
        </TelegramShareButton>
        <WhatsappShareButton url={activeImage} title="Здраве Життя">
          <WhatsappIcon iconFillColor="white" round={true} size={35} />
        </WhatsappShareButton>
        <EmailShareButton url={activeImage} subject="Здраве Життя">
          <EmailIcon iconFillColor="white" round={true} size={35} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareModal;
