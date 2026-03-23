"use client";

import { useState } from "react";
import ClientList from "./clients/ClientList";
import type { ClientWithTaskCount } from "@/types";
import TaskPanel from "./tasks/TaskPanel";
import { ModeToggleBtn } from "./ModeToggleBtn";

export default function Dashboard() {
  const [selectedClient, setSelectedClient] =
    useState<ClientWithTaskCount | null>(null);

  return (
    <div className="min-h-screen bg-[#f8f7f4] dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-base font-semibold text-gray-900 dark:text-gray-100 leading-none">
              Compliance Tracker
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Client task management
            </p>
          </div>
          <ModeToggleBtn />
        </div>
      </header>

      <div className="flex h-[calc(100vh-65px)]">
        <aside className="w-72 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col overflow-hidden flex-shrink-0">
          <ClientList
            selectedClientId={selectedClient?.id ?? null}
            onSelectClient={setSelectedClient}
          />
        </aside>


        <main className="flex-1 overflow-hidden">
          {selectedClient ? (
            <TaskPanel client={selectedClient} />
          ) : (
            <EmptyState />
          )}
        </main>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-8 h-8 text-brand-500"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        Select a client
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
        Choose a client from the sidebar to view and manage their compliance
        tasks.
      </p>
    </div>
  );
}
