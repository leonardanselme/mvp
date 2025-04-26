"use client";
//import AccountForm from "./account-form";
//import { createClient } from "@/lib/supabase/server";

import { Journal } from "@/components/Journal";
import { Carnet } from "@/components/Carnet";

export function Page() {
  return (
    <main className="container mx-auto p-8 pt-0 flex-grow w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Votre Tableau de Bord Santé
      </h1>

      {/* Layout en grille pour les deux sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Colonne 1: Carnet */}
        <Carnet />

        {/* Colonne 2: Journal */}
        <Journal />
      </div>
    </main>
  );
}

export default Page;
