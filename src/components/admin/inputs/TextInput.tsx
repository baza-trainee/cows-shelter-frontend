import { nanoid } from 'nanoid';
import { InputHTMLAttributes } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  errorText?: string;
}

const TextInput = ({
  title,
  errorText,
  value = '',
  ...rest
}: TextInputProps) => {
  const id = nanoid();

  const inputClassName = `w-full rounded-md border-2 p-2 placeholder:text-sm
${
  errorText
    ? 'border-error caret-error outline-error focus:outline-error'
    : 'border-lightgrey focus:outline-darkgray'
}
`;

  return (
    <div
      className={`w-full min-w-[130px] ${
        errorText ? 'text-error' : 'text-inherit'
      }`}
    >
      {!!title && (
        <label htmlFor={id} className="text-sm font-medium">
          {title}
        </label>
      )}
      <input {...rest} id={id} value={value} className={inputClassName} />

      {errorText && <span className="ml-2 text-xs">{errorText}</span>}
    </div>
  );
};

export default TextInput;
