"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-3 z-50">
      <nav
        className="
          mx-4 md:mx-6 lg:mx-8
          rounded-3xl
          bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4]
          text-white
          shadow-[0_10px_28px_rgba(71,85,105,0.18)]  /* ombre douce */
          ring-1 ring-white/15  /* fin liseré */
        "
      >
        <div
          className="
            mx-auto max-w-6xl
            h-14 md:h-16                  /* hauteur + */
            px-5 md:px-6
            flex items-center justify-between
          "
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-[22px] md:text-[24px] font-semibold tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,.25)]"
          >
            Concorde
          </Link>

          {/* Liens */}
          <ul className="hidden md:flex items-center gap-9 text-[14px] font-medium">
            <li><Link href="/" className="transition-opacity hover:opacity-85">Accueil</Link></li>
            <li><Link href="#apropos" className="transition-opacity hover:opacity-85">À propos</Link></li>
            <li><Link href="#features" className="transition-opacity hover:opacity-85">Fonctionnalités</Link></li>
            <li><Link href="#cta" className="transition-opacity hover:opacity-85">Passer à l’action</Link></li>
          </ul>

          {/* CTA */}
          <Link
            href="/login"
            className="
              hidden md:inline-block
              text-sm font-medium
              px-5 py-2
              rounded-full
              border border-white/70
              bg-white/0 hover:bg-white/10
              transition-colors
            "
          >
            Se connecter
          </Link>
        </div>
      </nav>
    </header>
  );
}
