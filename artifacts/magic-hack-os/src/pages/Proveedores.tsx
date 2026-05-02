import { Plus } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Btn } from "@/components/ui/Btn";
import { Badge } from "@/components/ui/Badge";
import { DataTable, Column } from "@/components/ui/DataTable";
import { CurrencyDisplay } from "@/components/ui/CurrencyDisplay";
import { proveedores } from "@/data/proveedores";

type Proveedor = typeof proveedores[0];

const cols: Column<Proveedor>[] = [
  { key: "nit", label: "NIT", render: (r) => <span className="font-mono text-xs text-[#9ca3af]">{r.nit}</span> },
  { key: "nombre", label: "Nombre", render: (r) => <span className="font-medium text-white">{r.nombre}</span> },
  { key: "tipo", label: "Tipo", render: (r) => <Badge estado={r.tipo} /> },
  { key: "contacto", label: "Contacto", render: (r) => <span className="text-sm text-[#9ca3af]">{r.contacto}</span> },
  { key: "telefono", label: "Teléfono", render: (r) => <span className="text-xs text-[#9ca3af]">{r.telefono}</span> },
  { key: "correo", label: "Correo", render: (r) => <span className="text-xs text-[#9ca3af]">{r.correo}</span> },
  {
    key: "activo",
    label: "Activo",
    render: (r) => (
      <span className="flex items-center gap-1.5 text-xs text-white">
        <span className="w-2 h-2 rounded-full" style={{ background: r.activo ? "#00fe65" : "#ef4444" }} />
        {r.activo ? "Activo" : "Inactivo"}
      </span>
    ),
  },
  { key: "periodoFacturacion", label: "Periodo", render: (r) => <span className="text-xs text-[#9ca3af]">{r.periodoFacturacion}</span> },
  { key: "montoFacturacion", label: "Monto Facturación", render: (r) => <CurrencyDisplay amount={r.montoFacturacion} moneda="COP" className="text-sm" /> },
  {
    key: "acciones",
    label: "Acciones",
    render: () => (
      <Btn variant="ghost" size="sm" data-testid="btn-ver-proveedor">Ver</Btn>
    ),
  },
];

export default function Proveedores() {
  return (
    <PageLayout>
      <PageHeader title="Proveedores">
        <Btn variant="primary" data-testid="btn-nuevo-proveedor"><Plus size={14} /> Nuevo Proveedor</Btn>
      </PageHeader>

      <div className="bg-[#111111] border border-[#004c1e] rounded-lg overflow-hidden">
        <DataTable columns={cols} data={proveedores} emptyText="Sin proveedores registrados" />
      </div>
    </PageLayout>
  );
}
