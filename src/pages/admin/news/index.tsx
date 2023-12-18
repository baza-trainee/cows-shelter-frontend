import { useEffect, useState } from 'react';
import Confirm from '@/components/admin/Confirm';
import { Link } from 'react-router-dom';
import Bucket from '@/components/icons/Bucket';
import Pen from '@/components/icons/Pen';
import AddIcon from '@/components/icons/AddIcon';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { fetchPosts, removePost } from '@/store/slices/newsSlice';
import Loader from '@/components/admin/Loader';
import ResponseAlert from '@/components/admin/ResponseAlert';
import { openAlert } from '@/store/slices/responseAlertSlice';
import {
  deleteSuccessResponseMessage,
  deleteErrorResponseMessage
} from '@/utils/responseMessages';

const News = () => {
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentId, setCurrentId] = useState('');
  const isLoading = useAppSelector((state) => state.posts.loading);
  const posts = useAppSelector((state) => state.posts.posts);
  const isAlertOpen = useAppSelector((state) => state.alert.isAlertOpen);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const deletePost = () => {
    try {
      dispatch(removePost(currentId));
      setShowConfirm(false);
      dispatch(openAlert(deleteSuccessResponseMessage('новину')));
    } catch (error: any) {
      dispatch(openAlert(deleteErrorResponseMessage('новину')));
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="relative flex min-h-screen flex-col items-start justify-center px-[48px]">
      <div className="px-12">
        <h1 className="text-3xl font-bold">Новини</h1>
      </div>
      <div className="grid w-full grid-cols-3 justify-center  gap-[20px] p-12">
        <div className="border-lightgray relative flex h-[180px] w-[288px] flex-col items-center justify-center gap-2  border-2">
          <Link to="/admin/news/add">
            <AddIcon />
          </Link>
          <h1>Додати Новину</h1>
        </div>
        {posts.map((post) => (
          <div key={post.id} className="relative h-[180px] w-[288px] text-left">
            <img
              src={post.image_url}
              alt={post.title_ua}
              className="h-full w-full object-cover"
            />
            <h2 className="absolute bottom-8 left-4 text-[16px] text-white">
              {post.title_ua}
            </h2>
            <div className="absolute left-0 right-0 top-4 flex flex w-full items-center justify-between gap-2 px-6  py-2">
              <button
                className="rounded-full p-[8px] text-xl text-white transition-all hover:text-error"
                onClick={() => {
                  setShowConfirm(true), setCurrentId(post.id);
                }}
              >
                <Bucket />
              </button>
              <button className="rounded-full p-2 text-xl text-white transition-all hover:text-accent">
                <Link to={`/admin/news/edit/${post.id}`}>
                  <Pen />
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      {showConfirm && (
        <Confirm
          setShowConfirm={setShowConfirm}
          title="Чи ви впевнені, що хочете видалити новину зі сторінки?"
          onConfirm={deletePost}
        />
      )}
      {isAlertOpen && <ResponseAlert />}
    </div>
  );
};

export default News;
