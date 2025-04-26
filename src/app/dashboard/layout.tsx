import { Metadata } from "next";
import Link from "next/link";
import { ButtonLogin } from "@/components/ButtonLogin";
//import type { LayoutParams } from "@/src/types/next";

export const metadata: Metadata = {
  title: "Tableau de bord",
  description: "Suivez vos progrès et gérez votre santé avec SantéApp",
};

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-white shadow-md p-4 mb-8">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">
            SantéApp
          </Link>
          <nav className="flex items-center">
            <ul className="flex gap-4 mr-4">
              <li>
                <Link
                  href="/features"
                  className="text-gray-700 hover:text-green-600"
                >
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-700 hover:text-green-600"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-700 hover:text-green-600"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <ButtonLogin />
          </nav>
        </div>
      </header>

      {/* Content */}
      {children}

      {/* Footer */}
      <footer className="w-full text-center text-gray-500 p-4 mt-8">
        <p>© 2025 SantéApp. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default Layout;
