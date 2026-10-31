"use client";

import { usePathname } from "next/navigation";

const titles: Record<string, string> = {
  "/": "Workspace overview",
  "/incidents": "Incident management",
  "/settings": "Workspace settings",
};

export function Header() {
  const pathname = usePathname();

  const title = pathname.startsWith("/incidents/")
    ? "Incident investigation"
    : titles[pathname] ?? "RetryLens AI";

  return (
    <header className="topbar">
      <div className="topbar-title">{title}</div>

      <div className="topbar-right">
        <span className="workspace-label">Developer workspace</span>
        <div className="avatar" aria-label="Developer">
          D
        </div>
      </div>
    </header>
  );
}