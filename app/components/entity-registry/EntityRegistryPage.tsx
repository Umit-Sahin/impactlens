//app/components/entity-registry/EntityRegistryPage.tsx

'use client';

import React, { useState, useEffect } from 'react';
import EntityCard, { EntityCardProps } from 'app/components/entity-registry/EntityCard';
import { getAllEntities } from '@/lib/admin'; // örnek fetch fonksiyonu, kendi verine göre uyarlayabilirsin

interface RawEntity {
  id: string;
  name: string;
  description: string;
  status: string;    // veritabanından gelen genel string
  location: string;
}

export default function EntityRegistryPage() {
  const [entities, setEntities] = useState<RawEntity[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    // Gerçek fetch fonksiyonunu kendi lib’inden çağır
    getAllEntities().then((data) => setEntities(data));
  }, []);

  const filteredEntities = entities.filter((e) => {
    if (filter === 'all') return true;
    return e.status === filter; // filtreleme de normalize edilmiş olsun
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
        >
          Tümü
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Aktif
        </button>
        <button
          onClick={() => setFilter('inactive')}
          className={`px-3 py-1 rounded ${filter === 'inactive' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        >
          Pasif
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntities.map((entity) => {
          // status mutlaka "active" veya "inactive" olmalı
          const normalizedStatus: EntityCardProps['status'] =
            entity.status === 'active' ? 'active' : 'inactive';

          return (
            <EntityCard
              key={entity.id}
              id={entity.id}
              name={entity.name}
              description={entity.description}
              location={entity.location}
              status={normalizedStatus}
            />
          );
        })}
      </div>
    </div>
  );
}
