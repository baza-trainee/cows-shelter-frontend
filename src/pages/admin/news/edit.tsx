import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NewsFormInput } from '@/types';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsValidation } from './newsSchema';
import { useNavigate } from 'react-router-dom';
import { defaultValues } from './defaultValues';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { editPost, fetchPostById } from '@/store/slices/newsSlice';
import FileInput from '@/components/admin/inputs/FileInput';
import TextArea from '@/components/admin/inputs/TextArea';
import TextInput from '@/components/admin/inputs/TextInput';
import { openAlert } from '@/store/slices/responseAlertSlice';
import {
  editErrorResponseMessage,
  editSuccessResponseMessage
} from '@/utils/responseMessages';

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const posts = useAppSelector((state) => state.posts.posts);

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isValid, isDirty }
  } = useForm<NewsFormInput>({
    resolver: zodResolver(newsValidation),
    mode: 'onChange',
    defaultValues: defaultValues
  });

  useEffect(() => {
    if (!id) return;
    dispatch(fetchPostById(id));
  }, [id, dispatch]);

  useEffect(() => {
    const postData = posts[0];
    if (!postData) return;
    setValue('titleUa', postData.title_ua);
    setValue('titleEn', postData.title_en);
    setValue('subTitleUa', postData.subtitle_ua);
    setValue('subTitleEn', postData.subtitle_en);
    setValue('contentUa', postData.content_ua);
    setValue('contentEn', postData.content_en);
    setValue('image_id', postData.image_id);
    setValue('image', [new File([], postData.image_url, { type: 'for-url' })]);
    setImage(postData.image_url);
  }, [setValue, posts]);

  const currentValues = watch();

  const setImagePreview = (file: File) => {
    const img = URL.createObjectURL(file);
    setImage(img);
  };

  useEffect(() => {
    if (!currentValues.image[0]?.size) return;
    const file = currentValues.image[0];
    setImagePreview(file);
  }, [currentValues.image]);

  const onSubmit: SubmitHandler<NewsFormInput> = async (
    values: NewsFormInput
  ) => {
    try {
      setIsProcessing(true);
      await dispatch(editPost({ id, values }));
      setIsProcessing(false);
      dispatch(openAlert(editSuccessResponseMessage('новини')));
      navigate(-1);
    } catch (error: any) {
      dispatch(openAlert(editErrorResponseMessage('новину')));
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-center gap-4 pb-[134px] pl-[48px] pr-[142px] ">
      <div className="mb-[12px] mt-[48px]">
        <h1 className="text-3xl font-bold">Редагування Новини</h1>
      </div>
      <div className="flex w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
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
                    placeholder="Введіть заголовок"
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
                    placeholder="Введіть заголовок"
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
                    errorText={errors.contentUa?.message}
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
                    src={image ? image : '/placeholder-image.jpeg'}
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
            Додати оновлену новину?
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

export default EditNews;
