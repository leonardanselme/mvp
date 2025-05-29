import { Exercise, Workout } from "@/types/workout";

// Exercices populaires avec groupes musculaires
export const MOCK_EXERCISES: Exercise[] = [
  // Pectoraux
  {
    id: "1",
    name: "Développé couché",
    muscle_groups: ["Pectoraux", "Triceps", "Épaules"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "2",
    name: "Développé incliné",
    muscle_groups: ["Pectoraux", "Triceps", "Épaules"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "3",
    name: "Dips",
    muscle_groups: ["Pectoraux", "Triceps"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "4",
    name: "Écarté couché",
    muscle_groups: ["Pectoraux"],
    created_at: new Date(),
    is_custom: false,
  },

  // Dos
  {
    id: "5",
    name: "Tractions",
    muscle_groups: ["Dos", "Biceps"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "6",
    name: "Rowing barre",
    muscle_groups: ["Dos", "Biceps"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "7",
    name: "Soulevé de terre",
    muscle_groups: ["Dos", "Jambes", "Fessiers"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "8",
    name: "Tirage horizontal",
    muscle_groups: ["Dos", "Biceps"],
    created_at: new Date(),
    is_custom: false,
  },

  // Jambes
  {
    id: "9",
    name: "Squat",
    muscle_groups: ["Jambes", "Fessiers"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "10",
    name: "Leg Press",
    muscle_groups: ["Jambes", "Fessiers"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "11",
    name: "Fentes",
    muscle_groups: ["Jambes", "Fessiers"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "12",
    name: "Leg Curl",
    muscle_groups: ["Ischio-jambiers"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "13",
    name: "Extension jambes",
    muscle_groups: ["Quadriceps"],
    created_at: new Date(),
    is_custom: false,
  },

  // Épaules
  {
    id: "14",
    name: "Développé militaire",
    muscle_groups: ["Épaules", "Triceps"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "15",
    name: "Élévations latérales",
    muscle_groups: ["Épaules"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "16",
    name: "Oiseau",
    muscle_groups: ["Épaules", "Dos"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "17",
    name: "Shrugs",
    muscle_groups: ["Trapèzes"],
    created_at: new Date(),
    is_custom: false,
  },

  // Bras
  {
    id: "18",
    name: "Curl biceps",
    muscle_groups: ["Biceps"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "19",
    name: "Extensions triceps",
    muscle_groups: ["Triceps"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "20",
    name: "Curl marteau",
    muscle_groups: ["Biceps", "Avant-bras"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "21",
    name: "Développé serré",
    muscle_groups: ["Triceps", "Pectoraux"],
    created_at: new Date(),
    is_custom: false,
  },

  // Core
  {
    id: "22",
    name: "Planche",
    muscle_groups: ["Abdominaux", "Core"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "23",
    name: "Crunchs",
    muscle_groups: ["Abdominaux"],
    created_at: new Date(),
    is_custom: false,
  },
  {
    id: "24",
    name: "Russian twists",
    muscle_groups: ["Obliques"],
    created_at: new Date(),
    is_custom: false,
  },

  // Cardio
  {
    id: "25",
    name: "Burpees",
    muscle_groups: ["Cardio", "Full body"],
    created_at: new Date(),
    is_custom: false,
  },
];

// Générer des dates récentes
const getRecentDate = (daysAgo: number) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
};

// Séances d'exemple
export const MOCK_WORKOUTS: Workout[] = [
  {
    id: "1",
    name: "Push Day - Pectoraux & Triceps",
    date: getRecentDate(1),
    is_favorite: true,
    created_at: getRecentDate(1),
    exercises: [
      {
        exercise_id: "1",
        exercise_name: "Développé couché",
        sets: [
          { set_number: 1, weight: 80, reps: 8, rpe: 7 },
          { set_number: 2, weight: 85, reps: 6, rpe: 8 },
          { set_number: 3, weight: 85, reps: 5, rpe: 9 },
        ],
      },
      {
        exercise_id: "2",
        exercise_name: "Développé incliné",
        sets: [
          { set_number: 1, weight: 60, reps: 10, rpe: 6 },
          { set_number: 2, weight: 65, reps: 8, rpe: 7 },
          { set_number: 3, weight: 65, reps: 7, rpe: 8 },
        ],
      },
      {
        exercise_id: "3",
        exercise_name: "Dips",
        sets: [
          { set_number: 1, weight: 0, reps: 12, rpe: 6 },
          { set_number: 2, weight: 10, reps: 8, rpe: 7 },
          { set_number: 3, weight: 10, reps: 6, rpe: 8 },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Pull Day - Dos & Biceps",
    date: getRecentDate(3),
    is_favorite: true,
    created_at: getRecentDate(3),
    exercises: [
      {
        exercise_id: "5",
        exercise_name: "Tractions",
        sets: [
          { set_number: 1, weight: 0, reps: 8, rpe: 7 },
          { set_number: 2, weight: 0, reps: 6, rpe: 8 },
          { set_number: 3, weight: 0, reps: 5, rpe: 9 },
        ],
      },
      {
        exercise_id: "6",
        exercise_name: "Rowing barre",
        sets: [
          { set_number: 1, weight: 70, reps: 10, rpe: 6 },
          { set_number: 2, weight: 75, reps: 8, rpe: 7 },
          { set_number: 3, weight: 80, reps: 6, rpe: 8 },
        ],
      },
      {
        exercise_id: "18",
        exercise_name: "Curl biceps",
        sets: [
          { set_number: 1, weight: 30, reps: 12, rpe: 6 },
          { set_number: 2, weight: 32.5, reps: 10, rpe: 7 },
          { set_number: 3, weight: 35, reps: 8, rpe: 8 },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Leg Day - Jambes complètes",
    date: getRecentDate(5),
    is_favorite: true,
    created_at: getRecentDate(5),
    exercises: [
      {
        exercise_id: "9",
        exercise_name: "Squat",
        sets: [
          { set_number: 1, weight: 100, reps: 10, rpe: 6 },
          { set_number: 2, weight: 110, reps: 8, rpe: 7 },
          { set_number: 3, weight: 120, reps: 6, rpe: 8 },
          { set_number: 4, weight: 125, reps: 4, rpe: 9 },
        ],
      },
      {
        exercise_id: "10",
        exercise_name: "Leg Press",
        sets: [
          { set_number: 1, weight: 200, reps: 15, rpe: 6 },
          { set_number: 2, weight: 220, reps: 12, rpe: 7 },
          { set_number: 3, weight: 240, reps: 10, rpe: 8 },
        ],
      },
      {
        exercise_id: "12",
        exercise_name: "Leg Curl",
        sets: [
          { set_number: 1, weight: 40, reps: 12, rpe: 6 },
          { set_number: 2, weight: 45, reps: 10, rpe: 7 },
          { set_number: 3, weight: 50, reps: 8, rpe: 8 },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Upper Body Mix",
    date: getRecentDate(7),
    is_favorite: false,
    created_at: getRecentDate(7),
    exercises: [
      {
        exercise_id: "14",
        exercise_name: "Développé militaire",
        sets: [
          { set_number: 1, weight: 50, reps: 10, rpe: 6 },
          { set_number: 2, weight: 55, reps: 8, rpe: 7 },
          { set_number: 3, weight: 60, reps: 6, rpe: 8 },
        ],
      },
      {
        exercise_id: "15",
        exercise_name: "Élévations latérales",
        sets: [
          { set_number: 1, weight: 12, reps: 15, rpe: 6 },
          { set_number: 2, weight: 15, reps: 12, rpe: 7 },
          { set_number: 3, weight: 15, reps: 10, rpe: 8 },
        ],
      },
    ],
  },
  {
    id: "5",
    name: "Full Body HIIT",
    date: getRecentDate(10),
    is_favorite: false,
    created_at: getRecentDate(10),
    exercises: [
      {
        exercise_id: "25",
        exercise_name: "Burpees",
        sets: [
          { set_number: 1, weight: 0, reps: 20, rpe: 8 },
          { set_number: 2, weight: 0, reps: 15, rpe: 9 },
          { set_number: 3, weight: 0, reps: 10, rpe: 9 },
        ],
      },
      {
        exercise_id: "22",
        exercise_name: "Planche",
        sets: [
          { set_number: 1, weight: 0, reps: 60, rpe: 7 }, // durée en secondes
          { set_number: 2, weight: 0, reps: 45, rpe: 8 },
          { set_number: 3, weight: 0, reps: 30, rpe: 8 },
        ],
      },
    ],
  },
];

// Séances favorites (templates)
export const FAVORITE_WORKOUTS = MOCK_WORKOUTS.filter(
  (workout) => workout.is_favorite
);

// Groupes musculaires disponibles
export const MUSCLE_GROUPS = [
  "Pectoraux",
  "Dos",
  "Épaules",
  "Biceps",
  "Triceps",
  "Jambes",
  "Quadriceps",
  "Ischio-jambiers",
  "Fessiers",
  "Mollets",
  "Abdominaux",
  "Obliques",
  "Core",
  "Trapèzes",
  "Avant-bras",
  "Cardio",
  "Full body",
];

// Séances favorites templates
export const FAVORITE_WORKOUT_TEMPLATES = [
  {
    id: "template-1",
    name: "Push Day",
    exercises: [
      {
        exercise_id: "1",
        exercise_name: "Développé couché",
        sets: [
          { set_number: 1, weight: 80, reps: 8, rpe: 8 },
          { set_number: 2, weight: 80, reps: 8, rpe: 8 },
          { set_number: 3, weight: 80, reps: 7, rpe: 9 },
        ],
      },
      {
        exercise_id: "14",
        exercise_name: "Développé militaire",
        sets: [
          { set_number: 1, weight: 50, reps: 10, rpe: 7 },
          { set_number: 2, weight: 50, reps: 10, rpe: 8 },
          { set_number: 3, weight: 50, reps: 9, rpe: 9 },
        ],
      },
      {
        exercise_id: "3",
        exercise_name: "Dips",
        sets: [
          { set_number: 1, weight: 0, reps: 12, rpe: 7 },
          { set_number: 2, weight: 0, reps: 10, rpe: 8 },
          { set_number: 3, weight: 0, reps: 8, rpe: 9 },
        ],
      },
    ],
  },
  {
    id: "template-2",
    name: "Pull Day",
    exercises: [
      {
        exercise_id: "7",
        exercise_name: "Soulevé de terre",
        sets: [
          { set_number: 1, weight: 100, reps: 5, rpe: 8 },
          { set_number: 2, weight: 100, reps: 5, rpe: 9 },
          { set_number: 3, weight: 100, reps: 4, rpe: 9 },
        ],
      },
      {
        exercise_id: "5",
        exercise_name: "Tractions",
        sets: [
          { set_number: 1, weight: 0, reps: 8, rpe: 7 },
          { set_number: 2, weight: 0, reps: 7, rpe: 8 },
          { set_number: 3, weight: 0, reps: 6, rpe: 9 },
        ],
      },
      {
        exercise_id: "6",
        exercise_name: "Rowing barre",
        sets: [
          { set_number: 1, weight: 60, reps: 10, rpe: 7 },
          { set_number: 2, weight: 60, reps: 10, rpe: 8 },
          { set_number: 3, weight: 60, reps: 9, rpe: 8 },
        ],
      },
    ],
  },
  {
    id: "template-3",
    name: "Legs Day",
    exercises: [
      {
        exercise_id: "9",
        exercise_name: "Squat",
        sets: [
          { set_number: 1, weight: 90, reps: 8, rpe: 8 },
          { set_number: 2, weight: 90, reps: 8, rpe: 8 },
          { set_number: 3, weight: 90, reps: 7, rpe: 9 },
        ],
      },
      {
        exercise_id: "11",
        exercise_name: "Fentes",
        sets: [
          { set_number: 1, weight: 20, reps: 12, rpe: 7 },
          { set_number: 2, weight: 20, reps: 12, rpe: 8 },
          { set_number: 3, weight: 20, reps: 10, rpe: 8 },
        ],
      },
      {
        exercise_id: "12",
        exercise_name: "Leg Curl",
        sets: [
          { set_number: 1, weight: 40, reps: 12, rpe: 7 },
          { set_number: 2, weight: 40, reps: 12, rpe: 8 },
          { set_number: 3, weight: 40, reps: 11, rpe: 8 },
        ],
      },
    ],
  },
];
