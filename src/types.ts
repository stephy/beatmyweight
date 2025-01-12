export interface Participant {
  id: string;
  name: string;
  initialWeight: number;
  initialBMI: number;
  initialBodyFat: number;
  weeklyData: WeeklyData[];
}

export interface WeeklyData {
  week: number;
  date: string;
  weight: number;
  bmi: number;
  bodyFat: number;
}

export interface ProgressData {
  week: number;
  date: string;
  [key: string]: number | string;
}