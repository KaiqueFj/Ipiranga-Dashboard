"use client";

import { Section } from "@/app/types/type";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Header from "../Header/Header";
import SectionCard from "../Section/SectionCard";
import Summary from "../summary/Summary";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const [org, setOrg] = useState<"corp" | "digital">("corp");
  const [time, setTime] = useState("");
  const [autoRotate, setAutoRotate] = useState(true);

  const { data, error } = useSWR<Section[]>(`/api/monitors?org=${org}`, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("pt-BR", { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setOrg((prev) => (prev === "corp" ? "digital" : "corp"));
    }, 120000);
    return () => clearInterval(interval);
  }, [autoRotate]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-950 text-red-500 text-xl">
        Erro ao carregar o monitoramento
      </div>
    );
  }

  const isLoading = !data && !error;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col">
      <Header org={org} setOrg={setOrg} setAutoRotate={setAutoRotate} time={time} />

      <Summary sections={data ?? []} />

      <div className="flex-1 px-8 md:px-20 pb-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 rounded-2xl bg-slate-800 animate-pulse" />
            ))
          : data?.map((section) => <SectionCard key={section.title} section={section} />)}
      </div>

      <div className="text-right text-sm text-slate-400 px-16 py-6 border-t border-slate-800">
        Atualização automática a cada 1 minuto
      </div>
    </div>
  );
}
