import SnippetCreatePage from "@/components/SnippetCreatePage";
import SnippetPage from "@/components/SnippetPage";

const HomePage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SnippetPage />
        <SnippetCreatePage />
      </div>
    </div>
  );
};

export default HomePage;
