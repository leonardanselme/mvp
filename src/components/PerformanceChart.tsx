"use client";

import React from "react"; // Assurez-vous que React est importé

// Restaurer les importations et types originaux
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type PerformanceData = {
  date: string;
  weight: number;
};

type PerformanceChartProps = {
  data: PerformanceData[];
};

// Garder le type simple pour l'instant pour les props de la fonction
/*
type PerformanceChartProps = {
  data: any; // Utiliser 'any' temporairement
};
*/

export function PerformanceChart({ data }: PerformanceChartProps) {
  // Commenter le console.log de test
  // console.log("Rendering simplified PerformanceChart with data:", data);
  // Retourner le JSX original
  // Supprimer le div de test
  /*
  return (
    <div style={{ border: '1px solid red', padding: '10px' }}>
      Performance Chart (Imports Restored)
    </div>
  );
  */

  // Restaurer le code original
  // Gestion du cas où il n'y a pas de données
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[300px] bg-gray-50 p-4 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
        <p className="text-gray-500">
          Aucune donnée à afficher pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: "Kg", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="weight"
            stroke="#10B981"
            name="Poids (kg)"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
  // Fin de la restauration
  /*
  );
  */
}
