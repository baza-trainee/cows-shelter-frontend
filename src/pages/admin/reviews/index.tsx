import { useEffect, useState } from 'react';
import Confirm from '@/components/admin/Confirm';
import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddIcon from '@/components/icons/AddIcon';
// import { reviews } from '@/data/reviews';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { fetchReviews, removeReview } from '@/store/slices/reviewsSlice';
import Loader from '@/components/admin/Loader';

const Reviews = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const isLoading = useAppSelector((state) => state.reviews.loading);
  const reviews = useAppSelector((state) => state.reviews.reviews);

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const deletePost = () => {
    dispatch(removeReview(currentId));
    setShowConfirm(false);
  };

  // console.log(reviews);
  if (isLoading) return <Loader />;

  return (
    <div className=" flex min-h-screen flex-col px-12 pt-10">
      <div>
        <h1 className="text-3xl font-bold">Відгуки</h1>
      </div>
      <div className="mt-8 flex gap-5">
        <div className="border-lightgray relative flex h-[180px] w-[288px] flex-col items-center justify-center gap-2 border-2">
          <Link to="/admin/reviews/add">
            <AddIcon />
          </Link>
          <h1>Додати Відгук</h1>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {reviews.map((review) => (
            <div key={review.id} className="h-[200px] w-[288px] text-left">
              <div className="border border-disabled p-2.5">
                <div>{t(review.name_ua)}</div>
                <div className="line-clamp-5 h-[120px] w-full text-ellipsis ">
                  {t(review.review_ua)}
                </div>
              </div>
              <div className="flex w-full items-center justify-between gap-2 border border-disabled border-t-transparent bg-lightgrey px-5 py-2">
                <button
                  className="text-xl text-darkgray transition-all hover:text-error"
                  onClick={() => {
                    setShowConfirm(true), setCurrentId(review.id);
                  }}
                >
                  <BsFillTrash3Fill />
                </button>
                <button className="text-xl text-darkgray transition-all hover:text-accent">
                  <Link to={`/admin/reviews/edit/${review.id}`}>
                    <BsFillPencilFill />
                  </Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showConfirm && (
        <Confirm
          setShowConfirm={setShowConfirm}
          title="Ви впевнені, що хочете видалити відгук зі сторінки?"
          onConfirm={deletePost}
        />
      )}
    </div>
  );
};

export default Reviews;
