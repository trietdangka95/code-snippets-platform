import React from "react";
import { Description, Field, Label } from "@headlessui/react";
import clsx from "clsx";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  rows?: number;
  className?: string;
  onClearError?: () => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      placeholder,
      label,
      description,
      error,
      rows = 4,
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
        <textarea
          ref={ref}
          placeholder={placeholder}
          rows={rows}
          className={clsx(
            "mt-3 block w-full rounded-lg border px-3 py-1.5 text-sm/6 font-mono",
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

Textarea.displayName = "Textarea";

export default Textarea;
