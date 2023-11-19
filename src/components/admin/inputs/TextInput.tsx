import { nanoid } from 'nanoid';
import {
  InputHTMLAttributes,
  forwardRef,
  Ref,
  LegacyRef
} from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  errorText?: string;
  inputRef?: Ref<HTMLInputElement> | LegacyRef<HTMLInputElement> | null;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    { title, errorText, value = '', inputRef, ...rest },
    forwardedRef
  ) {
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
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
