interface TabsProps {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}

export function Tabs({ tabs, active, onChange }: TabsProps) {
  return (
    <div className="flex gap-1 p-1 rounded-lg" style={{ background: "#0d0d0d", border: "1px solid #004c1e" }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className="px-4 py-1.5 rounded-md text-sm font-medium transition-all duration-150"
          style={{
            background: active === tab ? "#004c1e" : "transparent",
            color: active === tab ? "#ffffff" : "#9ca3af",
          }}
          data-testid={`tab-${tab.toLowerCase().replace(/\s/g, "-")}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
