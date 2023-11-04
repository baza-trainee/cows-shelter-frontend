import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AddPartner = () => {
  const [title, setTitle] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [isError, setIsError] = useState(true);
  const [imageFile, setImageFile] = useState<FileList | null>(null);
  const [image, setImage] = useState('');

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
      setIsError(true);
    }
  }, [imageFile]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-4 ">
      <form className="flex w-1/2 flex-col gap-4 p-4">
        <div className="flex flex-col gap-4">
          <label className="flex-1">
            Назва Партнера
            <input
              type="text"
              placeholder="add title"
              className=" w-full rounded-md border-2 border-black p-2"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            {isError && (
              <span className="text-sm text-red-500">Example Error</span>
            )}
          </label>

          <label className="flex-1">
            Лінк до сторінки партнера
            <input
              type="text"
              placeholder="add title"
              className="w-full rounded-md border-2 border-black p-2"
              onChange={(e) => setTitleEn(e.target.value)}
              value={titleEn}
            />
          </label>
        </div>
        <label className="flex flex-col">
          Логотип партнера
          <input
            type="file"
            name="image"
            id=""
            placeholder="upload image"
            onChange={(e) => setImageFile(e.target.files)}
          />
        </label>
        <div className="flex gap-4">
          <button className="mt-4 w-[8rem] rounded-md bg-gray-200 p-2 hover:bg-gray-300">
            Submit
          </button>

          <Link to="/admin/partners">
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
            alt={title}
            className="h-[200px] w-[200px] rounded-full object-cover"
          />
          <h2 className={`mt-2 text-center text-xl font-bold text-darkgray `}>
            {title ? title : 'Type Something...'}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AddPartner;
