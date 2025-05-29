"use client";

import { useState, useEffect } from "react";
import { Plus, X, Trash2, Calendar, Search, Edit3 } from "lucide-react";
import {
  MOCK_EXERCISES,
  FAVORITE_WORKOUT_TEMPLATES,
  MUSCLE_GROUPS,
} from "@/data/workout-mock";
import { WorkoutExercise, WorkoutSet, Exercise } from "@/types/workout";

interface WorkoutInProgress {
  name: string;
  date: Date;
  exercises: WorkoutExercise[];
}

type StartMode = "favorite" | "scratch" | null;

export function AddWorkout() {
  const [workout, setWorkout] = useState<WorkoutInProgress>({
    name: "",
    date: new Date(),
    exercises: [],
  });

  const [startMode, setStartMode] = useState<StartMode>(null);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [modalMode, setModalMode] = useState<"search" | "manual">("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [showTemplateModal, setShowTemplateModal] = useState(false);

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

  // Format date for input
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWorkout((prev) => ({
      ...prev,
      date: new Date(e.target.value),
    }));
  };

  const handleStartWithTemplate = () => {
    setShowTemplateModal(true);
  };

  const selectTemplate = (templateId: string) => {
    const template = FAVORITE_WORKOUT_TEMPLATES.find(
      (t) => t.id === templateId
    );
    if (template) {
      setWorkout((prev) => ({
        ...prev,
        name: `${template.name} - ${prev.date.toLocaleDateString("fr-FR")}`,
        exercises: template.exercises.map((ex) => ({
          ...ex,
          sets: ex.sets.map((set) => ({ ...set })), // Deep copy
        })),
      }));
      setStartMode("favorite");
    }
    setShowTemplateModal(false);
  };

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

  // Initial screen - choose start mode
  if (startMode === null) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Nouvelle séance</h2>

          {/* Date picker */}
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              value={formatDateForInput(workout.date)}
              onChange={handleDateChange}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Workout name */}
          <input
            type="text"
            value={workout.name}
            onChange={(e) =>
              setWorkout((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder={`Ma séance du ${workout.date.toLocaleDateString("fr-FR")}`}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg font-medium"
          />
        </div>

        {/* Start mode buttons */}
        <div className="space-y-3">
          <button
            onClick={handleStartWithTemplate}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-3"
          >
            <span>🏆</span>
            Utiliser une séance favorite
          </button>

          <button
            onClick={() => setStartMode("scratch")}
            className="w-full bg-gray-100 text-gray-900 py-4 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-3"
          >
            <Plus className="w-5 h-5" />
            Partir de zéro
          </button>
        </div>

        {/* Template selection modal */}
        {showTemplateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  Choisir une séance favorite
                </h3>
                <button onClick={() => setShowTemplateModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {FAVORITE_WORKOUT_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => selectTemplate(template.id)}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-gray-500">
                      {template.exercises.length} exercices
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main workout editing interface
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
            onClick={() => setStartMode(null)}
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
              onClick={() => setShowExerciseModal(true)}
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
                onUpdateSet={updateSet}
                onAddSet={addSet}
                onRemoveExercise={removeExercise}
              />
            ))}

            {/* Add exercise button */}
            <button
              onClick={() => setShowExerciseModal(true)}
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
            onClick={saveWorkout}
            disabled={!isWorkoutValid()}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Ajouter séance au carnet
          </button>
        </div>
      )}

      {/* Exercise selection modal */}
      {showExerciseModal && (
        <ExerciseModal
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

// Composant ExerciseRow
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

function ExerciseRow({
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

// Composant ExerciseModal
interface ExerciseModalProps {
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

function ExerciseModal({
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
}: ExerciseModalProps) {
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
          {modalMode === "search" ? (
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
          ) : (
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
          )}
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
