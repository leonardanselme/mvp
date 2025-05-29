"use client";

import { MUSCLE_GROUPS } from "@/data/workout-mock";
import type { Exercise } from "@/types/workout";

interface ExerciseSearchProps {
  mode: "search" | "manual";
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredExercises: Exercise[];
  customExercise: { name: string; muscle_groups: string[] };
  setCustomExercise: (exercise: {
    name: string;
    muscle_groups: string[];
  }) => void;
  onAddExercise: (exercise: Exercise) => void;
  toggleMuscleGroup: (group: string) => void;
}

export function ExerciseSearch({
  mode,
  searchQuery,
  setSearchQuery,
  filteredExercises,
  customExercise,
  setCustomExercise,
  onAddExercise,
  toggleMuscleGroup,
}: ExerciseSearchProps) {
  if (mode === "search") {
    return (
      <div className="space-y-4">
        {/* Search input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Squat, Bench Press..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
          autoFocus
        />

        {/* Exercise list */}
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredExercises.map((exercise) => (
            <button
              key={exercise.id}
              onClick={() => onAddExercise(exercise)}
              className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="font-medium">{exercise.name}</div>
              <div className="text-sm text-gray-500">
                {exercise.muscle_groups.join(", ")}
              </div>
            </button>
          ))}
          {filteredExercises.length === 0 && searchQuery && (
            <div className="text-center text-gray-500 py-4">
              Aucun exercice trouvé
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Exercise name input */}
      <input
        type="text"
        value={customExercise.name}
        onChange={(e) =>
          setCustomExercise({ ...customExercise, name: e.target.value })
        }
        placeholder="Nom de l'exercice"
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
        autoFocus
      />

      {/* Muscle groups */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Groupes musculaires
        </label>
        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
          {MUSCLE_GROUPS.map((group) => (
            <button
              key={group}
              onClick={() => toggleMuscleGroup(group)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                customExercise.muscle_groups.includes(group)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
