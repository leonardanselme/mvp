import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * SERVER SUPABASE - Côté serveur (Server Components & API Routes)
 *
 * Ce fichier crée une instance du client Supabase qui s'exécute côté serveur.
 * Il est utilisé dans les Server Components, API routes, et toute logique serveur
 * qui nécessite un accès authentifié à Supabase.
 */

/**
 * Crée et retourne un client Supabase pour le serveur
 *
 * Utilise createServerClient qui est optimisé pour :
 * - Fonctionner dans l'environnement serveur de Next.js
 * - Gérer les cookies de session de manière sécurisée
 * - Permettre l'authentification dans les Server Components
 * - Maintenir la session utilisateur entre les requêtes
 *
 * @returns Promise<SupabaseClient> Instance du client Supabase pour le serveur
 */
export async function createClient() {
  // Récupère le store de cookies de Next.js (nécessaire pour la session)
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // URL de votre projet Supabase
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Clé publique anonyme
    {
      cookies: {
        // Récupère tous les cookies pour maintenir la session
        getAll() {
          return cookieStore.getAll();
        },
        // Définit les cookies (pour sauvegarder les tokens d'authentification)
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // La méthode `setAll` a été appelée depuis un Server Component.
            // Cela peut être ignoré si vous avez un middleware qui rafraîchit
            // les sessions utilisateur.
          }
        },
      },
    }
  );
}

/**
 * Instance globale du client Supabase serveur
 *
 * Cette instance peut être importée directement dans vos Server Components
 * et API routes pour un accès rapide à Supabase.
 *
 * Usage: import { supabase } from '@/lib/supabase/server'
 */
export const supabase = createClient();
