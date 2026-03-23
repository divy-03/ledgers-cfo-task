import type { Client, Task, TaskStatus, Priority } from "@prisma/client";

export type { Client, Task, TaskStatus, Priority };

export type TaskWithClient = Task & { client: Client };
export type ClientWithTaskCount = Client & { _count: { tasks: number } };

export type TaskFilters = {
  status?: TaskStatus | "ALL";
  category?: string | "ALL";
  search?: string;
  sortBy?: "dueDate" | "priority" | "createdAt";
  sortOrder?: "asc" | "desc";
};

export const TASK_CATEGORIES = [
  "Tax",
  "Reporting",
  "AML",
  "KYC",
  "Corporate",
  "Privacy",
  "Licensing",
  "HR Compliance",
  "Other",
] as const;

export const STATUS_LABELS: Record<TaskStatus, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};
