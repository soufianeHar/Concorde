"use client";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export default function CTA() {
  return (
    <section id="cta" className="snap-section flex flex-col items-center justify-center px-6 text-center">
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4] bg-clip-text text-transparent">
          Prêt à trouver les meilleurs profils ?
        </h2>
      </Reveal>

      <Reveal delayMs={100}>
        <p className="mt-5 max-w-2xl text-[15px] md:text-[16px] text-slate-600 leading-relaxed">
          Créez votre compte et découvrez comment <strong>Concorde</strong> simplifie vos recrutements.<br />
          En quelques clics, exprimez votre besoin et laissez-nous faire le reste.
        </p>
      </Reveal>

      <Reveal delayMs={250}>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Link
            href="/register"
            className="rounded-full bg-gradient-to-r from-[#A46CF4] to-[#6FAEF4] px-8 py-3 text-white font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
          >
            Créer un compte
          </Link>

          <p className="font-medium text-slate-900">Avez-vous déjà un compte ?</p>

          <Link
            href="/login"
            className="rounded-full bg-[#4AD4F4] px-8 py-3 text-white font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
          >
            Se connecter
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
