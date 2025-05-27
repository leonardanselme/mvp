"use client";
//import AccountForm from "./account-form";
//import { createClient } from "@/lib/supabase/server";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Journal } from "@/components/Journal";
import { Carnet } from "@/components/Carnet";

export function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Vérification de l'authentification côté client
    const checkAuth = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error || !user) {
          // Redirection vers la page de connexion si pas authentifié
          router.push("/auth/login");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Erreur de vérification auth:", error);
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, supabase.auth]);

  // Affichage de chargement pendant la vérification
  if (isLoading) {
    return (
      <main className="container mx-auto p-8 pt-0 flex-grow w-full">
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-gray-600">
            Vérification de l&apos;authentification...
          </div>
        </div>
      </main>
    );
  }

  // Ne render le dashboard que si authentifié
  if (!isAuthenticated) {
    return null; // Le useEffect redirige déjà vers /login
  }

  return (
    <main className="container mx-auto p-8 pt-0 flex-grow w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Votre Tableau de Bord Santé
      </h1>

      {/* Layout en grille pour les sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Composant Carnet d'Entraînement */}
        <div className="bg-white rounded-lg shadow overflow-hidden h-[600px]">
          <Carnet />
        </div>

        {/* Colonne 2: Journal */}
        <Journal />
      </div>
    </main>
  );
}

export default Page;
