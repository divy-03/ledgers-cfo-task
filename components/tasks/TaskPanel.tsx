"use client";
import { useEffect, useState, useCallback } from "react";
import type { Task, TaskStatus, ClientWithTaskCount } from "@/types";
import { Plus } from "lucide-react";
// import { getTaskStats } from "@/lib/utils";

interface Props {
  client: ClientWithTaskCount;
}

export default function TaskPanel({ client }: Props) {
  return (
    <div className="flex flex-col h-full bg-[#f8f7f4]">
      {/* Client header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {client.companyName}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {client.country} · {client.entityType}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
