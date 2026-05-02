import { Plus } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Btn } from "@/components/ui/Btn";
import { Badge } from "@/components/ui/Badge";
import { KPICard } from "@/components/ui/KPICard";
import { DataTable, Column } from "@/components/ui/DataTable";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { gastos } from "@/data/gastos";
import { proveedores } from "@/data/proveedores";
import { formatCOP } from "@/utils/format";

type Gasto = typeof gastos[0];

const cols: Column<Gasto>[] = [
  { key: "orden", label: "# Orden", render: (r) => <span className="font-mono text-xs text-[#9ca3af]">{r.orden}</span> },
  { key: "fecha", label: "Fecha", render: (r) => <span className="text-xs text-[#9ca3af]">{r.fecha}</span> },
  { key: "proveedorId", label: "Proveedor", render: (r) => <span className="text-sm text-white">{proveedores.find(p => p.id === r.proveedorId)?.nombre ?? "-"}</span> },
  { key: "descripcion", label: "Descripción", render: (r) => <span className="text-xs text-[#9ca3af]">{r.descripcion}</span> },
  { key: "moneda", label: "Moneda", render: (r) => <span className="text-xs text-[#9ca3af]">{r.moneda}</span> },
  { key: "monto", label: "Monto", render: (r) => <CurrencyDisplay amount={r.monto} moneda={r.moneda as "COP" | "USD"} className="text-sm" /> },
  { key: "pagado", label: "Pagado", render: (r) => <CurrencyDisplay amount={r.pagado} moneda={r.moneda as "COP" | "USD"} className="text-sm" /> },
  { key: "saldo", label: "Saldo", render: (r) => <CurrencyDisplay amount={r.saldo} moneda={r.moneda as "COP" | "USD"} className="text-sm" /> },
  { key: "estado", label: "Estado", render: (r) => <Badge estado={r.estado} /> },
];

export default function Gastos() {
  const totalGastasCOP = gastos.filter(g => g.moneda === "COP").reduce((s, g) => s + g.monto, 0);
  const pagadoCOP = gastos.filter(g => g.moneda === "COP").reduce((s, g) => s + g.pagado, 0);
  const saldoPendiente = gastos.filter(g => g.moneda === "COP").reduce((s, g) => s + g.saldo, 0);

  return (
    <PageLayout>
      <PageHeader title="Gastos">
        <Btn variant="primary" data-testid="btn-registrar-gasto"><Plus size={14} /> Registrar Gasto</Btn>
      </PageHeader>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <KPICard label="Total Gastos Mes" value={formatCOP(totalGastasCOP)} />
        <KPICard label="Pagado" value={formatCOP(pagadoCOP)} />
        <KPICard label="Saldo Pendiente" value={formatCOP(saldoPendiente)} />
      </div>

      <div className="bg-[#111111] border border-[#004c1e] rounded-lg overflow-hidden">
        <DataTable columns={cols} data={gastos} emptyText="Sin gastos registrados" />
      </div>
    </PageLayout>
  );
}
