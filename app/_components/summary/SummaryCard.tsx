type Props = {
  value: number;
  label: string;
  color: "emerald" | "amber" | "red";
};

export default function SummaryCard({ value, label, color }: Props) {
  const styles = {
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/30",
      text: "text-emerald-400",
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/30",
      text: "text-amber-400",
    },
    red: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
    },
  };

  const s = styles[color];

  return (
    <div className={`flex-1 ${s.bg} border ${s.border} rounded-2xl py-6 shadow-lg`}>
      <p className={`text-5xl font-extrabold ${s.text}`}>{value}</p>
      <p className="text-xs uppercase tracking-widest opacity-70 mt-2">{label}</p>
    </div>
  );
}
