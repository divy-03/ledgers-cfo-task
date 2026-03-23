"use client";

import type { TaskStatus } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS: { value: TaskStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
];

interface Props {
  statusFilter: TaskStatus | "ALL";
  categoryFilter: string;
  searchQuery: string;
  sortBy: "dueDate" | "priority" | "createdAt";
  sortOrder: "asc" | "desc";
  categories: string[];
  onStatusChange: (v: TaskStatus | "ALL") => void;
  onCategoryChange: (v: string) => void;
  onSearchChange: (v: string) => void;
  onSortByChange: (v: "dueDate" | "priority" | "createdAt") => void;
  onSortOrderChange: (v: "asc" | "desc") => void;
}

export default function TaskFilters({
  statusFilter,
  categoryFilter,
  searchQuery,
  sortBy,
  sortOrder,
  categories,
  onStatusChange,
  onCategoryChange,
  onSearchChange,
  onSortByChange,
  onSortOrderChange,
}: Props) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center gap-4 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-48 max-w-64">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          {STATUS_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => onStatusChange(opt.value)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-all",
                statusFilter === opt.value
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {categories.length > 0 && (
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-700"
          >
            <option value="ALL">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        )}

        <div className="flex items-center gap-1.5 ml-auto">
          <select
            value={sortBy}
            onChange={(e) =>
              onSortByChange(e.target.value as "dueDate" | "priority" | "createdAt")
            }
            className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-gray-700"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Created</option>
          </select>
          <button
            onClick={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
            className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600"
            title={sortOrder === "asc" ? "Ascending" : "Descending"}
          >
            {sortOrder === "asc" ? (
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21l3.75-3.75" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
