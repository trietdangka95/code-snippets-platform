const StatsSection = () => {
  const stats = [
    {
      number: "1000+",
      label: "Code Snippets",
      gradient: "from-blue-50 to-indigo-50",
      border: "border-blue-200/50",
      textColor: "text-blue-600",
    },
    {
      number: "50+",
      label: "Languages",
      gradient: "from-green-50 to-emerald-50",
      border: "border-green-200/50",
      textColor: "text-green-600",
    },
    {
      number: "500+",
      label: "Active Users",
      gradient: "from-purple-50 to-pink-50",
      border: "border-purple-200/50",
      textColor: "text-purple-600",
    },
    {
      number: "24/7",
      label: "Available",
      gradient: "from-orange-50 to-red-50",
      border: "border-orange-200/50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`text-center p-6 rounded-xl bg-gradient-to-br ${stat.gradient} border ${stat.border}`}
        >
          <div className={`text-3xl font-bold ${stat.textColor} mb-2`}>
            {stat.number}
          </div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsSection;
