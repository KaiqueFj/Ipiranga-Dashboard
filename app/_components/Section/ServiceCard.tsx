import { formatDuration } from "@/app/lib/helpers";
import { getIcon } from "@/app/lib/status";
import { ServiceStatus } from "@/app/types/type";

type Props = {
  service: ServiceStatus;
};

export default function ServiceCard({ service }: Props) {
  return (
    <div className="flex flex-col p-4 rounded-lg bg-slate-900/80 border border-slate-800 shadow-lg items-center text-center space-y-3">
      <p className="text-sm md:text-base font-semibold tracking-wide line-clamp-2">{service.title}</p>

      {getIcon(service.status)}

      <div className="text-xs md:text-sm text-slate-400 space-y-1">
        <p>{service.alertCount} alert(s)</p>

        {service.status !== "OK" && service.statusSince && (
          <p className="text-white">
            {service.status === "ALERT" ? "Crítico a " : "Warning a"}{" "}
            <span className="font-semibold">{formatDuration(service.statusSince)}</span>
          </p>
        )}
      </div>
    </div>
  );
}
