import { useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Btn } from "@/components/ui/Btn";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Avatar } from "@/components/ui/Avatar";
import { proyectos } from "@/data/proyectos";
import { clientes } from "@/data/clientes";
import { equipo } from "@/data/equipo";

const FILTERS = ["Todos", "Activo", "Pausado", "Completado"];

export default function Proyectos() {
  const [filter, setFilter] = useState("Todos");

  const filtered = proyectos.filter((p) => filter === "Todos" || p.estado === filter);

  return (
    <PageLayout>
      <PageHeader title="Proyectos">
        <Btn variant="primary" data-testid="btn-nuevo-proyecto"><Plus size={14} /> Nuevo Proyecto</Btn>
      </PageHeader>

      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150"
            style={{
              background: filter === f ? "#004c1e" : "#111111",
              color: filter === f ? "#fff" : "#9ca3af",
              border: `1px solid ${filter === f ? "#004c1e" : "#002910"}`,
            }}
            data-testid={`filter-${f.toLowerCase()}`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-[#9ca3af]">
          <p className="text-sm">Sin proyectos con este filtro</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((p) => {
            const cliente = clientes.find((c) => c.id === p.clienteId);
            const members = p.equipo.map((id) => equipo.find((m) => m.id === id)).filter(Boolean);
            const overflow = members.length > 3 ? members.length - 3 : 0;

            return (
              <Link key={p.id} href={`/proyectos/${p.id}`}>
                <div
                  className="bg-[#111111] border border-[#004c1e] rounded-lg p-5 cursor-pointer transition-all duration-150 hover:border-[#00fe65]/50 block"
                  data-testid={`project-card-${p.id}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-white text-sm leading-tight">{p.nombre}</h3>
                    <Badge estado={p.estado} />
                  </div>

                  {cliente && (
                    <span
                      className="inline-block text-xs px-2 py-0.5 rounded-full mb-3"
                      style={{ border: "1px solid #004c1e", color: "#9ca3af" }}
                    >
                      {cliente.nombre}
                    </span>
                  )}

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex -space-x-2">
                      {members.slice(0, 3).map((m) => m && (
                        <Avatar key={m.id} name={m.nombre} size="sm" color={m.color} />
                      ))}
                    </div>
                    {overflow > 0 && (
                      <span className="text-xs text-[#9ca3af]">+{overflow} más</span>
                    )}
                  </div>

                  <ProgressBar value={p.progreso} showLabel className="mb-3" />

                  <div className="flex items-center justify-between text-xs text-[#9ca3af]">
                    <span>{p.tareasTotal} tareas · {p.tareasCompletadas} completadas</span>
                  </div>
                  <p className="text-[11px] text-[#9ca3af] mt-1">{p.fechaInicio} → {p.fechaFin}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </PageLayout>
  );
}
