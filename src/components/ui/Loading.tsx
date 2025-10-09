import React from "react";

type LoadingOverlayProps = {
  show: boolean;
  message?: string;
  className?: string;
};

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  show,
  message = "Loading...",
  className = "",
}) => {
  if (!show) return null;
  return (
    <div
      className={`absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl ${className}`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-full border-4 border-blue-200" />
          <div className="absolute inset-0 h-10 w-10 rounded-full border-4 border-t-transparent border-blue-600 animate-spin" />
        </div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

type InlineSpinnerProps = { message?: string };
export const InlineSpinner: React.FC<InlineSpinnerProps> = ({ message }) => (
  <span className="inline-flex items-center gap-2">
    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
    {message ? <span>{message}</span> : null}
  </span>
);
