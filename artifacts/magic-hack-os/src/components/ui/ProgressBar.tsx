interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ value, showLabel = false, className = "" }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "#002910" }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${clamped}%`, background: "#004c1e" }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-[#9ca3af] font-mono w-8 shrink-0 text-right">{clamped}%</span>
      )}
    </div>
  );
}
