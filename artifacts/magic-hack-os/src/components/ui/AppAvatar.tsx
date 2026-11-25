function hashColor(name: string): string {
  const colors = [
    "#3b82f6", "#ec4899", "#10b981", "#f59e0b", "#8b5cf6",
    "#ef4444", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash + name.charCodeAt(i)) % colors.length;
  }
  return colors[hash];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const sizeMap = {
  sm: "w-7 h-7 text-xs",
  md: "w-9 h-9 text-sm",
  lg: "w-12 h-12 text-base",
};

export function Avatar({ name, size = "md", color }: AvatarProps) {
  const bg = color ?? hashColor(name);
  return (
    <div
      className={`${sizeMap[size]} rounded-full flex items-center justify-center font-semibold text-white shrink-0`}
      style={{ background: bg }}
      title={name}
      data-testid={`avatar-${name.toLowerCase().replace(/\s/g, "-")}`}
    >
      {getInitials(name)}
    </div>
  );
}
