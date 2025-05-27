"use client";

import { useState } from "react";
import { Plus, BarChart3, BookOpen } from "lucide-react";
import { CarnetOverview } from "@/components/Carnet/CarnetOverview";
import { AddWorkout } from "@/components/Carnet/AddWorkout";
import { ProgressView } from "@/components/Carnet/ProgressView";

type CarnetView = "overview" | "add" | "progress";

export function Carnet() {
  const [currentView, setCurrentView] = useState<CarnetView>("overview");

  const renderView = () => {
    switch (currentView) {
      case "overview":
        return <CarnetOverview onAddWorkout={() => setCurrentView("add")} />;
      case "add":
        return <AddWorkout />;
      case "progress":
        return <ProgressView />;
      default:
        return <CarnetOverview onAddWorkout={() => setCurrentView("add")} />;
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
