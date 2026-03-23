"use client";

import { useState } from "react";
import type { Task, TaskStatus } from "@/types";
import { STATUS_CONFIG, PRIORITY_CONFIG, isOverdue, getDueDateLabel, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const NEXT_STATUSES: Record<TaskStatus, { value: TaskStatus; label: string }[]> = {
  PENDING: [
    { value: "IN_PROGRESS", label: "Start" },
    { value: "COMPLETED", label: "Complete" },
    { value: "CANCELLED", label: "Cancel" },
  ],
  IN_PROGRESS: [
    { value: "COMPLETED", label: "Complete" },
    { value: "PENDING", label: "Reset" },
    { value: "CANCELLED", label: "Cancel" },
  ],
  COMPLETED: [
    { value: "PENDING", label: "Reopen" },
  ],
  CANCELLED: [
    { value: "PENDING", label: "Reopen" },
  ],
};

interface Props {
  task: Task;
  onUpdated: () => void;
}

export default function TaskCard({ task, onUpdated }: Props) {
  const [updating, setUpdating] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const overdue = isOverdue(task);

  const statusCfg = STATUS_CONFIG[task.status];
  const priorityCfg = PRIORITY_CONFIG[task.priority];
  const dueDateLabel = getDueDateLabel(task);

  const updateStatus = async (newStatus: TaskStatus) => {
    setUpdating(true);
    try {
      const res = await fetch(`/api/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Update failed");
      onUpdated();
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  };

  const deleteTask = async () => {
    if (!confirm("Delete this task?")) return;
    try {
      await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      onUpdated();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={cn(
        "card transition-all duration-150",
        overdue && "border-red-200 bg-red-50/30",
        task.status === "COMPLETED" && "opacity-70",
        task.status === "CANCELLED" && "opacity-50"
      )}
    >
      {overdue && (
        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-red-100 border-b border-red-200 rounded-t-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 overdue-indicator" />
          <span className="text-xs font-semibold text-red-700">
            OVERDUE · {dueDateLabel}
          </span>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => {
              if (task.status === "PENDING" || task.status === "IN_PROGRESS") {
                updateStatus("COMPLETED");
              } else if (task.status === "COMPLETED") {
                updateStatus("PENDING");
              }
            }}
            className={cn(
              "w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 border-2 transition-colors",
              task.status === "COMPLETED"
                ? "bg-green-500 border-green-500"
                : task.status === "CANCELLED"
                  ? "bg-gray-300 border-gray-300"
                  : overdue
                    ? "border-red-400 hover:border-red-500"
                    : "border-gray-300 hover:border-brand-400"
            )}
            disabled={updating}
          >
            {task.status === "COMPLETED" && (
              <svg viewBox="0 0 24 24" fill="none" className="w-3 h-3 text-white" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-left"
              >
                <p
                  className={cn(
                    "text-sm font-medium",
                    task.status === "COMPLETED"
                      ? "text-gray-400 line-through"
                      : overdue
                        ? "text-gray-900"
                        : "text-gray-900"
                  )}
                >
                  {task.title}
                </p>
              </button>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className={cn("priority-badge", priorityCfg.color)}>
                  {priorityCfg.label}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={cn("status-badge", statusCfg.color)}>
                <span className={cn("w-1.5 h-1.5 rounded-full", statusCfg.dot)} />
                {statusCfg.label}
              </span>

              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {task.category}
              </span>

              {!overdue && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    task.status === "COMPLETED" || task.status === "CANCELLED"
                      ? "text-gray-400"
                      : "text-gray-500"
                  )}
                >
                  {formatDate(task.dueDate)}
                </span>
              )}
            </div>

            {expanded && task.description && (
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {task.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400 mr-auto">
            {task.description && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-brand-500 hover:text-brand-700 font-medium"
              >
                {expanded ? "Less" : "Details"}
              </button>
            )}
          </span>

          {NEXT_STATUSES[task.status].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateStatus(opt.value)}
              disabled={updating}
              className={cn(
                "text-xs px-2.5 py-1 rounded-md font-medium transition-colors border",
                opt.value === "COMPLETED"
                  ? "border-green-200 text-green-700 hover:bg-green-50"
                  : opt.value === "CANCELLED"
                    ? "border-red-200 text-red-600 hover:bg-red-50"
                    : opt.value === "IN_PROGRESS"
                      ? "border-blue-200 text-blue-700 hover:bg-blue-50"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
              )}
            >
              {updating ? "..." : opt.label}
            </button>
          ))}

          <button
            onClick={deleteTask}
            className="p-1 rounded-md text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors ml-1"
            title="Delete task"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
