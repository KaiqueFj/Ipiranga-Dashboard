import { formatDuration } from "@/app/lib/helpers";
import { getIcon } from "@/app/lib/status";
import { ServiceStatus } from "@/app/types/type";

type Props = {
  service: ServiceStatus;
};

export default function ServiceCard({ service }: Props) {
  return (
    <div className="flex flex-col py-6 rounded-xl bg-slate-900/80 border border-slate-800 shadow-lg items-center text-center space-y-6">
      <p className="text-2xl md:text-3xl font-semibold tracking-wide">{service.title}</p>

      {getIcon(service.status)}

      <div className="text-lg text-slate-400 space-y-1">
        <p>{service.alertCount} alert(s)</p>

        {service.status !== "OK" && service.statusSince && (
          <p className="text-sm text-white">
            {service.status === "ALERT" ? "Crítico há" : "Warning há"}{" "}
            <span className="font-semibold">{formatDuration(service.statusSince)}</span>
          </p>
        )}
      </div>
    </div>
  );
}
