// app/about/page.tsx

import React from "react";
import { Briefcase, Target, Users } from "lucide-react";
import Header from "@/components/Header";


export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold text-purple-700 mb-4">About ImpactLens</h1>
        <p className="text-gray-600 text-lg">
          We are a forward-thinking company providing insight-driven software change analysis tools.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-4 mb-4">
            <Target className="text-purple-700 w-8 h-8" />
            <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
          </div>
          <p className="text-gray-700">
            To be a company that embraces innovation, coherent international standards and delivers
            high quality, reliable, and affordable “Change, but know what you will affect” service solutions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-4 mb-4">
            <Briefcase className="text-purple-700 w-8 h-8" />
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          </div>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Deliver sustainable, cost-effective, high-quality solutions in all product domains.</li>
            <li>Support tracking, control and documentation with speed and quality.</li>
            <li>Provide a positive, respectful, and team-spirited work environment.</li>
            <li>Show clearly where a change impacts software systems.</li>
          </ul>
        </div>
      </section>

      <section className="text-center">
        <Users className="mx-auto text-purple-700 w-12 h-12 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Our Team</h3>
        <p className="text-gray-600">
          We are a group of passionate engineers, designers and innovators dedicated to helping teams build software better.
        </p>
      </section>
    </div>
  );
}
