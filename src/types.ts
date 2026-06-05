export interface FiveElements {
  wood: number;
  fire: number;
  earth: number;
  metal: number;
  water: number;
}

export interface BeautyIngredient {
  name: string;
  description: string;
  tag: string;
}

export interface LifestyleTip {
  category: string;
  label: string;
  recommendation: string;
}

export interface OrganInfo {
  title: string;
  status: string;
  description: string;
}

export interface OrgansState {
  heart: OrganInfo;
  stomach: OrganInfo;
  lung: OrganInfo;
  liver: OrganInfo;
  kidney: OrganInfo;
  [key: string]: OrganInfo;
}

export interface CoachingItem {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface AnalysisResult {
  wellnessScore: number;
  constitution: string;
  constitutionSanskrit: string;
  fiveElements: FiveElements;
  summary: string;
  beautyIngredients: BeautyIngredient[];
  lifestyle: LifestyleTip[];
  organsState: OrgansState;
  criticalOrgan: string;
  criticalTitle: string;
  criticalDesc: string;
  heallingFrequency: string;
  healingType: string;
  dailyCoaching: CoachingItem[];
}
