"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getJSON, API } from "@/lib/api";
import LogoutButton from "@/components/LogoutButton";

type Me = { id: number; first_name: string; last_name: string; email: string };

export default function DashboardPage() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const user = await getJSON<Me>(API("/auth/me"));
        setMe(user);
      } catch (e: any) {
        // 401 / non authentifié => page de connexion
        router.replace("/login");
        return;
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f4f7fb]">
        <div className="animate-pulse text-slate-500">Chargement…</div>
      </main>
    );
  }

  if (!me) return null; // redirigé

  const fullName = `${me.first_name} ${me.last_name}`.trim();

  return (

    <main className="min-h-screen flex flex-col bg-[#f4f7fb]">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-semibold bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4] bg-clip-text text-transparent">
          Concorde
        </div>
        <LogoutButton />
      </div>
      <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl md:text-5xl font-semibold bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4] bg-clip-text text-transparent drop-shadow-[0_3px_6px_rgba(0,0,0,0.12)]">
          Bonjour, {fullName} !
        </h1>

        <p className="mt-10 text-slate-800 text-lg md:text-xl">
          Voulez-vous saisir votre <br className="md:hidden" /> besoin par :
        </p>

        <div className="mt-8 flex flex-col gap-8">
          <Link
            href="/need/form"
            className="mx-auto w-[310px] rounded-lg bg-[#4AD4F4] py-3 text-white font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition"
          >
            Remplissage d’un formulaire
          </Link>

          <div className="text-slate-400 font-semibold">ou</div>

          <Link
            href="/need/upload"
            className="mx-auto w-[310px] rounded-lg bg-gradient-to-r from-[#A46CF4] to-[#6FAEF4] py-3 text-white font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition"
          >
            téléchargement d’un document <br />(DOCX ou PDF)
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
