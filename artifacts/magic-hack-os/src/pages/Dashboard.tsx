import { useState, useEffect } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { KPICard } from "@/components/ui/KPICard";
import { Badge } from "@/components/ui/AppBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { DataTable, Column } from "@/components/ui/DataTable";
import { clientes } from "@/data/clientes";
import { proyectos } from "@/data/proyectos";
import { tareas } from "@/data/tareas";
import { facturacion } from "@/data/facturacion";
import { formatCOP, formatCurrency } from "@/utils/format";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";

const meses = ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar"];
const ingresoGastoData = [
  { mes: "Oct", ingresos: 35000000, gastos: 18000000 },
  { mes: "Nov", ingresos: 42000000, gastos: 22000000 },
  { mes: "Dic", ingresos: 28000000, gastos: 15000000 },
  { mes: "Ene", ingresos: 51000000, gastos: 28000000 },
  { mes: "Feb", ingresos: 48500000, gastos: 31000000 },
  { mes: "Mar", ingresos: 38000000, gastos: 20000000 },
];

const pipelineData = [
  { name: "Lead", value: 2, color: "#60a5fa" },
  { name: "Propuesta", value: 2, color: "#004c1e" },
  { name: "Negociación", value: 3, color: "#a78bfa" },
  { name: "Win", value: 2, color: "#00fe65" },
  { name: "Lost", value: 1, color: "#4b5563" },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{name: string; value: number; color: string}>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#111111] border border-[#004c1e] rounded-lg px-3 py-2 text-xs">
        <p className="text-[#9ca3af] mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color }}>{p.name}: {formatCOP(p.value)}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 400); return () => clearTimeout(t); }, []);

  const recentProjects = proyectos.slice(0, 4);
  const upcomingTasks = tareas.filter(t => t.estado !== "Completado").slice(0, 5);
  const lastInvoices = facturacion.slice(0, 5);

  const prioridadColor: Record<string, string> = { Alta: "#ef4444", Media: "#f59e0b", Baja: "#10b981" };

  const invoiceCols: Column<typeof facturacion[0]>[] = [
    { key: "consecutivo", label: "Consecutivo", render: (r) => <span className="font-mono text-xs text-[#9ca3af]">{r.consecutivo}</span> },
    { key: "clienteId", label: "Cliente", render: (r) => <span className="text-white text-xs">{clientes.find(c => c.id === r.clienteId)?.nombre ?? "-"}</span> },
    { key: "total", label: "Total", render: (r) => <span className="font-mono text-xs">{formatCurrency(r.total, r.moneda as "COP" | "USD")}</span> },
    { key: "estado", label: "Estado", render: (r) => <Badge estado={r.estado} /> },
    { key: "fechaEstPago", label: "Fecha Est. Pago", render: (r) => <span className="text-[#9ca3af] text-xs">{r.fechaEstPago}</span> },
    { key: "saldo", label: "Saldo", render: (r) => <span className="font-mono text-xs">{formatCurrency(r.saldo, r.moneda as "COP" | "USD")}</span> },
  ];

  return (
    <PageLayout>
      <PageHeader title="Dashboard" />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard label="Proyectos Activos" value="8" />
        <KPICard label="Tareas Pendientes" value="23" />
        <KPICard label="Ingresos del Mes" value={formatCOP(48500000)} accent />
        <KPICard label="Saldo por Cobrar" value={formatCOP(12200000)} />
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="col-span-3 bg-[#111111] border border-[#004c1e] rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af] mb-4">Ingresos vs Gastos — últimos 6 meses</p>
          {loading ? (
            <div className="h-44 bg-[#1a1a1a] rounded animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={ingresoGastoData}>
                <XAxis dataKey="mes" tick={{ fill: "#9ca3af", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="ingresos" name="Ingresos" stroke="#00fe65" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="gastos" name="Gastos" stroke="#004c1e" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
          <div className="flex gap-4 mt-2">
            <span className="flex items-center gap-1.5 text-xs text-[#9ca3af]"><span className="w-3 h-0.5 bg-[#00fe65] inline-block" /> Ingresos</span>
            <span className="flex items-center gap-1.5 text-xs text-[#9ca3af]"><span className="w-3 h-0.5 bg-[#004c1e] inline-block border border-[#004c1e]" /> Gastos</span>
          </div>
        </div>

        <div className="col-span-2 bg-[#111111] border border-[#004c1e] rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af] mb-2">Pipeline por Estado</p>
          {loading ? (
            <div className="h-44 bg-[#1a1a1a] rounded animate-pulse" />
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pipelineData} dataKey="value" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                  {pipelineData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend
                  iconSize={8}
                  iconType="circle"
                  formatter={(value) => <span style={{ color: "#9ca3af", fontSize: 11 }}>{value}</span>}
                />
                <Tooltip
                  contentStyle={{ background: "#111111", border: "1px solid #004c1e", borderRadius: 8, fontSize: 12 }}
                  itemStyle={{ color: "#ffffff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        <div className="col-span-3 bg-[#111111] border border-[#004c1e] rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af] mb-4">Proyectos Recientes</p>
          <div className="space-y-3">
            {recentProjects.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid #002910" }}>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{p.nombre}</p>
                  <p className="text-xs text-[#9ca3af] truncate">{clientes.find(c => c.id === p.clienteId)?.nombre}</p>
                </div>
                <Badge estado={p.estado} />
                <div className="w-24">
                  <ProgressBar value={p.progreso} showLabel />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-[#111111] border border-[#004c1e] rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af] mb-4">Tareas Próximas a Vencer</p>
          <div className="space-y-2">
            {upcomingTasks.map((t) => (
              <div key={t.id} className="flex items-center gap-2 py-2" style={{ borderBottom: "1px solid #002910" }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: prioridadColor[t.prioridad] ?? "#9ca3af" }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{t.nombre}</p>
                  <p className="text-[11px] text-[#9ca3af]">{t.entrega}</p>
                </div>
                <Badge estado={t.prioridad} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#111111] border border-[#004c1e] rounded-lg p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#9ca3af] mb-4">Últimas Facturas</p>
        <DataTable columns={invoiceCols} data={lastInvoices} emptyText="Sin facturas recientes" />
      </div>
    </PageLayout>
  );
}
