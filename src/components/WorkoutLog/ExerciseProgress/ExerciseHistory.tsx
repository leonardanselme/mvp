"use client";

interface ExerciseHistoryProps {
  exerciseName?: string;
}

export function ExerciseHistory({ exerciseName }: ExerciseHistoryProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Historique - {exerciseName || "Sélectionnez un exercice"}
      </h3>
      <div className="space-y-3">
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📋</div>
          <p className="text-gray-600 font-medium">
            Historique des performances
          </p>
          <p className="text-gray-500 text-sm">
            Détails de chaque séance passée
          </p>
        </div>
      </div>
    </div>
  );
}
