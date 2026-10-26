import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "RetryLens AI",
  description: "Investigate incidents, understand failures, and verify fixes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <Sidebar />
          <div className="main-shell">
            <Header />
            <main className="main-content">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}