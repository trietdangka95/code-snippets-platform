import Dropdown from "../ui/Dropdown";

const CodeSnippetsPage = () => {
  const placeholderSnippets = new Array(5).fill(null);

  return (
    <section className="border rounded-xl p-6 bg-white/50 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Code Snippets</h2>
        <button
          type="button"
          className="px-3 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 text-sm"
        >
          + Add Snippet
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
          <span className="i-heroicons-magnifying-glass-20-solid text-gray-500" />
          <input
            placeholder="Search by language or topic"
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      <ul className="space-y-8">
        {placeholderSnippets.map((_, index) => (
          <li key={index} className="rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">Snippet Title</h3>
              <span className="text-sm text-gray-500">O(n)</span>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                JavaScript
              </span>
              <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                Sorting
              </span>
              <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                Pointers
              </span>
            </div>

            <div className="mt-3 space-y-2">
              <div className="h-2 bg-gray-200 rounded" />
              <div className="h-2 bg-gray-200 rounded w-11/12" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                className="px-3 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 text-sm cursor-pointer"
              >
                Edit
              </button>
              <button
                type="button"
                className="px-3 py-2 rounded-md bg-red-500 text-white hover:bg-red-300 text-sm cursor-pointer"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CodeSnippetsPage;
