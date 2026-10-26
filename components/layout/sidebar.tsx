"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview" },
  { href: "/incidents", label: "Incidents" },
  { href: "/settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();
  return <aside className="sidebar">
    <Link className="brand" href="/">Retry<span>Lens</span> AI</Link>
    <div className="nav-label">WORKSPACE</div>
    <nav className="nav-list" aria-label="Main navigation">
      {links.map((link) => {
        const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
        return <Link key={link.href} className={`nav-link ${active ? "nav-link-active" : ""}`} href={link.href}>{link.label}</Link>;
      })}
    </nav>
    <div className="sidebar-note"><strong style={{ color: "var(--text)" }}>RetryLens AI</strong><br />Investigate failures. Understand causes. Verify fixes.</div>
  </aside>;
}