"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTaskSchema, type CreateTaskInput } from "@/lib/zod";
import { TASK_CATEGORIES } from "@/types";
import { format } from "date-fns";

interface Props {
  clientId: string;
  onClose: () => void;
  onCreated: () => void;
}

export default function AddTaskModal({ clientId, onClose, onCreated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      clientId,
      priority: "MEDIUM",
      dueDate: format(new Date(), "yyyy-MM-dd"),
    },
  });

  const onSubmit = async (data: CreateTaskInput) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create task");
      }
      onCreated();
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "Failed to create task");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Add New Task</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {/* Hidden clientId */}
          <input type="hidden" {...register("clientId")} />

          {/* Title */}
          <div>
            <label className="label dark:text-gray-300">Title *</label>
            <input
              type="text"
              placeholder="e.g. Annual tax filing"
              className="input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="label dark:text-gray-300">Description</label>
            <textarea
              placeholder="Optional details about this task..."
              rows={2}
              className="input resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Category + Priority row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label dark:text-gray-300">Category *</label>
              <select className="input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" {...register("category")}>
                <option value="">Select...</option>
                {TASK_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
              )}
            </div>
            <div>
              <label className="label dark:text-gray-300">Priority *</label>
              <select className="input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100" {...register("priority")}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
              {errors.priority && (
                <p className="text-xs text-red-500 mt-1">{errors.priority.message}</p>
              )}
            </div>
          </div>

          {/* Due date */}
          <div>
            <label className="label dark:text-gray-300">Due Date *</label>
            <input
              type="date"
              className="input dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              {...register("dueDate")}
            />
            {errors.dueDate && (
              <p className="text-xs text-red-500 mt-1">{errors.dueDate.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Creating...
                </span>
              ) : (
                "Create Task"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
