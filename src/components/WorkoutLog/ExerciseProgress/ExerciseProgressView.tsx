"use client";

import { useState, useMemo } from "react";
import { ExerciseChart } from "./ExerciseChart";
import { ExerciseHistory } from "./ExerciseHistory";
import { MOCK_WORKOUTS } from "@/data/workout-mock";
import {
  getUniqueExercises,
  getExerciseProgressData,
  getExerciseHistory,
} from "@/utils/workout-progression";

export function ExerciseProgressView() {
  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Récupérer la liste des exercices uniques
  const availableExercises = useMemo(() => {
    return getUniqueExercises(MOCK_WORKOUTS);
  }, []);

  // Calculer les données de progression pour l'exercice sélectionné
  const progressData = useMemo(() => {
    if (!selectedExercise) return [];
    return getExerciseProgressData(MOCK_WORKOUTS, selectedExercise);
  }, [selectedExercise]);

  // Récupérer l'historique pour l'exercice sélectionné
  const historyData = useMemo(() => {
    if (!selectedExercise) return [];
    return getExerciseHistory(MOCK_WORKOUTS, selectedExercise);
  }, [selectedExercise]);

  const handleExerciseSelect = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
    setIsDropdownOpen(false);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Progression</h1>
        <p className="text-gray-600 text-sm mt-1">
          Analysez l&apos;évolution de vos performances par exercice
        </p>
      </div>

      {/* Sélecteur d'exercices */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Sélectionner un exercice
        </h2>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <span
              className={selectedExercise ? "text-gray-900" : "text-gray-500"}
            >
              {selectedExercise || "Choisir un exercice..."}
            </span>
            <svg
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
              {availableExercises.length > 0 ? (
                availableExercises.map((exercise) => (
                  <button
                    key={exercise}
                    onClick={() => handleExerciseSelect(exercise)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span className="text-gray-900">{exercise}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-center">
                  Aucun exercice disponible
                </div>
              )}
            </div>
          )}
        </div>

        {selectedExercise && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <div className="text-blue-600 mr-3">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-blue-900 font-medium">
                Exercice sélectionné : {selectedExercise}
              </span>
            </div>
            <p className="text-blue-700 text-sm mt-1">
              {progressData.length} séance{progressData.length > 1 ? "s" : ""}{" "}
              trouvée{progressData.length > 1 ? "s" : ""}
            </p>
          </div>
        )}
      </div>

      {/* Composants graphiques */}
      <div className="space-y-6">
        <ExerciseChart
          exerciseName={selectedExercise}
          progressData={progressData}
        />
        <ExerciseHistory
          exerciseName={selectedExercise}
          historyData={historyData}
        />
      </div>
    </div>
  );
}
