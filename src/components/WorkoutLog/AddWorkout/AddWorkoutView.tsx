"use client";

import { useState, useEffect } from "react";
import { WorkoutForm } from "./WorkoutForm";
import { ExerciseList } from "./ExerciseList";
import { AddExerciseModal } from "./AddExerciseModal";
import { MOCK_EXERCISES } from "@/data/workout-mock";
import { WorkoutExercise, WorkoutSet, Exercise } from "@/types/workout";

interface WorkoutInProgress {
  name: string;
  date: Date;
  exercises: WorkoutExercise[];
}

type StartMode = "favorite" | "scratch" | null;

export function AddWorkoutView() {
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

  const saveWorkout = () => {
    // TODO: Implement save logic
    console.log("Saving workout:", workout);
    // Show favorite popup if it's a new combination
    alert("Séance sauvegardée ! (Fonctionnalité à implémenter)");
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
      <WorkoutForm
        workout={workout}
        onWorkoutChange={setWorkout}
        onStartMode={setStartMode}
      />
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
