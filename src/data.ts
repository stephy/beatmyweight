import { addWeeks, format } from 'date-fns';
import { Participant } from './types';

const startDate = new Date('2024-01-12');
const endDate = new Date('2024-04-11');

export const participants: Participant[] = [
  {
    id: '1',
    name: 'Barry',
    initialWeight: 90.7,
    initialBMI: 28.5,
    initialBodyFat: 25,
    weeklyData: []
  },
  {
    id: '2',
    name: 'Stephani',
    initialWeight: 75.3,
    initialBMI: 27.2,
    initialBodyFat: 32,
    weeklyData: []
  },
  {
    id: '3',
    name: 'Michael',
    initialWeight: 95.2,
    initialBMI: 29.8,
    initialBodyFat: 28,
    weeklyData: []
  },
  {
    id: '4',
    name: 'Sandra',
    initialWeight: 82.1,
    initialBMI: 28.9,
    initialBodyFat: 35,
    weeklyData: []
  }
];

export const generateWeekDates = () => {
  const weeks = [];
  let currentDate = startDate;
  let weekNumber = 1;

  while (currentDate <= endDate) {
    weeks.push({
      week: weekNumber,
      date: format(currentDate, 'yyyy-MM-dd')
    });
    currentDate = addWeeks(currentDate, 1);
    weekNumber++;
  }

  return weeks;
};

export const calculateProgress = (current: number, initial: number): number => {
  return ((initial - current) / initial) * 100;
};