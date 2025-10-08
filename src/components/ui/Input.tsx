import React from "react";
import { Description, Field, Label } from "@headlessui/react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  type?: string;
  className?: string;
  onClearError?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      label,
      description,
      error,
      type = "text",
      className,
      onClearError,
      ...props
    },
    ref
  ) => {
    return (
      <Field>
        {label && (
          <Label className="text-sm/6 font-medium text-gray-500">{label}</Label>
        )}
        {description && (
          <Description className="text-sm/6 text-gray-600 mt-1">
            {description}
          </Description>
        )}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "mt-3 block w-full rounded-lg border px-3 py-1.5 text-sm/6",
            error
              ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
              : "border-gray-300 bg-gray-50 focus:border-gray-500 focus:ring-gray-500/20",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            className
          )}
          onChange={(e) => {
            props.onChange?.(e);
            if (error && onClearError) {
              onClearError();
            }
          }}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </Field>
    );
  }
);

Input.displayName = "Input";

export default Input;
