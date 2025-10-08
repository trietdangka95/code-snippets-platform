const UITag = ({ children }: { children: React.ReactNode }) => {
  //tách children thành mảng
  const tags = children?.toString().split(",");
  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags?.map((tag) => (
        <span
          key={tag}
          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
        >
          #{tag.trim()}
        </span>
      ))}
    </div>
  );
};

export default UITag;
