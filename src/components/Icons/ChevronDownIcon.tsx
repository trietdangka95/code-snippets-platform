interface ChevronDownIconProps {
  className?: string;
  size?: number;
}

const ChevronDownIcon = ({
  className = "w-4 h-4",
  size,
}: ChevronDownIconProps) => {
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
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
};

export default ChevronDownIcon;
