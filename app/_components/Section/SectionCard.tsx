import { getSectionStatus } from "@/app/lib/status";
import { Section } from "@/app/types/type";
import ServiceCard from "./ServiceCard";

type Props = {
  section: Section;
};

export default function SectionCard({ section }: Props) {
  const sectionStatus = getSectionStatus(section.services);

  const borderColor =
    sectionStatus === "ALERT"
      ? "border-l-red-500"
      : sectionStatus === "WARN"
        ? "border-l-amber-400"
        : "border-l-emerald-500";

  const bgColor =
    sectionStatus === "ALERT"
      ? "bg-red-500 animate-pulse"
      : sectionStatus === "WARN"
        ? "bg-amber-500"
        : "bg-emerald-500";

  return (
    <div
      className={`flex flex-col rounded-2xl border px-4 py-2 shadow-xl bg-slate-900/40 backdrop-blur-sm border-l-4 ${borderColor} border-slate-800  overflow-hidden`}
    >
      <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-bold uppercase tracking-widest">{section.title}</h2>

        <span className={`${bgColor} px-3 py-1 rounded-lg text-sm font-bold uppercase`}>
          {sectionStatus === "ALERT" ? "Crítico" : sectionStatus === "WARN" ? "Warning" : "OK"}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {section.services.map((service) => (
          <ServiceCard key={service.service} service={service} />
        ))}
      </div>
    </div>
  );
}
