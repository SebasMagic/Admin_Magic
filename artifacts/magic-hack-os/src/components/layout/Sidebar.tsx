import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, GitBranch, FolderOpen, CheckSquare, Users2, UserCircle2,
  FileText, CreditCard, Receipt, Truck
} from "lucide-react";

const sections = [
  {
    label: "OVERVIEW",
    items: [{ label: "Dashboard", href: "/", icon: LayoutDashboard }],
  },
  {
    label: "PROYECTOS",
    items: [
      { label: "Pipeline", href: "/pipeline", icon: GitBranch },
      { label: "Proyectos", href: "/proyectos", icon: FolderOpen },
      { label: "Tareas", href: "/tareas", icon: CheckSquare },
      { label: "Clientes", href: "/clientes", icon: Users2 },
      { label: "Equipo", href: "/equipo", icon: UserCircle2 },
    ],
  },
  {
    label: "FINANZAS",
    items: [
      { label: "Facturación", href: "/facturacion", icon: FileText },
      { label: "Gastos", href: "/gastos", icon: CreditCard },
      { label: "Proveedores", href: "/proveedores", icon: Truck },
    ],
  },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside
      style={{ borderRight: "1px solid #004c1e" }}
      className="w-60 shrink-0 flex flex-col bg-black h-full overflow-y-auto"
      data-testid="sidebar"
    >
      <div className="flex-1 py-6 px-3">
        {sections.map((section) => (
          <div key={section.label} className="mb-6">
            <p className="text-[10px] font-semibold tracking-widest text-[#9ca3af] uppercase px-3 mb-2">
              {section.label}
            </p>
            {section.items.map((item) => {
              const active = item.href === "/"
                ? location === "/"
                : location.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    data-testid={`nav-${item.label.toLowerCase()}`}
                    className="relative flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer mb-0.5 transition-all duration-150"
                    style={{
                      background: active ? "rgba(0,76,30,0.15)" : "transparent",
                      borderLeft: active ? "3px solid #00fe65" : "3px solid transparent",
                      color: active ? "#ffffff" : "#9ca3af",
                    }}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
      <div className="px-4 py-4 border-t border-[#002910]">
        <p className="text-[11px] text-[#9ca3af]">Magic Hack OS v1.0</p>
      </div>
    </aside>
  );
}
