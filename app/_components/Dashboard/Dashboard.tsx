"use client";

import { Section } from "@/app/types/type";
import useSWR from "swr";
import Header from "../Header/Header";
import SectionCard from "../Section/SectionCard";
import Summary from "../summary/Summary";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function DashboardPage() {
  const { data, error } = useSWR<Section[]>("/api/monitors?org=corp", fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-red-500 text-xl">
        Erro ao carregar o monitoramento
      </div>
    );
  }

  const isLoading = !data && !error;

  const sections = data ?? [];

  return (
    <div className="h-screen flex flex-col bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Header />
      <Summary sections={sections} />

      <main className="flex-1 min-h-0 w-full px-4 md:px-8 pb-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-56 rounded-2xl bg-slate-800 animate-pulse" />
            ))
          : sections.map((section) => <SectionCard key={section.title} section={section} />)}
      </main>

      <footer className="text-center text-xs sm:text-sm text-slate-400 py-6 border-t border-slate-800">
        Atualização automática a cada 1 minuto
      </footer>
    </div>
  );
}
