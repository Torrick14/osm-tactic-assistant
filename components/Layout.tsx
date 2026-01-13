import React from 'react';
import { Analytics } from "@vercel/analytics/react";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="min-h-screen flex justify-center relative"
      style={{
        backgroundImage: "url('/bg-stadium.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* OUTER GLOW / CARD */}
      <div
        className="
          min-h-screen w-full
          max-w-sm md:max-w-[460px] lg:max-w-[520px]
          mx-auto
          bg-white/85
          flex flex-col
          relative
          rounded-[2rem]
          ring-1 ring-white/25
          shadow-2xl
          shadow-[0_0_40px_rgba(255,255,255,0.15)]
        "
      >
        {/* INNER WRAPPER (CONTENT HOLDER) */}
        <div className="flex flex-col min-h-screen overflow-hidden rounded-[2rem]">
          <header
            className="text-white p-6 pt-10 pb-8 rounded-b-[2rem] shadow-lg sticky top-0 z-20 text-center"
            style={{ background: 'linear-gradient(to bottom, #0266da, #0377fc)' }}
          >
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-2xl font-bold tracking-tight">
                OSM Taktik Asistanı
              </h1>
              <p className="text-blue-100 text-sm">
                Maç kazandıran taktikler
              </p>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-6 py-8 pb-20">
            {children}
          </main>

          <footer className="p-4 pb-6 text-center text-slate-400 text-[10px] bg-slate-50 border-t border-slate-100 uppercase tracking-widest font-bold">
            Tarık Paşalı &copy; 2026
          </footer>

          <Analytics />
        </div>
      </div>
    </div>
  );
};
