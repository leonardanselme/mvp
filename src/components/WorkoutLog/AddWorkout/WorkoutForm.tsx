"use client";

import { useState } from "react";
import { Calendar, X, Plus } from "lucide-react";
import { FAVORITE_WORKOUT_TEMPLATES } from "@/data/workout-mock";

interface WorkoutInProgress {
  name: string;
  date: Date;
  exercises: any[];
}

interface WorkoutFormProps {
  workout: WorkoutInProgress;
  onWorkoutChange: (workout: WorkoutInProgress) => void;
  onStartMode: (mode: "favorite" | "scratch") => void;
}

export function WorkoutForm({
  workout,
  onWorkoutChange,
  onStartMode,
}: WorkoutFormProps) {
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // Format date for input
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onWorkoutChange({
      ...workout,
      date: new Date(e.target.value),
    });
  };

  const handleStartWithTemplate = () => {
    setShowTemplateModal(true);
  };

  const selectTemplate = (templateId: string) => {
    const template = FAVORITE_WORKOUT_TEMPLATES.find(
      (t) => t.id === templateId
    );
    if (template) {
      onWorkoutChange({
        ...workout,
        name: `${template.name} - ${workout.date.toLocaleDateString("fr-FR")}`,
        exercises: template.exercises.map((ex) => ({
          ...ex,
          sets: ex.sets.map((set) => ({ ...set })), // Deep copy
        })),
      });
      onStartMode("favorite");
    }
    setShowTemplateModal(false);
  };

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
            onWorkoutChange({ ...workout, name: e.target.value })
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
          onClick={() => onStartMode("scratch")}
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
