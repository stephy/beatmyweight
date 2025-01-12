import React, { useState } from 'react';
import { Scale, Info } from 'lucide-react';
import { participants as initialParticipants, generateWeekDates } from './data';
import LeaderBoard from './components/LeaderBoard';
import ProgressChart from './components/ProgressChart';
import WeeklyCheckIn from './components/WeeklyCheckIn';
import { Participant } from './types';

function App() {
  const [participants, setParticipants] = useState<Participant[]>(initialParticipants);
  const weeks = generateWeekDates();
  const currentWeek = Math.min(
    weeks.length,
    Math.ceil(
      (new Date().getTime() - new Date('2024-01-12').getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    )
  );

  const handleCheckIn = (
    participantId: string,
    weight: number,
    bmi: number,
    bodyFat: number
  ) => {
    setParticipants((prev) =>
      prev.map((participant) => {
        if (participant.id === participantId) {
          const weeklyData = [...participant.weeklyData];
          const weekIndex = weeklyData.findIndex((data) => data.week === currentWeek);
          
          if (weekIndex !== -1) {
            weeklyData[weekIndex] = {
              week: currentWeek,
              date: weeks[currentWeek - 1].date,
              weight,
              bmi,
              bodyFat
            };
          } else {
            weeklyData.push({
              week: currentWeek,
              date: weeks[currentWeek - 1].date,
              weight,
              bmi,
              bodyFat
            });
          }
          
          weeklyData.sort((a, b) => a.week - b.week);
          
          return {
            ...participant,
            weeklyData
          };
        }
        return participant;
      })
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3">
            <Scale className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Weight Loss Challenge 2024</h1>
          </div>
          <p className="mt-2 text-indigo-100">
            January 12 - April 11 • 3 Months • 4 Participants
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-800">Challenge Rules</h2>
          </div>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Entry & Prizes</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Entry fee: $1,000 per participant</li>
                <li>Prize distribution:
                  <ul className="list-circle list-inside ml-6 space-y-1">
                    <li>1st Place: $3,000</li>
                    <li>2nd Place: $1,000</li>
                    <li>3rd & 4th Place: No prize</li>
                  </ul>
                </li>
                <li>Total prize pool: $4,000</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Duration & Check-ins</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Challenge runs for 3 months (January 12 - April 11, 2024)</li>
                <li>Weekly check-ins required for weight, BMI, and body fat percentage</li>
                <li>Measurements should be taken consistently, preferably in the morning</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Progress Tracking</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Progress is tracked through three key metrics:
                  <ul className="list-circle list-inside ml-6 space-y-1">
                    <li>Weight (in kilograms)</li>
                    <li>BMI (Body Mass Index)</li>
                    <li>Body Fat Percentage</li>
                  </ul>
                </li>
                <li>All measurements must be recorded in the weekly check-in form</li>
                <li>Previous weeks' data can be updated if needed</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Winner Selection</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Winner is determined by overall progress percentage</li>
                <li>Progress calculation:
                  <ul className="list-circle list-inside ml-6 space-y-1">
                    <li>50% weight from BMI improvement</li>
                    <li>50% weight from Body Fat percentage improvement</li>
                    <li>Formula: (Initial - Current) / Initial × 100</li>
                  </ul>
                </li>
                <li>Final measurements must be completed by April 11, 2024</li>
                <li>Participant with the highest overall progress wins the challenge</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-gray-800 mb-2">Guidelines</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Use safe and healthy methods for weight loss</li>
                <li>Consult with healthcare professionals as needed</li>
                <li>Support and encourage fellow participants</li>
                <li>Be honest and accurate with all measurements</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <ProgressChart
                participants={participants}
                dataKey="weight"
                title="Weight Progress"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ProgressChart
                  participants={participants}
                  dataKey="bmi"
                  title="BMI Progress"
                />
                <ProgressChart
                  participants={participants}
                  dataKey="bodyFat"
                  title="Body Fat % Progress"
                />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <LeaderBoard participants={participants} />
            <WeeklyCheckIn
              participants={participants}
              onSubmit={handleCheckIn}
              currentWeek={currentWeek}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;