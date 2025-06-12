// app/product/elements/page.tsx

'use client';

import React, { useState } from 'react';
import {
  Table,
  SquarePen,
  SquareArrowOutUpRight,
  Link as LinkIcon,
  Link2,
  PanelBottomClose,
  ListRestart,
  Filter,
  Calendar,
  AlertTriangle,
  Image,
  CalendarClock,
  FilterX
} from 'lucide-react';

type Element = {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: { name: string; type: string; example?: string }[];
};

const elements: Element[] = [
  {
    title: 'Tables',
    description: 'Table structures on the web page',
    icon: <Table className="w-6 h-6 text-purple-700" />,
    items: [
      { name: 'Table Header', type: 'thead' },
      { name: 'Table Row', type: 'tr' },
      { name: 'Table Cell', type: 'td' },
    ],
  },
  {
    title: 'Forms',
    description: 'Form elements like input, select…',
    icon: <SquarePen className="w-6 h-6 text-purple-700" />,
    items: [
      { name: 'Form', type: 'form' },
      { name: 'Input', type: 'input' },
      { name: 'Select', type: 'select' },
    ],
  },
  {
    title: 'Buttons',
    description: 'Various types of buttons',
    icon: <SquareArrowOutUpRight className="w-6 h-6 text-purple-700" />,
    items: [
      { name: 'Button', type: 'button' },
      { name: 'Submit Button', type: 'input[type="submit"]' },
    ],
  },
  {
    title: 'Links',
    description: 'Internal and external links',
    icon: <LinkIcon className="w-6 h-6 text-purple-700" />,
    items: [{ name: 'Link', type: 'a[href]' }],
  },
  {
    title: 'Anchors',
    description: 'Anchor tags with href',
    icon: <Link2 className="w-6 h-6 text-purple-700" />,
    items: [{ name: 'Anchor', type: 'a[href="#"]' }],
  },
  {
    title: 'iFrames',
    description: 'Embedded external content',
    icon: <PanelBottomClose className="w-6 h-6 text-purple-700" />,
    items: [
      { name: 'YouTube Embed', type: 'iframe[src*="youtube"]' },
      { name: 'Generic iFrame', type: 'iframe' },
    ],
  },
  {
    title: 'Inputs',
    description: 'Input field examples',
    icon: <ListRestart className="w-6 h-6 text-purple-700" />,
    items: [
      { name: 'Text Input', type: 'input[type="text"]' },
      { name: 'Email Input', type: 'input[type="email"]' },
    ],
  },
  {
    title: 'Alerts',
    description: 'Alert messages and status indicators',
    icon: <AlertTriangle className="w-6 h-6 text-purple-700" />,
    items: [
      { name: 'Warning Alert', type: 'div.alert-warning' },
      { name: 'Success Alert', type: 'div.alert-success' },
    ],
  },
  {
    title: 'Images',
    description: 'Embedded and responsive images',
    icon: <Image className="w-6 h-6 text-purple-700" />,
    items: [
      { name: 'Basic Image', type: 'img' },
      { name: 'Responsive Image', type: 'img.responsive' },
    ],
  },
  {
    title: 'DatePickers',
    description: 'Date and time selection components',
    icon: <CalendarClock className="w-6 h-6 text-purple-700" />,
    items: [
      { name: 'Basic Date Picker', type: 'input[type="date"]' },
      { name: 'Datetime Picker', type: 'input[type="datetime-local"]' },
    ],
  },
  {
    title: 'Filters',
    description: 'Filtering options and tools',
    icon: <FilterX className="w-6 h-6 text-purple-700" />,
    items: [
      { name: 'Dropdown Filter', type: 'select.filter' },
      { name: 'Search Input', type: 'input.filter' },
    ],
  },
];

export default function WebElementsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const currentItems =
    activeIndex !== null
      ? elements[activeIndex].items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : [];

  const totalPages =
    activeIndex !== null ? Math.ceil(elements[activeIndex].items.length / itemsPerPage) : 0;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Web Elements</h1>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {elements.map((el, idx) => (
          <div
            key={idx}
            onClick={() => {
              setActiveIndex(activeIndex === idx ? null : idx);
              setCurrentPage(1);
            }}
            className="border rounded-lg p-3 bg-white hover:shadow-md transition cursor-pointer h-full text-xs"
          >
            <div className="flex items-center gap-3 mb-1">
              {el.icon}
              <h2 className="text-sm font-medium text-gray-800">{el.title}</h2>
            </div>
            <p className="text-xs text-gray-500">{el.description}</p>
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="mt-8 border rounded-lg overflow-hidden">
          <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b">
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <input
                  placeholder="Filter…"
                  className="h-8 w-48 text-sm border border-gray-300 rounded px-2"
                />
              </div>

            </div>
          </div>

          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, i) => (
                <tr key={i} className="border-t">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2 text-gray-500">—</td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="flex justify-between items-center p-4 bg-gray-50 text-sm text-gray-600">
              <span>Total: {elements[activeIndex].items.length} items</span>
              <div className="space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded border ${
                      currentPage === page
                        ? 'bg-purple-600 text-white'
                        : 'bg-white text-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
