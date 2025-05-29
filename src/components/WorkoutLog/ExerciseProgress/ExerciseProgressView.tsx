"use client";

import { ExerciseChart } from "./ExerciseChart";
import { ExerciseHistory } from "./ExerciseHistory";

export function ExerciseProgressView() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Progression</h1>
      </div>

      {/* Nouveau contenu avec composants */}
      <div className="space-y-6">
        {/* Placeholder sélecteur d'exercices */}
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏋️</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Sélecteur d&apos;exercices à implémenter
          </h2>
          <p className="text-gray-600 mb-6">
            Choisissez un exercice pour voir sa progression
          </p>
        </div>

        {/* Composants graphiques */}
        <ExerciseChart />
        <ExerciseHistory />
      </div>
    </div>
  );
}
