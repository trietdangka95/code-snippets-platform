interface CloseIconProps {
  className?: string;
  size?: number;
}

const CloseIcon = ({ className = "w-5 h-5", size }: CloseIconProps) => {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

export default CloseIcon;
