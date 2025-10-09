import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button = ({
  children,
  variant = "primary",
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const base = "px-4 py-2 rounded font-medium transition focus:outline-none";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  const types = {
    button: "px-4 py-2 rounded font-medium transition focus:outline-none",
    submit: "px-4 py-2 rounded font-medium transition focus:outline-none",
    reset: "px-4 py-2 rounded font-medium transition focus:outline-none",
  };

  return (
    <button
      {...props}
      className={clsx(
        base,
        variants[variant],
        types[props.type ?? "button"],
        "cursor-pointer",
        className,
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );
};

export default Button;
