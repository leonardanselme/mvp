"use client";

import { useState, useEffect, useCallback } from "react";
// import { useRouter } from 'next/navigation'; // <- Supprimer l'import
// Utiliser un chemin relatif pour tester
import { PerformanceChart } from "./PerformanceChart";
import {
  addWorkoutSupabaseAction,
  getWorkoutsSupabaseAction,
} from "@/app/actions/workout"; // Adapter le chemin si nécessaire

const EXERCISES = ["Curl Biceps", "Overhead Press"]; // Liste d'exercices

type PerformanceData = {
  date: string;
  weight: number;
};

// Suppression de PerformanceDataByExercise car on fetch par exercice
// type PerformanceDataByExercise = {
//   [key: string]: PerformanceData[];
// };

export function Carnet() {
  // const router = useRouter(); // <- Supprimer l'initialisation
  // États pour le suivi performance
  const [perfDate, setPerfDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [weight, setWeight] = useState<string>("");
  const [selectedExercise, setSelectedExercise] = useState<string>(
    EXERCISES[0]
  );
  // Remplacement de l'état initial hardcodé par un tableau vide pour les données fetchées
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  // Ajout des états de chargement et d'erreur
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // -> Extraction de la logique de fetch dans une fonction useCallback <-
  const loadWorkouts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    console.log(`[loadWorkouts] Fetching data for ${selectedExercise}...`);
    const result = await getWorkoutsSupabaseAction(selectedExercise);
    console.log(`[loadWorkouts] Fetch Result for ${selectedExercise}:`, result);
    if (result.error && result.data.length === 0) {
      setError(result.error);
      setPerformanceData([]);
    } else {
      setPerformanceData(result.data);
    }
    setIsLoading(false);
  }, [selectedExercise]); // <- Dépendance de useCallback

  // useEffect appelle maintenant loadWorkouts
  useEffect(() => {
    loadWorkouts();
  }, [loadWorkouts]); // <- La dépendance est la fonction elle-même

  // Mise à jour de la fonction pour appeler l'action serveur
  const handleAddPerformance = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null); // Réinitialiser l'erreur du formulaire
    if (!perfDate || !weight || !selectedExercise) {
      setFormError("Veuillez remplir tous les champs.");
      return;
    }

    // Préparer les données pour l'action serveur
    const formData = {
      exercise_name: selectedExercise,
      date: perfDate,
      weight: weight, // L'action serveur s'occupe du parseFloat
    };

    // Appel de l'action serveur pour ajouter la performance
    const result = await addWorkoutSupabaseAction(formData);

    if (result.error) {
      // Afficher l'erreur retournée par l'action serveur
      setFormError(result.error);
    } else {
      setWeight("");
      console.log("handleAddPerformance success, calling loadWorkouts()...");
      loadWorkouts();
      // router.refresh(); // Commenté ou supprimé
    }
  };

  // Les données pour le graphique sont maintenant directement dans performanceData
  // const chartData = performanceData[selectedExercise] || [];

  console.log(
    `[Render] Data passed to chart for ${selectedExercise}:`,
    performanceData
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Sélecteur d'exercice */}
      <div className="mb-4">
        <label
          htmlFor="exercise-select"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Choisir l&apos;exercice :
        </label>
        <select
          id="exercise-select"
          value={selectedExercise}
          onChange={(e) => setSelectedExercise(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
          disabled={isLoading} // Désactiver pendant le chargement
        >
          {EXERCISES.map((exercise) => (
            <option key={exercise} value={exercise}>
              {exercise}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Suivi Performance - {selectedExercise}
      </h2>

      {/* Affichage Erreur de chargement */}
      {error && <p className="text-red-500 mb-4">Erreur: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Partie Formulaire Performance */}
        <div>
          <form onSubmit={handleAddPerformance} className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">
              Ajouter une nouvelle performance
            </h3>
            {/* Affichage Erreur du formulaire */}
            {formError && (
              <p className="text-red-500 text-sm mt-2">{formError}</p>
            )}
            <div>
              <label
                htmlFor="perfDate"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="perfDate"
                value={perfDate}
                onChange={(e) => setPerfDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700"
              >
                Poids soulevé (kg)
              </label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 15"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
                step="0.1" // Garder step pour l'UI
              />
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              // Optionnel: Désactiver le bouton pendant l'envoi (nécessite état 'isSubmitting')
              // disabled={isLoading}
            >
              Ajouter pour {selectedExercise}
            </button>
          </form>
        </div>

        {/* Partie Graphique Performance */}
        <div>
          {isLoading ? (
            <p className="text-gray-500">Chargement des données...</p> // Message de chargement
          ) : (
            // Passer les données fetchées au graphique
            <PerformanceChart data={performanceData} />
          )}
        </div>
      </div>
    </div>
  );
}
