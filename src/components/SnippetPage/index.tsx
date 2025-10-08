// import Dropdown from "../ui/Dropdown";

const CodeSnippetsPage = () => {
  const placeholderSnippets = new Array(5).fill(null);

  return (
    <section className="rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm">
      <div className="mb-8 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent mb-2">
              Code Snippets
            </h2>
            <p className="text-gray-600 text-sm">
              Discover and explore code snippets from the community
            </p>
          </div>
          <button
            type="button"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
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
              Add Snippet
            </span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <div className="relative">
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-200">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              placeholder="Search by language or tags..."
              className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
            />
            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium hover:bg-blue-200 transition-colors">
              Filter
            </button>
          </div>
        </div>
      </div>

      <ul className="space-y-6">
        {placeholderSnippets.map((_, index) => (
          <li
            key={index}
            className="group bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                  Binary Search Algorithm
                </h3>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  O(log n)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                JavaScript
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                Algorithms
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                Search
              </span>
              <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                Binary
              </span>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4 font-mono text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Code Preview</span>
              </div>
              <div className="space-y-1">
                <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                >
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit
                  </span>
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
                >
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </span>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CodeSnippetsPage;
