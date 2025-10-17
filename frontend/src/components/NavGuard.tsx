"use client";
import { usePathname } from "next/navigation";

export default function NavGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideOn = ["/register", "/login"];
  const shouldHide = hideOn.some((p) => pathname.startsWith(p));
  return shouldHide ? null : <>{children}</>;
}
