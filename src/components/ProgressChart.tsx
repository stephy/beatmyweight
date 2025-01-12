import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Participant, ProgressData } from '../types';

interface ProgressChartProps {
  participants: Participant[];
  dataKey: 'bmi' | 'bodyFat' | 'weight';
  title: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  participants,
  dataKey,
  title
}) => {
  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];

  const formatData = (): ProgressData[] => {
    if (participants[0].weeklyData.length === 0) return [];

    return participants[0].weeklyData.map((weekData) => {
      const data: ProgressData = {
        week: weekData.week,
        date: weekData.date
      };
      
      participants.forEach((participant, index) => {
        const participantWeekData = participant.weeklyData.find(
          (w) => w.week === weekData.week
        );
        if (participantWeekData) {
          data[participant.name] = participantWeekData[dataKey];
        }
      });
      
      return data;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formatData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" label={{ value: 'Week', position: 'bottom' }} />
            <YAxis />
            <Tooltip />
            <Legend />
            {participants.map((participant, index) => (
              <Line
                key={participant.id}
                type="monotone"
                dataKey={participant.name}
                stroke={colors[index]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;