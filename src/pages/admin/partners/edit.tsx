import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { defaultValues } from './defaultValues';

import FileInput from '@/components/admin/inputs/FileInput';
import TextInput from '@/components/admin/inputs/TextInput';
import { PartnersFormInput } from '@/types';
import {
  Partner,
  editPartner,
  fetchPartners
} from '@/store/slices/partnersSlice';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { partnersValidation } from './partnersValidation';
import { openAlert } from '@/store/slices/responseAlertSlice';
import {
  editSuccessResponseMessage,
  editErrorResponseMessage
} from '@/utils/responseMessages';

const EditPartner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [image, setImage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const partners = useAppSelector((state) => state.partners.partners);

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
    dispatch(fetchPartners());
  }, [dispatch]);

  useEffect(() => {
    if (!id) return;
    const partnerData = partners.filter((partner: Partner) => partner.id == id);
    if (!partnerData || partnerData.length === 0) return;

    setValue('name', partnerData[0].name);
    setValue('link', partnerData[0].link);
    setValue('image_id', partnerData[0].image_id);
    setValue('logo', [new File([], partnerData[0].logo, { type: 'for-url' })]);
    setImage(partnerData[0].logo);
  }, [id, partners, setValue]);

  const currentValues = watch();

  const setImagePreview = (file: File) => {
    const img = URL.createObjectURL(file);
    setImage(img);
  };

  useEffect(() => {
    if (!currentValues.logo[0]?.size) return;
    const file = currentValues.logo[0];
    setImagePreview(file);
  }, [currentValues.logo]);

  const onSubmit: SubmitHandler<PartnersFormInput> = async (
    values: PartnersFormInput
  ) => {
    try {
      setIsProcessing(true);
      await dispatch(editPartner({ id, values }));
      setIsProcessing(false);
      dispatch(openAlert(editSuccessResponseMessage('партнера')));
      navigate(-1);
    } catch (error) {
      dispatch(openAlert(editErrorResponseMessage('партнера')));
    }
  };
  return (
    <div className="flex flex-col gap-4 px-[108px] pt-[60px] ">
      <div className="flex  gap-8">
        <div>
          <div>
            <h1 className="mb-8 text-3xl font-bold">Редагування Партнера</h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1 flex-col gap-10"
          >
            <div className="flex flex-col gap-6">
              <FileInput
                name="logo"
                control={control}
                accept="image/*"
                rules={partnersValidation.logo}
                placeholder={'Оберіть файл'}
                title="Змінити логотип Партнера:"
                className="w-full "
              />
              <Controller
                name="name"
                rules={partnersValidation.name}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.name?.message}
                    placeholder="Введіть назву Партнера"
                    title="Змінити назву Партнера:"
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
              <p className="mb-3 text-disabled">
                Розмістити Оновленого Партнера?
              </p>

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
                alt={currentValues.name}
                width={205}
                height={205}
                className="mb-5 h-[205px] w-[205px] rounded-full"
              />
              <h2
                className={` bottom-4 left-2 mb-6 text-center text-xl font-bold
                `}
              >
                {currentValues.name}
              </h2>
              <h2 className="bottom-4 left-2 ">{currentValues.link}</h2>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditPartner;
