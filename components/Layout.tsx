
import React from 'react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen max-w-md mx-auto bg-white shadow-xl flex flex-col relative overflow-hidden">
      {/* Header - Notch (çentik) uyumu için pt-safe veya yüksek padding */}
      <header 
        className="text-white p-6 pt-10 pb-8 rounded-b-[2rem] shadow-lg sticky top-0 z-20 text-center"
        style={{ background: 'linear-gradient(to bottom, #0266da, #0377fc)' }}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold tracking-tight">OSM Taktik Asistanı</h1>
          <p className="text-blue-100 text-sm">Maç kazandıran taktikler</p>
        </div>
      </header>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto px-6 py-8 pb-20">
        {children}
      </main>
      
      {/* Footer Branding */}
      <footer className="p-4 pb-6 text-center text-slate-400 text-[10px] bg-slate-50 border-t border-slate-100 uppercase tracking-widest font-bold">
        OSM Tactic Guide &copy; 2026
      </footer>
    </div>
  );
};
