interface PlusCircleIconProps {
  className?: string;
  size?: number;
}

const PlusCircleIcon = ({
  className = "w-5 h-5",
  size,
}: PlusCircleIconProps) => {
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
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  );
};

export default PlusCircleIcon;
