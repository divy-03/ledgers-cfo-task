"use client";

interface Stats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

export default function StatsBar({ stats }: { stats: Stats }) {
  const items = [
    { label: "Total", value: stats.total, color: "text-gray-700", bg: "bg-gray-100" },
    { label: "Pending", value: stats.pending, color: "text-amber-700", bg: "bg-amber-50" },
    { label: "In Progress", value: stats.inProgress, color: "text-blue-700", bg: "bg-blue-50" },
    { label: "Completed", value: stats.completed, color: "text-green-700", bg: "bg-green-50" },
    {
      label: "Overdue",
      value: stats.overdue,
      color: stats.overdue > 0 ? "text-red-700" : "text-gray-400",
      bg: stats.overdue > 0 ? "bg-red-50" : "bg-gray-50",
    },
  ];

  return (
    <div className="flex gap-3 mt-4 flex-wrap">
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${item.bg}`}
        >
          <span className={`text-lg font-bold leading-none ${item.color}`}>
            {item.value}
          </span>
          <span className={`text-xs font-medium ${item.color} opacity-80`}>
            {item.label}
          </span>
          {item.label === "Overdue" && item.value > 0 && (
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 overdue-indicator" />
          )}
        </div>
      ))}
    </div>
  );
}
