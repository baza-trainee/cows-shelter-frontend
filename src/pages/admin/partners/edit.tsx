import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { partners } from '@/data/partners';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { PartnersFormInput } from '@/types';
import { defaultValues } from './defaultValues';

import FileInput from '@/components/admin/inputs/FileInput';
import TextInput from '@/components/admin/inputs/TextInput';

const EditPartner = () => {
  const { id } = useParams();
  const [image, setImage] = useState('');

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = useForm<PartnersFormInput>({
    mode: 'onChange',
    defaultValues: defaultValues
  });

  useEffect(() => {
    if (!id) return;
    const partnerData = partners.find((item) => item.id === id);
    if (!partnerData) return;
    setValue('title', partnerData.title);
    setValue('href', partnerData.href);
    setImage(partnerData.src);
  }, [id, setValue]);

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

  const onSubmit: SubmitHandler<PartnersFormInput> = () => {};

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-center gap-4 pb-[134px] pl-[48px] pr-[142px] ">
      <div className="mb-[12px] mt-[48px]">
        <h1 className="text-3xl font-bold">Редагування Партнера</h1>
      </div>
      <div className="flex w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-4"
        >
          <div className="flex gap-2">
            <FileInput
              name="image"
              control={control}
              accept="image/*"
              placeholder={'Оберіть файл'}
              title="Змінити логотип Партнера:"
            />
            <Controller
              name="title"
              rules={{ required: 'Введіть назву' }}
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  errorText={errors.title?.message}
                  placeholder="Введіть назву Партнера"
                  title="Змінити назву Партнера:"
                />
              )}
            />

            <section className="flex flex-col items-center justify-center gap-4">
              <Controller
                name="href"
                rules={{ required: 'Введіть URL' }}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.href?.message}
                    placeholder="Введіть посилання на сторінку Партнера"
                    title="Змінити посилання на сторінку Партнера:"
                  />
                )}
              />
            </section>

            <section className="flex flex-col items-center justify-center gap-4 px-8">
              <div className="mt-[5vh] flex w-full flex-col items-center justify-center gap-8 ">
                <div className="relative text-left">
                  <img
                    src={image ? image : '/placeholder-image.jpeg'}
                    alt={currentValues.title}
                    className="h-[240px] w-[320px] rounded-md object-cover"
                  />
                  <h2
                    className={`absolute bottom-4 left-2 text-xl font-bold ${
                      !image ? 'text-gray-400' : 'text-white'
                    } `}
                  >
                    {currentValues.title ? currentValues.title : 'Заголовок...'}
                  </h2>
                </div>
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

export default EditPartner;
