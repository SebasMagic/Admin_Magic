const dotColors: Record<string, string> = {
  Activo: "#00fe65",
  Pagado: "#00fe65",
  Win: "#00fe65",
  Completado: "#00fe65",
  Pendiente: "#f59e0b",
  "En Proceso": "#f59e0b",
  Propuesta: "#f59e0b",
  Parcial: "#f97316",
  Pausado: "#f97316",
  "En Revision": "#f97316",
  Inactivo: "#ef4444",
  Lost: "#ef4444",
  Vencido: "#ef4444",
  Lead: "#60a5fa",
  Negociacion: "#a78bfa",
  "Por Hacer": "#9ca3af",
};

interface BadgeProps {
  estado: string;
  className?: string;
}

export function Badge({ estado, className = "" }: BadgeProps) {
  const dot = dotColors[estado] ?? "#9ca3af";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#111111] border border-[#004c1e] text-white ${className}`}
      data-testid={`badge-${estado.toLowerCase().replace(/\s/g, "-")}`}
    >
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: dot }} />
      {estado}
    </span>
  );
}
