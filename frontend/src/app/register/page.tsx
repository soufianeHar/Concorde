"use client";

import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { postJSON, API } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    const first_name = (form.elements.namedItem("first_name") as HTMLInputElement).value;
    const last_name  = (form.elements.namedItem("last_name") as HTMLInputElement).value;
    const email      = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password   = (form.elements.namedItem("password") as HTMLInputElement).value;

    setLoading(true);
    setError(null);
    try {
      await postJSON(API("/auth/register"), { first_name, last_name, email, password });
      // ✅ Nouveau comportement : on envoie l’utilisateur à la page de connexion
      router.push("/login");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f7fb]">
      {/* Contenu centré */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4] bg-clip-text text-transparent mb-10 hover:opacity-90 transition-opacity"
        >
          Concorde
        </Link>

        {/* Card */}
        <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_10px_28px_rgba(71,85,105,0.12)] border border-slate-200 p-8">
          <h2 className="text-xl font-semibold text-center text-slate-900">
            Créez votre compte
          </h2>
          <p className="text-center text-slate-600 text-sm mt-1 mb-6">
            Simple et rapide
          </p>

          {/* Formulaire */}
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <div className="flex gap-3">
              <input
                name="first_name"
                type="text"
                placeholder="Prénom..."
                className="w-1/2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#6FAEF4]"
                required
              />
              <input
                name="last_name"
                type="text"
                placeholder="Nom..."
                className="w-1/2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#6FAEF4]"
                required
              />
            </div>

            <div className="flex items-center rounded-md border border-slate-300 bg-slate-50 px-3 py-2 focus-within:ring-2 focus-within:ring-[#6FAEF4]">
              <Mail className="h-4 w-4 text-[#6FAEF4] mr-2" />
              <input
                name="email"
                type="email"
                placeholder="E-mail..."
                className="w-full text-sm text-slate-700 placeholder:text-slate-500 bg-transparent outline-none"
                required
              />
            </div>

            <div className="flex items-center rounded-md border border-slate-300 bg-slate-50 px-3 py-2 focus-within:ring-2 focus-within:ring-[#A46CF4]">
              <Lock className="h-4 w-4 text-[#A46CF4] mr-2" />
              <input
                name="password"
                type="password"
                placeholder="Mot de passe..."
                className="w-full text-sm text-slate-700 placeholder:text-slate-500 bg-transparent outline-none"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-rose-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-md bg-gradient-to-r from-[#A46CF4] to-[#6FAEF4] py-2.5 text-white font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)] disabled:opacity-60"
            >
              {loading ? "Création..." : "S’inscrire"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-medium text-slate-900">
            Avez-vous déjà un compte ?{" "}
            <Link href="/login" className="text-[#4AD4F4] hover:underline transition">
              Se connecter
            </Link>
          </p>
        </div>
      </div>

      {/* Footer collé bas, sans marge supplémentaire */}
      <Footer />
    </main>
  );
}
