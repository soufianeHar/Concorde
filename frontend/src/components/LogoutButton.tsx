"use client";

import { useRouter } from "next/navigation";
import { API, postVoid } from "@/lib/api";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await postVoid(API("/auth/logout"));
    } finally {
      router.replace("/login");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-full
                 bg-gradient-to-r from-[#A46CF4] to-[#6FAEF4]
                 text-white font-semibold shadow-[0_8px_18px_rgba(0,0,0,.12)]
                 hover:-translate-y-[1px] transition"
      title="Se déconnecter"
    >
      Se déconnecter
    </button>
  );
}
