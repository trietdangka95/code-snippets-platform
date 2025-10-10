import React from "react";
import { EyeIcon } from "@/components/Icons";
import EyeOffIcon from "@/components/Icons/EyeOffIcon";
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
  showPasswordToggle?: boolean;
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
      showPasswordToggle,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const isPasswordField = type === "password";
    const effectiveType =
      isPasswordField && (showPasswordToggle ?? true)
        ? isPasswordVisible
          ? "text"
          : "password"
        : type;

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
        <div className={clsx("relative", className && "")}>
          <input
            ref={ref}
            type={effectiveType}
            placeholder={placeholder}
            className={clsx(
              "block w-full rounded-lg border py-1.5 text-sm/6",
              // Add right padding if toggle button is shown
              isPasswordField && (showPasswordToggle ?? true)
                ? "pr-9 pl-3"
                : "px-3",
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
          {isPasswordField && (showPasswordToggle ?? true) && (
            <button
              type="button"
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              onClick={() => setIsPasswordVisible((v) => !v)}
              className="absolute inset-y-0 right-2 my-auto h-6 w-6 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {isPasswordVisible ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </Field>
    );
  }
);

Input.displayName = "Input";

export default Input;
