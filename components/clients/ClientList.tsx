"use client";

import { useEffect, useState, useCallback } from "react";
import type { ClientWithTaskCount } from "@/types";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

interface Props {
  selectedClientId: string | null;
  onSelectClient: (client: ClientWithTaskCount) => void;
}

export default function ClientList({ selectedClientId, onSelectClient }: Props) {
  const [clients, setClients] = useState<ClientWithTaskCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchClients = useCallback(async () => {
    try {
      const res = await fetch("/api/clients");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setClients(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const filtered = clients.filter((c) =>
    c.companyName.toLowerCase().includes(search.toLowerCase()) ||
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Clients
        </h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-700"
          />
          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="space-y-2 p-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-14 bg-gray-100 rounded-lg" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No clients found</p>
        ) : (
          filtered.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              isSelected={client.id === selectedClientId}
              onClick={() => onSelectClient(client)}
            />
          ))
        )}
      </div>

      <div className="p-3 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          {clients.length} client{clients.length !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

function ClientCard({
  client,
  isSelected,
  onClick,
}: {
  client: ClientWithTaskCount;
  isSelected: boolean;
  onClick: () => void;
}) {
  const initials = client.companyName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-3 rounded-lg mb-1 transition-all duration-100 group",
        isSelected
          ? "bg-brand-50 border border-brand-200"
          : "hover:bg-gray-50 border border-transparent"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={
            "w-8 h-8 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
          }
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-sm font-medium truncate",
              isSelected ? "text-brand-700" : "text-gray-900"
            )}
          >
            {client.companyName}
          </p>
          <p className="text-xs text-gray-400 truncate">
            {client.country} · {client.entityType}
          </p>
        </div>
        <span
          className={
            "text-xs font-medium px-1.5 py-0.5 rounded-full flex-shrink-0 bg-gray-100 text-gray-700"
          }
        >
          {client._count.tasks}
        </span>
      </div>
    </button >
  );
}
