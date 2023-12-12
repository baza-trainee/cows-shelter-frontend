import { ReviewsFormInput } from '@/types';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TextInput from '@/components/admin/inputs/TextInput';
import TextArea from '@/components/admin/inputs/TextArea';
import { defaultValues } from './defaultValues';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewsValidation } from './reviewsSchema';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { editReview, fetchReviewById } from '@/store/slices/reviewsSlice';
import {
  editErrorResponseMessage,
  editSuccessResponseMessage
} from '@/utils/responseMessages';
import { openAlert } from '@/store/slices/responseAlertSlice';

const EditReviews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const reviews = useAppSelector((state) => state.reviews.reviews);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isDirty, isValid }
  } = useForm<ReviewsFormInput>({
    resolver: zodResolver(reviewsValidation),
    mode: 'onChange',
    defaultValues: defaultValues
  });

  useEffect(() => {
    if (!id) return;
    dispatch(fetchReviewById(id));
  }, [id, dispatch]);

  useEffect(() => {
    const postData = reviews[0];
    console.log(postData);
    if (!postData) return;
    setValue('nameUa', postData.name_ua);
    setValue('nameEn', postData.name_en);
    setValue('reviewUa', postData.review_ua);
    setValue('reviewEn', postData.review_en);
  }, [reviews, setValue]);

  const onSubmit: SubmitHandler<ReviewsFormInput> = async (
    values: ReviewsFormInput
  ) => {
    try {
      setIsProcessing(true);
      await dispatch(editReview({ id, values }));
      setIsProcessing(false);
      dispatch(openAlert(editSuccessResponseMessage('відгук')));
      navigate(-1);
    } catch (error: any) {
      dispatch(openAlert(editErrorResponseMessage('відгук')));
    }
  };

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
            Застосувати зміни?
          </p>
          <div className="flex gap-4">
            <button
              className={`w-[11.25rem] px-6 py-2 font-medium text-white ${
                isDirty && isValid
                  ? 'cursor-pointer bg-accent'
                  : 'cursor-not-allowed bg-disabled'
              }`}
            >
              {isProcessing ? 'Обробка запиту...' : 'Застосувати'}
            </button>

            <Link to="/admin/reviews">
              <button className="w-[11.25rem] border border-black bg-white px-6 py-2 font-medium transition-all hover:border-accent active:border-disabled">
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
