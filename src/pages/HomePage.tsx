import { useAppSelector } from '@/store/hook';
import { useAppDispatch } from '@/store/hook';
import { fetchPosts } from '@/store/slices/newsSlice';
import { useEffect } from 'react';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts.list);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center text-blue-600">
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};

export default HomePage;
