"use client";

export function AddWorkout() {
  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Nouvelle séance</h1>
      </div>

      {/* Contenu placeholder */}
      <div className="text-center py-20">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🏗️</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Vue en développement
        </h2>
        <p className="text-gray-600 mb-4">
          Interface d&apos;ajout de séance avec flow complet
        </p>
        <ul className="text-sm text-gray-500 space-y-1 text-left max-w-xs mx-auto">
          <li>• Sélection date et nom</li>
          <li>• Choix séance favorite ou vierge</li>
          <li>• Interface type playlist</li>
          <li>• Modal d&apos;ajout d&apos;exercices</li>
          <li>• Validation et sauvegarde</li>
        </ul>
      </div>
    </div>
  );
}
