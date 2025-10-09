export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-14 w-14 rounded-full border-4 border-blue-200"></div>
          <div className="absolute inset-0 h-14 w-14 rounded-full border-4 border-t-transparent border-blue-600 animate-spin" />
        </div>
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
}
