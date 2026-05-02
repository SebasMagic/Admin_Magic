import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { equipo } from "@/data/equipo";
import { tareas } from "@/data/tareas";

export default function Equipo() {
  return (
    <PageLayout>
      <PageHeader title="Equipo" />
      <div className="grid grid-cols-4 gap-4">
        {equipo.map((m) => {
          const memberTareas = tareas.filter((t) => t.asignadoA === m.id);
          const completadas = memberTareas.filter((t) => t.estado === "Completado").length;
          const workload = memberTareas.length > 0 ? Math.round((completadas / memberTareas.length) * 100) : 0;

          return (
            <div
              key={m.id}
              className="bg-[#111111] border border-[#004c1e] rounded-lg p-5 flex flex-col items-center text-center"
              data-testid={`member-card-${m.id}`}
            >
              <Avatar name={m.nombre} size="lg" color={m.color} />
              <h3 className="font-semibold text-white text-sm mt-3">{m.nombre}</h3>
              <p className="text-xs text-[#9ca3af] mb-3">{m.email}</p>

              <div className="text-xs text-[#9ca3af] mb-3">
                {m.proyectos} proyectos · {m.tareas} tareas
              </div>

              <div className="flex flex-wrap gap-1 justify-center mb-4">
                {m.proyectosActivos.slice(0, 3).map((pname) => (
                  <span
                    key={pname}
                    className="text-[10px] px-2 py-0.5 rounded-full text-[#9ca3af]"
                    style={{ border: "1px solid #004c1e" }}
                  >
                    {pname}
                  </span>
                ))}
                {m.proyectosActivos.length > 3 && (
                  <span className="text-[10px] text-[#9ca3af]">+{m.proyectosActivos.length - 3} más</span>
                )}
              </div>

              <div className="w-full">
                <div className="flex justify-between text-[11px] text-[#9ca3af] mb-1">
                  <span>Carga de trabajo</span>
                  <span>{completadas}/{memberTareas.length}</span>
                </div>
                <ProgressBar value={workload} />
              </div>
            </div>
          );
        })}
      </div>
    </PageLayout>
  );
}
