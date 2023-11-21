import { ChangeEvent, InputHTMLAttributes } from 'react';
import {
  DeepMap,
  FieldError,
  FieldValues,
  useController,
  UseControllerProps
} from 'react-hook-form';

import { UploadIcon } from '@/components/icons/UploadIcon';

type TProps<T extends FieldValues> = InputHTMLAttributes<HTMLInputElement> &
  UseControllerProps<T> & { title?: string };

const FileInput = <T extends FieldValues>({
  title,
  placeholder,
  control,
  name,
  rules,
  ...rest
}: TProps<T>) => {
  const { field, formState } = useController<T>({ name, control, rules });
  const fileName = field.value && field.value[0]?.name;

  const errorMessage = (
    formState.errors[name] as DeepMap<FieldValues, FieldError>
  )?.message;

  const inputWrapperStyle = `relative w-full ${
    errorMessage ? 'text-error' : ''
  }`;

  const inputContainerStyle = `mt-[2.8rem] flex h-12 bg-lightgrey w-full gap-6 rounded-[0.4rem] border p-[0.8rem] cursor-pointer ${
    errorMessage ? 'border-error' : 'border-lightgray'
  }`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      field.onChange(e.target.files);
    }
  };
  return (
    <div className={inputWrapperStyle}>
      {!!title && (
        <label className="absolute left-0 top-4 text-sm font-medium">
          {title}
        </label>
      )}

      <label htmlFor={title + 'file'}>
        <div className={inputContainerStyle}>
          <span className="w-[250px] truncate text-center text-sm text-gray-400">
            {fileName || placeholder}
          </span>

          <UploadIcon className={!errorMessage ? 'text-gray-400' : ''} />
        </div>
      </label>

      <input
        {...rest}
        ref={field.ref}
        type="file"
        id={title + 'file'}
        hidden
        onChange={handleChange}
      />

      {!!errorMessage && (
        <span className="absolute -bottom-6 left-0 text-xs">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FileInput;
