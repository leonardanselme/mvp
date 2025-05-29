"use client";

import { Trash2, Plus } from "lucide-react";
import { MOCK_EXERCISES } from "@/data/workout-mock";
import type { WorkoutExercise, WorkoutSet } from "@/types/workout";

interface ExerciseRowProps {
  exercise: WorkoutExercise;
  exerciseIndex: number;
  onUpdateSet: (
    exerciseIndex: number,
    setIndex: number,
    field: keyof WorkoutSet,
    value: number
  ) => void;
  onAddSet: (exerciseIndex: number) => void;
  onRemoveExercise: (exerciseIndex: number) => void;
}

export function ExerciseRow({
  exercise,
  exerciseIndex,
  onUpdateSet,
  onAddSet,
  onRemoveExercise,
}: ExerciseRowProps) {
  const exerciseData = MOCK_EXERCISES.find(
    (ex) => ex.id === exercise.exercise_id
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* Exercise header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-medium text-gray-900">
            {exercise.exercise_name}
          </h4>
          {exerciseData && (
            <div className="flex flex-wrap gap-1 mt-1">
              {exerciseData.muscle_groups.map((group) => (
                <span
                  key={group}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  {group}
                </span>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={() => onRemoveExercise(exerciseIndex)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Sets table */}
      <div className="space-y-2">
        {/* Header */}
        <div className="grid grid-cols-4 gap-2 text-xs font-medium text-gray-500 px-2">
          <div>Série</div>
          <div>Poids (kg)</div>
          <div>Reps</div>
          <div>RPE</div>
        </div>

        {/* Sets */}
        {exercise.sets.map((set, setIndex) => (
          <div key={setIndex} className="grid grid-cols-4 gap-2">
            <div className="flex items-center justify-center bg-gray-50 rounded px-2 py-2 text-sm font-medium">
              {set.set_number}
            </div>
            <input
              type="number"
              value={set.weight || ""}
              onChange={(e) =>
                onUpdateSet(
                  exerciseIndex,
                  setIndex,
                  "weight",
                  Number(e.target.value)
                )
              }
              className="border border-gray-300 rounded px-2 py-2 text-sm text-center"
              placeholder="0"
              min="0"
              step="0.5"
            />
            <input
              type="number"
              value={set.reps || ""}
              onChange={(e) =>
                onUpdateSet(
                  exerciseIndex,
                  setIndex,
                  "reps",
                  Number(e.target.value)
                )
              }
              className="border border-gray-300 rounded px-2 py-2 text-sm text-center"
              placeholder="0"
              min="0"
            />
            <input
              type="number"
              value={set.rpe || ""}
              onChange={(e) =>
                onUpdateSet(
                  exerciseIndex,
                  setIndex,
                  "rpe",
                  Number(e.target.value)
                )
              }
              className="border border-gray-300 rounded px-2 py-2 text-sm text-center"
              placeholder="-"
              min="1"
              max="10"
            />
          </div>
        ))}

        {/* Add set button */}
        <button
          onClick={() => onAddSet(exerciseIndex)}
          className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium py-2 flex items-center justify-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Ajouter une série
        </button>
      </div>
    </div>
  );
}
