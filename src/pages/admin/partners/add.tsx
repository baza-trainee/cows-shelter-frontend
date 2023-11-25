import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { defaultValues } from './defaultValues';

import FileInput from '@/components/admin/inputs/FileInput';
import TextInput from '@/components/admin/inputs/TextInput';
import { PartnersFormInput } from '@/types';
import { addNewPartner } from '@/store/slices/partnersSlice';
import { useAppDispatch } from '@/store/hook';
import { partnersValidation } from './partnersValidation';

const AddPartner = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<PartnersFormInput>({
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

  const onSubmit: SubmitHandler<PartnersFormInput> = async (
    values: PartnersFormInput
  ) => {
    console.log(values);
    setIsProcessing(true);
    await dispatch(addNewPartner(values));
    setIsProcessing(false);
    navigate(-1);
  };
  return (
    <div className="flex flex-col gap-4 px-[108px] pt-[60px] ">
      <div className="flex  gap-8">
        <div>
          <div>
            <h1 className="mb-8 text-3xl font-bold">Додавання Партнера</h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-10"
          >
            <div className="flex flex-col gap-6">
              <FileInput
                name="image"
                control={control}
                accept="image/*"
                rules={partnersValidation.logo}
                placeholder={'Оберіть файл'}
                title="Змінити логотип Партнера:"
                className="w-full "
              />
              <Controller
                name="title"
                rules={partnersValidation.name}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.title?.message}
                    placeholder="Введіть назву Партнера"
                    title="Введіть назву Партнера:"
                  />
                )}
              />

              <section className="flex flex-col items-center justify-center gap-4">
                <Controller
                  name="link"
                  rules={partnersValidation.link}
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      errorText={errors.link?.message}
                      placeholder="Введіть посилання на сторінку Партнера"
                      title="Змінити посилання на сторінку Партнера:"
                    />
                  )}
                />
              </section>
            </div>
            <div>
              <p className="mb-3 text-disabled">Розмістити нового Партнера?</p>

              <div className="flex gap-4">
                <button className=" w-[13.5rem] rounded-md bg-gray-200 px-6 py-2 transition-all hover:bg-lemon">
                  {isProcessing ? 'Обробка запиту...' : 'Розмістити'}
                </button>

                <Link to="/admin/partners">
                  <button className="hover:bg-red-300 w-[13.5rem] rounded-md border-2 border-lightgrey bg-white px-6 py-2 transition-all">
                    Скасувати
                  </button>
                </Link>
              </div>
            </div>{' '}
          </form>
        </div>

        <section className="flex flex-col items-center gap-4  px-5 py-8">
          <div className="flex  flex-col items-center  gap-8 ">
            <div className="text-left">
              <img
                src={image ? image : '/placeholder-image.jpeg'}
                alt={currentValues.title}
                width={205}
                height={205}
                className="mb-5 h-[205px] w-[205px] rounded-full"
              />
              <h2
                className={` bottom-4 left-2 mb-6 text-center text-xl font-bold
                `}
              >
                {currentValues.title}
              </h2>
              <h2 className="bottom-4 left-2 ">{currentValues.link}</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddPartner;
