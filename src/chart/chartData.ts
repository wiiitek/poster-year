export interface MonthData {
  label: string;
  value: number;
  color: string;
}

export interface SeasonData {
  season: string;
  color: string;
  months: MonthData[];
}

export const chartData: SeasonData[] = [
  {
    season: 'Spring',
    color: '#90EE90',
    months: [
      { label: 'March', value: 31, color: '#98FB98' },
      { label: 'April', value: 30, color: '#90EE90' },
      { label: 'May', value: 31, color: '#8FBC8F' },
    ],
  },
  {
    season: 'Summer',
    color: '#FFD700',
    months: [
      { label: 'June', value: 30, color: '#FFEC8B' },
      { label: 'July', value: 31, color: '#FFD700' },
      { label: 'August', value: 31, color: '#FFA500' },
    ],
  },
  {
    season: 'Autumn',
    color: '#FF8C00',
    months: [
      { label: 'September', value: 30, color: '#FF7F50' },
      { label: 'October', value: 31, color: '#FF8C00' },
      { label: 'November', value: 30, color: '#D2691E' },
    ],
  },
  {
    season: 'Winter',
    color: '#87CEEB',
    months: [
      { label: 'December', value: 31, color: '#87CEEB' },
      { label: 'January', value: 31, color: '#4682B4' },
      { label: 'February', value: 28, color: '#6495ED' },
    ],
  },
];
