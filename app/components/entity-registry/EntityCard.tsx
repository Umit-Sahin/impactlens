//app/components/entity-registry/EntityCard.tsx

'use client';

import React from "react";
import { Badge } from "app/components/ui/badge";
import { Button } from "app/components/ui/button";
import { Eye, Pencil } from "lucide-react";

export interface EntityCardProps {
  id: string;
  name: string;
  description: string;
  status: "active" | "inactive";
  location: string;
}

export default function EntityCard({
  name,
  description,
  status,
  location,
}: EntityCardProps) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white flex flex-col justify-between h-full">
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="text-xs text-gray-500">Konum: {location}</p>
        <Badge
          variant={status === "active" ? "success" : "danger"}
          className="mt-2"
        >
          {status === "active" ? "Aktif" : "Pasif"}
        </Badge>
      </div>
      <div className="mt-4 flex justify-between gap-2">
        <Button variant="outline" className="w-full flex items-center gap-2">
          <Eye size={16} /> İncele
        </Button>
        <Button variant="default" className="w-full flex items-center gap-2">
          <Pencil size={16} /> Düzenle
        </Button>
      </div>
    </div>
  );
}
