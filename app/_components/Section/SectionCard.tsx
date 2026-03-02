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

  return (
    <div
      className={`rounded-2xl p-8 border shadow-xl bg-slate-900/40 backdrop-blur-sm border-l-4 ${borderColor} border-slate-800`}
    >
      <div className="mb-10 border-b border-slate-800 pb-4">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest">{section.title}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {section.services.map((service) => (
          <ServiceCard key={service.service} service={service} />
        ))}
      </div>
    </div>
  );
}
