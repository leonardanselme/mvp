"use server";

// Correction du chemin d'importation
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// Type pour les données du formulaire
export type WorkoutFormData = {
  exercise_name: string;
  date: string;
  weight: string;
};

// --- ACTION POUR AJOUTER UN WORKOUT ---
export async function addWorkoutSupabaseAction(formData: WorkoutFormData) {
  const supabase = await createClient(); // Ajout de await

  // 1. Récupérer l'utilisateur authentifié
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Action Error: User not authenticated:", authError);
    return { error: "Utilisateur non authentifié. Veuillez vous connecter." };
  }

  // 2. Validation simple (à améliorer si nécessaire)
  const weightValue = parseFloat(formData.weight);
  if (isNaN(weightValue) || !formData.date || !formData.exercise_name) {
    return { error: "Données invalides fournies." };
  }

  try {
    // 3. Insérer les données dans la table "workouts"
    const { data, error: insertError } = await supabase
      .from("workouts") // Nom exact de votre table dans Supabase
      .insert([
        {
          user_id: user.id, // Lier l'entrée à l'utilisateur connecté (RLS le vérifiera)
          exercise_name: formData.exercise_name,
          date: formData.date, // Supabase peut gérer la string date directement
          weight: weightValue, // Insérer la valeur numérique
        },
      ])
      .select(); // Optionnel: retourner la ligne insérée

    if (insertError) {
      console.error("Supabase Insert Error:", insertError);
      // Essayez de donner un message plus utile basé sur l'erreur
      if (insertError.code === "23503") {
        // Foreign key violation (potentiellement)
        return { error: "Erreur de référence utilisateur." };
      }
      if (insertError.message.includes("check constraint")) {
        // RLS check failed
        return { error: "Échec de la vérification des permissions (RLS)." };
      }
      return { error: `Erreur lors de l'ajout: ${insertError.message}` };
    }

    console.log("Workout added:", data);

    // 4. Invalider le cache pour rafraîchir les données côté client
    // Remplacez '/carnet' par le chemin réel de votre page où le composant est affiché
    // Si le composant est à la racine, ce serait '/'
    // Adaptez ce chemin si nécessaire !
    revalidatePath("/carnet"); // Supposant que la page est /carnet

    return { success: true, data: data };
  } catch (error) {
    console.error("Unexpected Action Error:", error);
    return { error: "Une erreur inattendue est survenue." };
  }
}

// --- ACTION POUR RÉCUPÉRER LES WORKOUTS ---
export async function getWorkoutsSupabaseAction(exerciseName: string) {
  const supabase = await createClient(); // Ajout de await
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    console.error("Action Error: User not authenticated:", authError);
    // Retourner un tableau vide en cas d'erreur d'authentification pour le SELECT
    return { error: "Utilisateur non authentifié.", data: [] };
  }

  try {
    // Sélectionne seulement les colonnes nécessaires pour l'utilisateur connecté
    // et pour l'exercice spécifié. RLS s'applique automatiquement ici.
    const { data: workouts, error: selectError } = await supabase
      .from("workouts")
      .select("date, weight") // Colonnes exactes de votre table
      .eq("user_id", user.id) // Théoriquement redondant avec RLS, mais peut optimiser et clarifier
      .eq("exercise_name", exerciseName)
      .order("date", { ascending: true }); // Trier par date

    if (selectError) {
      console.error("Supabase Select Error:", selectError);
      return { error: `Erreur de lecture: ${selectError.message}`, data: [] };
    }

    // Formatter pour le composant (ex: date en YYYY-MM-DD)
    const formattedWorkouts =
      workouts?.map((w: { date: string | Date; weight: number }) => ({
        date: new Date(w.date).toISOString().split("T")[0], // Assurer le format
        weight: w.weight, // Le poids est déjà un nombre
      })) || [];

    return { data: formattedWorkouts };
  } catch (error) {
    console.error("Unexpected Action Error:", error);
    return {
      error: "Une erreur inattendue est survenue lors de la lecture.",
      data: [],
    };
  }
}
