import { useEffect, useState } from 'react';
import Confirm from '@/components/admin/Confirm';
import Bucket from '@/components/icons/Bucket';
import AddIcon from '@/components/icons/AddIcon';
import AddPdf from './add';
import {
  deleteErrorResponseMessage,
  deleteSuccessResponseMessage
} from '@/utils/responseMessages';
import { openAlert } from '@/store/slices/responseAlertSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { fetchPdfs, removePdf } from '@/store/slices/pdfSlice';
import ResponseAlert from '@/components/admin/ResponseAlert';

const Pdf = () => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const documents = useAppSelector((state) => state.pdf.documents);
  const isAlertOpen = useAppSelector((state) => state.alert.isAlertOpen);

  useEffect(() => {
    dispatch(fetchPdfs());
  }, [dispatch, showModal]);

  const deletePdf = () => {
    try {
      dispatch(removePdf(currentId));
      dispatch(openAlert(deleteSuccessResponseMessage('документ')));
      setShowConfirm(false);
    } catch (error: any) {
      dispatch(openAlert(deleteErrorResponseMessage('документ')));
    }
  };

  return (
    <div className="relative px-12 pt-10">
      <h1 className="leading-48 mb-8 text-left text-3xl font-semibold tracking-normal">
        PDF Документи
      </h1>
      <div className="flex gap-5">
        <div className="flex  h-[222px] w-[211px]  flex-col	 items-center justify-center border-2 border-gray-300 px-8 ">
          <button className="mb-4" onClick={() => setShowModal(true)}>
            <AddIcon />
          </button>
          <h2 className="w-[147px] text-center text-darkgray">Додати PDF</h2>
        </div>
        <div className="flex flex-wrap gap-5">
          {documents.map((post) => (
            <div
              key={post.id}
              className="flex h-[222px] w-[211px] flex-col items-center justify-center border-2 border-gray-300 pt-4"
            >
              <img
                src="/admin/pdf_doc.svg"
                alt="pdf"
                width={85}
                height={85}
                className="mb-4"
              />
              <h2 className="w-3/4 text-center text-[13px] text-darkgray">
                {post.title}
              </h2>
              <div className="buttons mt-auto flex w-full justify-center gap-2 border-t  border-gray-300 bg-gray-100">
                <button
                  className="hover:text-red-500 flex h-10 w-10 items-center justify-center text-xl text-black"
                  onClick={() => {
                    setShowConfirm(true), setCurrentId(post.id);
                  }}
                >
                  <Bucket />
                </button>
              </div>
            </div>
          ))}
        </div>
        {showModal && <AddPdf setIsModalOpen={setShowModal} />}
        {showConfirm && (
          <Confirm
            setShowConfirm={setShowConfirm}
            title="Чи ви впевнені, що хочете видалити дкумент зі сторінки?"
            onConfirm={deletePdf}
          />
        )}
        {isAlertOpen && <ResponseAlert />}
      </div>
    </div>
  );
};

export default Pdf;
