import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * MIDDLEWARE SUPABASE - Gestion de l'authentification et des redirections
 *
 * Ce fichier contient la logique middleware qui s'exécute sur chaque requête
 * pour vérifier l'authentification et gérer les redirections automatiques.
 * Il s'assure que les utilisateurs non connectés sont redirigés vers la page de connexion.
 */

/**
 * Met à jour la session utilisateur et gère les redirections d'authentification
 *
 * Cette fonction est appelée automatiquement par Next.js sur chaque requête.
 * Elle vérifie si l'utilisateur est authentifié et le redirige si nécessaire.
 *
 * @param request - La requête Next.js entrante
 * @returns NextResponse avec redirection ou continuation normale
 */
export async function updateSession(request: NextRequest) {
  // Crée une réponse Next.js qui sera potentiellement modifiée
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Crée un client Supabase serveur avec gestion des cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!, // URL de votre projet Supabase
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Clé publique anonyme
    {
      cookies: {
        // Récupère tous les cookies de la requête entrante
        getAll() {
          return request.cookies.getAll();
        },
        // Met à jour les cookies dans la requête ET la réponse
        setAll(cookiesToSet) {
          // Applique les cookies à la requête (pour cette session)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Recrée la réponse avec les nouveaux cookies de requête
          supabaseResponse = NextResponse.next({
            request,
          });
          // Applique les cookies à la réponse (pour le navigateur)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // ⚠️ IMPORTANT: Ne PAS exécuter de code entre createServerClient et supabase.auth.getUser()
  // Une erreur simple pourrait rendre très difficile le débogage des problèmes
  // avec des utilisateurs aléatoirement déconnectés.

  // ⚠️ IMPORTANT: NE PAS SUPPRIMER auth.getUser()
  // Cette ligne rafraîchit automatiquement la session si elle est expirée

  // Vérifie si l'utilisateur est authentifié
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Logique de redirection pour les utilisateurs non authentifiés
  // ROUTES PROTÉGÉES : Toutes les routes SAUF /auth/*
  // Cela inclut automatiquement : /dashboard, /profile, /settings, etc.
  if (
    !user && // Pas d'utilisateur connecté
    !request.nextUrl.pathname.startsWith("/auth") // Pas sur une page d'auth (login, register, callback)
  ) {
    // Redirige l'utilisateur vers la page de connexion
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // ⚠️ IMPORTANT: Vous *devez* retourner l'objet supabaseResponse tel quel.
  // Si vous créez un nouvel objet de réponse avec NextResponse.next(), assurez-vous de :
  // 1. Passer la requête dedans, comme ceci :
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copier les cookies, comme ceci :
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Modifier l'objet myNewResponse selon vos besoins, mais évitez de changer
  //    les cookies !
  // 4. Finalement :
  //    return myNewResponse
  // Si cela n'est pas fait, vous pourriez provoquer une désynchronisation
  // entre le navigateur et le serveur et terminer prématurément la session utilisateur !

  return supabaseResponse;
}
