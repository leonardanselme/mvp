"use client";

import { Calendar, Dumbbell, TrendingUp, Plus } from "lucide-react";
import { MOCK_WORKOUTS } from "@/data/workout-mock";
import { Workout } from "@/types/workout";

interface CarnetOverviewProps {
  onAddWorkout: () => void;
}

export function CarnetOverview({ onAddWorkout }: CarnetOverviewProps) {
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

  // Trier les séances par date (plus récentes en premier)
  const recentWorkouts = [...MOCK_WORKOUTS]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

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

  const WorkoutCard = ({ workout }: { workout: Workout }) => (
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

      {/* Dernières séances */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Dernières séances
        </h2>

        {recentWorkouts.length === 0 ? (
          <div className="text-center py-8">
            <Dumbbell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Aucune séance enregistrée</p>
            <p className="text-sm text-gray-400">Commencez dès maintenant !</p>
          </div>
        ) : (
          <div>
            {recentWorkouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
