import { Inbox } from "lucide-react";

export interface KanbanColumn {
  id: string;
  label: string;
}

interface KanbanBoardProps<T> {
  columns: KanbanColumn[];
  items: T[];
  getColumnId: (item: T) => string;
  renderCard: (item: T) => React.ReactNode;
}

export function KanbanBoard<T>({ columns, items, getColumnId, renderCard }: KanbanBoardProps<T>) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4" data-testid="kanban-board">
      {columns.map((col) => {
        const colItems = items.filter((i) => getColumnId(i) === col.id);
        return (
          <div
            key={col.id}
            className="shrink-0 flex flex-col"
            style={{ width: 280 }}
            data-testid={`kanban-column-${col.id}`}
          >
            <div
              className="flex items-center justify-between px-3 py-2 rounded-t-lg mb-2"
              style={{ background: "#0d0d0d", border: "1px solid #004c1e", borderBottom: "none" }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                {col.label}
              </span>
              <span className="text-xs font-mono font-bold text-white bg-[#004c1e]/30 px-2 py-0.5 rounded-full border border-[#004c1e]">
                {colItems.length}
              </span>
            </div>
            <div
              className="flex-1 flex flex-col gap-2 p-2 rounded-b-lg min-h-[120px]"
              style={{ background: "#0a0a0a", border: "1px solid #004c1e", borderTop: "none" }}
            >
              {colItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-1 py-8 text-[#9ca3af]">
                  <Inbox size={20} strokeWidth={1.5} />
                  <span className="text-xs">Sin elementos</span>
                </div>
              ) : (
                colItems.map((item, i) => (
                  <div key={i}>{renderCard(item)}</div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
