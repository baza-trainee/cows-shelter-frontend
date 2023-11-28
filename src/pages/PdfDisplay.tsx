/* eslint-disable prefer-spread */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { fetchPdfById } from '@/store/slices/pdfSlice';
import DocViewer, { PDFRenderer } from '@cyntler/react-doc-viewer';
import Loader from '@/components/admin/Loader';

const PdfDisplay = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const documents = useAppSelector((state) => state.pdf.documents);
  const isLoading = useAppSelector((state) => state.pdf.loading);

  useEffect(() => {
    dispatch(fetchPdfById(id!));
  }, [dispatch, id]);

  const url = documents[0]?.document_url;

  const docs = [{ uri: url }];

  return (
    <div className="relative flex h-screen w-[100vw] justify-center">
      {isLoading ? (
        <Loader />
      ) : (
        <DocViewer
          documents={docs}
          pluginRenderers={[PDFRenderer]}
          initialActiveDocument={docs[1]}
          style={{ width: 1000, height: 1000 }}
          config={{
            header: {
              disableHeader: false,
              disableFileName: true,
              retainURLParams: false
            },

            pdfZoom: {
              defaultZoom: 1.1,
              zoomJump: 0.2
            },
            pdfVerticalScrollByDefault: true
          }}
        />
      )}
    </div>
  );
};

export default PdfDisplay;
