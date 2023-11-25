import { ReviewsFormInput } from '@/types';
import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TextInput from '@/components/admin/inputs/TextInput';
import TextArea from '@/components/admin/inputs/TextArea';
import { defaultValues } from './defaultValues';
import { reviewsValidation } from './reviewsValidation';
import { reviews } from '@/data/reviews';

const EditReviews = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm<ReviewsFormInput>({
    mode: 'onChange',
    defaultValues: defaultValues
  });

  useEffect(() => {
    if (!id) return;
    const postData = reviews.find((item) => item.id === id);
    console.log(postData);
    if (!postData) return;
    setValue('nameUa', t(`${postData.name}`));
    setValue('nameEn', postData.nameEn);
    setValue('reviewUa', t(`${postData.review}`));
    setValue('reviewEn', postData.reviewEn);
  }, [id, setValue, t]);

  const onSubmit: SubmitHandler<ReviewsFormInput> = () => {};

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-center gap-4 pb-[134px] pl-[48px] pr-[142px] ">
      <div className="mb-[12px] mt-[48px]">
        <h1 className="text-3xl font-bold">Редагування відгуку</h1>
      </div>
      <div className="flex w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-4"
        >
          <div className="flex gap-2">
            <section className="flex flex-col gap-4">
              <div className="flex gap-6">
                <Controller
                  name="nameUa"
                  rules={reviewsValidation.nameUa}
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      errorText={errors.nameUa?.message}
                      placeholder="Введіть ім’я відвідувача"
                      title="Ім’я відвідувача:"
                    />
                  )}
                />
                <Controller
                  name="nameEn"
                  rules={reviewsValidation.nameEn}
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      errorText={errors.nameEn?.message}
                      placeholder="Введіть ім’я відвідувача англійською"
                      title="Ім’я відвідувача англійською:"
                    />
                  )}
                />
              </div>

              <div className="flex gap-6">
                <Controller
                  name="reviewUa"
                  rules={reviewsValidation.reviewUa}
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      errorText={errors.reviewUa?.message}
                      placeholder="Введіть відгук"
                      title="Відгук:"
                    />
                  )}
                />
                <Controller
                  name="reviewEn"
                  rules={reviewsValidation.reviewEn}
                  control={control}
                  render={({ field }) => (
                    <TextArea
                      {...field}
                      errorText={errors.reviewEn?.message}
                      placeholder="Введіть відгук англійською"
                      title="Відгук англійською:"
                    />
                  )}
                />
              </div>
            </section>
          </div>
          <p className="text-base leading-normal text-disabled">
            Застосувати зміни?
          </p>
          <div className="flex gap-4">
            <button className=" w-[13.5rem] rounded-md bg-gray-200 px-6 py-2 transition-all hover:bg-lemon">
              Застосувати
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

export default EditReviews;
