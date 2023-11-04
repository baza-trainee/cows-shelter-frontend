import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type AddImageProps = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const AddImage = ({ setIsModalOpen }: AddImageProps) => {
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
    <div className="left-1/6 fixed top-0 z-20 h-full w-5/6 bg-[rgba(0,0,0,0.6)]">
      <div className="absolute left-[50%] top-[50%] z-[9999] flex h-[60vh] w-[50vw] -translate-x-[50%] -translate-y-[50%] items-center justify-center gap-4 bg-white px-4 py-8 text-black">
        <form className="flex flex-1 flex-col gap-4 p-4">
          <label>
            Image Upload
            <input
              type="file"
              name="image"
              id=""
              placeholder="upload image"
              onChange={(e) => setImageFile(e.target.files)}
              className="my-2"
            />
            {isError && (
              <span className="text-sm text-red-500">Choose an Image</span>
            )}
          </label>
          <div className="flex gap-4">
            <button className="mt-4 w-[8rem] rounded-md bg-gray-200 p-2 hover:bg-gray-300">
              Submit
            </button>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-[8rem] rounded-md bg-red-200 p-2 hover:bg-red-300"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="">
          <div className="relative text-left">
            <img
              src={
                image
                  ? image
                  : 'https://healvets.org/wp-content/uploads/2021/10/ef3-placeholder-image.jpeg'
              }
              alt={'image'}
              className="h-[240px] w-[320px] rounded-md object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddImage;
