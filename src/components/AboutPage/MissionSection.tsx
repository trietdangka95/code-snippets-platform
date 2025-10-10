const MissionSection = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
      {/* Mission Card */}
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
          To create a thriving community where developers can easily share their
          knowledge, discover innovative solutions, and accelerate their
          learning journey through high-quality code snippets.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We believe that great code should be accessible to everyone, and that
          sharing knowledge makes the entire developer community stronger.
        </p>
      </div>

      {/* Features Card */}
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
  );
};

export default MissionSection;
