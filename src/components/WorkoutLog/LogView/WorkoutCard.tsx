"use client";

import { Calendar } from "lucide-react";
import { Workout } from "@/types/workout";

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const formatDate = (date: Date) => {
    const today = new Date();
    const diffTime = today.getTime() - date.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;

    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-3">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">
            {workout.name}
          </h3>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(workout.date)}
          </p>
        </div>
        {workout.is_favorite && (
          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium">
            Favori
          </span>
        )}
      </div>

      <div className="space-y-2">
        {workout.exercises.slice(0, 3).map((exercise, index) => (
          <div key={index} className="text-sm text-gray-600">
            <span className="font-medium">{exercise.exercise_name}</span>
            <span className="text-gray-400 ml-2">
              {exercise.sets.length} série{exercise.sets.length > 1 ? "s" : ""}
            </span>
          </div>
        ))}
        {workout.exercises.length > 3 && (
          <p className="text-xs text-gray-400">
            +{workout.exercises.length - 3} exercice
            {workout.exercises.length - 3 > 1 ? "s" : ""} de plus
          </p>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            {workout.exercises.length} exercice
            {workout.exercises.length > 1 ? "s" : ""}
          </span>
          <span className="text-gray-500">
            {workout.exercises.reduce((total, ex) => total + ex.sets.length, 0)}{" "}
            séries
          </span>
        </div>
      </div>
    </div>
  );
}
