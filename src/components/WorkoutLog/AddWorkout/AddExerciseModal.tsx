"use client";

import { X, Search, Edit3 } from "lucide-react";
import { ExerciseSearch } from "./ExerciseSearch";
import type { Exercise } from "@/types/workout";

interface AddExerciseModalProps {
  modalMode: "search" | "manual";
  setModalMode: (mode: "search" | "manual") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredExercises: Exercise[];
  customExercise: { name: string; muscle_groups: string[] };
  setCustomExercise: (exercise: {
    name: string;
    muscle_groups: string[];
  }) => void;
  onAddExercise: (exercise: Exercise) => void;
  onAddCustomExercise: () => void;
  onClose: () => void;
  toggleMuscleGroup: (group: string) => void;
}

export function AddExerciseModal({
  modalMode,
  setModalMode,
  searchQuery,
  setSearchQuery,
  filteredExercises,
  customExercise,
  setCustomExercise,
  onAddExercise,
  onAddCustomExercise,
  onClose,
  toggleMuscleGroup,
}: AddExerciseModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-4 z-50">
      <div className="bg-white rounded-t-lg sm:rounded-lg w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Ajouter un exercice</h3>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setModalMode("search")}
              className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                modalMode === "search"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <Search className="w-4 h-4 inline mr-2" />
              Chercher
            </button>
            <button
              onClick={() => setModalMode("manual")}
              className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${
                modalMode === "manual"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600"
              }`}
            >
              <Edit3 className="w-4 h-4 inline mr-2" />
              Manuel
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <ExerciseSearch
            mode={modalMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredExercises={filteredExercises}
            customExercise={customExercise}
            setCustomExercise={setCustomExercise}
            onAddExercise={onAddExercise}
            toggleMuscleGroup={toggleMuscleGroup}
          />
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={modalMode === "search" ? () => {} : onAddCustomExercise}
            disabled={modalMode === "manual" && !customExercise.name.trim()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {modalMode === "search"
              ? "Choisir un exercice ci-dessus"
              : "Ajouter l'exercice"}
          </button>
        </div>
      </div>
    </div>
  );
}
