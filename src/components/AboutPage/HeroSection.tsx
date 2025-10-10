import { CodeIcon } from "@/components/Icons";

const HeroSection = () => {
  return (
    <div className="text-center mb-16">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
        <CodeIcon className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-600 bg-clip-text text-transparent mb-6">
        About CodeSnippets
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
        A modern, collaborative platform where developers share, discover, and
        learn from the best code snippets across all programming languages.
      </p>
    </div>
  );
};

export default HeroSection;
