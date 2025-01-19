import type { Metadata } from "next";
import React from "react";
import Sidebar from "./Sidebar";

export const metadata: Metadata = {
  title: "داشبورد مدیر",
  description: "موسیقی هنر برتر",
};

export default function DashboardLayout({children,}: Readonly<{ children: React.ReactNode}>) {
  return (
    <div className=" min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
