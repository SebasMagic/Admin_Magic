import { useState, useEffect } from "react";
import { Inbox } from "lucide-react";

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyText?: string;
  onRowClick?: (row: T) => void;
}

function SkeletonRow({ cols }: { cols: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="h-3 bg-[#1a1a1a] rounded animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export function DataTable<T extends Record<string, unknown>>({ columns, data, emptyText = "Sin datos", onRowClick }: DataTableProps<T>) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="overflow-x-auto" data-testid="data-table">
      <table className="w-full min-w-full text-sm">
        <thead>
          <tr style={{ background: "#0d0d0d" }}>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af]"
                style={{ borderBottom: "1px solid #004c1e" }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} cols={columns.length} />)
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-16 text-center">
                <div className="flex flex-col items-center gap-2 text-[#9ca3af]">
                  <Inbox size={32} strokeWidth={1.5} />
                  <span className="text-sm">{emptyText}</span>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className="transition-colors duration-100 cursor-pointer"
                style={{ background: "#111111", borderBottom: "1px solid #002910" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,76,30,0.10)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#111111")}
                onClick={() => onRowClick?.(row)}
                data-testid={`table-row-${idx}`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-white">
                    {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
