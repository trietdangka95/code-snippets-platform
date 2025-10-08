"use client";

import Dropdown from "../ui/Dropdown";
const SnippetCreatePage = () => {
  const onSelectLanguage = (language: string) => {
    console.log(language);
  };
  return (
    <aside className="border rounded-xl p-6 bg-white/50 shadow-sm h-max md:sticky md:top-24">
      <h2 className="text-2xl font-semibold mb-6">Add Snippet</h2>
      <form className="space-y-5">
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder=""
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Language</label>
          {/* <select className="w-full border rounded-lg px-3 py-2 text-sm bg-white">
                <option value="">Select language</option>
                <option>JavaScript</option>
                <option>TypeScript</option>
                <option>Python</option>
                <option>Go</option>
                <option>Java</option>
            </select> */}
          <Dropdown
            options={["JavaScript", "TypeScript", "Python", "Go", "Java"]}
            handleSelect={onSelectLanguage}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Tags</label>
          <input
            className="w-full border rounded-lg px-3 py-2 text-sm"
            placeholder="e.g. sorting, recursion"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Code</label>
          <textarea
            rows={6}
            className="w-full border rounded-lg px-3 py-2 text-sm font-mono"
            placeholder=""
          />
        </div>

        <div className="pt-2">
          <button
            type="button"
            className="w-full md:w-auto px-4 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 text-sm"
          >
            Add Snippet
          </button>
        </div>
      </form>
    </aside>
  );
};

export default SnippetCreatePage;
