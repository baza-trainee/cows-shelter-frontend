import { Dispatch, SetStateAction, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PdfFormInput } from '@/types';
import { useAppDispatch } from '@/store/hook';
import { addNewPdf } from '@/store/slices/pdfSlice';
import FileInput from '@/components/admin/inputs/FileInput';
import { pdfValidation } from './pdfValidation';
import CloseIcon from '@/components/icons/CloseIconMenu';
import TextInput from '@/components/admin/inputs/TextInput';

type AddPdfProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const AddPdf = ({ setIsModalOpen }: AddPdfProps) => {
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<PdfFormInput>({
    mode: 'onChange',
    defaultValues: { title: '', document: [] }
  });

  const onSubmit: SubmitHandler<PdfFormInput> = async (
    values: PdfFormInput
  ) => {
    setIsProcessing(true);
    await dispatch(addNewPdf(values));
    setIsProcessing(false);
    setIsModalOpen(false);
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
              rules={pdfValidation.title}
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
              accept="image/*"
              placeholder={'Оберіть файл:'}
              title="Оберіть файл"
              rules={pdfValidation.pdf}
            />
            <span className="mt-4 text-sm text-gray-500">
              Розмістити фото в галереї?
            </span>
            <div className="flex gap-4">
              <button className=" w-full rounded-sm bg-gray-200 p-2 hover:bg-lemon">
                {isProcessing ? 'Обробка запиту...' : 'Розмістити'}
              </button>

              <button
                onClick={() => setIsModalOpen(false)}
                className=" hover:border-red-300 hover:bg-red-300 w-full rounded-sm  border border-gray-500 p-2"
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="flex w-1/2 justify-center">
            <div className="relative text-left">
              {/* <img
                src={
                  image
                    ? image
                    : 'https://healvets.org/wp-content/uploads/2021/10/ef3-placeholder-image.jpeg'
                }
                alt={'image'}
                className="h-[280px] w-[384px] rounded-sm object-cover"
              /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPdf;
