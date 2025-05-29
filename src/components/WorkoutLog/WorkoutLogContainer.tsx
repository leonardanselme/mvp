"use client";

import { useState } from "react";
import { Plus, BarChart3, BookOpen } from "lucide-react";
import { LogView } from "./LogView/LogView";
import { AddWorkoutView } from "./AddWorkout/AddWorkoutView";
import { ExerciseProgressView } from "./ExerciseProgress/ExerciseProgressView";

type CarnetView = "overview" | "add" | "progress";

export function WorkoutLogContainer() {
  const [currentView, setCurrentView] = useState<CarnetView>("overview");

  const renderView = () => {
    switch (currentView) {
      case "overview":
        return <LogView onAddWorkout={() => setCurrentView("add")} />;
      case "add":
        return <AddWorkoutView />;
      case "progress":
        return <ExerciseProgressView />;
      default:
        return <LogView onAddWorkout={() => setCurrentView("add")} />;
    }
  };

  // Navigation en haut du composant
  const NavigationBar = () => (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex justify-center items-center gap-1">
        <button
          onClick={() => setCurrentView("overview")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentView === "overview"
              ? "text-blue-600 bg-blue-50"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Carnet</span>
        </button>

        <button
          onClick={() => setCurrentView("add")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentView === "add"
              ? "text-blue-600 bg-blue-50"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter</span>
        </button>

        <button
          onClick={() => setCurrentView("progress")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            currentView === "progress"
              ? "text-blue-600 bg-blue-50"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Progression</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Navigation en haut */}
      <NavigationBar />

      {/* Contenu principal */}
      <div className="flex-1 overflow-y-auto">{renderView()}</div>
    </div>
  );
}
