"use client";
import { useEffect, useState, useCallback } from "react";
import type { Task, TaskStatus, ClientWithTaskCount } from "@/types";
import TaskList from "./TaskList";
import TaskFilters from "./TaskFilters";
import { Plus } from "lucide-react";
import AddTaskModal from "./AddTaskModal";

interface Props {
  client: ClientWithTaskCount;
}

export default function TaskPanel({ client }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "ALL">("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "createdAt">("dueDate");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ clientId: client.id, sortBy, sortOrder });
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (categoryFilter !== "ALL") params.set("category", categoryFilter);
      if (searchQuery) params.set("search", searchQuery);

      const res = await fetch(`/api/tasks?${params}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setTasks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [client.id, statusFilter, categoryFilter, searchQuery, sortBy, sortOrder]);

  // Refetch when client changes or filters change
  useEffect(() => {
    setStatusFilter("ALL");
    setCategoryFilter("ALL");
    setSearchQuery("");
  }, [client.id]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleTaskUpdated = () => {
    fetchTasks();
  };

  // Stats on ALL tasks (no filter) — refetch without filters for accurate stats
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  useEffect(() => {
    fetch(`/api/tasks?clientId=${client.id}`)
      .then((r) => r.json())
      .then(setAllTasks)
      .catch(console.error);
  }, [client.id, tasks]); // re-run whenever tasks change


  // Determine categories actually in use for this client
  const usedCategories = Array.from(new Set(allTasks.map((t) => t.category)));

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
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
          >
            <Plus />
            Add Task
          </button>
        </div>

      </div>

      {/* Filters */}
      <TaskFilters
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortOrder={sortOrder}
        categories={usedCategories}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
        onSearchChange={setSearchQuery}
        onSortByChange={setSortBy}
        onSortOrderChange={setSortOrder}
      />

      {/* Task list */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <TaskList
          tasks={tasks}
          loading={loading}
          onTaskUpdated={handleTaskUpdated}
        />
      </div>


      {showAddModal && (
        <AddTaskModal
          clientId={client.id}
          onClose={() => setShowAddModal(false)}
          onCreated={() => {
            setShowAddModal(false);
            fetchTasks();
          }}
        />
      )}


    </div>
  );
}
