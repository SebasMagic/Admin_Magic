import { formatCOP, formatUSD } from "@/utils/format";

interface CurrencyDisplayProps {
  amount: number;
  moneda: "COP" | "USD";
  className?: string;
}

export function CurrencyDisplay({ amount, moneda, className = "" }: CurrencyDisplayProps) {
  return (
    <span className={`font-mono ${className}`}>
      {moneda === "USD" ? formatUSD(amount) : formatCOP(amount)}
    </span>
  );
}
