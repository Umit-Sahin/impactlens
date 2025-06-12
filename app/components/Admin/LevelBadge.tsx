// app/components/admin/LevelBadge.tsx

'use client';

import React from 'react';

type Props = {
  level: 'info' | 'warning' | 'critical' | string;
};

export default function LevelBadge({ level }: Props) {
  let className = 'px-2 py-1 rounded text-xs font-semibold ';

  switch (level) {
    case 'info':
      className += 'bg-blue-100 text-blue-800';
      break;
    case 'warning':
      className += 'bg-yellow-100 text-yellow-800';
      break;
    case 'critical':
      className += 'bg-red-100 text-red-800';
      break;
    default:
      className += 'bg-gray-100 text-gray-800';
  }

  return <span className={className}>{level.toUpperCase()}</span>;
}
