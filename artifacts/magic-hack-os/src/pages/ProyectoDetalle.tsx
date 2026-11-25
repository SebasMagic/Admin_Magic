import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Badge } from "@/components/ui/AppBadge";
import { Tabs } from "@/components/ui/AppTabs";
import { Avatar } from "@/components/ui/AppAvatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { proyectos } from "@/data/proyectos";
import { clientes } from "@/data/clientes";
import { equipo } from "@/data/equipo";
import { tareas } from "@/data/tareas";

const ETAPAS = ["Por Hacer", "En Proceso", "En Revision", "Completado"];
const etapaDot: Record<string, string> = {
  "Por Hacer": "#9ca3af", "En Proceso": "#f59e0b", "En Revision": "#f97316", Completado: "#00fe65",
};

export default function ProyectoDetalle() {
  const [, params] = useRoute("/proyectos/:id");
  const [tab, setTab] = useState("Tareas");

  const proyecto = proyectos.find((p) => p.id === params?.id);
  if (!proyecto) return (
    <PageLayout>
      <p className="text-[#9ca3af]">Proyecto no encontrado</p>
    </PageLayout>
  );

  const cliente = clientes.find((c) => c.id === proyecto.clienteId);
  const members = proyecto.equipo.map((id) => equipo.find((m) => m.id === id)).filter(Boolean);
  const proyTareas = tareas.filter((t) => t.proyectoId === proyecto.id);

  return (
    <PageLayout>
      <div className="mb-6">
        <Link href="/proyectos">
          <span className="flex items-center gap-1.5 text-xs text-[#9ca3af] hover:text-white transition-colors cursor-pointer mb-3 w-fit">
            <ArrowLeft size={12} /> Volver a Proyectos
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-white">{proyecto.nombre}</h1>
          <Badge estado={proyecto.estado} />
          {cliente && <span className="text-sm text-[#9ca3af]">{cliente.nombre}</span>}
          <div className="flex -space-x-2 ml-auto">
            {members.map((m) => m && <Avatar key={m.id} name={m.nombre} size="sm" color={m.color} />)}
          </div>
        </div>
        <p className="text-sm text-[#9ca3af] mt-1">{proyecto.descripcion}</p>
      </div>

      <div className="mb-6">
        <Tabs tabs={["Tareas", "Detalles", "Equipo"]} active={tab} onChange={setTab} />
      </div>

      {tab === "Tareas" && (
        <div className="space-y-6">
          {ETAPAS.map((etapa) => {
            const items = proyTareas.filter((t) => t.estado === etapa);
            return (
              <div key={etapa}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: etapaDot[etapa] }} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">{etapa}</span>
                  <span className="text-xs text-[#9ca3af]">({items.length})</span>
                </div>
                {items.length === 0 ? (
                  <p className="text-xs text-[#9ca3af] pl-4">Sin tareas</p>
                ) : items.map((t) => (
                  <div key={t.id} className="bg-[#111111] border border-[#004c1e] rounded-lg p-3 mb-2 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">{t.nombre}</p>
                      <p className="text-xs text-[#9ca3af]">{t.entrega}</p>
                    </div>
                    <Badge estado={t.prioridad} />
                    <ProgressBar value={t.cumplimiento} showLabel className="w-24" />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {tab === "Detalles" && (
        <div className="bg-[#111111] border border-[#004c1e] rounded-lg p-6">
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Estado", value: <Badge estado={proyecto.estado} /> },
              { label: "Cliente", value: cliente?.nombre ?? "-" },
              { label: "Fecha Inicio", value: proyecto.fechaInicio },
              { label: "Fecha Fin", value: proyecto.fechaFin },
              { label: "Tareas", value: `${proyecto.tareasCompletadas} / ${proyecto.tareasTotal}` },
              { label: "Progreso", value: <ProgressBar value={proyecto.progreso} showLabel className="w-40" /> },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">{label}</p>
                <div className="text-sm text-white">{value}</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-[11px] uppercase tracking-wider text-[#9ca3af] mb-1">Descripción</p>
            <p className="text-sm text-white">{proyecto.descripcion}</p>
          </div>
        </div>
      )}

      {tab === "Equipo" && (
        <div className="grid grid-cols-3 gap-4">
          {members.map((m) => {
            if (!m) return null;
            const memberTasks = proyTareas.filter((t) => t.asignadoA === m.id);
            return (
              <div key={m.id} className="bg-[#111111] border border-[#004c1e] rounded-lg p-4 flex items-center gap-3">
                <Avatar name={m.nombre} size="lg" color={m.color} />
                <div>
                  <p className="text-sm font-semibold text-white">{m.nombre}</p>
                  <p className="text-xs text-[#9ca3af]">{m.email}</p>
                  <p className="text-xs text-[#9ca3af] mt-1">{memberTasks.length} tareas en este proyecto</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </PageLayout>
  );
}
