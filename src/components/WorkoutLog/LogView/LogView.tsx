"use client";

import { Calendar, Dumbbell, TrendingUp, Plus } from "lucide-react";
import { MOCK_WORKOUTS } from "@/data/workout-mock";

interface LogViewProps {
  onAddWorkout: () => void;
}

export function LogView({ onAddWorkout }: LogViewProps) {
  // Calculs des statistiques
  const totalWorkouts = MOCK_WORKOUTS.length;
  const currentWeek = new Date();
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(currentWeek.getDate() - 7);

  const workoutsThisWeek = MOCK_WORKOUTS.filter(
    (workout) => workout.date >= oneWeekAgo
  ).length;

  const currentMonth = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(currentMonth.getMonth() - 1);

  const workoutsThisMonth = MOCK_WORKOUTS.filter(
    (workout) => workout.date >= oneMonthAgo
  ).length;

  // Calcul du volume total (approximatif)
  const totalVolume = MOCK_WORKOUTS.reduce((total, workout) => {
    return (
      total +
      workout.exercises.reduce((exerciseTotal, exercise) => {
        return (
          exerciseTotal +
          exercise.sets.reduce((setTotal, set) => {
            return setTotal + set.weight * set.reps;
          }, 0)
        );
      }, 0)
    );
  }, 0);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Carnet d&apos;Entraînement
        </h1>
        <p className="text-gray-600">
          Suivez vos performances et votre progression
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Dumbbell className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-gray-600">Cette semaine</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{workoutsThisWeek}</p>
          <p className="text-xs text-gray-500">
            séance{workoutsThisWeek > 1 ? "s" : ""}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-green-600" />
            <span className="text-sm text-gray-600">Ce mois</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {workoutsThisMonth}
          </p>
          <p className="text-xs text-gray-500">
            séance{workoutsThisMonth > 1 ? "s" : ""}
          </p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm text-gray-600">Volume total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round(totalVolume / 1000)}k
          </p>
          <p className="text-xs text-gray-500">kg soulevés</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <Dumbbell className="w-5 h-5 text-orange-600" />
            <span className="text-sm text-gray-600">Total séances</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalWorkouts}</p>
          <p className="text-xs text-gray-500">
            enregistrée{totalWorkouts > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Bouton d'ajout rapide */}
      <button
        onClick={onAddWorkout}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-6 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Nouvelle séance
      </button>
    </div>
  );
}
