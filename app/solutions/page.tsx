// app/solutions/page.tsx
import { Lightbulb, AlertCircle, Share2, BarChart, MapIcon, ListCheck } from "lucide-react";

export default function SolutionsPage() {
  const solutions = [
    {
      title: "Entity Registry",
      description:
        "Create a central inventory of all items in the system.",
      icon: <ListCheck className="w-8 h-8 text-purple-700" />,
    },
    {
      title: "Dependency Mapping",
      description:
        "Navigate through change propagation with clear diagrams and visual maps.",
      icon: <MapIcon className="w-8 h-8 text-purple-700" />,
    },
    {
      title: "Risk Analysis",
      description:
        "Highlight potential risks and regression-prone areas in your code.",
      icon: <AlertCircle className="w-8 h-8 text-purple-700" />,
    },
    {
      title: "Impact Analysis",
      description:
        "If a component is changed you can see which elements are affected.",
      icon: <Lightbulb className="w-8 h-8 text-purple-700" />,
    },

    {
      title: "Team Collaboration",
      description:
        "Share insights, documentation, and impact data across your team easily.",
      icon: <Share2 className="w-8 h-8 text-purple-700" />,
    },
  ];

  return (
    <div className="min-h-screen p-10 bg-white text-gray-900">
      <h1 className="text-4xl font-bold text-purple-700 mb-10 text-center">Our Solutions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {solutions.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              {item.icon}
              <h3 className="text-xl font-semibold text-purple-800">{item.title}</h3>
            </div>
            <p className="text-gray-700 text-base">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}