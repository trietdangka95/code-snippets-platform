const TechStackSection = () => {
  const technologies = [
    {
      name: "Next.js 15",
      description: "React Framework",
    },
    {
      name: "TypeScript",
      description: "Type Safety",
    },
    {
      name: "Prisma",
      description: "Database ORM",
    },
    {
      name: "Tailwind CSS",
      description: "Styling",
    },
  ];

  return (
    <div className="rounded-2xl p-8 bg-gradient-to-br from-white via-gray-50 to-blue-50 shadow-xl border border-gray-200/50 backdrop-blur-sm mb-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Built with Modern Technology
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="text-center p-4 rounded-lg bg-white/50 border border-gray-200/50"
          >
            <div className="text-lg font-semibold text-gray-800 mb-1">
              {tech.name}
            </div>
            <div className="text-sm text-gray-600">{tech.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStackSection;
