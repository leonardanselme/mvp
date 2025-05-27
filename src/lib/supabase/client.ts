import { createBrowserClient } from "@supabase/ssr";

/**
 * CLIENT SUPABASE - Côté navigateur (Browser)
 *
 * Ce fichier crée une instance du client Supabase qui s'exécute côté client (dans le navigateur).
 * Il est utilisé pour les opérations qui nécessitent une interaction directe avec l'utilisateur,
 * comme les actions en temps réel, les inscriptions, connexions, etc.
 */

/**
 * Crée et retourne un client Supabase pour le navigateur
 *
 * Utilise createBrowserClient qui est optimisé pour :
 * - Gérer automatiquement les cookies d'authentification
 * - Maintenir la session utilisateur
 * - Permettre les opérations en temps réel (real-time subscriptions)
 * - Fonctionner avec les composants React côté client
 *
 * @returns Instance du client Supabase pour le navigateur
 */
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // URL de votre projet Supabase
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Clé publique anonyme (safe pour le client)
  );
