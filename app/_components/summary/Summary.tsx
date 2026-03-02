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
    <div className="px-8 md:px-16 py-8 flex flex-col md:flex-row gap-6 text-center">
      <SummaryCard value={totalOK} label="OK" color="emerald" />
      <SummaryCard value={totalWarn} label="Warning" color="amber" />
      <SummaryCard value={totalAlert} label="Crítico" color="red" />
    </div>
  );
}
