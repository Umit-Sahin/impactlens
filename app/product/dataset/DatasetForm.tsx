//app/product/dataset/DatasetForm.tsx

"use client";

import { useState } from "react";
import { Input } from "app/components/ui/input";
import { Button } from "app/components/ui/button";
import { Card, CardContent } from "app/components/ui/card";
import { toast } from "react-hot-toast";

type Props = {
  dataset: {
    domains: string[];
    githubLinks: string[];
  };
  plan: "BASIC" | "PRO" | "ENTERPRISE" | "SUPER_ADMIN";
};

const planLimits = {
  BASIC: { domains: 1, githubLinks: 1 },
  PRO: { domains: 5, githubLinks: 3 },
  ENTERPRISE: { domains: 10, githubLinks: 5 },
};

export function DatasetForm({ dataset, plan }: Props) {
  const [domains, setDomains] = useState(dataset.domains || []);
  const [githubLinks, setGithubLinks] = useState(dataset.githubLinks || []);
  const [newDomain, setNewDomain] = useState("");
  const [newGithub, setNewGithub] = useState("");

  const isUnlimited = plan === "SUPER_ADMIN";

  const handleAddDomain = async () => {
    if (!isUnlimited && domains.length >= planLimits[plan].domains) {
      toast.error("Domain limitine ulaşıldı.");
      return;
    }

    if (!newDomain.trim()) {
      toast.error("Domain boş olamaz.");
      return;
    }

    const updated = [...domains, newDomain.trim()];
    setDomains(updated);
    setNewDomain("");
    await saveToServer(updated, githubLinks);
  };

  const handleAddGithub = async () => {
    if (!isUnlimited && githubLinks.length >= planLimits[plan].githubLinks) {
      toast.error("GitHub proje limitine ulaşıldı.");
      return;
    }

    if (!newGithub.trim()) {
      toast.error("GitHub linki boş olamaz.");
      return;
    }

    const updated = [...githubLinks, newGithub.trim()];
    setGithubLinks(updated);
    setNewGithub("");
    await saveToServer(domains, updated);
  };

  const saveToServer = async (domains: string[], githubLinks: string[]) => {
    const res = await fetch("/api/dataset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domains, githubLinks }),
    });

    if (!res.ok) {
      toast.error("Kaydedilemedi.");
    } else {
      toast.success("Kaydedildi.");
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-4">
          <h2 className="font-medium mb-2">Domains</h2>
          <div className="space-y-2">
            {domains.map((d, i) => (
              <div key={i} className="text-sm">{d}</div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Input
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              placeholder="example.com"
            />
            <Button onClick={handleAddDomain}>+ Add</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-medium mb-2">GitHub Projects</h2>
          <div className="space-y-2">
            {githubLinks.map((g, i) => (
              <div key={i} className="text-sm">{g}</div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Input
              value={newGithub}
              onChange={(e) => setNewGithub(e.target.value)}
              placeholder="https://github.com/org/repo/projects/1"
            />
            <Button onClick={handleAddGithub}>+ Add</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
