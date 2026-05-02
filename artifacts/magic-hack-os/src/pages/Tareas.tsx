import { useState } from "react";
import { Plus, LayoutGrid, List } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Btn } from "@/components/ui/Btn";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { SidePanel } from "@/components/ui/SidePanel";
import { DataTable, Column } from "@/components/ui/DataTable";
import { KanbanBoard, KanbanColumn } from "@/components/ui/KanbanBoard";
import { KanbanCard } from "@/components/ui/KanbanCard";
import { tareas } from "@/data/tareas";
import { proyectos } from "@/data/proyectos";
import { equipo } from "@/data/equipo";

type Tarea = typeof tareas[0];

const COLUMNS: KanbanColumn[] = [
  { id: "Por Hacer", label: "Por Hacer" },
  { id: "En Proceso", label: "En Proceso" },
  { id: "En Revision", label: "En Revisión" },
  { id: "Completado", label: "Completado" },
];

const prioridadColor: Record<string, string> = { Alta: "#ef4444", Media: "#f59e0b", Baja: "#10b981" };

export default function Tareas() {
  const [view, setView] = useState<"kanban" | "lista">("kanban");
  const [selected, setSelected] = useState<Tarea | null>(null);

  const tableCols: Column<Tarea>[] = [
    { key: "nombre", label: "Tarea", render: (r) => <span className="font-medium text-white text-sm">{r.nombre}</span> },
    { key: "proyectoId", label: "Proyecto", render: (r) => <span className="text-xs text-[#9ca3af]">{proyectos.find(p => p.id === r.proyectoId)?.nombre ?? "-"}</span> },
    { key: "asignadoA", label: "Asignado a", render: (r) => { const m = equipo.find(e => e.id === r.asignadoA); return m ? <div className="flex items-center gap-2"><Avatar name={m.nombre} size="sm" color={m.color} /><span className="text-xs text-[#9ca3af]">{m.nombre.split(" ")[0]}</span></div> : <span className="text-[#9ca3af]">-</span>; } },
    { key: "prioridad", label: "Prioridad", render: (r) => <Badge estado={r.prioridad} /> },
    { key: "estado", label: "Estado", render: (r) => <Badge estado={r.estado} /> },
    { key: "entrega", label: "Entrega", render: (r) => <span className="text-xs text-[#9ca3af]">{r.entrega}</span> },
    { key: "cumplimiento", label: "% Cumplimiento", render: (r) => <ProgressBar value={r.cumplimiento} showLabel className="w-28" /> },
  ];

  return (
    <PageLayout>
      <PageHeader title="Tareas">
        <div className="flex items-center gap-2 bg-[#111111] border border-[#004c1e] rounded-lg p-1">
          <button onClick={() => setView("kanban")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all" style={{ background: view === "kanban" ? "#004c1e" : "transparent", color: view === "kanban" ? "#fff" : "#9ca3af" }} data-testid="view-kanban"><LayoutGrid size={13} /> Kanban</button>
          <button onClick={() => setView("lista")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all" style={{ background: view === "lista" ? "#004c1e" : "transparent", color: view === "lista" ? "#fff" : "#9ca3af" }} data-testid="view-lista"><List size={13} /> Lista</button>
        </div>
        <Btn variant="primary" data-testid="btn-nueva-tarea"><Plus size={14} /> Nueva Tarea</Btn>
      </PageHeader>

      {view === "kanban" ? (
        <KanbanBoard
          columns={COLUMNS}
          items={tareas}
          getColumnId={(t) => t.estado}
          renderCard={(t) => {
            const proyecto = proyectos.find((p) => p.id === t.proyectoId);
            const miembro = equipo.find((m) => m.id === t.asignadoA);
            return (
              <KanbanCard onClick={() => setSelected(t)}>
                <p className="font-medium text-white text-sm mb-2">{t.nombre}</p>
                {proyecto && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full text-[#9ca3af]" style={{ border: "1px solid #004c1e" }}>
                    {proyecto.nombre}
                  </span>
                )}
                <div className="flex items-center justify-between mt-2">
                  {miembro && <Avatar name={miembro.nombre} size="sm" color={miembro.color} />}
                  <span className="text-[11px] text-[#9ca3af]">{t.entrega}</span>
                  <span className="w-2 h-2 rounded-full" style={{ background: prioridadColor[t.prioridad] }} />
                </div>
              </KanbanCard>
            );
          }}
        />
      ) : (
        <div className="bg-[#111111] border border-[#004c1e] rounded-lg overflow-hidden">
          <DataTable columns={tableCols} data={tareas} onRowClick={setSelected} emptyText="Sin tareas" />
        </div>
      )}

      <SidePanel open={!!selected} onClose={() => setSelected(null)} title={selected?.nombre ?? ""} width={420}>
        {selected && (
          <div className="space-y-4">
            {(() => {
              const proyecto = proyectos.find((p) => p.id === selected.proyectoId);
              const miembro = equipo.find((m) => m.id === selected.asignadoA);
              return (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Estado", value: <Badge estado={selected.estado} /> },
                      { label: "Prioridad", value: <Badge estado={selected.prioridad} /> },
                      { label: "Proyecto", value: proyecto?.nombre ?? "-" },
                      { label: "Asignado a", value: miembro ? <div className="flex items-center gap-2"><Avatar name={miembro.nombre} size="sm" color={miembro.color} /><span className="text-sm">{miembro.nombre}</span></div> : "-" },
                      { label: "Fecha Entrega", value: selected.entrega },
                      { label: "Cumplimiento", value: `${selected.cumplimiento}%` },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">{label}</p>
                        <div className="text-sm text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">Progreso</p>
                    <ProgressBar value={selected.cumplimiento} showLabel />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">Descripción</p>
                    <p className="text-sm text-white">{selected.descripcion}</p>
                  </div>
                </>
              );
            })()}
          </div>
        )}
      </SidePanel>
    </PageLayout>
  );
}
