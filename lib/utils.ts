import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { isPast, isToday } from "date-fns";
import type { Task } from "@/app/generated/prisma/client";

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

export function getTaskStats(tasks: Task[]) {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "PENDING").length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;
  const overdue = tasks.filter(isOverdue).length;
  return { total, pending, inProgress, completed, overdue };
}
