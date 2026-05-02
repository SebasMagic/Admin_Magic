import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Globe, Instagram } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/ui/StarRating";
import { Tabs } from "@/components/ui/Tabs";
import { DataTable, Column } from "@/components/ui/DataTable";
import { clientes } from "@/data/clientes";
import { proyectos } from "@/data/proyectos";
import { facturacion } from "@/data/facturacion";
import { propuestas } from "@/data/propuestas";
import { formatCurrency } from "@/utils/format";

export default function ClienteDetalle() {
  const [, params] = useRoute("/clientes/:id");
  const [tab, setTab] = useState("Proyectos");

  const cliente = clientes.find((c) => c.id === params?.id);
  if (!cliente) return (
    <PageLayout>
      <p className="text-[#9ca3af]">Cliente no encontrado</p>
    </PageLayout>
  );

  const clienteProyectos = proyectos.filter((p) => p.clienteId === cliente.id);
  const clienteFacturas = facturacion.filter((f) => f.clienteId === cliente.id);
  const clientePropuestas = propuestas.filter(() => true).slice(0, 3);

  const projCols: Column<typeof proyectos[0]>[] = [
    { key: "nombre", label: "Proyecto", render: (r) => <span className="font-medium text-white">{r.nombre}</span> },
    { key: "estado", label: "Estado", render: (r) => <Badge estado={r.estado} /> },
    { key: "progreso", label: "Progreso", render: (r) => <span className="font-mono text-sm">{r.progreso}%</span> },
    { key: "fechaInicio", label: "Inicio", render: (r) => <span className="text-xs text-[#9ca3af]">{r.fechaInicio}</span> },
    { key: "fechaFin", label: "Fin", render: (r) => <span className="text-xs text-[#9ca3af]">{r.fechaFin}</span> },
  ];

  const factCols: Column<typeof facturacion[0]>[] = [
    { key: "consecutivo", label: "Consecutivo", render: (r) => <span className="font-mono text-xs text-[#9ca3af]">{r.consecutivo}</span> },
    { key: "descripcion", label: "Descripción", render: (r) => <span className="text-sm text-white">{r.descripcion}</span> },
    { key: "total", label: "Total", render: (r) => <span className="font-mono text-sm">{formatCurrency(r.total, r.moneda as "COP" | "USD")}</span> },
    { key: "estado", label: "Estado", render: (r) => <Badge estado={r.estado} /> },
    { key: "fechaEstPago", label: "Fecha Est. Pago", render: (r) => <span className="text-xs text-[#9ca3af]">{r.fechaEstPago}</span> },
  ];

  const propCols: Column<typeof propuestas[0]>[] = [
    { key: "prospecto", label: "Prospecto", render: (r) => <span className="font-medium text-white">{r.prospecto}</span> },
    { key: "servicio", label: "Servicio", render: (r) => <Badge estado={r.servicio} /> },
    { key: "total", label: "Total", render: (r) => <span className="font-mono text-sm">{formatCurrency(r.total, r.moneda as "COP" | "USD")}</span> },
    { key: "estado", label: "Estado", render: (r) => <Badge estado={r.estado} /> },
  ];

  return (
    <PageLayout>
      <div className="mb-6">
        <Link href="/clientes">
          <span className="flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-white transition-colors cursor-pointer mb-3 w-fit">
            <ArrowLeft size={12} /> Volver a Clientes
          </span>
        </Link>
        <div className="bg-[#111111] border border-[#004c1e] rounded-lg p-6">
          <div className="flex items-center gap-4 mb-5">
            <Avatar name={cliente.nombre} size="lg" />
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold text-white">{cliente.nombre}</h1>
                <Badge estado={cliente.estado} />
              </div>
              <StarRating value={cliente.categoria} />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "NIT", value: cliente.nit },
              { label: "Contacto", value: cliente.contacto },
              { label: "Teléfono", value: cliente.telefono },
              { label: "Correo", value: cliente.correo },
              { label: "Tipo Servicio", value: <Badge estado={cliente.tipoServicio} /> },
              { label: "Proyectos", value: cliente.proyectos },
              {
                label: "Web",
                value: (
                  <a href={`https://${cliente.web}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#9ca3af] hover:text-white text-sm">
                    <Globe size={12} /> {cliente.web}
                  </a>
                ),
              },
              {
                label: "Instagram",
                value: (
                  <span className="flex items-center gap-1 text-[#9ca3af] text-sm">
                    <Instagram size={12} /> {cliente.instagram}
                  </span>
                ),
              },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">{label}</p>
                <div className="text-sm text-white">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Tabs tabs={["Proyectos", "Facturación", "Propuestas"]} active={tab} onChange={setTab} />
      </div>

      <div className="bg-[#111111] border border-[#004c1e] rounded-lg overflow-hidden">
        {tab === "Proyectos" && <DataTable columns={projCols} data={clienteProyectos} emptyText="Sin proyectos" />}
        {tab === "Facturación" && <DataTable columns={factCols} data={clienteFacturas} emptyText="Sin facturas" />}
        {tab === "Propuestas" && <DataTable columns={propCols} data={clientePropuestas} emptyText="Sin propuestas" />}
      </div>
    </PageLayout>
  );
}
