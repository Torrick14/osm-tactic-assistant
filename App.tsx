
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { CustomSelect } from './components/CustomSelect';
import { TacticResult } from './components/TacticResult';
import { TacticForm, Formation, PlayStyle, RefereeAttitude } from './types';
import { FORMATIONS, PLAY_STYLES, REFEREE_ATTITUDES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'form' | 'result'>('form');
  const [formData, setFormData] = useState<TacticForm>({
    ownPower: '',
    opponentPower: '',
    opponentFormation: FORMATIONS[0],
    opponentStyle: PLAY_STYLES[1], // Default: Paslı Oyun
    refereeAttitude: REFEREE_ATTITUDES[2], // Default: Ortalama
    isHome: true,
  });

  const handleInputChange = (field: keyof TacticForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setView('result');
  };

  if (view === 'result') {
    return (
      <Layout>
        <TacticResult 
          formData={formData} 
          onBack={() => setView('form')} 
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
        
        {/* Section: Team Analysis */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-8 w-1 bg-orange-400 rounded-full"></div>
             <h2 className="text-lg font-bold text-slate-800">Takım Analizi</h2>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              Kendi Takım Gücün
            </label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="Örn: 110"
              value={formData.ownPower}
              onChange={(e) => handleInputChange('ownPower', e.target.value)}
              className="w-full bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-4 py-3 text-slate-900 font-medium transition-all outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-swords"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="21" y2="19"/></svg>
              Rakip Takım Gücü
            </label>
            <input
              type="number"
              inputMode="numeric"
              placeholder="Örn: 105"
              value={formData.opponentPower}
              onChange={(e) => handleInputChange('opponentPower', e.target.value)}
              className="w-full bg-slate-100 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-4 py-3 text-slate-900 font-medium transition-all outline-none"
              required
            />
          </div>

          <CustomSelect
            label="Rakip Dizilişi"
            value={formData.opponentFormation}
            options={FORMATIONS}
            onChange={(val) => handleInputChange('opponentFormation', val)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>}
          />

          <CustomSelect
            label="Oyun Tarzı"
            value={formData.opponentStyle}
            options={PLAY_STYLES}
            onChange={(val) => handleInputChange('opponentStyle', val)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A.5.5 0 0 0 12.6 9h5.4a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A.5.5 0 0 0 11.4 15z"/></svg>}
          />
        </section>

        {/* Section: Match Context */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
             <div className="h-8 w-1 bg-orange-400 rounded-full"></div>
             <h2 className="text-lg font-bold text-slate-800">Maç Koşulları</h2>
          </div>

          <CustomSelect
            label="Maç Hakemi"
            value={formData.refereeAttitude}
            options={REFEREE_ATTITUDES}
            onChange={(val) => handleInputChange('refereeAttitude', val)}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-cog"><circle cx="18" cy="15" r="3"/><circle cx="9" cy="7" r="4"/><path d="M10 15H6a4 4 0 0 0-4 4v2"/><path d="m21.7 16.4-.9-.3"/><path d="m15.2 13.9-.9-.3"/><path d="m16.6 18.7.3-.9"/><path d="m19.1 12.2.3-.9"/><path d="m19.6 18.7-.4-1"/><path d="m16.8 12.3-.4-1"/><path d="m14.3 16.6 1-.4"/><path d="m20.7 14.3 1-.4"/></svg>}
          />

          <div className="flex items-center justify-between bg-slate-100 p-4 rounded-3xl">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${formData.isHome ? 'bg-blue-500 text-white' : 'bg-slate-300 text-slate-600'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <span className="font-bold text-slate-700">
                {formData.isHome ? 'Ev Sahibi' : 'Deplasman'}
              </span>
            </div>
            
            <button
              type="button"
              onClick={() => handleInputChange('isHome', !formData.isHome)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${formData.isHome ? 'bg-blue-500' : 'bg-slate-400'}`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${formData.isHome ? 'translate-x-7' : 'translate-x-1'}`}
              />
            </button>
          </div>
        </section>

        {/* Action Button */}
        <button
          type="submit"
          className="w-full text-white font-bold py-5 rounded-3xl shadow-lg shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
          style={{ backgroundColor: '#0377fc' }}
        >
          <span>Taktik Analizi Yap</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </form>
    </Layout>
  );
};

export default App;
