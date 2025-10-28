"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import LogoutButton from "@/components/LogoutButton";
import { API, getJSON, postJSON } from "@/lib/api";

type Me = { id: number; first_name: string; last_name: string; email: string };

export default function NeedFormPage() {
  const [me, setMe] = useState<Me | null>(null);
  const [title, setTitle] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(["Python", "SQL"]);
  const [location, setLocation] = useState("");
  const [contract, setContract] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await getJSON<Me>(API("/auth/me"));
        setMe(user);
      } catch {
        setMe(null);
      }
    })();
  }, []);

  const addSkill = () => {
    const val = skillInput.trim();
    if (!val) return;
    if (!skills.includes(val)) setSkills((s) => [...s, val]);
    setSkillInput("");
  };

  const removeSkill = (s: string) =>
    setSkills((arr) => arr.filter((x) => x !== s));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setSaving(true);
    try {
      // TODO: remplacer par ton vrai endpoint /needs
      await postJSON(API("/ping-cors"), {});
      setMsg("Besoin envoyé avec succès (démo).");
    } catch (err: any) {
      setMsg(err.message || "Erreur.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f7fb]">
      {/* top bar privée */}
      <div className="px-6 pt-6 pb-2 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4] bg-clip-text text-transparent">
          Saisissez votre besoin
        </h1>
        <LogoutButton />
      </div>

      {/* contenu principal ; pb-28 pour laisser de l'air avant le footer */}
      <section className="flex-1 flex flex-col items-center px-4 pb-28">
        {/* titre central UNIQUE */}
        <div className="mt-4 text-center">
          <div className="text-3xl md:text-[44px] font-semibold bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4] bg-clip-text text-transparent">
            Remplissage du formulaire
          </div>
          <p className="mt-2 text-slate-700">
            Veuillez remplir le formulaire suivant :
          </p>
        </div>

        {/* carte formulaire avec marges verticales suffisantes */}
        <form
          onSubmit={submit}
          className="mt-8 mb-10 w-full max-w-3xl rounded-2xl bg-white shadow-[0_12px_32px_rgba(71,85,105,.14)]
                     border border-white/70 p-6 md:p-8"
        >
          {/* Intitulé */}
          <label className="block mt-1 font-semibold text-slate-800">Intitulé</label>
          <input
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-[15px]
                       text-slate-800 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-[#6FAEF4]"
            placeholder="Saisir l’intitulé…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Compétences */}
          <label className="block mt-6 font-semibold text-slate-800">Compétences clés</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-2 rounded-full bg-[#4AD4F4] text-white
                           px-3 py-1 text-sm shadow-sm"
              >
                {s}
                <button
                  type="button"
                  onClick={() => removeSkill(s)}
                  className="rounded-full bg-white/25 px-2 py-0.5 hover:bg-white/35 transition"
                  title="Supprimer"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input
              className="flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-[15px]
                         text-slate-800 placeholder:text-slate-400
                         focus:outline-none focus:ring-2 focus:ring-[#A46CF4]"
              placeholder="Ajouter une compétence…"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 rounded-md bg-gradient-to-r from-[#A46CF4] to-[#6FAEF4]
                         text-white font-semibold shadow-sm hover:-translate-y-[1px] transition"
            >
              Ajouter
            </button>
          </div>

          {/* Localisation */}
          <label className="block mt-6 font-semibold text-slate-800">Localisation</label>
          <input
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-[15px]
                       text-slate-800 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-[#6FAEF4]"
            placeholder="Saisir localisation…"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Type de contrat */}
          <label className="block mt-6 font-semibold text-slate-800">Type de contrat</label>
          <select
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-[15px]
                       text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#6FAEF4]"
            value={contract}
            onChange={(e) => setContract(e.target.value)}
          >
            <option value="">Sélectionner un type…</option>
            <option>CDI</option>
            <option>CDD</option>
            <option>Stage</option>
            <option>Freelance</option>
            <option>Alternance</option>
          </select>

          {/* Date limite */}
          <label className="block mt-6 font-semibold text-slate-800">Date limite</label>
          <input
            type="date"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-[15px]
                       text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#A46CF4]"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          {/* Description */}
          <label className="block mt-6 font-semibold text-slate-800">Description</label>
          <textarea
            rows={5}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-[15px]
                       text-slate-800 placeholder:text-slate-400
                       focus:outline-none focus:ring-2 focus:ring-[#6FAEF4]"
            placeholder="Décrivez le besoin…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* message & submit */}
          {msg && <p className="mt-4 text-center text-sm text-slate-700">{msg}</p>}

          <button
            type="submit"
            disabled={saving}
            className="mt-6 w-full rounded-md bg-gradient-to-r from-[#A46CF4] to-[#6FAEF4] py-3
                       text-white font-semibold shadow-[0_6px_18px_rgba(0,0,0,0.15)]
                       hover:-translate-y-[1px] transition"
          >
            {saving ? "Envoi…" : "Envoyer mon besoin"}
          </button>
        </form>
      </section>

      <Footer />
    </main>
  );
}
