import { useState } from "react";
import { Inbox } from "lucide-react";

export interface KanbanColumn {
  id: string;
  label: string;
}

interface KanbanBoardProps<T> {
  columns: KanbanColumn[];
  items: T[];
  getColumnId: (item: T) => string;
  renderCard: (item: T, dragHandlers?: DragHandlers) => React.ReactNode;
  getItemId?: (item: T) => string;
  onItemMove?: (itemId: string, newColumnId: string) => void;
}

export interface DragHandlers {
  draggable: true;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
}

export function KanbanBoard<T>({ columns, items, getColumnId, renderCard, getItemId, onItemMove }: KanbanBoardProps<T>) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hoverColumn, setHoverColumn] = useState<string | null>(null);
  const dndEnabled = !!(getItemId && onItemMove);

  const buildHandlers = (item: T): DragHandlers | undefined => {
    if (!dndEnabled || !getItemId) return undefined;
    return {
      draggable: true,
      onDragStart: (e: React.DragEvent) => {
        const id = getItemId(item);
        setDraggingId(id);
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", id);
      },
      onDragEnd: () => {
        setDraggingId(null);
        setHoverColumn(null);
      },
    };
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4" data-testid="kanban-board">
      {columns.map((col) => {
        const colItems = items.filter((i) => getColumnId(i) === col.id);
        const isHover = hoverColumn === col.id;
        return (
          <div
            key={col.id}
            className="shrink-0 flex flex-col"
            style={{ width: 280 }}
            data-testid={`kanban-column-${col.id}`}
            onDragOver={(e) => {
              if (!dndEnabled) return;
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              if (hoverColumn !== col.id) setHoverColumn(col.id);
            }}
            onDragLeave={(e) => {
              if (!dndEnabled) return;
              if (e.currentTarget.contains(e.relatedTarget as Node)) return;
              setHoverColumn(null);
            }}
            onDrop={(e) => {
              if (!dndEnabled || !onItemMove) return;
              e.preventDefault();
              const id = e.dataTransfer.getData("text/plain") || draggingId;
              if (id) onItemMove(id, col.id);
              setDraggingId(null);
              setHoverColumn(null);
            }}
          >
            <div
              className="flex items-center justify-between px-3 py-2 rounded-t-lg mb-2 transition-colors duration-150"
              style={{
                background: "#0d0d0d",
                border: "1px solid #004c1e",
                borderBottom: "none",
                borderColor: isHover && draggingId ? "#00fe65" : "#004c1e",
              }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                {col.label}
              </span>
              <span className="text-xs font-mono font-bold text-white bg-[#004c1e]/30 px-2 py-0.5 rounded-full border border-[#004c1e]">
                {colItems.length}
              </span>
            </div>
            <div
              className="flex-1 flex flex-col gap-2 p-2 rounded-b-lg min-h-[120px] transition-all duration-150"
              style={{
                background: isHover && draggingId ? "rgba(0,254,101,0.04)" : "#0a0a0a",
                border: `1px solid ${isHover && draggingId ? "#00fe65" : "#004c1e"}`,
                borderTop: "none",
              }}
            >
              {colItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-1 py-8 text-[#9ca3af]">
                  <Inbox size={20} strokeWidth={1.5} />
                  <span className="text-xs">Sin elementos</span>
                </div>
              ) : (
                colItems.map((item, i) => {
                  const handlers = buildHandlers(item);
                  const id = getItemId ? getItemId(item) : String(i);
                  const isDragging = draggingId === id;
                  return (
                    <div
                      key={id}
                      style={{
                        opacity: isDragging ? 0.4 : 1,
                        transition: "opacity 150ms ease",
                      }}
                    >
                      {renderCard(item, handlers)}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
