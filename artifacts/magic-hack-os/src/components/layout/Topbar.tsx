import { Bell, Search } from "lucide-react";

export function Topbar() {
  return (
    <header
      className="h-14 shrink-0 flex items-center gap-4 px-6 bg-black"
      style={{ borderBottom: "1px solid #004c1e" }}
      data-testid="topbar"
    >
      <div className="flex items-center gap-2 w-48 shrink-0">
        <span className="font-mono font-bold text-lg text-[#00fe65]">MH</span>
        <span className="text-sm font-medium text-white">Magic Hack OS</span>
      </div>

      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="search"
            placeholder="Buscar proyectos, clientes..."
            className="w-full bg-[#0d0d0d] border border-[#004c1e] rounded-md pl-8 pr-4 py-1.5 text-sm text-white placeholder-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#00fe65]/40"
            data-testid="topbar-search"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <div className="relative" data-testid="notification-bell">
          <Bell size={18} className="text-[#9ca3af]" />
          <span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full"
            style={{ background: "#00fe65" }}
          />
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black"
          style={{ background: "#004c1e", color: "#ffffff" }}
          data-testid="topbar-avatar"
        >
          MH
        </div>
      </div>
    </header>
  );
}
