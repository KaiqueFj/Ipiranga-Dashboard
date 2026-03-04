import { Section } from "@/app/types/type";
import SummaryCard from "./SummaryCard";

type Props = {
  sections: Section[];
};

export default function Summary({ sections }: Props) {
  const allServices = sections.flatMap((s) => s.services);

  const totalOK = allServices.filter((s) => s.status === "OK").length;
  const totalWarn = allServices.filter((s) => s.status === "WARN").length;
  const totalAlert = allServices.filter((s) => s.status === "ALERT").length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-4">
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard value={totalOK} label="OK" color="emerald" />
        <SummaryCard value={totalWarn} label="Warning" color="amber" />
        <SummaryCard value={totalAlert} label="Crítico" color="red" />
      </div>
    </div>
  );
}
