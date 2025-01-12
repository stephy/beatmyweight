import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Participant } from '../types';
import { generateWeekDates } from '../data';

interface WeeklyCheckInProps {
  participants: Participant[];
  onSubmit: (participantId: string, weight: number, bmi: number, bodyFat: number) => void;
  currentWeek: number;
}

const WeeklyCheckIn: React.FC<WeeklyCheckInProps> = ({
  participants,
  onSubmit,
  currentWeek
}) => {
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [selectedWeek, setSelectedWeek] = useState(currentWeek.toString());
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState('');
  const [bodyFat, setBodyFat] = useState('');

  const weeks = generateWeekDates();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedParticipant && weight && bmi && bodyFat) {
      onSubmit(
        selectedParticipant,
        parseFloat(weight),
        parseFloat(bmi),
        parseFloat(bodyFat)
      );
      setSelectedParticipant('');
      setSelectedWeek(currentWeek.toString());
      setWeight('');
      setBMI('');
      setBodyFat('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Weekly Check-in</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Week
          </label>
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            {weeks.map((week) => (
              <option key={week.week} value={week.week}>
                Week {week.week} - {format(parseISO(week.date), 'MMMM d, yyyy')}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Participant
          </label>
          <select
            value={selectedParticipant}
            onChange={(e) => setSelectedParticipant(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select participant</option>
            {participants.map((participant) => (
              <option key={participant.id} value={participant.id}>
                {participant.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              BMI
            </label>
            <input
              type="number"
              step="0.1"
              value={bmi}
              onChange={(e) => setBMI(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Body Fat %
            </label>
            <input
              type="number"
              step="0.1"
              value={bodyFat}
              onChange={(e) => setBodyFat(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Submit Check-in
        </button>
      </form>
    </div>
  );
};

export default WeeklyCheckIn;