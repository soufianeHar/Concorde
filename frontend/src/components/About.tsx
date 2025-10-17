import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="apropos" className="snap-section mx-auto w-full max-w-6xl px-6">
      <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_28px_rgba(71,85,105,0.12)]">
            <Image
              src="/recruiter_image.jpeg"
              alt="Présentation de CV durant un entretien"
              width={900}
              height={700}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </Reveal>

        <Reveal delayMs={120}>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 shadow-[0_10px_28px_rgba(71,85,105,0.12)]">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              Concorde en deux mots
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              <strong>Concorde</strong> est une plateforme intelligente qui aide les
              entreprises à gagner du temps dans la recherche et la sélection de profils.
              Elle simplifie chaque étape, de l’expression du besoin à la présentation des
              candidats, tout en assurant une <strong>standardisation claire</strong> et cohérente des CV.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Grâce à cette approche, les recruteurs bénéficient de profils comparables,
              mieux présentés et plus faciles à évaluer — pour des décisions plus justes
              et plus rapides.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
