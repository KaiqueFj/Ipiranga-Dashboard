import { AlertTriangle, CheckCircle2, Construction, Siren } from "lucide-react";
import { ServiceStatus } from "../types/type";

export function getIcon(status: "OK" | "WARN" | "ALERT" | "MAINTENANCE") {
  switch (status) {
    case "OK":
      return <CheckCircle2 size={64} className="text-emerald-400" />;
    case "WARN":
      return <AlertTriangle size={64} className="text-amber-400 animate-pulse" />;
    case "MAINTENANCE":
      return <Construction size={64} className="text-blue-400 " />;
    case "ALERT":
      return <Siren size={64} className="text-red-500 animate-pulse drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]" />;
  }
}

export function getSectionStatus(services: ServiceStatus[]) {
  const active = services.filter((s) => s.status !== "MAINTENANCE");
  if (active.some((s) => s.status === "ALERT")) return "ALERT";
  if (active.some((s) => s.status === "WARN")) return "WARN";
  return "OK";
}
