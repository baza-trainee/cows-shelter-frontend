import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ExcursionsFormInput } from '@/types';
import { defaultValues } from './defaultValues';
import { excursionsValidation } from './excursionsValidation';
import TextInput from '@/components/admin/inputs/TextInput';
import TextArea from '@/components/admin/inputs/TextArea';
import FileInput from '@/components/admin/inputs/FileInput';

const AddExcursions = () => {
  // const [titleUa, setTitleUa] = useState('');
  // const [titleEn, setTitleEn] = useState('');
  // const [textUa, setTextUa] = useState('');
  // const [textEn, setTextEn] = useState('');
  // const [isError, setIsError] = useState(true);
  // const [imageFile, setImageFile] = useState<FileList | null>(null);
  const [image, setImage] = useState('');

  // const setFileToBase64 = (file: File) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImage(reader.result as string);
  //   };
  // };

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm<ExcursionsFormInput>({
    mode: 'onChange',
    defaultValues: defaultValues
  });

  const currentValues = watch();

  const setImagePreview = (file: File) => {
    const img = URL.createObjectURL(file);
    setImage(img);
  };

  useEffect(() => {
    if (!currentValues.image?.length) return;
    const file = currentValues.image[0];
    setImagePreview(file);
  }, [currentValues.image]);

  const onSubmit: SubmitHandler<ExcursionsFormInput> = () => {};

  // useEffect(() => {
  //   if (imageFile !== null) {
  //     const file = imageFile[0];
  //     // setFileToBase64(file);
  //     // setIsError(true);
  //   }
  // }, [imageFile]);

  return (
    <div className="flex min-h-screen w-full flex-col items-start justify-center gap-4 pb-[134px] pl-[48px] pr-[142px] ">
      <div className="mb-[12px] mt-[48px]">
        <h1 className="text-3xl font-bold">Додавання Екскурсії</h1>
      </div>
      <div className="flex w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex flex-1 flex-col gap-4"
        >
          <div className="flex gap-2">
            <section className="flex flex-col items-center justify-center gap-4">
              <Controller
                name="titleUa"
                rules={excursionsValidation.titleUa}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.titleUa?.message}
                    placeholder="Введіть назву екскурсії"
                    title="Назва екскурсії:"
                  />
                )}
              />
              <Controller
                name="titleEn"
                rules={excursionsValidation.titleEn}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.titleEn?.message}
                    placeholder="Введіть англійською назву екскурсії"
                    title="Назва екскурсії англійською:"
                  />
                )}
              />

              <Controller
                name="descriptionUa"
                rules={excursionsValidation.descriptionUa}
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    errorText={errors.descriptionUa?.message}
                    placeholder="Введіть опис екскурсії"
                    title="Опис екскурсії:"
                  />
                )}
              />
              <Controller
                name="descriptionEn"
                rules={excursionsValidation.descriptionEn}
                control={control}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    errorText={errors.descriptionEn?.message}
                    placeholder="Введіть англійською опис екскурсії"
                    title="Опис екскурсії англійською:"
                  />
                )}
              />
            </section>

            <section className="flex flex-col items-center justify-center gap-4 px-8">
              <div className="mt-[5vh] flex w-full flex-col items-center justify-center gap-8 ">
                <div className="relative text-left">
                  <img
                    src={
                      image
                        ? image
                        : 'https://healvets.org/wp-content/uploads/2021/10/ef3-placeholder-image.jpeg'
                    }
                    alt={currentValues.titleUa}
                    className="h-[240px] w-[320px] rounded-md object-cover"
                  />
                  <h2
                    className={`absolute bottom-4 left-2 text-xl font-bold ${
                      !image ? 'text-gray-400' : 'text-white'
                    } `}
                  >
                    {currentValues.titleUa
                      ? currentValues.titleUa
                      : 'Заголовок...'}
                  </h2>
                </div>
                <FileInput
                  name="image"
                  control={control}
                  rules={excursionsValidation.image}
                  accept="image/*"
                  placeholder={'Оберіть файл'}
                  title="Оберіть файл:"
                />
              </div>

              <div>
                <Controller
                  name="timeFrom"
                  rules={excursionsValidation.timeFrom}
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      errorText={errors.timeFrom?.message}
                      title="Від"
                    />
                  )}
                />
                <Controller
                  name="timeTill"
                  rules={excursionsValidation.timeTill}
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      errorText={errors.timeTill?.message}
                      title="До"
                    />
                  )}
                />
              </div>

              <Controller
                name="visitorsNumber"
                rules={excursionsValidation.visitorsNumber}
                control={control}
                render={({ field }) => (
                  <TextInput
                    {...field}
                    errorText={errors.visitorsNumber?.message}
                    title="Введіть кількість відвідувачів:"
                  />
                )}
              />
            </section>
          </div>

          <p className="text-base leading-normal text-disabled">
            Розмістити нову екскурсію?
          </p>
          <div className="flex gap-4">
            <button className="w-[13.5rem] rounded-md bg-gray-200 px-6 py-2 transition-all hover:bg-lemon">
              Розмістити
            </button>

            <Link to="/admin">
              <button className="w-[13.5rem] rounded-md border-2 border-lightgrey bg-white px-6 py-2 transition-all hover:bg-red-300">
                Скасувати
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExcursions;

// (
//     <div className="flex min-h-screen w-full items-center justify-center gap-4 px-8">
//       <div className="mb-[12px] mt-[48px]">
//         <h1 className="text-3xl font-bold">Додавання Екскурсії</h1>
//       </div>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         autoComplete="off"
//         className="flex flex-1 flex-col gap-4 p-4"
//       >
//         <div className="flex gap-2">
//           <label className="flex-1">
//             Заголовок українською
//             <input
//               type="text"
//               placeholder="add title"
//               className=" w-full rounded-md border-2 border-black p-2"
//               onChange={(e) => setTitleUa(e.target.value)}
//               value={titleUa}
//             />
//             {isError && (
//               <span className="text-sm text-red-500">Example Error</span>
//             )}
//           </label>

//           <label className="flex-1">
//             Заголовок англійською
//             <input
//               type="text"
//               placeholder="add title"
//               className="w-full rounded-md border-2 border-black p-2"
//               onChange={(e) => setTitleEn(e.target.value)}
//               value={titleEn}
//             />
//           </label>
//         </div>
//         <div className="flex gap-4">
//           <label className="flex-1">
//             Тривалість (?)
//             <input
//               type="text"
//               placeholder="duration e.g 30-60"
//               className=" w-full rounded-md border-2 border-black p-2"
//               onChange={(e) => setTitleUa(e.target.value)}
//               value={titleUa}
//             />
//           </label>

//           <label className="flex-1">
//             Кількість особ (?)
//             <input
//               type="text"
//               placeholder="amount of people e.g 5-10"
//               className="w-full rounded-md border-2 border-black p-2"
//               onChange={(e) => setTitleEn(e.target.value)}
//               value={titleEn}
//             />
//           </label>
//         </div>
//         <div className="flex gap-4">
//           <label className="">
//             Опис українською
//             <textarea
//               placeholder="add text"
//               className="w-full rounded-md border-2 border-black p-2"
//               onChange={(e) => setTextUa(e.target.value)}
//               value={textUa}
//             />
//           </label>

//           <label className="">
//             Опис англійською
//             <textarea
//               placeholder="add text"
//               className="w-full rounded-md border-2 border-black p-2"
//               onChange={(e) => setTextEn(e.target.value)}
//               value={textEn}
//             />
//           </label>
//         </div>

//         <input
//           type="file"
//           name="image"
//           id=""
//           placeholder="upload image"
//           onChange={(e) => setImageFile(e.target.files)}
//         />
//         <div className="flex gap-4">
//           <button className="mt-4 w-[8rem] rounded-md bg-gray-200 p-2 hover:bg-gray-300">
//             Submit
//           </button>

//           <Link to="/admin/excursions">
//             <button className="mt-4 w-[8rem] rounded-md bg-red-200 p-2 hover:bg-red-300">
//               Cancel
//             </button>
//           </Link>
//         </div>
//       </form>

//       <div className="mb-[10vh]">
//         <div className="relative text-left">
//           <img
//             src={
//               image
//                 ? image
//                 : 'https://healvets.org/wp-content/uploads/2021/10/ef3-placeholder-image.jpeg'
//             }
//             alt={titleUa}
//             className="h-[240px] w-[320px] rounded-md object-cover"
//           />
//           <h2
//             className={`absolute bottom-4 left-2 text-xl font-bold ${
//               !image ? 'text-gray-400' : 'text-white'
//             } `}
//           >
//             {titleUa ? titleUa : 'Type Something...'}
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
