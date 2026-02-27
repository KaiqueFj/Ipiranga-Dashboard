"use client";

import { AlertTriangle, CheckCircle2, Siren } from "lucide-react";
import { useEffect, useState } from "react";
import useSWR from "swr";

type ServiceStatus = {
  service: string;
  title: string;
  status: "OK" | "WARN" | "ALERT";
  alertCount: number;
};

type Section = {
  title: string;
  services: ServiceStatus[];
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const [org, setOrg] = useState<"corp" | "digital">("corp");
  const [time, setTime] = useState("");
  const [autoRotate, setAutoRotate] = useState(true);

  const { data, error } = useSWR<Section[]>(`/api/monitors?org=${org}`, fetcher, {
    refreshInterval: 60000, // 60s
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("pt-BR", { hour12: false }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setOrg((prev) => (prev === "corp" ? "digital" : "corp"));
    }, 120000); // 2 min

    return () => clearInterval(interval);
  }, [autoRotate]);

  if (error)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-red-500 text-xl">
        Erro ao carregar o monitoramento
      </div>
    );

  if (!data)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-white text-xl">Carregando...</div>
    );

  const allServices = data.flatMap((section) => section.services);

  const totalOK = allServices.filter((s) => s.status === "OK").length;
  const totalWarn = allServices.filter((s) => s.status === "WARN").length;
  const totalAlert = allServices.filter((s) => s.status === "ALERT").length;

  const globalStatus =
    totalAlert > 0 ? "Incidente crítico" : totalWarn > 0 ? "Performance onerada" : "Todos serviços operacionais";

  const getIcon = (status: "OK" | "WARN" | "ALERT") => {
    switch (status) {
      case "OK":
        return <CheckCircle2 size={54} className="text-emerald-400" />;
      case "WARN":
        return <AlertTriangle size={54} className="text-amber-400 animate-pulse" />;
      case "ALERT":
        return <Siren size={54} className="text-red-500 animate-pulse" />;
    }
  };

  return (
    <div className="h-screen bg-slate-950 text-slate-100 flex flex-col">
      <div className="h-2 bg-blue-700 w-full" />

      <div className="flex justify-between items-center px-12 py-6 border-b border-slate-800">
        <div>
          <h1 className="text-3xl font-semibold tracking-wide">Ipiranga - Monitoramento de serviços corporativos</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setOrg("corp");
              setAutoRotate(false);
            }}
            className={`px-4 py-2 rounded-lg ${
              org === "corp" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
            }`}
          >
            Ipiranga
          </button>

          <button
            onClick={() => setOrg("digital")}
            className={`px-4 py-2 rounded-lg ${
              org === "digital" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400"
            }`}
          >
            Conecta/Kmv
          </button>
        </div>

        <div className="text-right">
          <p className="text-3xl font-mono">{time}</p>
          <p className="text-xs text-slate-500 tracking-wide">Monitoramento em tempo real</p>
        </div>
      </div>

      {/* GLOBAL STATUS RIBBON */}
      <div
        className={`text-center py-3 text-sm tracking-widest font-semibold uppercase ${
          totalAlert > 0
            ? "bg-red-600 text-white animate-pulse"
            : totalWarn > 0
              ? "bg-amber-500 text-black"
              : "bg-emerald-600 text-white"
        }`}
      >
        {globalStatus}
      </div>

      {/* SUMMARY LINE */}
      <div className="px-12 py-6 flex flex-row gap-2 text-xl tracking-wide">
        <div className="flex-1 flex items-center gap-2 justify-center flex-row bg-emerald-500/30 rounded-xl py-5">
          <p className="text-3xl font-bold text-emerald-400">{totalOK}</p>{" "}
          <p className="text-sm text-white mt-1 tracking-wide">OK</p>{" "}
        </div>
        <div className="flex-1 flex items-center gap-2 justify-center flex-row bg-amber-500/30 rounded-xl py-5">
          <p className="text-3xl font-bold text-amber-400">{totalWarn}</p>
          <p className="text-sm text-white mt-1 tracking-wide">Warning</p>
        </div>
        <div className="flex-1 flex items-center gap-2 justify-center flex-row bg-red-500/30 rounded-xl py-5">
          <p className="text-3xl font-bold text-red-500">{totalAlert}</p>
          <p className="text-sm text-white mt-1 tracking-wide">Critical</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 grid grid-cols-2 gap-20 px-16 pb-12">
        {data.map((section) => (
          <div key={section.title}>
            <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-10 border-b border-slate-800 pb-3">
              {section.title}
            </h2>

            {/* SERVICES */}
            <div className="grid grid-cols-3 gap-14">
              {section.services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col py-2 rounded-xl bg-slate-900 border border-slate-800 shadow-sm items-center text-center space-y-6"
                >
                  <p className="text-3xl font-semibold tracking-wide">{service.title}</p>

                  {getIcon(service.status)}

                  <p className="text-xl text-slate-400 tracking-wide">{service.alertCount} alert(s)</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="text-right text-xs text-white px-12 py-4 border-t border-slate-800 tracking-wide">
        Auto refresh every 30 seconds
      </div>
    </div>
  );
}
