import { ExcursionsFormInput } from '@/types';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { defaultValues } from './defaultValues';
import { excursions } from '@/data/excursions';
import { useTranslation } from 'react-i18next';
import TextInput from '@/components/admin/inputs/TextInput';
import TextArea from '@/components/admin/inputs/TextArea';
import FileInput from '@/components/admin/inputs/FileInput';

const EditExcursions = () => {
  const { t } = useTranslation();
  // const { id } = useParams();
  // const [titleUa, setTitleUa] = useState('');
  // const [titleEn, setTitleEn] = useState('');
  // const [textUa, setTextUa] = useState('');
  // const [textEn, setTextEn] = useState('');
  // const [isError, setIsError] = useState(true);
  // const [imageFile, setImageFile] = useState<FileList | null>(null);
  const [image, setImage] = useState('');
  // const post = excursions.find((item) => item.id === id);

  const { id } = useParams();

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = useForm<ExcursionsFormInput>({
    mode: 'onChange',
    defaultValues: defaultValues
  });

  useEffect(() => {
    if (!id) return;
    const postData = excursions.find((item) => item.id === id);
    console.log(postData);
    if (!postData) return;
    setValue('titleUa', t(`${postData.title}`));
    setValue('titleEn', postData.titleEn);
    setValue('descriptionUa', t(`${postData.description}`));
    setValue('descriptionEn', postData.descriptionEn);
    setImage(postData.mainImgSrc);
    setValue('timeFrom', t(`${postData.timeFrom}`));
    setValue('timeTill', t(`${postData.timeTill}`));
    setValue('visitorsNumber', t(`${postData.number_of_people}`));
  }, [id, setValue, t]);

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

  const onSubmit: SubmitHandler<ExcursionsFormInput> = () => {};

  // useEffect(() => {
  //   if (id && post) {
  //     setTitleUa(t(`${post.title}`));
  //     setTextUa(t(`${post.description}`));
  //     setTitleEn(t(`${post.title}`));
  //     setTextEn(t(`${post.description}`));
  //     setImage(post.mainImgSrc);
  //     setIsError(true);
  //   }
  // }, [id, post, t]);

  // const setFileToBase64 = (file: File) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImage(reader.result as string);
  //   };
  // };

  // useEffect(() => {
  //   if (imageFile !== null) {
  //     const file = imageFile[0];
  //     setFileToBase64(file);
  //   }
  // }, [imageFile]);

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-center gap-4 pb-[134px] pl-[48px] pr-[142px] ">
      <div className="mb-[12px] mt-[48px]">
        <h1 className="text-3xl font-bold">Редагування Екскурсії</h1>
      </div>
      <div className="flex w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-4"
        >
          <div className="flex gap-2">
            <section className="flex flex-col items-center justify-center gap-6">
              <Controller
                name="titleUa"
                rules={{ required: 'Введіть назву' }}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.titleUa?.message}
                    placeholder="Введіть назву екскурсії"
                    title="Назва екскурсії:"
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
                    placeholder="Введіть назву екскурсії англійською:"
                    title="Назва екскурсії англійською:"
                  />
                )}
              />

              <Controller
                name="descriptionUa"
                rules={{ required: 'Введіть назву' }}
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    errorText={errors.descriptionUa?.message}
                    placeholder="Введіть опис екскурсії"
                    title="Опис екскурсії:"
                  />
                )}
              />
              <Controller
                name="descriptionEn"
                rules={{ required: 'Введіть назву' }}
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    errorText={errors.descriptionUa?.message}
                    placeholder="Введіть опис екскурсії англійською:"
                    title="Опис екскурсії англійською:"
                  />
                )}
              />
            </section>

            <section className="flex flex-col items-center justify-center gap-4 px-8">
              <div className="mt-[5vh] flex w-full flex-col items-center justify-center gap-7">
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
              <div className="flex flex-col gap-6">
                <p className="-mb-5 text-sm font-medium">
                  Введіть часовий проміжок:
                </p>
                <div className="flex gap-6">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium">Від</p>
                    <Controller
                      name="timeFrom"
                      rules={{ required: 'Введіть назву' }}
                      control={control}
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          errorText={errors.timeFrom?.message}
                        />
                      )}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium">До</p>
                    <Controller
                      name="timeTill"
                      rules={{ required: 'Введіть назву' }}
                      control={control}
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          errorText={errors.timeTill?.message}
                        />
                      )}
                    />
                  </div>
                  <p className="flex items-center text-sm font-medium">
                    хвилин
                  </p>
                </div>
                <div className="flex items-center gap-6">
                  <p className="flex items-center pt-5 text-sm font-medium">
                    до
                  </p>
                  <Controller
                    name="visitorsNumber"
                    rules={{ required: 'Введіть назву' }}
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        errorText={errors.visitorsNumber?.message}
                        title="Введіть кількість відвідувачів:"
                      />
                    )}
                  />
                  <p className="flex items-center pt-5 text-sm font-medium">
                    відвідувачів
                  </p>
                </div>
              </div>
            </section>
          </div>
          <p className="text-base leading-normal text-disabled">
            Застосувати зміни?
          </p>
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

export default EditExcursions;
