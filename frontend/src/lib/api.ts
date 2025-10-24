export const API = (path: string) =>
  `${process.env.NEXT_PUBLIC_API_URL}${path}`;

export async function postJSON<T>(url: string, data: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",           // indispensable pour le cookie httpOnly
    body: JSON.stringify(data),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as any)?.detail || "Erreur serveur");
  return json as T;
}
export async function getJSON<T>(url: string) {
  const res = await fetch(url, { credentials: "include" });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as any)?.detail || "Erreur serveur");
  return json as T;
}