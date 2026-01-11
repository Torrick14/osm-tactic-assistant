
import React from 'react';
import { RecommendedTactic, TacticForm } from '../types';

interface TacticResultProps {
  formData: TacticForm;
  onBack: () => void;
}

export const TacticResult: React.FC<TacticResultProps> = ({ formData, onBack }) => {
  // Nihai Güç Hesaplamaları (NKG ve NRG)
  const ownPowerRaw = parseInt(formData.ownPower) || 0;
  const oppPowerRaw = parseInt(formData.opponentPower) || 0;

  // Ev sahibi ise kendi gücü %3 artar (NKG), deplasman ise rakip gücü %3 artar (NRG)
  const nkg = formData.isHome ? ownPowerRaw * 1.03 : ownPowerRaw;
  const nrg = !formData.isHome ? oppPowerRaw * 1.03 : oppPowerRaw;

  // Hakem ve Güç Dengesi Mantığına Göre Mücadele Belirleme
  const getCombatStyle = (referee: string, nkgVal: number, nrgVal: number): 'Dikkatli' | 'Normal' | 'Agresif' | 'Çok Agresif' => {
    switch (referee) {
      case 'Yumuşak': return 'Çok Agresif';
      case 'Hoşgörülü': return nkgVal > (nrgVal + 10) ? 'Agresif' : 'Çok Agresif';
      case 'Ortalama':
        if (nrgVal > (nkgVal + 5)) return 'Çok Agresif';
        if (nkgVal > (nrgVal + 7)) return 'Normal';
        return 'Agresif';
      case 'Katı': return nrgVal > (nkgVal + 5) ? 'Agresif' : 'Normal';
      case 'Gaddar': return nrgVal > (nkgVal + 8) ? 'Agresif' : 'Normal';
      default: return 'Normal';
    }
  };

  const getRecommendation = (data: TacticForm): RecommendedTactic => {
    const combat = getCombatStyle(data.refereeAttitude, nkg, nrg);

    // --- 1. SPESİFİK KARŞI TAKTİKLER ---

    // 4-3-3B
    if (data.opponentFormation === '4-3-3B') {
      if (nkg > nrg) {
        return {
          name: "4-3-3B Kanatlar",
          description: "Güçlü olduğunuzda kanatlardan dominasyon kurun.",
          details: {
            lineup: "4-3-3B", style: "Kanatları Kullan", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 70, style: 65, tempo: 75 }
          }
        };
      } else {
        return {
          name: "5-3-1-1 Kontra",
          description: "Daha güçlü 4-3-3B'ye karşı kontra atak taktiği.",
          details: {
            lineup: "5-3-1-1", style: "Kontra Atak", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Defansa yardım et', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 43, style: 26, tempo: 73 }
          }
        };
      }
    }

    // 4-3-3A
    if (data.opponentFormation === '4-3-3A') {
      if (nkg > nrg) {
        return {
          name: "4-3-3B Kanatlar",
          description: "Güçlü olduğunuzda rakibin 4-3-3A'sını kanatlarla aşın.",
          details: {
            lineup: "4-3-3B", style: "Kanatları Kullan", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 70, style: 65, tempo: 75 }
          }
        };
      } else {
        return {
          name: "4-5-1 Kaleyi Gör",
          description: "Güçlü rakibe karşı orta sahayı kapatıp uzaktan vurun.",
          details: {
            lineup: "4-5-1", style: "Kaleyi Görünce Vur", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Defansa yardım et', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 30, style: 30, tempo: 70 }
          }
        };
      }
    }

    // 4-4-2B
    if (data.opponentFormation === '4-4-2B') {
      if (nkg > nrg) {
        return {
          name: "4-3-3B Kanatlar",
          description: "Denk rakipten güçlüyseniz kanatlardan vurun.",
          details: {
            lineup: "4-3-3B", style: "Kanatları Kullan", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 70, style: 65, tempo: 75 }
          }
        };
      } else {
        return {
          name: "4-2-3-1 Kaleyi Gör",
          description: "Daha kaliteli orta sahayla uzaktan şut çekin.",
          details: {
            lineup: "4-2-3-1", style: "Kaleyi Görünce Vur", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Defansa yardım et', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 50, style: 30, tempo: 70 }
          }
        };
      }
    }

    // 4-4-2A
    if (data.opponentFormation === '4-4-2A') {
      if (nkg > nrg) {
        return {
          name: "4-3-3B Kanatlar",
          description: "4-4-2A'nın kanat zaafiyetini kullanın.",
          details: {
            lineup: "4-3-3B", style: "Kanatları Kullan", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 50, style: 50, tempo: 70 }
          }
        };
      } else {
        return {
          name: "5-3-2 Kontra",
          description: "Savunmada kalıp hızlı çıkın.",
          details: {
            lineup: "5-3-2", style: "Kontra Atak", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Defansa yardım et', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 40, style: 25, tempo: 70 }
          }
        };
      }
    }

    // 4-5-1
    if (data.opponentFormation === '4-5-1') {
      if (nkg > nrg) {
        return {
          name: "3-4-3B Kanatlar",
          description: "Kalabalık orta sahaya 3 forvetle karşılık verin.",
          details: {
            lineup: "3-4-3B", style: "Kanatları Kullan", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Evet',
            sliders: { pressing: 67, style: 67, tempo: 75 }
          }
        };
      } else {
        return {
          name: "6-3-1 Kontra",
          description: "Daha güçlü 4-5-1'e karşı tam savunma.",
          details: {
            lineup: "6-3-1", style: "Kontra Atak", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 43, style: 26, tempo: 73 }
          }
        };
      }
    }

    // 4-2-3-1
    if (data.opponentFormation === '4-2-3-1') {
      if (nkg > nrg) {
        return {
          name: "4-2-3-1 Kaleyi Gör",
          description: "Aynı dizilişle kalite farkınızı ortaya koyun.",
          details: {
            lineup: "4-2-3-1", style: "Kaleyi Görünce Vur", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Defansa yardım et', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 55, style: 43, tempo: 70 }
          }
        };
      } else {
        return {
          name: "6-3-1 Kontra",
          description: "Güçlü rakibe karşı otobüsü çekin.",
          details: {
            lineup: "6-3-1", style: "Kontra Atak", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 43, style: 26, tempo: 73 }
          }
        };
      }
    }

    // 3-4-3B
    if (data.opponentFormation === '3-4-3B') {
      if (nkg > nrg) {
        return {
          name: "4-4-2A Kanatlar",
          description: "3'lü savunmayı kanat akınlarıyla cezalandırın.",
          details: {
            lineup: "4-4-2A", style: "Kanatları Kullan", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 70, style: 65, tempo: 55 }
          }
        };
      } else {
        return {
          name: "6-3-1 Kontra",
          description: "Güçlü 3-4-3B'ye karşı kontra.",
          details: {
            lineup: "6-3-1", style: "Kontra Atak", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 43, style: 26, tempo: 73 }
          }
        };
      }
    }

    // 3-4-3A
    if (data.opponentFormation === '3-4-3A') {
      if (nkg > nrg) {
        return {
          name: "4-3-3B Kanatlar",
          description: "Zayıf 3-4-3A'ya karşı dominant kanat oyunu.",
          details: {
            lineup: "4-3-3B", style: "Kanatları Kullan", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 65, style: 75, tempo: 65 }
          }
        };
      } else {
        return {
          name: "6-3-1 Kontra",
          description: "Güçlü 3-4-3A'ya karşı tam savunma.",
          details: {
            lineup: "6-3-1", style: "Kontra Atak", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 43, style: 26, tempo: 73 }
          }
        };
      }
    }

    // 3-3-4
    if (data.opponentFormation === '3-3-4A' || data.opponentFormation === '3-3-4B') {
      return {
        name: "4-3-3B Kanatlar",
        description: data.isHome ? "Evimizde 3-3-4'ü kanatlarla boğalım." : "Deplasmanda dengeli kanat oyunu.",
        details: {
          lineup: "4-3-3B", style: "Kanatları Kullan", combat,
          lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
          marking: 'Alan markajı', offsideTrap: 'Hayır',
          sliders: nkg > nrg ? { pressing: 65, style: 70, tempo: 65 } : { pressing: 65, style: 50, tempo: 20 }
        }
      };
    }

    // --- 2. GRUP LİSTESİ MANTIĞI (13 Diziliş) ---

    const specialList = [
      '3-2-5', '3-2-3-2', '3-3-2-2', '3-5-2', '4-2-4A', '4-2-4B', 
      '5-2-3A', '5-2-3B', '5-3-2', '5-3-1-1', '5-4-1A', '5-4-1B', '6-3-1'
    ];

    if (specialList.includes(data.opponentFormation)) {
      if (nrg > nkg + 8) {
        return {
          name: "6-3-1 Kontra",
          description: "Rakip çok üstün, tam savunma ve kontra.",
          details: {
            lineup: "6-3-1", style: "Kontra Atak", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 25, style: 25, tempo: 70 }
          }
        };
      } else if (nrg > nkg + 4) {
        return {
          name: "4-5-1 Kaleyi Gör",
          description: "Güçlü rakibe karşı kalabalık orta saha.",
          details: {
            lineup: "4-5-1", style: "Kaleyi Görünce Vur", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Defansa yardım et', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 25, style: 45, tempo: 70 }
          }
        };
      } else if (nrg > nkg) {
        return {
          name: "4-4-2B Paslı",
          description: "Denk rakibe karşı kontrollü pas oyunu.",
          details: {
            lineup: "4-4-2B", style: "Paslı Oyun", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Hayır',
            sliders: { pressing: 60, style: 60, tempo: 75 }
          }
        };
      } else {
        return {
          name: "4-3-3A Kanatlar",
          description: "Zayıf rakibi kanat hücumlarıyla domine edin.",
          details: {
            lineup: "4-3-3A", style: "Kanatları Kullan", combat,
            lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
            marking: 'Alan markajı', offsideTrap: 'Evet',
            sliders: { pressing: 70, style: 70, tempo: 65 }
          }
        };
      }
    }

    // Default Fallback
    return {
      name: nkg >= nrg ? "4-3-3B Kanatlar" : "4-5-1 Kaleyi Gör",
      description: "Genel maç koşullarına göre en dengeli taktik.",
      details: {
        lineup: nkg >= nrg ? "4-3-3B" : "4-5-1",
        style: nkg >= nrg ? "Kanatları Kullan" : "Kaleyi Görünce Vur",
        combat,
        lineTactics: { forwards: 'Sadece hücum', midfielders: 'Pozisyonu koru', defenders: 'Geride kal' },
        marking: 'Alan markajı', offsideTrap: 'Hayır',
        sliders: { pressing: 60, style: 60, tempo: 60 }
      }
    };
  };

  const recommendation = getRecommendation(formData);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 font-semibold mb-2 hover:opacity-75 transition-opacity"
        style={{ color: '#0377fc' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Düzenle
      </button>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-6 space-y-8">
        <div className="flex justify-between items-center border-b border-slate-50 pb-6">
          <div className="flex-1 mr-4">
            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">İdeal Taktik</span>
            <h2 className="text-3xl font-extrabold mt-1 text-slate-900 tracking-tight leading-tight">{recommendation.name}</h2>
          </div>
          <div className="text-right shrink-0">
             <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">GÜÇ DENGESİ</div>
             <div className="text-xs font-bold text-slate-600">
                NKG: <span style={{ color: '#0377fc' }}>{nkg.toFixed(1)}</span>
             </div>
             <div className="text-xs font-bold text-slate-600">
                NRG: <span className="text-rose-600">{nrg.toFixed(1)}</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <DetailCard label="Diziliş" value={recommendation.details.lineup} color="text-blue-600" />
          <DetailCard label="Stil" value={recommendation.details.style} color="text-blue-600" />
          <div className="col-span-2">
            <DetailCard label="Mücadele" value={recommendation.details.combat} color="text-orange-600" isFullWidth />
          </div>
        </div>

        <div className="space-y-3">
          <SectionHeader icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/></svg>} label="Çizgi Taktikleri" />
          <div className="space-y-2">
            <LineInstruction label="Forvetler" value={recommendation.details.lineTactics.forwards} />
            <LineInstruction label="Orta Sahalar" value={recommendation.details.lineTactics.midfielders} />
            <LineInstruction label="Defanslar" value={recommendation.details.lineTactics.defenders} />
          </div>
        </div>

        <div className="space-y-3">
          <SectionHeader icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="12" x2="12" y1="18" y2="22"/></svg>} label="Sürgüler" />
          <div className="space-y-5 bg-slate-50/50 p-5 rounded-3xl border border-slate-100">
             <SliderDisplay label="Baskı" value={recommendation.details.sliders.pressing} color="bg-orange-500" />
             <SliderDisplay label="Stil" value={recommendation.details.sliders.style} color="bg-blue-500" />
             <SliderDisplay label="Tempo" value={recommendation.details.sliders.tempo} color="bg-blue-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <DetailCard label="Markaj" value={recommendation.details.marking} />
          <DetailCard label="Ofsayt Tuzağı" value={recommendation.details.offsideTrap} />
        </div>
      </div>
    </div>
  );
};

const SectionHeader = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <h3 className="font-bold text-slate-800 text-xs flex items-center gap-2 uppercase tracking-widest opacity-60">
    {icon}
    {label}
  </h3>
);

const DetailCard = ({ label, value, color = "text-slate-800", isFullWidth = false }: { label: string, value: string, color?: string, isFullWidth?: boolean }) => (
  <div className={`bg-slate-50/50 p-4 rounded-3xl border border-slate-100 ${isFullWidth ? 'flex justify-between items-center' : 'block'}`}>
    <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-widest mb-0.5">{label}</span>
    <span className={`font-bold ${isFullWidth ? 'text-lg' : 'text-xl'} ${color}`}>{value}</span>
  </div>
);

const LineInstruction = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center bg-slate-50 px-5 py-4 rounded-2xl border border-slate-100">
    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{label}</span>
    <span className="text-sm font-bold text-slate-800">{value}</span>
  </div>
);

const SliderDisplay = ({ label, value, color }: { label: string, value: number, color: string }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between text-[10px] font-extrabold text-slate-500 uppercase tracking-widest">
      <span>{label}</span>
      <span className="text-slate-900">{value}</span>
    </div>
    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-1000 ease-out`} 
        style={{ width: `${value}%` }} 
      />
    </div>
  </div>
);
