"use client";

import { useState } from "react";
import ClientList from "./clients/ClientList";
import type { ClientWithTaskCount } from "@/types";

export default function Dashboard() {
  const [selectedClient, setSelectedClient] =
    useState<ClientWithTaskCount | null>(null);

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <header className="bg-gray-900 border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-base font-semibold text-gray-100 leading-none">
              Compliance Tracker
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Client task management
            </p>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-65px)]">
        <aside className="w-72 border-r border-gray-200 bg-white flex flex-col overflow-hidden flex-shrink-0">
          <ClientList
            selectedClientId={selectedClient?.id ?? null}
            onSelectClient={setSelectedClient}
          />
        </aside>
      </div>
    </div>
  );
}


