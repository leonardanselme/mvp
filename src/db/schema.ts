//Définit le schéma de base des données
//Ici on n´a qu´un schéma Users mais on va pouvoir en rajouter d´autres par la suite

// (On laisse les imports de base ou on les supprime s'ils ne sont plus utiles
// pour d'autres tables éventuelles définies ici)
//import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

// Si vous aviez une table usersTable initialement, elle serait ici.
// Sinon, le fichier est vide ou contient d'autres schémas.

// Exemple si vous aviez la table usersTable initialement:
/*
export const usersTable = pgTable("users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
});
*/
