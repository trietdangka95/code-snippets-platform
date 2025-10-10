interface PageLoadingProps {
  message?: string;
}

const PageLoading = ({ message = "Loading..." }: PageLoadingProps) => {
  return (
    <div className="w-full max-w-[calc(100%-2rem)] sm:max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-6 sm:mt-10 rounded-2xl bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm overflow-hidden sm:overflow-visible">
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="h-14 w-14 rounded-full border-4 border-blue-200"></div>
            <div className="absolute inset-0 h-14 w-14 rounded-full border-4 border-t-transparent border-blue-600 animate-spin"></div>
          </div>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default PageLoading;
