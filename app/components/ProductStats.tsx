export default function ProductStats() {
    const stats = [
      { label: "Pages", value: 145, sub: "85% Coverage" },
      { label: "Components", value: 3264, sub: "8% Coverage" },
      { label: "APIs Linked", value: 1244, sub: "72% Integrated" },
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-purple-700">{stat.value}</h2>
            <p className="text-gray-800 font-medium">{stat.label}</p>
            <p className="text-sm text-purple-500">{stat.sub}</p>
          </div>
        ))}
      </div>
    );
  }
  