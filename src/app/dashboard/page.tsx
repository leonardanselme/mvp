"use client";
//import AccountForm from "./account-form";
//import { createClient } from "@/lib/supabase/server";

import { Journal } from "@/components/Journal";

export function Page() {
  return (
    <main className="container mx-auto p-8 pt-0 flex-grow w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Votre Tableau de Bord Santé
      </h1>

      {/* Layout en grille pour les sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Espace réservé pour le futur composant Carnet */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Carnet d&apos;Entraînement
          </h2>
          <p className="text-gray-500">
            Le composant Carnet sera réimplémenté prochainement.
          </p>
        </div>

        {/* Colonne 2: Journal */}
        <Journal />
      </div>
    </main>
  );
}

export default Page;
