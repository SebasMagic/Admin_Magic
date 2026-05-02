import { ButtonHTMLAttributes } from "react";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md";
}

export function Btn({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: BtnProps) {
  const base = "inline-flex items-center gap-2 rounded-md font-medium transition-all duration-150 cursor-pointer focus:outline-none";
  const sizeClass = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";

  const variantClass =
    variant === "primary"
      ? "bg-[#004c1e] text-white border border-[#004c1e] hover:border-[#00fe65]"
      : variant === "ghost"
      ? "bg-transparent text-white border border-[#004c1e] hover:bg-[#004c1e]/20"
      : "bg-[#7f1d1d] text-white border border-[#ef4444]/30 hover:border-[#ef4444]";

  return (
    <button className={`${base} ${sizeClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
