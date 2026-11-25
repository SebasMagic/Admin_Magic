import { useState } from "react";
import { Plus, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/PageHeader";
import { Btn } from "@/components/ui/Btn";
import { Badge } from "@/components/ui/AppBadge";
import { Avatar } from "@/components/ui/AppAvatar";
import { StarRating } from "@/components/ui/StarRating";
import { DataTable, Column } from "@/components/ui/DataTable";
import { clientes } from "@/data/clientes";

type Cliente = typeof clientes[0];

export default function Clientes() {
  const [search, setSearch] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const filtered = clientes.filter((c) => {
    const matchSearch = c.nombre.toLowerCase().includes(search.toLowerCase()) ||
      c.contacto.toLowerCase().includes(search.toLowerCase());
    const matchEstado = filtroEstado === "Todos" || c.estado === filtroEstado;
    return matchSearch && matchEstado;
  });

  const cols: Column<Cliente>[] = [
    { key: "avatar", label: "Logo", render: (r) => <Avatar name={r.nombre} size="sm" /> },
    { key: "nombre", label: "Cliente", render: (r) => (
      <Link href={`/clientes/${r.id}`}>
        <span className="font-medium text-white hover:text-[#00fe65] transition-colors cursor-pointer">{r.nombre}</span>
      </Link>
    )},
    { key: "tipoServicio", label: "Tipo Servicio", render: (r) => <Badge estado={r.tipoServicio} /> },
    { key: "estado", label: "Estado", render: (r) => <Badge estado={r.estado} /> },
    { key: "nit", label: "NIT", render: (r) => <span className="font-mono text-xs text-[#9ca3af]">{r.nit}</span> },
    { key: "contacto", label: "Contacto", render: (r) => <span className="text-sm text-[#9ca3af]">{r.contacto}</span> },
    { key: "telefono", label: "Teléfono", render: (r) => <span className="text-xs text-[#9ca3af]">{r.telefono}</span> },
    { key: "proyectos", label: "# Proyectos", render: (r) => <span className="font-mono text-sm text-white">{r.proyectos}</span> },
    { key: "categoria", label: "Categoría", render: (r) => <StarRating value={r.categoria} /> },
    { key: "acciones", label: "Acciones", render: (r) => (
      <Link href={`/clientes/${r.id}`}>
        <Btn variant="ghost" size="sm" data-testid={`btn-ver-cliente-${r.id}`}>
          <ExternalLink size={12} /> Ver
        </Btn>
      </Link>
    )},
  ];

  return (
    <PageLayout>
      <PageHeader title="Clientes">
        <Btn variant="primary" data-testid="btn-nuevo-cliente"><Plus size={14} /> Nuevo Cliente</Btn>
      </PageHeader>

      <div className="flex items-center gap-3 mb-6">
        <input
          type="search"
          placeholder="Buscar clientes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#0d0d0d] border border-[#004c1e] rounded-md px-3 py-1.5 text-sm text-white placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#00fe65]/40 w-64"
          data-testid="search-clientes"
        />
        <div className="flex gap-2">
          {["Todos", "Activo", "Inactivo", "Pausado"].map((f) => (
            <button
              key={f}
              onClick={() => setFiltroEstado(f)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                background: filtroEstado === f ? "#004c1e" : "#111111",
                color: filtroEstado === f ? "#fff" : "#9ca3af",
                border: `1px solid ${filtroEstado === f ? "#004c1e" : "#002910"}`,
              }}
              data-testid={`filter-estado-${f.toLowerCase()}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#111111] border border-[#004c1e] rounded-lg overflow-hidden">
        <DataTable columns={cols} data={filtered} emptyText="Sin clientes" />
      </div>
    </PageLayout>
  );
}
