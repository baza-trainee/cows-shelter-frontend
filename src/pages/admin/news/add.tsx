import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { defaultValues } from './defaultValues';
import { NewsFormInput } from '@/types';
import { newsValidation } from './newsSchema';
import { useAppDispatch } from '@/store/hook';
import { addNewPost } from '@/store/slices/newsSlice';
import TextInput from '@/components/admin/inputs/TextInput';
import TextArea from '@/components/admin/inputs/TextArea';
import FileInput from '@/components/admin/inputs/FileInput';

import { openAlert } from '@/store/slices/responseAlertSlice';
import {
  addSuccessResponseMessage,
  addErrorResponseMessage
} from '@/utils/responseMessages';

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<NewsFormInput>({
    resolver: zodResolver(newsValidation),
    mode: 'onChange',
    defaultValues: defaultValues
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
      await dispatch(addNewPost(values));
      setIsProcessing(false);
      dispatch(openAlert(addSuccessResponseMessage('новину')));
      navigate(-1);
    } catch (error: any) {
      dispatch(openAlert(addErrorResponseMessage('новину')));
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-start justify-center gap-4 pb-[134px] pl-[48px] pr-[142px] ">
      <div className="mb-[12px] mt-[48px]">
        <h1 className="text-3xl font-bold">Додавання Новини</h1>
      </div>
      <div className="flex w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex flex-1 flex-col gap-4"
        >
          <div className="flex gap-2">
            <section className="flex flex-col items-center justify-center gap-4">
              <Controller
                name="titleUa"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.titleUa?.message}
                    placeholder="Введіть заголовок"
                    title="Заголовок:"
                  />
                )}
              />
              <Controller
                name="titleEn"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.titleEn?.message}
                    placeholder="Введіть заголовок"
                    title="Заголовок англійською:"
                  />
                )}
              />
              <Controller
                name="subTitleUa"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.subTitleUa?.message}
                    placeholder="Введіть підзаголовок"
                    title="Підзаголовок:"
                  />
                )}
              />
              <Controller
                name="subTitleEn"
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.subTitleEn?.message}
                    placeholder="Введіть підзаголовок"
                    title="Підзаголовок англійською:"
                  />
                )}
              />

              <Controller
                name="contentUa"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    errorText={errors.contentUa?.message}
                    placeholder="Введіть текст новини"
                    title="Основна частина:"
                  />
                )}
              />
              <Controller
                name="contentEn"
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    errorText={errors.contentEn?.message}
                    placeholder="Введіть текст новини"
                    title="Основна частина англійською:"
                  />
                )}
              />
            </section>

            <section className="flex flex-col items-center justify-center gap-4 px-8">
              <div className="mt-[5vh] flex w-full flex-col items-center justify-center gap-8 ">
                <div className="relative text-left">
                  <img
                    src={
                      image
                        ? image
                        : 'https://healvets.org/wp-content/uploads/2021/10/ef3-placeholder-image.jpeg'
                    }
                    alt={currentValues.titleUa}
                    className="h-[240px] w-[320px] rounded-md object-cover"
                  />
                  <h2
                    className={`absolute bottom-4 left-2 text-xl font-bold ${
                      !image ? 'text-gray-400' : 'text-white'
                    } `}
                  >
                    {currentValues.titleUa
                      ? currentValues.titleUa
                      : 'Заголовок...'}
                  </h2>
                </div>
                <FileInput
                  name="image"
                  control={control}
                  accept="image/*"
                  placeholder={'Оберіть файл'}
                  title="Оберіть файл"
                />
              </div>
            </section>
          </div>
          <span className="mt-4 text-sm text-gray-500">
            Додати новину на сайт?
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

            <Link to="/admin">
              <button className="w-[13.5rem] border border-black bg-white px-6 py-2 font-medium transition-all hover:border-accent active:border-disabled">
                Скасувати
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
