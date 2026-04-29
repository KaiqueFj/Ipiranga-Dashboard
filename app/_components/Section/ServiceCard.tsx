import { formatDuration } from "@/app/lib/helpers";
import { getIcon } from "@/app/lib/status";
import { ServiceStatus } from "@/app/types/type";
import Link from "next/link";

type Props = {
  service: ServiceStatus;
};

export default function ServiceCard({ service }: Props) {
  return (
    <Link href={"#"} className="group block">
      <div
        className="flex flex-col justify-between h-full p-5 rounded-2xl 
        bg-slate-900/70 border border-slate-800 
        shadow-md hover:shadow-xl 
        hover:border-slate-700 
        transition-all duration-300 
        backdrop-blur-sm"
      >
        {/* Title */}
        <p
          className="text-sm md:text-base text-center font-semibold tracking-wide text-white 
        wrap-break-word leading-snug group-hover:text-blue-400 transition-colors"
        >
          {service.title}
        </p>

        {/* Status Icon */}
        <div className="flex justify-center py-3">{getIcon(service.status)}</div>

        {/* Info */}
        <div className="text-xs md:text-sm text-slate-400 space-y-1 text-center">
          <p className="font-medium">
            {service.alertCount} alert{service.alertCount !== 1 && "s"}
          </p>

          {service.status !== "OK" && service.statusSince && (
            <p className="text-slate-200">
              {service.status === "ALERT" ? "Crítico há" : "Warning há"}{" "}
              <span className="font-semibold text-white">{formatDuration(service.statusSince)}</span>
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
