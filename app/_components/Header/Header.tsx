type Props = {
  org: "corp" | "digital";
  setOrg: (org: "corp" | "digital") => void;
  setAutoRotate: (value: boolean) => void;
  time: string;
};

export default function Header({ org, setOrg, setAutoRotate, time }: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 md:px-16 py-8 border-b border-slate-800 gap-6">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Ipiranga - Monitoramento de Serviços</h1>

      <div className="flex gap-4">
        <button
          onClick={() => {
            setOrg("corp");
            setAutoRotate(false);
          }}
          className={`px-5 py-2 rounded-xl font-semibold transition ${
            org === "corp"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          Ipiranga
        </button>

        <button
          onClick={() => {
            setOrg("digital");
            setAutoRotate(false);
          }}
          className={`px-5 py-2 rounded-xl font-semibold transition ${
            org === "digital"
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
              : "bg-slate-800 text-slate-400 hover:bg-slate-700"
          }`}
        >
          Conecta/KMV
        </button>
      </div>

      <div className="text-right">
        <p className="text-4xl font-mono">{time}</p>
        <p className="text-xs uppercase tracking-widest text-slate-500">Atualização em tempo real</p>
      </div>
    </div>
  );
}
