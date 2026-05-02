interface KanbanCardProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export function KanbanCard({ children, onClick }: KanbanCardProps) {
  return (
    <div
      className="bg-[#111111] rounded-lg p-3 cursor-pointer transition-all duration-150"
      style={{ border: "1px solid #004c1e" }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#00fe65"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 1px rgba(0,254,101,0.1)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#004c1e"; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
      onClick={onClick}
      data-testid="kanban-card"
    >
      {children}
    </div>
  );
}
