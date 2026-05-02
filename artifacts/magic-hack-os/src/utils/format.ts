import { format } from "date-fns";

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatUSD(amount: number): string {
  return `USD ${new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)}`;
}

export function formatCurrency(amount: number, moneda: "COP" | "USD"): string {
  return moneda === "USD" ? formatUSD(amount) : formatCOP(amount);
}

export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date.split("/").reverse().join("-")) : date;
  if (isNaN(d.getTime())) return typeof date === "string" ? date : "";
  return format(d, "dd/MM/yyyy");
}
