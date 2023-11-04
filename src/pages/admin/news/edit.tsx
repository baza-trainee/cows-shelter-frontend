import { useEffect, useState } from 'react';
import { news } from '@/data/news';
import { Link, useParams } from 'react-router-dom';

const EditNews = () => {
  const { id } = useParams();
  const [titleUa, setTitleUa] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [textUa, setTextUa] = useState('');
  const [textEn, setTextEn] = useState('');
  const [isError, setIsError] = useState(true);
  const [imageFile, setImageFile] = useState<FileList | null>(null);
  const [image, setImage] = useState('');
  const post = news.find((item) => item.id === id);

  useEffect(() => {
    if (id && post) {
      setTitleUa(post.titleUa);
      setTextUa(post.textUa);
      setTitleEn(post.titleEn);
      setTextEn(post.textEn);
      setImage(post.image);
      setIsError(true);
    }
  }, [id, post]);

  const setFileToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
  };

  useEffect(() => {
    if (imageFile !== null) {
      const file = imageFile[0];
      setFileToBase64(file);
    }
  }, [imageFile]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-4 px-8">
      <form className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex gap-4">
          <label className="flex-1">
            Заголовок українською
            <input
              type="text"
              placeholder="add title"
              className=" w-full rounded-md border-2 border-black p-2"
              onChange={(e) => setTitleUa(e.target.value)}
              value={titleUa}
            />
            {!isError && (
              <span className=" text-sm text-red-500">Example Error</span>
            )}
          </label>

          <label className="flex-1">
            Заголовок англійською
            <input
              type="text"
              placeholder="add title"
              className=" w-full rounded-md border-2 border-black p-2"
              onChange={(e) => setTitleEn(e.target.value)}
              value={titleEn}
            />
          </label>
        </div>
        <div className="flex gap-4">
          <label className="">
            Вміст українською
            <textarea
              placeholder="add text"
              className=" w-full rounded-md border-2 border-black p-2"
              onChange={(e) => setTextUa(e.target.value)}
              value={textUa}
            />
          </label>

          <label className="">
            Вміст англійською
            <textarea
              placeholder="add text"
              className=" w-full rounded-md border-2 border-black p-2"
              onChange={(e) => setTextEn(e.target.value)}
              value={textEn}
            />
          </label>
        </div>

        <input
          type="file"
          name="image"
          id=""
          placeholder="upload image"
          onChange={(e) => setImageFile(e.target.files)}
        />
        <div className="flex gap-4">
          <button className="mt-4 w-[8rem] rounded-md bg-gray-200 p-2 hover:bg-gray-300">
            Submit
          </button>

          <Link to="/admin">
            <button className="mt-4 w-[8rem] rounded-md bg-red-200 p-2 hover:bg-red-300">
              Cancel
            </button>
          </Link>
        </div>
      </form>
      <div className="mb-[10vh]">
        <div className="relative text-left">
          <img
            src={
              image
                ? image
                : 'https://healvets.org/wp-content/uploads/2021/10/ef3-placeholder-image.jpeg'
            }
            alt={titleUa}
            className="h-[240px] w-[320px] rounded-md object-cover"
          />
          <h2
            className={`absolute bottom-4 left-2 text-xl font-bold ${
              !image ? 'text-gray-400' : 'text-white'
            } `}
          >
            {titleUa ? titleUa : 'Type Something...'}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default EditNews;
