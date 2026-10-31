"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview", icon: "◫" },
  { href: "/incidents", label: "Incidents", icon: "⌁" },
  { href: "/settings", label: "Settings", icon: "⚙" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link className="brand" href="/">
        <span className="brand-mark">R</span>
        <span>
          Retry<span>Lens</span>
        </span>
      </Link>

      <div className="sidebar-section">
        <div className="nav-label">Workspace</div>

        <nav className="nav-list" aria-label="Main navigation">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                className={`nav-link ${active ? "nav-link-active" : ""}`}
                href={link.href}
              >
                <span className="nav-icon" aria-hidden="true">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-note">
          <strong>RetryLens AI</strong>
          Understand failures. Find root causes. Verify fixes.
        </div>
      </div>
    </aside>
  );
}