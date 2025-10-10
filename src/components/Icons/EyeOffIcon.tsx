interface EyeOffIconProps {
  className?: string;
  size?: number;
}

const EyeOffIcon = ({ className = "w-4 h-4", size }: EyeOffIconProps) => {
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
        d="M3 3l18 18M10.477 10.477A3 3 0 0012 15a3 3 0 002.523-4.523M9.88 4.593A9.956 9.956 0 0112 4c4.477 0 8.268 2.943 9.542 7a10.026 10.026 0 01-4.132 5.411M6.228 6.228A9.956 9.956 0 002.458 12c1.274 4.057 5.064 7 9.542 7 1.066 0 2.093-.168 3.053-.48"
      />
    </svg>
  );
};

export default EyeOffIcon;
