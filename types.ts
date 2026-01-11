
export type Formation = 
  | '4-3-3A' | '4-3-3B' | '4-5-1' | '4-2-3-1' | '4-4-2A' | '4-4-2B' 
  | '3-2-5' | '3-2-3-2' | '3-3-4A' | '3-3-4B' | '3-4-3A' | '3-4-3B' 
  | '3-3-2-2' | '3-5-2' | '4-2-4A' | '4-2-4B' | '5-2-3A' | '5-2-3B' 
  | '5-3-2' | '5-3-2A' | '5-3-1-1' | '5-4-1A' | '5-4-1B' | '6-3-1' | '6-3-1A' | '6-3-1B';

export type PlayStyle = 
  | 'Uzun Top' 
  | 'Paslı Oyun' 
  | 'Kanatları Kullan' 
  | 'Kontra Atak' 
  | 'Kaleyi Görünce Vur';

export type RefereeAttitude = 
  | 'Yumuşak' 
  | 'Hoşgörülü' 
  | 'Ortalama' 
  | 'Katı' 
  | 'Gaddar';

export interface TacticForm {
  ownPower: string;
  opponentPower: string;
  opponentFormation: Formation;
  opponentStyle: PlayStyle;
  refereeAttitude: RefereeAttitude;
  isHome: boolean;
}

export interface RecommendedTactic {
  name: string;
  description: string;
  details: {
    lineup: string;
    style: string;
    combat: 'Dikkatli' | 'Normal' | 'Agresif' | 'Çok Agresif';
    lineTactics: {
      forwards: 'Geriye dön' | 'Orta sahayı destekle' | 'Sadece hücum';
      midfielders: 'Defansa yardım et' | 'Pozisyonu koru' | 'Forveti destekle';
      defenders: 'Geride kal' | 'Bekler ileri' | 'Orta sahayı destekle';
    };
    marking: 'Alan markajı' | 'Adam markajı';
    offsideTrap: 'Evet' | 'Hayır';
    sliders: {
      pressing: number;
      style: number;
      tempo: number;
    };
  };
}
