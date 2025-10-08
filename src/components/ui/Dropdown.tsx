import { Select } from "@headlessui/react";
import clsx from "clsx";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const Dropdown = ({
  options,
  handleSelect,
}: {
  options: string[];
  handleSelect: (option: string) => void;
}) => {
  return (
    <div className="relative">
      <Select as={Fragment}>
        {({ focus, hover }) => (
          <select
            className={clsx(
              "mt-3 block w-full appearance-none rounded-lg border border-gray-300 bg-white/5 px-3 py-1.5 text-sm/6",
              "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25",
              "*:text-black"
            )}
          >
            {options.map((option) => (
              <option
                key={option}
                value={option}
                onClick={() => handleSelect(option)}
              >
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
  );
};

export default Dropdown;
