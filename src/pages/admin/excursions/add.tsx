import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ExcursionsFormInput } from '@/types';
import { defaultValues } from './defaultValues';
import { zodResolver } from '@hookform/resolvers/zod';
import { excursionsValidation } from './excursionsSchema';
import TextInput from '@/components/admin/inputs/TextInput';
import TextArea from '@/components/admin/inputs/TextArea';
import FileInput from '@/components/admin/inputs/FileInput';
import { useAppDispatch } from '@/store/hook';
import { addNewExcursion } from '@/store/slices/excursionsSlice';
import { openAlert } from '@/store/slices/responseAlertSlice';
import {
  addErrorResponseMessage,
  addSuccessResponseMessage
} from '@/utils/responseMessages';

const AddExcursions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [image, setImage] = useState('');

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<ExcursionsFormInput>({
    resolver: zodResolver(excursionsValidation),
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
    try {
      setIsProcessing(true);
      await dispatch(addNewExcursion(values));
      setIsProcessing(false);
      dispatch(openAlert(addSuccessResponseMessage('екскурсію')));
      navigate(-1);
    } catch (error: any) {
      dispatch(openAlert(addErrorResponseMessage('екскурсію')));
    }
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
          <div className="flex items-start gap-2">
            <section className="flex flex-col items-center justify-center gap-4">
              <Controller
                name="titleUa"
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

            <section className="flex flex-col gap-4 px-8">
              <div className="flex w-[365px] flex-col gap-7">
                <div className="relative text-left">
                  <img
                    src={
                      image
                        ? image
                        : 'https://healvets.org/wp-content/uploads/2021/10/ef3-placeholder-image.jpeg'
                    }
                    alt={currentValues.titleUa}
                    className="h-[220px] w-[365px] object-cover"
                  />
                  <h2
                    className={`absolute bottom-4 left-4 text-xl font-semibold ${
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
                  title="Оберіть файл:"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-medium">Введіть часовий проміжок:</p>
                <div className="flex w-[365px] gap-6">
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-normal">Від</p>
                    <Controller
                      name="timeFrom"
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
                    <p className="text-sm font-normal">До</p>
                    <Controller
                      name="timeTill"
                      control={control}
                      render={({ field }) => (
                        <TextInput
                          {...field}
                          errorText={errors.timeTill?.message}
                        />
                      )}
                    />
                  </div>
                  <p className="flex items-center text-sm font-normal">
                    хвилин
                  </p>
                </div>
              </div>

              <div className="flex w-[365px] flex-col gap-1.5">
                <p className="text-sm font-medium">
                  Введіть кількість відвідувачів:
                </p>
                <div className="flex items-center gap-6">
                  <p className="flex items-center text-sm font-normal">До</p>
                  <Controller
                    name="visitorsNumber"
                    control={control}
                    render={({ field }) => (
                      <TextInput
                        {...field}
                        errorText={errors.visitorsNumber?.message}
                      />
                    )}
                  />
                  <p className="flex items-center text-sm font-normal">
                    відвідувачів
                  </p>
                </div>
              </div>
            </section>
          </div>

          <p
            className={`text-base leading-normal ${
              isDirty && isValid ? 'text-black' : 'text-disabled'
            }`}
          >
            Розмістити нову екскурсію?
          </p>
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
            <Link to="/admin/excursions">
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

export default AddExcursions;
