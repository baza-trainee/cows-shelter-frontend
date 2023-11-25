import { ExcursionsFormInput } from '@/types';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { defaultValues } from './defaultValues';
import TextInput from '@/components/admin/inputs/TextInput';
import TextArea from '@/components/admin/inputs/TextArea';
import FileInput from '@/components/admin/inputs/FileInput';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import {
  editExcursion,
  fetchExcursionById
} from '@/store/slices/excursionsSlice';

const EditExcursions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState('');
  const excursions = useAppSelector((state) => state.excursions.excursions);

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
    dispatch(fetchExcursionById(id));
  }, [id, dispatch]);

  useEffect(() => {
    const postExcursions = excursions[0];
    if (!postExcursions) return;

    console.log(postExcursions);
    setValue('titleUa', postExcursions.title_ua);
    setValue('titleEn', postExcursions.title_en);
    setValue('descriptionUa', postExcursions.description_ua);
    setValue('descriptionEn', postExcursions.description_en);
    setValue('timeFrom', postExcursions.time_from);
    setValue('timeTill', postExcursions.time_to);
    setValue('visitorsNumber', postExcursions.amount_of_persons);
    setValue('image', [new File([], postExcursions.image_url)]);
    setImage(postExcursions.image_url);
  }, [excursions, setValue]);

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

  const onSubmit: SubmitHandler<ExcursionsFormInput> = async (
    values: ExcursionsFormInput
  ) => {
    await dispatch(editExcursion({ id, values }));
    navigate(-1);
  };

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

export default EditExcursions;
