interface CopyIconProps {
  className?: string;
  size?: number;
}

const CopyIcon = ({ className = "w-4 h-4", size }: CopyIconProps) => {
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
        d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2V6l-6-4H8a2 2 0 00-2 2v2"
      />
    </svg>
  );
};

export default CopyIcon;
