import { useState } from "react";
import { Plus, Check, Minus } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Btn } from "@/components/ui/Btn";
import { Badge } from "@/components/ui/Badge";
import { KPICard } from "@/components/ui/KPICard";
import { SidePanel } from "@/components/ui/SidePanel";
import { DataTable, Column } from "@/components/ui/DataTable";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { facturacion } from "@/data/facturacion";
import { clientes } from "@/data/clientes";
import { formatCOP, formatCurrency } from "@/utils/format";

type Factura = typeof facturacion[0];

export default function Facturacion() {
  const [selected, setSelected] = useState<Factura | null>(null);
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const filtered = facturacion.filter((f) => filtroEstado === "Todos" || f.estado === filtroEstado);

  const totalFacturado = facturacion.filter(f => f.moneda === "COP").reduce((s, f) => s + f.total, 0);
  const cobrado = facturacion.filter(f => f.estado === "Pagado" && f.moneda === "COP").reduce((s, f) => s + f.total, 0);
  const pendiente = facturacion.filter(f => f.estado === "Pendiente" && f.moneda === "COP").reduce((s, f) => s + f.saldo, 0);
  const vencido = facturacion.filter(f => f.estado === "Vencido" && f.moneda === "COP").reduce((s, f) => s + f.saldo, 0);

  const cols: Column<Factura>[] = [
    { key: "consecutivo", label: "Consecutivo", render: (r) => <span className="font-mono text-xs text-[#9ca3af]">{r.consecutivo}</span> },
    { key: "fecha", label: "Fecha", render: (r) => <span className="text-xs text-[#9ca3af]">{r.fecha}</span> },
    { key: "clienteId", label: "Cliente", render: (r) => <span className="text-sm text-white">{clientes.find(c => c.id === r.clienteId)?.nombre ?? "-"}</span> },
    { key: "descripcion", label: "Descripción", render: (r) => <span className="text-xs text-[#9ca3af] max-w-48 truncate block">{r.descripcion}</span> },
    { key: "moneda", label: "Moneda", render: (r) => <span className="text-xs text-[#9ca3af]">{r.moneda}</span> },
    { key: "subtotal", label: "Subtotal", render: (r) => <CurrencyDisplay amount={r.subtotal} moneda={r.moneda as "COP" | "USD"} className="text-xs" /> },
    { key: "total", label: "Total", render: (r) => <CurrencyDisplay amount={r.total} moneda={r.moneda as "COP" | "USD"} className="text-sm font-semibold" /> },
    { key: "estado", label: "Estado", render: (r) => <Badge estado={r.estado} /> },
    { key: "fechaEstPago", label: "Fecha Est. Pago", render: (r) => <span className="text-xs text-[#9ca3af]">{r.fechaEstPago}</span> },
    { key: "saldo", label: "Saldo", render: (r) => <CurrencyDisplay amount={r.saldo} moneda={r.moneda as "COP" | "USD"} className="text-xs" /> },
    { key: "revisada", label: "Revisada", render: (r) => r.revisada ? <Check size={14} className="text-[#10b981]" /> : <Minus size={14} className="text-[#9ca3af]" /> },
  ];

  return (
    <PageLayout>
      <PageHeader title="Facturación">
        <div className="flex gap-2">
          {["Todos", "Pagado", "Pendiente", "Vencido", "Parcial"].map((f) => (
            <button key={f} onClick={() => setFiltroEstado(f)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{ background: filtroEstado === f ? "#004c1e" : "#111111", color: filtroEstado === f ? "#fff" : "#9ca3af", border: `1px solid ${filtroEstado === f ? "#004c1e" : "#002910"}` }}
              data-testid={`filter-${f.toLowerCase()}`}
            >{f}</button>
          ))}
        </div>
        <Btn variant="primary" data-testid="btn-nueva-factura"><Plus size={14} /> Nueva Factura</Btn>
      </PageHeader>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard label="Total Facturado (Mes)" value={formatCOP(totalFacturado)} accent />
        <KPICard label="Cobrado" value={formatCOP(cobrado)} />
        <KPICard label="Pendiente" value={formatCOP(pendiente)} />
        <KPICard label="Vencido" value={formatCOP(vencido)} />
      </div>

      <div className="bg-[#111111] border border-[#004c1e] rounded-lg overflow-hidden">
        <DataTable columns={cols} data={filtered} onRowClick={setSelected} emptyText="Sin facturas" />
      </div>

      <SidePanel open={!!selected} onClose={() => setSelected(null)} title={selected?.consecutivo ?? ""} width={520}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Consecutivo", value: selected.consecutivo },
                { label: "Fecha", value: selected.fecha },
                { label: "Cliente", value: clientes.find(c => c.id === selected.clienteId)?.nombre ?? "-" },
                { label: "Moneda", value: selected.moneda },
                { label: "Subtotal", value: formatCurrency(selected.subtotal, selected.moneda as "COP" | "USD") },
                { label: "Total", value: formatCurrency(selected.total, selected.moneda as "COP" | "USD") },
                { label: "Estado", value: <Badge estado={selected.estado} /> },
                { label: "Fecha Est. Pago", value: selected.fechaEstPago },
                { label: "Saldo", value: formatCurrency(selected.saldo, selected.moneda as "COP" | "USD") },
                { label: "Revisada", value: selected.revisada ? "Sí" : "No" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">{label}</p>
                  <div className="text-sm text-white font-mono">{value}</div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">Descripción</p>
              <p className="text-sm text-white">{selected.descripcion}</p>
            </div>
          </div>
        )}
      </SidePanel>
    </PageLayout>
  );
}
