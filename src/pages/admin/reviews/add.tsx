import { Link, useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ReviewsFormInput } from '@/types';
import { defaultValues } from './defaultValues';
import TextInput from '@/components/admin/inputs/TextInput';
import TextArea from '@/components/admin/inputs/TextArea';
import { reviewsValidation } from './reviewsValidation';
import { useAppDispatch } from '@/store/hook';
import { useState } from 'react';
import { addNewReview } from '@/store/slices/reviewsSlice';
import { openAlert } from '@/store/slices/responseAlertSlice';
import {
  addErrorResponseMessage,
  addSuccessResponseMessage
} from '@/utils/responseMessages';

const AddReviews = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty, isValid }
  } = useForm<ReviewsFormInput>({
    mode: 'onChange',
    defaultValues: defaultValues
  });

  const onSubmit: SubmitHandler<ReviewsFormInput> = async (
    values: ReviewsFormInput
  ) => {
    try {
      setIsProcessing(true);
      await dispatch(addNewReview(values));
      setIsProcessing(false);
      dispatch(openAlert(addSuccessResponseMessage('вігук')));
      navigate(-1);
    } catch (error: any) {
      dispatch(openAlert(addErrorResponseMessage('вігук')));
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-center pb-[134px] pl-[48px] pr-[142px] ">
      <div className="mb-9 mt-12">
        <h1 className="text-3xl font-bold">Додавання відгуку</h1>
      </div>
      <div className="flex w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex flex-1 flex-col gap-4"
        >
          <div className="mb-5 flex gap-2">
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
          <p
            className={`text-base leading-normal ${
              isDirty && isValid ? 'text-black' : 'text-disabled'
            }`}
          >
            Додати новий відгук на сайт?
          </p>
          <div className="flex gap-4">
            <button
              className={`w-[13.5rem] rounded-md px-6 py-2 ${
                isDirty && isValid
                  ? 'cursor-pointer bg-accent'
                  : 'cursor-not-allowed bg-gray-200'
              }`}
            >
              {isProcessing ? 'Обробка запиту...' : 'Додати'}
            </button>
            <Link to="/admin/reviews">
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

export default AddReviews;
