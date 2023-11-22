import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { NewsFormInput } from '@/types';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { defaultValues } from './defaultValues';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { editPost, fetchPostById } from '@/store/slices/newsSlice';

import FileInput from '@/components/admin/inputs/FileInput';
import TextArea from '@/components/admin/inputs/TextArea';
import TextInput from '@/components/admin/inputs/TextInput';

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState('');
  const posts = useAppSelector((state) => state.posts.posts);

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = useForm<NewsFormInput>({
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
    setValue('contentUa', postData.content_ua);
    setValue('contentEn', postData.content_en);
    setValue('image_id', postData.image_id);
    setValue('image', [new File([], postData.image_url)]);
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
    await dispatch(editPost({ id, values }));
    navigate(-1);
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
                rules={{ required: 'Введіть назву' }}
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
                rules={{ required: 'Введіть назву' }}
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
                name="contentUa"
                rules={{ required: 'Введіть назву' }}
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
                rules={{ required: 'Введіть назву' }}
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
          <div className="flex gap-4">
            <button className=" w-[13.5rem] rounded-md bg-gray-200 px-6 py-2 transition-all hover:bg-lemon">
              Розмістити
            </button>

            <Link to="/admin">
              <button className="w-[13.5rem] rounded-md border-2 border-lightgrey bg-white px-6 py-2 transition-all hover:bg-red-300">
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
