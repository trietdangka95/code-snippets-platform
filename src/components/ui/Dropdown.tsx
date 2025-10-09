import React from "react";
import { Select } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface DropdownProps {
  options: string[];
  handleSelect: (option: string) => void;
  label?: string;
  error?: string;
  className?: string;
  onClearError?: () => void;
  value?: string;
}

const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  (
    {
      options,
      handleSelect,
      label,
      error,
      className,
      onClearError,
      value,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        {label && (
          <label className="text-sm/6 font-medium text-gray-500">{label}</label>
        )}
        <div className="relative">
          <Select as={Fragment}>
            {() => (
              <select
                ref={ref}
                value={value}
                className={clsx(
                  "block w-full appearance-none rounded-lg border px-3 py-1.5 text-sm/6",
                  error
                    ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                    : "border-gray-300 focus:border-gray-500 focus:ring-gray-500/20",
                  "focus:outline-none focus:ring-2 focus:ring-offset-0",
                  className
                )}
                onChange={(e) => {
                  handleSelect(e.target.value);
                  if (error && onClearError) {
                    onClearError();
                  }
                }}
                {...props}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </Select>
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
            aria-hidden="true"
          />
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
