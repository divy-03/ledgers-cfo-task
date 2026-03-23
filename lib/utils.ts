import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { isPast, isToday, format, differenceInDays } from "date-fns";
import type { Task, TaskStatus, Priority } from "@/app/generated/prisma/client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isOverdue(task: Task): boolean {
  return (
    task.status !== "COMPLETED" &&
    task.status !== "CANCELLED" &&
    isPast(new Date(task.dueDate)) &&
    !isToday(new Date(task.dueDate))
  );
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), "dd MMM yyyy");
}

export function getDaysUntilDue(dueDate: string | Date): number {
  return differenceInDays(new Date(dueDate), new Date());
}

export function getDueDateLabel(task: Task): string {
  const days = getDaysUntilDue(task.dueDate);
  if (isOverdue(task)) {
    const overdueDays = Math.abs(days);
    return `${overdueDays}d overdue`;
  }
  if (isToday(new Date(task.dueDate))) return "Due today";
  if (days === 1) return "Due tomorrow";
  if (days <= 7) return `${days}d left`;
  return formatDate(task.dueDate);
}

export const STATUS_CONFIG: Record<
  TaskStatus,
  { label: string; color: string; dot: string }
> = {
  PENDING: {
    label: "Pending",
    color: "bg-amber-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-500",
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "bg-blue-50 text-blue-700 border border-blue-200",
    dot: "bg-blue-500",
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-green-50 text-green-700 border border-green-200",
    dot: "bg-green-500",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-gray-100 text-gray-500 border border-gray-200",
    dot: "bg-gray-400",
  },
};

export const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; color: string }
> = {
  LOW: { label: "Low", color: "bg-gray-100 text-gray-600" },
  MEDIUM: { label: "Medium", color: "bg-blue-100 text-blue-700" },
  HIGH: { label: "High", color: "bg-orange-100 text-orange-700" },
};

export function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "PENDING").length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;
  const overdue = tasks.filter(isOverdue).length;
  return { total, pending, inProgress, completed, overdue };
}
