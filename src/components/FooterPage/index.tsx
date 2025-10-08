import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Bottom Section */}
      <div className="px-6 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-300 text-sm">
          © 2025 CodeSnippets Platform. All rights reserved. Built with ❤️ by
          Triet Dang
        </p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span className="text-gray-300 text-sm">Made with</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white text-xs">❤️</span>
            </div>
            <span className="text-gray-300 text-sm">Next.js & Tailwind</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
