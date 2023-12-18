import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewsFormInput } from '@/types';
import { useAppDispatch } from '@/store/hook';
import { addNewImage } from '@/store/slices/gallerySlice';
import FileInput from '@/components/admin/inputs/FileInput';
import { imageValidation } from './gallerySchema';
import CloseIcon from '@/components/icons/CloseIconMenu';
import { openAlert } from '@/store/slices/responseAlertSlice';
import {
  addSuccessResponseMessage,
  addErrorResponseMessage
} from '@/utils/responseMessages';

type AddImageProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const AddImage = ({ setIsModalOpen }: AddImageProps) => {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    handleSubmit,
    watch,
    control,
    formState: { isDirty, isValid }
  } = useForm<NewsFormInput>({
    resolver: zodResolver(imageValidation),
    mode: 'onChange',
    defaultValues: { image: [] }
  });

  const currentValues = watch();

  const setImagePreview = (file: File) => {
    const img = URL.createObjectURL(file);
    setImage(img);
  };

  useEffect(() => {
    if (!currentValues.image?.length) return;
    const file = currentValues.image[0];
    setImagePreview(file);
  }, [currentValues.image]);

  const onSubmit: SubmitHandler<NewsFormInput> = async (
    values: NewsFormInput
  ) => {
    try {
      setIsProcessing(true);
      await dispatch(addNewImage(values));
      setIsProcessing(false);
      setIsModalOpen(false);
      dispatch(openAlert(addSuccessResponseMessage('світлину')));
    } catch (error: any) {
      dispatch(openAlert(addErrorResponseMessage('світлину')));
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
            <h1 className=" text-left text-xl font-bold">Додавання світлини</h1>
            <FileInput
              name="image"
              control={control}
              accept="image/*"
              placeholder={'Оберіть файл:'}
              title="Оберіть файл"
            />
            <span className="mt-4 text-sm text-gray-500">
              Розмістити фото в галереї?
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
            <div className="relative text-left">
              <img
                src={
                  image
                    ? image
                    : 'https://healvets.org/wp-content/uploads/2021/10/ef3-placeholder-image.jpeg'
                }
                alt={'image'}
                className="h-[280px] w-[384px] rounded-sm object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddImage;
