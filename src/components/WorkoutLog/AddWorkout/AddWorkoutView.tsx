"use client";

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import { WorkoutForm } from "./WorkoutForm";
import { ExerciseList } from "./ExerciseList";
import { AddExerciseModal } from "./AddExerciseModal";
import { WorkoutCard } from "../LogView/WorkoutCard";
import { MOCK_EXERCISES, MOCK_WORKOUTS } from "@/data/workout-mock";
import {
  WorkoutExercise,
  WorkoutSet,
  Exercise,
  Workout,
} from "@/types/workout";

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function DeleteConfirmationModal({
  onConfirm,
  onCancel,
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4">Supprimer la séance</h3>
        <p className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer cette séance ? Cette action est
          irréversible.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

interface WorkoutInProgress {
  name: string;
  date: Date;
  exercises: WorkoutExercise[];
}

interface AddWorkoutViewProps {
  onWorkoutSaved?: () => void;
}

type StartMode = "favorite" | "scratch" | null;

export function AddWorkoutView({ onWorkoutSaved }: AddWorkoutViewProps) {
  const [workout, setWorkout] = useState<WorkoutInProgress>({
    name: "",
    date: new Date(),
    exercises: [],
  });

  const [startMode, setStartMode] = useState<StartMode>(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [modalMode, setModalMode] = useState<"search" | "manual">("search");
  const [searchQuery, setSearchQuery] = useState("");

  // Custom exercise state for manual mode
  const [customExercise, setCustomExercise] = useState({
    name: "",
    muscle_groups: [] as string[],
  });

  // States pour la gestion de la suppression
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState<string | null>(null);

  // Auto-generate workout name based on date
  useEffect(() => {
    if (!workout.name) {
      const dateStr = workout.date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
      });
      setWorkout((prev) => ({
        ...prev,
        name: `Ma séance du ${dateStr}`,
      }));
    }
  }, [workout.date, workout.name]);

  const addExercise = (exercise: Exercise) => {
    const newExercise: WorkoutExercise = {
      exercise_id: exercise.id,
      exercise_name: exercise.name,
      sets: [
        { set_number: 1, weight: 0, reps: 0 },
        { set_number: 2, weight: 0, reps: 0 },
        { set_number: 3, weight: 0, reps: 0 },
      ],
    };

    setWorkout((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }));
    setShowExerciseModal(false);
    setSearchQuery("");
  };

  const addCustomExercise = () => {
    if (!customExercise.name.trim()) return;

    const newExercise: WorkoutExercise = {
      exercise_id: `custom-${Date.now()}`,
      exercise_name: customExercise.name,
      sets: [
        { set_number: 1, weight: 0, reps: 0 },
        { set_number: 2, weight: 0, reps: 0 },
        { set_number: 3, weight: 0, reps: 0 },
      ],
    };

    setWorkout((prev) => ({
      ...prev,
      exercises: [...prev.exercises, newExercise],
    }));

    setCustomExercise({ name: "", muscle_groups: [] });
    setShowExerciseModal(false);
  };

  const updateSet = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof WorkoutSet,
    value: number
  ) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex, exIdx) => {
        if (exIdx === exerciseIndex) {
          return {
            ...ex,
            sets: ex.sets.map((set, setIdx) => {
              if (setIdx === setIndex) {
                return { ...set, [field]: value };
              }
              return set;
            }),
          };
        }
        return ex;
      }),
    }));
  };

  const addSet = (exerciseIndex: number) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.map((ex, exIdx) => {
        if (exIdx === exerciseIndex) {
          const newSetNumber = ex.sets.length + 1;
          return {
            ...ex,
            sets: [
              ...ex.sets,
              { set_number: newSetNumber, weight: 0, reps: 0 },
            ],
          };
        }
        return ex;
      }),
    }));
  };

  const removeExercise = (exerciseIndex: number) => {
    setWorkout((prev) => ({
      ...prev,
      exercises: prev.exercises.filter((_, idx) => idx !== exerciseIndex),
    }));
  };

  const filteredExercises = MOCK_EXERCISES.filter(
    (exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.muscle_groups.some((mg) =>
        mg.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const toggleMuscleGroup = (group: string) => {
    setCustomExercise((prev) => ({
      ...prev,
      muscle_groups: prev.muscle_groups.includes(group)
        ? prev.muscle_groups.filter((mg) => mg !== group)
        : [...prev.muscle_groups, group],
    }));
  };

  const handleDeleteWorkout = (workoutId: string) => {
    setWorkoutToDelete(workoutId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (workoutToDelete) {
      // Supprimer de MOCK_WORKOUTS
      const index = MOCK_WORKOUTS.findIndex((w) => w.id === workoutToDelete);
      if (index !== -1) {
        MOCK_WORKOUTS.splice(index, 1);
      }
    }
    setShowDeleteModal(false);
    setWorkoutToDelete(null);
  };

  const saveWorkout = () => {
    // Générer un ID unique
    const newWorkout: Workout = {
      id: `workout-${Date.now()}`,
      name: workout.name,
      date: workout.date,
      exercises: workout.exercises,
      is_favorite: false,
      created_at: new Date(),
    };

    // Ajouter à MOCK_WORKOUTS (au début du tableau)
    MOCK_WORKOUTS.unshift(newWorkout);

    // Message de confirmation
    alert("Séance sauvegardée avec succès !");

    // Retour automatique à la vue overview
    if (onWorkoutSaved) {
      onWorkoutSaved();
    }
  };

  const isWorkoutValid = () => {
    return (
      workout.exercises.length > 0 &&
      workout.exercises.some((ex) =>
        ex.sets.some((set) => set.weight > 0 && set.reps > 0)
      )
    );
  };

  // Rendu conditionnel selon startMode
  if (startMode === null) {
    return (
      <div className="h-full flex flex-col">
        <WorkoutForm
          workout={workout}
          onWorkoutChange={setWorkout}
          onStartMode={setStartMode}
        />

        {/* NOUVELLE SECTION : Liste des séances */}
        <div className="flex-1 overflow-y-auto p-4 border-t">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Mes séances ({MOCK_WORKOUTS.length})
          </h2>

          {MOCK_WORKOUTS.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucune séance enregistrée</p>
              <p className="text-sm text-gray-400">
                Créez votre première séance !
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {MOCK_WORKOUTS.map((workoutItem) => (
                <div key={workoutItem.id} className="relative group">
                  <WorkoutCard workout={workoutItem} />

                  {/* Bouton supprimer */}
                  <button
                    onClick={() => handleDeleteWorkout(workoutItem.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal suppression si nécessaire */}
        {showDeleteModal && (
          <DeleteConfirmationModal
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteModal(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <ExerciseList
        workout={workout}
        onShowExerciseModal={() => setShowExerciseModal(true)}
        onSave={saveWorkout}
        isValid={isWorkoutValid()}
        onBack={() => setStartMode(null)}
        onUpdateSet={updateSet}
        onAddSet={addSet}
        onRemoveExercise={removeExercise}
      />

      {showExerciseModal && (
        <AddExerciseModal
          modalMode={modalMode}
          setModalMode={setModalMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredExercises={filteredExercises}
          customExercise={customExercise}
          setCustomExercise={setCustomExercise}
          onAddExercise={addExercise}
          onAddCustomExercise={addCustomExercise}
          onClose={() => setShowExerciseModal(false)}
          toggleMuscleGroup={toggleMuscleGroup}
        />
      )}
    </div>
  );
}
