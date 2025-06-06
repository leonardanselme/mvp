"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ExerciseProgressData,
  formatDateShort,
} from "@/utils/workout-progression";

interface ExerciseChartProps {
  exerciseName?: string;
  progressData: ExerciseProgressData[];
}

export function ExerciseChart({
  exerciseName,
  progressData,
}: ExerciseChartProps) {
  if (!exerciseName) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Progression - Sélectionnez un exercice
        </h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📈</div>
            <p className="text-gray-600 font-medium">
              Graphique de progression
            </p>
            <p className="text-gray-500 text-sm">
              Choisissez un exercice pour voir son évolution
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (progressData.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Progression - {exerciseName}
        </h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-600 font-medium">
              Aucune donnée disponible
            </p>
            <p className="text-gray-500 text-sm">
              Pas d&apos;historique pour cet exercice
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Formater les données pour Recharts
  const chartData = progressData.map((data) => ({
    date: formatDateShort(data.date),
    fullDate: data.date.toLocaleDateString("fr-FR"),
    weight: data.maxWeight,
    volume: data.volume,
    reps: data.maxReps,
  }));

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Progression - {exerciseName}
      </h3>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">
            {chartData[chartData.length - 1]?.weight || 0}kg
          </div>
          <div className="text-xs text-blue-600">Poids max actuel</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {chartData[chartData.length - 1]?.volume || 0}
          </div>
          <div className="text-xs text-green-600">Volume total</div>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">
            {chartData.length}
          </div>
          <div className="text-xs text-purple-600">Séances</div>
        </div>
      </div>

      {/* Graphique */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={12} />
            <YAxis yAxisId="weight" orientation="left" fontSize={12} />
            <YAxis yAxisId="volume" orientation="right" fontSize={12} />
            <Tooltip
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return `Date: ${payload[0].payload.fullDate}`;
                }
                return label;
              }}
              formatter={(value, name) => {
                if (name === "weight") return [value + "kg", "Poids max"];
                if (name === "volume") return [value, "Volume total"];
                if (name === "reps") return [value, "Reps max"];
                return [value, name];
              }}
            />
            <Legend />
            <Line
              yAxisId="weight"
              type="monotone"
              dataKey="weight"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
              name="Poids max (kg)"
            />
            <Line
              yAxisId="volume"
              type="monotone"
              dataKey="volume"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
              name="Volume total"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
