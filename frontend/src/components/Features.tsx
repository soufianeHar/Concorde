"use client";
import Reveal from "@/components/Reveal";

type Feature = {
  title: string;
  desc: string;
};

const FEATURES: Feature[] = [
  {
    title: "Analyse automatique du besoin",
    desc: "Comprend, reformule et extrait les informations clés pour un brief exploitable.",
  },
  {
    title: "Recherche intelligente de profils",
    desc: "Matching précis (compétences, expérience, contexte) pour un shortlist fiable.",
  },
  {
    title: "Standardisation des CVs",
    desc: "Tous les CV au même format, pour des comparaisons claires et rapides.",
  },
  {
    title: "Sélection assistée",
    desc: "Points forts, risques et critères d’adéquation visibles en un coup d’œil.",
  },
  {
    title: "Gain de temps & transparence",
    desc: "Processus fluide, explicable et traçable pour mieux décider.",
  },
];

export default function Features() {
  return (
    <section id="features" className="snap-section">
      <div className="mx-auto w-full max-w-6xl px-6">
        {/* Titre */}
        <Reveal>
          <h2 className="text-center text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4] bg-clip-text text-transparent">
            Ce que Concorde vous apporte
          </h2>
        </Reveal>

        {/* Cartes */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {FEATURES.slice(0, 3).map((f, i) => (
            <Reveal key={f.title} delayMs={i * 90}>
              <Card title={f.title} desc={f.desc} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {FEATURES.slice(3).map((f, i) => (
            <Reveal key={f.title} delayMs={(i + 3) * 90}>
              <Card title={f.title} desc={f.desc} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ title, desc }: Feature) {
  return (
    <div className="group h-full">
      <div className="rounded-2xl bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4] p-[1px] transition-transform duration-300 group-hover:-translate-y-1 h-full">
        <div
          className="
            card-shine
            flex h-full flex-col
            justify-between
            rounded-2xl border border-white/70 bg-white
            p-6 md:p-7
            shadow-[0_10px_28px_rgba(71,85,105,0.12)]
            transition-all duration-300
            group-hover:shadow-[0_18px_40px_rgba(71,85,105,0.18)]
            group-hover:ring-1 group-hover:ring-black/5
          "
        >
          <div>
            <h3 className="text-lg md:text-[18px] font-semibold text-slate-900">
              {title}
            </h3>
            <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">
              {desc}
            </p>
          </div>
          <span className="mt-4 block h-[3px] w-0 bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4] transition-all duration-300 group-hover:w-24" />
        </div>
      </div>
    </div>
  );
}
