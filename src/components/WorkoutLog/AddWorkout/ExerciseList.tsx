"use client";

import { ExerciseRow } from "./ExerciseRow";
import { Plus, Edit3 } from "lucide-react";
import type { WorkoutExercise, WorkoutSet } from "@/types/workout";

interface WorkoutInProgress {
  name: string;
  date: Date;
  exercises: WorkoutExercise[];
}

interface ExerciseListProps {
  workout: WorkoutInProgress;
  onShowExerciseModal: () => void;
  onSave: () => void;
  isValid: boolean;
  onBack: () => void;
  onUpdateSet: (
    exerciseIndex: number,
    setIndex: number,
    field: keyof WorkoutSet,
    value: number
  ) => void;
  onAddSet: (exerciseIndex: number) => void;
  onRemoveExercise: (exerciseIndex: number) => void;
}

export function ExerciseList({
  workout,
  onShowExerciseModal,
  onSave,
  isValid,
  onBack,
  onUpdateSet,
  onAddSet,
  onRemoveExercise,
}: ExerciseListProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">{workout.name}</h3>
            <p className="text-sm text-gray-500">
              {workout.date.toLocaleDateString("fr-FR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-700"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Exercise list */}
      <div className="flex-1 overflow-y-auto p-4">
        {workout.exercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ajouter votre premier exercice
            </h3>
            <p className="text-gray-500 mb-6">
              Commencez par ajouter un exercice à votre séance
            </p>
            <button
              onClick={onShowExerciseModal}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Ajouter un exercice
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {workout.exercises.map((exercise, exerciseIndex) => (
              <ExerciseRow
                key={`${exercise.exercise_id}-${exerciseIndex}`}
                exercise={exercise}
                exerciseIndex={exerciseIndex}
                onUpdateSet={onUpdateSet}
                onAddSet={onAddSet}
                onRemoveExercise={onRemoveExercise}
              />
            ))}

            {/* Add exercise button */}
            <button
              onClick={onShowExerciseModal}
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Ajouter un exercice
            </button>
          </div>
        )}
      </div>

      {/* Save button */}
      {workout.exercises.length > 0 && (
        <div className="p-4 border-t bg-white">
          <button
            onClick={onSave}
            disabled={!isValid}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Ajouter séance au carnet
          </button>
        </div>
      )}
    </div>
  );
}
