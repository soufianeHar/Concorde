"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import LogoutButton from "@/components/LogoutButton";
import { API } from "@/lib/api";

export default function UploadNeedPage() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onPick = (f: File | null) => {
    if (!f) return;
    const okExt = [".pdf", ".docx"].some(ext => f.name.toLowerCase().endsWith(ext));
    if (!okExt) { setMsg("Formats autorisés: PDF ou DOCX"); return; }
    if (f.size > 10 * 1024 * 1024) { setMsg("Max 10 Mo"); return; }
    setMsg(null);
    setFile(f);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onPick(e.dataTransfer.files?.[0] ?? null);
  };

  const upload = async () => {
    if (!file) return;
    setBusy(true); setProgress(0); setMsg(null);

    // XHR pour le suivi de progression
    const form = new FormData();
    form.append("file", file);

    await new Promise<void>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", API("/needs/upload"));
      xhr.withCredentials = true; // si tu utilises des cookies
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setMsg("Fichier envoyé et analysé ✅");
          resolve();
        } else {
          reject(new Error(xhr.responseText || "Erreur upload"));
        }
      };
      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(form);
    }).catch((err: any) => setMsg(err.message || "Erreur"));

    setBusy(false);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#f4f7fb]">
      <div className="px-6 pt-6 pb-2 flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4] bg-clip-text text-transparent">
          Téléchargement d’un document
        </h1>
        <LogoutButton />
      </div>

      <section className="flex-1 flex flex-col items-center px-4 pb-28">
        <div className="mt-6 text-3xl md:text-[44px] font-semibold bg-gradient-to-r from-[#4AD4F4] via-[#6FAEF4] to-[#A46CF4] bg-clip-text text-transparent">
          Déposez votre fichier
        </div>
        <p className="mt-2 text-slate-700">PDF ou DOCX (max 10 Mo)</p>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className="mt-8 w-full max-w-3xl rounded-2xl bg-white shadow-[0_12px_32px_rgba(71,85,105,.14)]
                     border border-dashed border-slate-300 p-10 text-center"
        >
          <p className="text-slate-700">
            Glissez-déposez ici votre fichier, ou
          </p>
          <label className="mt-4 inline-block cursor-pointer rounded-md bg-gradient-to-r from-[#A46CF4] to-[#6FAEF4] px-5 py-2 text-white font-semibold shadow-sm">
            Choisir un fichier
            <input
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={(e) => onPick(e.target.files?.[0] ?? null)}
            />
          </label>

          {file && (
            <div className="mt-6 text-slate-800">
              {file.name} — {(file.size / 1024 / 1024).toFixed(2)} Mo
            </div>
          )}

          {progress > 0 && (
            <div className="mt-4 w-full max-w-xl mx-auto">
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-[#A46CF4] to-[#6FAEF4]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-sm mt-1 text-slate-700">{progress}%</div>
            </div>
          )}

          <button
            disabled={!file || busy}
            onClick={upload}
            className="mt-6 rounded-md bg-gradient-to-r from-[#A46CF4] to-[#6FAEF4] px-6 py-2.5
                       text-white font-semibold shadow hover:-translate-y-[1px] transition disabled:opacity-50"
          >
            Envoyer & analyser
          </button>

          {msg && <p className="mt-4 text-slate-700">{msg}</p>}
        </div>
      </section>

      <Footer />
    </main>
  );
}
