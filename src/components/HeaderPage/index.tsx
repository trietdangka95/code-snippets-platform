import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full pt-10 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
        <h1 className="text-xl font-semibold tracking-tight">
          Code Snippet Platform
        </h1>
        <nav className="ml-auto">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="/"
                className="text-sm text-gray-700 hover:text-black transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="text-sm inline-flex items-center px-3 py-1.5 rounded-md border bg-gray-50 hover:bg-gray-100 text-gray-800"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
