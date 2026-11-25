import { useState } from "react";
import { Plus, List, LayoutGrid } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Btn } from "@/components/ui/Btn";
import { Badge } from "@/components/ui/AppBadge";
import { SidePanel } from "@/components/ui/SidePanel";
import { DataTable, Column } from "@/components/ui/DataTable";
import { KanbanBoard, KanbanColumn } from "@/components/ui/KanbanBoard";
import { KanbanCard } from "@/components/ui/KanbanCard";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { propuestas as propuestasData } from "@/data/propuestas";

type Propuesta = typeof propuestasData[0];

const COLUMNS: KanbanColumn[] = [
  { id: "Lead", label: "Lead" },
  { id: "Propuesta", label: "Propuesta" },
  { id: "Negociacion", label: "Negociación" },
  { id: "Win", label: "Win" },
  { id: "Lost", label: "Lost" },
];

const tableCols: Column<Propuesta>[] = [
  { key: "id", label: "#", render: (r) => <span className="font-mono text-[#9ca3af] text-xs">{r.id}</span> },
  { key: "prospecto", label: "Prospecto", render: (r) => <span className="font-medium text-white">{r.prospecto}</span> },
  { key: "servicio", label: "Servicio", render: (r) => <Badge estado={r.servicio} /> },
  { key: "moneda", label: "Moneda", render: (r) => <span className="text-[#9ca3af] text-xs">{r.moneda}</span> },
  { key: "valorVenta", label: "Valor Venta", render: (r) => <CurrencyDisplay amount={r.valorVenta} moneda={r.moneda as "COP" | "USD"} className="text-sm" /> },
  { key: "total", label: "Total", render: (r) => <CurrencyDisplay amount={r.total} moneda={r.moneda as "COP" | "USD"} className="text-sm" /> },
  { key: "estado", label: "Estado", render: (r) => <Badge estado={r.estado} /> },
  { key: "contacto", label: "Contacto", render: (r) => <span className="text-[#9ca3af] text-xs">{r.contacto}</span> },
];

export default function Pipeline() {
  const [view, setView] = useState<"kanban" | "lista">("kanban");
  const [selected, setSelected] = useState<Propuesta | null>(null);
  const [propuestas, setPropuestas] = useState<Propuesta[]>(propuestasData);

  const handleMove = (itemId: string, newColumnId: string) => {
    setPropuestas((prev) =>
      prev.map((p) => (p.id === itemId ? { ...p, estado: newColumnId } : p))
    );
    setSelected((prev) => (prev && prev.id === itemId ? { ...prev, estado: newColumnId } : prev));
  };

  return (
    <PageLayout>
      <PageHeader title="Pipeline de Ventas">
        <div className="flex items-center gap-2 bg-[#111111] border border-[#004c1e] rounded-lg p-1">
          <button
            onClick={() => setView("kanban")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            style={{ background: view === "kanban" ? "#004c1e" : "transparent", color: view === "kanban" ? "#fff" : "#9ca3af" }}
            data-testid="view-kanban"
          >
            <LayoutGrid size={13} /> Kanban
          </button>
          <button
            onClick={() => setView("lista")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            style={{ background: view === "lista" ? "#004c1e" : "transparent", color: view === "lista" ? "#fff" : "#9ca3af" }}
            data-testid="view-lista"
          >
            <List size={13} /> Lista
          </button>
        </div>
        <Btn variant="primary" data-testid="btn-nueva-propuesta"><Plus size={14} /> Nueva Propuesta</Btn>
      </PageHeader>

      {view === "kanban" ? (
        <>
          <p className="text-xs text-[#9ca3af] mb-3">Arrastra las tarjetas entre columnas para cambiar su estado.</p>
          <KanbanBoard
            columns={COLUMNS}
            items={propuestas}
            getColumnId={(p) => p.estado}
            getItemId={(p) => p.id}
            onItemMove={handleMove}
            renderCard={(p, drag) => (
              <KanbanCard onClick={() => setSelected(p)} drag={drag}>
                <p className="font-semibold text-white text-sm mb-1">{p.prospecto}</p>
                <Badge estado={p.servicio} />
                <p className="text-xs font-mono text-white mt-2">
                  <CurrencyDisplay amount={p.total} moneda={p.moneda as "COP" | "USD"} />
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[11px] text-[#9ca3af]">{p.contacto}</span>
                  <span className="text-[11px] text-[#9ca3af]">{p.diasCreado}d</span>
                </div>
              </KanbanCard>
            )}
          />
        </>
      ) : (
        <div className="bg-[#111111] border border-[#004c1e] rounded-lg overflow-hidden">
          <DataTable columns={tableCols} data={propuestas} onRowClick={(row) => setSelected(row)} emptyText="Sin propuestas" />
        </div>
      )}

      <SidePanel open={!!selected} onClose={() => setSelected(null)} title={selected?.prospecto ?? ""}>
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Prospecto", value: selected.prospecto },
                { label: "Servicio", value: <Badge estado={selected.servicio} /> },
                { label: "Moneda", value: selected.moneda },
                { label: "Estado", value: <Badge estado={selected.estado} /> },
                { label: "Valor Venta", value: <CurrencyDisplay amount={selected.valorVenta} moneda={selected.moneda as "COP" | "USD"} /> },
                { label: "Total", value: <CurrencyDisplay amount={selected.total} moneda={selected.moneda as "COP" | "USD"} /> },
                { label: "Contacto", value: selected.contacto },
                { label: "Días creado", value: `${selected.diasCreado} días` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">{label}</p>
                  <div className="text-sm text-white">{value}</div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">Descripción</p>
              <p className="text-sm text-white">{selected.descripcion}</p>
            </div>
            <div className="flex gap-3 pt-3" style={{ borderTop: "1px solid #004c1e" }}>
              <Btn
                variant="primary"
                className="flex-1"
                data-testid="btn-marcar-win"
                onClick={() => { handleMove(selected.id, "Win"); setSelected(null); }}
              >
                Marcar como Win
              </Btn>
              <Btn
                variant="ghost"
                className="flex-1"
                data-testid="btn-marcar-lost"
                onClick={() => { handleMove(selected.id, "Lost"); setSelected(null); }}
              >
                Marcar como Lost
              </Btn>
            </div>
          </div>
        )}
      </SidePanel>
    </PageLayout>
  );
}
