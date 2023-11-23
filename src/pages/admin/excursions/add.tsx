import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ExcursionsFormInput } from '@/types';
import { defaultValues } from './defaultValues';
import { excursionsValidation } from './excursionsValidation';
import TextInput from '@/components/admin/inputs/TextInput';
import TextArea from '@/components/admin/inputs/TextArea';
import FileInput from '@/components/admin/inputs/FileInput';
import { useAppDispatch } from '@/store/hook';
import { addNewExcursion } from '@/store/slices/excursionsSlice';

const AddExcursions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState('');

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<ExcursionsFormInput>({
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

  const onSubmit: SubmitHandler<ExcursionsFormInput> = async (
    values: ExcursionsFormInput
  ) => {
    await dispatch(addNewExcursion(values));
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-center gap-4 pb-[134px] pl-[48px] pr-[142px] ">
      <div className="mb-[12px] mt-[48px]">
        <h1 className="text-3xl font-bold">Додавання Екскурсії</h1>
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
                rules={excursionsValidation.titleUa}
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
                rules={excursionsValidation.titleEn}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.titleEn?.message}
                    placeholder="Введіть англійською назву екскурсії"
                    title="Назва екскурсії англійською:"
                  />
                )}
              />

              <Controller
                name="descriptionUa"
                rules={excursionsValidation.descriptionUa}
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
                rules={excursionsValidation.descriptionEn}
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    errorText={errors.descriptionEn?.message}
                    placeholder="Введіть англійською опис екскурсії"
                    title="Опис екскурсії англійською:"
                  />
                )}
              />
            </section>

            <section className="flex flex-col items-center justify-center gap-4 px-8">
              <div className="mt-[5vh] flex w-full flex-col items-center justify-center gap-7">
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
                  rules={excursionsValidation.image}
                  accept="image/*"
                  placeholder={'Оберіть файл'}
                  title="Оберіть файл:"
                />
              </div>

              <div>
                <p className="text-sm font-medium">Введіть часовий проміжок:</p>
                <div className="flex gap-6">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-medium">Від</p>
                    <Controller
                      name="timeFrom"
                      rules={excursionsValidation.timeFrom}
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
                      rules={excursionsValidation.timeTill}
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
              </div>

              <div className="flex items-center gap-6">
                <p className="flex items-center pt-5 text-sm font-medium">до</p>
                <Controller
                  name="visitorsNumber"
                  rules={excursionsValidation.visitorsNumber}
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
            </section>
          </div>

          <p className="text-base leading-normal text-disabled">
            Розмістити нову екскурсію?
          </p>
          <div className="flex gap-4">
            <button className="w-[13.5rem] rounded-md bg-gray-200 px-6 py-2 transition-all hover:bg-lemon">
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

export default AddExcursions;
