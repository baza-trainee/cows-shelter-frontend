import { Dispatch, SetStateAction, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PdfFormInput } from '@/types';
import { useAppDispatch } from '@/store/hook';
import { addNewPdf } from '@/store/slices/pdfSlice';
import FileInput from '@/components/admin/inputs/FileInput';
import { pdfValidation } from './pdfSchema';
import CloseIcon from '@/components/icons/CloseIconMenu';
import TextInput from '@/components/admin/inputs/TextInput';
import {
  addSuccessResponseMessage,
  addErrorResponseMessage
} from '@/utils/responseMessages';
import { openAlert } from '@/store/slices/responseAlertSlice';

type AddPdfProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const AddPdf = ({ setIsModalOpen }: AddPdfProps) => {
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isDirty }
  } = useForm<PdfFormInput>({
    resolver: zodResolver(pdfValidation),
    mode: 'onChange',
    defaultValues: { title: '', document: [] }
  });

  const onSubmit: SubmitHandler<PdfFormInput> = async (
    values: PdfFormInput
  ) => {
    try {
      setIsProcessing(true);
      await dispatch(addNewPdf(values));
      setIsProcessing(false);
      setIsModalOpen(false);
      dispatch(openAlert(addSuccessResponseMessage('документ')));
    } catch (error) {
      dispatch(openAlert(addErrorResponseMessage('документ')));
    }
  };

  return (
    <div className="fixed left-[270px] top-0 z-20 h-full w-5/6 bg-[rgba(0,0,0,0.6)]">
      <div className="absolute left-[50%] top-[50%] z-[9999] flex h-[401px] w-[920px] -translate-x-[50%] -translate-y-[50%] flex-col items-start justify-center gap-4 bg-white px-4 py-8 text-black">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute right-2 top-2 h-8 w-8"
        >
          <CloseIcon />
        </button>
        <div className="flex w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-1/2 flex-1 flex-col gap-4 p-4"
          >
            <h1 className=" text-left text-xl font-bold">
              Додавання Документу
            </h1>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  errorText={errors.title?.message}
                  placeholder="Введіть назву документу"
                  title="Назва документу:"
                />
              )}
            />
            <FileInput
              name="document"
              control={control}
              accept="application/*"
              placeholder={'Оберіть файл:'}
              title="Оберіть файл"
            />
            <span className="mt-4 text-sm text-gray-500">
              Розмістити документ на сайті?
            </span>
            <div className="flex gap-4">
              <button
                className={`w-[13.5rem] px-6 py-2 font-medium ${
                  isDirty && isValid
                    ? 'cursor-pointer bg-accent text-black'
                    : 'cursor-not-allowed bg-disabled text-white'
                }`}
              >
                {isProcessing ? 'Обробка запиту...' : 'Розмістити'}
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className="w-[13.5rem] border border-black bg-white px-6 py-2 font-medium transition-all hover:border-accent active:border-disabled"
              >
                Скасувати
              </button>
            </div>
          </form>

          <div className="flex w-1/2 justify-center">
            <div className="relative text-left"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPdf;
