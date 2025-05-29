"use client";

interface ExerciseChartProps {
  exerciseName?: string;
}

export function ExerciseChart({ exerciseName }: ExerciseChartProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Progression - {exerciseName || "Sélectionnez un exercice"}
      </h3>
      <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📈</div>
          <p className="text-gray-600 font-medium">Graphique de progression</p>
          <p className="text-gray-500 text-sm">
            Évolution du poids et des répétitions
          </p>
        </div>
      </div>
    </div>
  );
}
