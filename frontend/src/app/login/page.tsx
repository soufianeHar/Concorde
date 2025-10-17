"use client";

import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        // pour l’instant, simple navigation de démo :
        router.push("/");
    }

    return (
        <main className="min-h-screen flex flex-col bg-[#f4f7fb]">
            {/* Contenu centré */}
            <div className="flex-1 flex flex-col items-center justify-center px-4">
                <Link
                    href="/"
                    className="text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4] bg-clip-text text-transparent mb-10 hover:opacity-90 transition-opacity"
                >
                    Concorde
                </Link>


                {/* Carte */}
                <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-8 shadow-[0_10px_28px_rgba(71,85,105,0.12)]">
                    <h2 className="text-xl font-semibold text-center text-slate-900">
                        Se connecter
                    </h2>

                    {/* Formulaire */}
                    <form
                        onSubmit={handleLogin}
                        className="mt-6 flex flex-col gap-4"
                    >
                        <div className="flex items-center rounded-md border border-slate-300 bg-slate-50 px-3 py-2 focus-within:ring-2 focus-within:ring-[#6FAEF4]">
                            <Mail className="h-4 w-4 text-[#6FAEF4] mr-2" />
                            <input
                                type="email"
                                placeholder="E-mail..."
                                className="w-full text-sm text-slate-700 placeholder:text-slate-500 bg-transparent outline-none"
                                required
                            />
                        </div>

                        <div className="flex items-center rounded-md border border-slate-300 bg-slate-50 px-3 py-2 focus-within:ring-2 focus-within:ring-[#A46CF4]">
                            <Lock className="h-4 w-4 text-[#A46CF4] mr-2" />
                            <input
                                type="password"
                                placeholder="Mot de passe..."
                                className="w-full text-sm text-slate-700 placeholder:text-slate-500 bg-transparent outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-3 w-full rounded-md bg-[#4AD4F4] py-2.5 text-white font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
                        >
                            Se connecter
                        </button>
                    </form>

                    {/* Séparateur */}
                    <div className="my-6 flex items-center gap-3 text-slate-400 text-sm">
                        <span className="flex-1 border-t"></span> ou{" "}
                        <span className="flex-1 border-t"></span>
                    </div>

                    {/* Lien vers inscription */}
                    <Link
                        href="/register"
                        className="block w-full text-center rounded-md bg-gradient-to-r from-[#A46CF4] to-[#6FAEF4] py-2.5 text-white font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform hover:-translate-y-[2px] hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
                    >
                        Créez un nouveau compte
                    </Link>
                </div>
            </div>

            {/* Footer collé bas */}
            <Footer />
        </main>
    );
}
