import { CloseIcon, MenuIcon } from "@/components/Icons";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuButton = ({ isOpen, onToggle }: MobileMenuButtonProps) => {
  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={onToggle}
        className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? (
          <CloseIcon className="w-5 h-5" />
        ) : (
          <MenuIcon className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default MobileMenuButton;
