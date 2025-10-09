const LanguageTagColor = ({ language }: { language: string }) => {
  const languageColor = {
    JavaScript: "bg-blue-100 text-blue-700",
    Algorithms: "bg-purple-100 text-purple-700",
    Search: "bg-orange-100 text-orange-700",
    Binary: "bg-pink-100 text-pink-700",
    Python: "bg-green-100 text-green-700",
    Java: "bg-red-100 text-red-700",
    "C++": "bg-yellow-100 text-yellow-700",
    "C#": "bg-gray-100 text-gray-700",
    PHP: "bg-purple-100 text-purple-700",
    Ruby: "bg-pink-100 text-pink-700",
    Swift: "bg-orange-100 text-orange-700",
    TypeScript: "bg-blue-100 text-blue-700",
    React: "bg-purple-100 text-purple-700",
    Node: "bg-orange-100 text-orange-700",
    Next: "bg-pink-100 text-pink-700",
    Tailwind: "bg-green-100 text-green-700",
    HTML: "bg-red-100 text-red-700",
    CSS: "bg-yellow-100 text-yellow-700",
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className={`px-3 py-1 ${
          languageColor[language as keyof typeof languageColor]
        } rounded-full text-xs font-medium`}
      >
        {language}
      </span>
    </div>
  );
};

export default LanguageTagColor;
