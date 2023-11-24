import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { defaultValues } from './defaultValues';
import { NewsFormInput } from '@/types';
import { newsValidation } from './newsValidation';
import { useAppDispatch } from '@/store/hook';
import { addNewPost } from '@/store/slices/newsSlice';
import TextInput from '@/components/admin/inputs/TextInput';
import TextArea from '@/components/admin/inputs/TextArea';
import FileInput from '@/components/admin/inputs/FileInput';

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<NewsFormInput>({
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
    setIsProcessing(true);
    await dispatch(addNewPost(values));
    setIsProcessing(false);
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-center gap-4 pb-[134px] pl-[48px] pr-[142px] ">
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
                rules={newsValidation.titleUa}
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
                rules={newsValidation.titleEn}
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
                rules={newsValidation.subTitleUa}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.subTitleUa?.message}
                    placeholder="Введіть заголовок"
                    title="Підзаголовок:"
                  />
                )}
              />
              <Controller
                name="subTitleEn"
                rules={newsValidation.subTitleEn}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.subTitleEn?.message}
                    placeholder="Введіть заголовок"
                    title="Підзаголовок англійською:"
                  />
                )}
              />

              <Controller
                name="contentUa"
                rules={newsValidation.contentUa}
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
                rules={newsValidation.contentEn}
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
                  rules={newsValidation.image}
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
            <button className="w-[13.5rem] rounded-md bg-gray-200 px-6 py-2 transition-all hover:bg-lemon">
              {isProcessing ? 'Обробка запиту...' : 'Розмістити'}
            </button>

            <Link to="/admin">
              <button className="hover:bg-red-300 w-[13.5rem] rounded-md border-2 border-lightgrey bg-white px-6 py-2 transition-all">
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
