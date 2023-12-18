import { Link, useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ReviewsFormInput } from '@/types';
import { defaultValues } from './defaultValues';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '@/components/admin/inputs/TextInput';
import TextArea from '@/components/admin/inputs/TextArea';
import { reviewsValidation } from './reviewsSchema';
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
    resolver: zodResolver(reviewsValidation),
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
              className={`w-[13.5rem] px-6 py-2 font-medium ${
                isDirty && isValid
                  ? 'cursor-pointer bg-accent text-black'
                  : 'cursor-not-allowed bg-disabled text-white'
              }`}
            >
              {isProcessing ? 'Обробка запиту...' : 'Додати'}
            </button>
            <Link to="/admin/reviews">
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

export default AddReviews;
