import React from "react";

type Module = {
  name: string;
  coverage: number;
  risk: "Low" | "Medium" | "High";
};

const modules: Module[] = [
  { name: "Auth Module", coverage: 92, risk: "Low" },
  { name: "Billing", coverage: 67, risk: "Medium" },
  { name: "LegacyApiHandler", coverage: 33, risk: "High" },
];

const riskColor = {
  Low: "text-green-600",
  Medium: "text-yellow-600",
  High: "text-red-600",
};

export default function ModuleList() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Affected Modules</h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="py-2">Module</th>
            <th className="py-2">Coverage</th>
            <th className="py-2">Risk</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((mod) => (
            <tr key={mod.name} className="border-b last:border-none">
              <td className="py-2 font-medium text-gray-800">{mod.name}</td>
              <td className="py-2">{mod.coverage}%</td>
              <td className={`py-2 font-semibold ${riskColor[mod.risk]}`}>{mod.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
