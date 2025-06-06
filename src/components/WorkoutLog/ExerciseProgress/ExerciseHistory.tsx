"use client";

import { ExerciseHistoryEntry, formatDate } from "@/utils/workout-progression";

interface ExerciseHistoryProps {
  exerciseName?: string;
  historyData: ExerciseHistoryEntry[];
}

export function ExerciseHistory({
  exerciseName,
  historyData,
}: ExerciseHistoryProps) {
  if (!exerciseName) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Historique - Sélectionnez un exercice
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📋</div>
          <p className="text-gray-600 font-medium">
            Historique des performances
          </p>
          <p className="text-gray-500 text-sm">
            Choisissez un exercice pour voir l&apos;historique détaillé
          </p>
        </div>
      </div>
    );
  }

  if (historyData.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Historique - {exerciseName}
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📅</div>
          <p className="text-gray-600 font-medium">
            Aucun historique disponible
          </p>
          <p className="text-gray-500 text-sm">
            Pas de données pour cet exercice
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Historique - {exerciseName}
      </h3>

      <div className="space-y-4">
        {historyData.map((entry, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            {/* En-tête de la séance */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-gray-900">
                  {entry.workoutName}
                </h4>
                <p className="text-sm text-gray-600">
                  {formatDate(entry.date)}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Volume total</div>
                <div className="font-semibold text-lg text-blue-600">
                  {entry.totalVolume}
                </div>
              </div>
            </div>

            {/* Résumé des performances */}
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Poids max</div>
                <div className="font-semibold text-gray-900">
                  {entry.maxWeight}kg
                </div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="text-sm text-gray-500">Reps max</div>
                <div className="font-semibold text-gray-900">
                  {entry.maxReps}
                </div>
              </div>
            </div>

            {/* Détail des séries */}
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-gray-700">
                Détail des séries :
              </h5>
              <div className="grid gap-2">
                {entry.sets.map((set, setIndex) => (
                  <div
                    key={setIndex}
                    className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm"
                  >
                    <span className="font-medium">Série {set.set_number}</span>
                    <div className="flex gap-4">
                      <span>
                        {set.weight}kg × {set.reps} reps
                      </span>
                      {set.rpe && (
                        <span className="text-orange-600 font-medium">
                          RPE {set.rpe}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Statistiques globales */}
      {historyData.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Statistiques globales
          </h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {historyData.length}
              </div>
              <div className="text-xs text-gray-500">Séances totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {Math.max(...historyData.map((h) => h.maxWeight))}kg
              </div>
              <div className="text-xs text-gray-500">Record poids</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">
                {Math.max(...historyData.map((h) => h.totalVolume))}
              </div>
              <div className="text-xs text-gray-500">Record volume</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
