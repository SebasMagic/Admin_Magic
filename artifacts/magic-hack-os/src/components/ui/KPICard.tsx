import { useState, useEffect } from "react";

interface KPICardProps {
  label: string;
  value: string | number;
  accent?: boolean;
  sublabel?: string;
}

export function KPICard({ label, value, accent = false, sublabel }: KPICardProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="bg-[#111111] border border-[#004c1e] rounded-lg p-6"
      data-testid={`kpi-${label.toLowerCase().replace(/\s/g, "-")}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9ca3af] mb-3">{label}</p>
      {loading ? (
        <div className="h-8 w-32 bg-[#1a1a1a] rounded animate-pulse" />
      ) : (
        <p
          className="text-2xl font-bold font-mono"
          style={{ color: accent ? "#00fe65" : "#ffffff" }}
        >
          {value}
        </p>
      )}
      {sublabel && <p className="text-xs text-[#9ca3af] mt-1">{sublabel}</p>}
    </div>
  );
}
