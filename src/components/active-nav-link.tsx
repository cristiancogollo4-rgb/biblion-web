"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type ActiveNavLinkProps = {
  href: string;
  children: ReactNode;
};

export function ActiveNavLink({ href, children }: ActiveNavLinkProps) {
  const pathname = usePathname();
  const isActive = href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={isActive ? "nav-link nav-link-active" : "nav-link"}
      href={href}
    >
      <span>{children}</span>
      <span className="nav-active-marker" aria-hidden="true" />
    </Link>
  );
}
