import React from 'react';
import { Trophy } from 'lucide-react';
import { Participant } from '../types';
import { calculateProgress } from '../data';

interface LeaderBoardProps {
  participants: Participant[];
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({ participants }) => {
  const getParticipantProgress = (participant: Participant) => {
    if (participant.weeklyData.length === 0) return 0;
    const latestData = participant.weeklyData[participant.weeklyData.length - 1];
    const bmiProgress = calculateProgress(latestData.bmi, participant.initialBMI);
    const fatProgress = calculateProgress(latestData.bodyFat, participant.initialBodyFat);
    return (bmiProgress + fatProgress) / 2;
  };

  const sortedParticipants = [...participants].sort(
    (a, b) => getParticipantProgress(b) - getParticipantProgress(a)
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Leaderboard</h2>
      <div className="space-y-4">
        {sortedParticipants.map((participant, index) => {
          const progress = getParticipantProgress(participant);
          return (
            <div
              key={participant.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                {index === 0 && (
                  <Trophy className="w-6 h-6 text-yellow-500" />
                )}
                {index === 1 && (
                  <Trophy className="w-6 h-6 text-gray-400" />
                )}
                {index === 2 && (
                  <Trophy className="w-6 h-6 text-amber-700" />
                )}
                <span className="font-semibold text-gray-700">
                  {participant.name}
                </span>
              </div>
              <div className="text-right">
                <span className="font-bold text-indigo-600">
                  {progress.toFixed(1)}%
                </span>
                <span className="text-gray-500 text-sm ml-1">progress</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderBoard;