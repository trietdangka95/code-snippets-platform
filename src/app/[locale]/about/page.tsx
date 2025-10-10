const AboutPage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-600 bg-clip-text text-transparent mb-6">
          About CodeSnippets
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A modern, collaborative platform where developers share, discover, and
          learn from the best code snippets across all programming languages.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Mission Section */}
        <div className="rounded-2xl p-8 bg-gradient-to-br from-white via-blue-50 to-indigo-50 shadow-xl border border-blue-200/50 backdrop-blur-sm">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            To create a thriving community where developers can easily share
            their knowledge, discover innovative solutions, and accelerate their
            learning journey through high-quality code snippets.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe that great code should be accessible to everyone, and
            that sharing knowledge makes the entire developer community
            stronger.
          </p>
        </div>

        {/* Features Section */}
        <div className="rounded-2xl p-8 bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-xl border border-purple-200/50 backdrop-blur-sm">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">
                Multi-language support with syntax highlighting
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">
                Smart categorization by topics and complexity
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">
                User profiles and contribution tracking
              </span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span className="text-gray-700">
                Real-time editing and collaboration
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50">
          <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
          <div className="text-sm text-gray-600">Code Snippets</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50">
          <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
          <div className="text-sm text-gray-600">Languages</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50">
          <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200/50">
          <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
          <div className="text-sm text-gray-600">Available</div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Built with Modern Technology
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 rounded-lg bg-white/50 border border-gray-200/50">
            <div className="text-lg font-semibold text-gray-800 mb-1">
              Next.js 15
            </div>
            <div className="text-sm text-gray-600">React Framework</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/50 border border-gray-200/50">
            <div className="text-lg font-semibold text-gray-800 mb-1">
              TypeScript
            </div>
            <div className="text-sm text-gray-600">Type Safety</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/50 border border-gray-200/50">
            <div className="text-lg font-semibold text-gray-800 mb-1">
              Prisma
            </div>
            <div className="text-sm text-gray-600">Database ORM</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-white/50 border border-gray-200/50">
            <div className="text-lg font-semibold text-gray-800 mb-1">
              Tailwind CSS
            </div>
            <div className="text-sm text-gray-600">Styling</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="rounded-2xl p-8 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 shadow-2xl text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Start sharing your code snippets, discover new techniques, and
            connect with developers from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg"
            >
              Get Started
            </a>
            <a
              href="/"
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Explore Snippets
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
