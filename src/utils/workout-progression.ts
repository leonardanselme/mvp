import { Workout, WorkoutSet } from "@/types/workout";

export interface ExerciseProgressData {
  date: Date;
  weight: number;
  reps: number;
  volume: number; // weight * reps
  maxWeight: number;
  maxReps: number;
  rpe?: number;
}

export interface ExerciseHistoryEntry {
  date: Date;
  workoutName: string;
  sets: WorkoutSet[];
  totalVolume: number;
  maxWeight: number;
  maxReps: number;
}

/**
 * Extrait tous les exercices uniques des workouts
 */
export function getUniqueExercises(workouts: Workout[]): string[] {
  const exerciseNames = new Set<string>();

  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      exerciseNames.add(exercise.exercise_name);
    });
  });

  return Array.from(exerciseNames).sort();
}

/**
 * Calcule les données de progression pour un exercice spécifique
 */
export function getExerciseProgressData(
  workouts: Workout[],
  exerciseName: string
): ExerciseProgressData[] {
  const progressData: ExerciseProgressData[] = [];

  workouts
    .filter((workout) =>
      workout.exercises.some((ex) => ex.exercise_name === exerciseName)
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .forEach((workout) => {
      const exercise = workout.exercises.find(
        (ex) => ex.exercise_name === exerciseName
      );
      if (!exercise) return;

      // Calculer les métriques pour cette séance
      let totalVolume = 0;
      let maxWeight = 0;
      let maxReps = 0;
      let avgRpe = 0;
      let rpeCount = 0;

      exercise.sets.forEach((set) => {
        totalVolume += set.weight * set.reps;
        maxWeight = Math.max(maxWeight, set.weight);
        maxReps = Math.max(maxReps, set.reps);

        if (set.rpe) {
          avgRpe += set.rpe;
          rpeCount++;
        }
      });

      progressData.push({
        date: workout.date,
        weight: maxWeight,
        reps: maxReps,
        volume: totalVolume,
        maxWeight,
        maxReps,
        rpe: rpeCount > 0 ? avgRpe / rpeCount : undefined,
      });
    });

  return progressData;
}

/**
 * Obtient l'historique détaillé d'un exercice
 */
export function getExerciseHistory(
  workouts: Workout[],
  exerciseName: string
): ExerciseHistoryEntry[] {
  return workouts
    .filter((workout) =>
      workout.exercises.some((ex) => ex.exercise_name === exerciseName)
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Plus récent en premier
    .map((workout) => {
      const exercise = workout.exercises.find(
        (ex) => ex.exercise_name === exerciseName
      )!;

      let totalVolume = 0;
      let maxWeight = 0;
      let maxReps = 0;

      exercise.sets.forEach((set) => {
        totalVolume += set.weight * set.reps;
        maxWeight = Math.max(maxWeight, set.weight);
        maxReps = Math.max(maxReps, set.reps);
      });

      return {
        date: workout.date,
        workoutName: workout.name,
        sets: exercise.sets,
        totalVolume,
        maxWeight,
        maxReps,
      };
    });
}

/**
 * Calcule les statistiques de progression pour un exercice
 */
export function getExerciseStats(workouts: Workout[], exerciseName: string) {
  const progressData = getExerciseProgressData(workouts, exerciseName);

  if (progressData.length === 0) {
    return null;
  }

  const latest = progressData[progressData.length - 1];
  const first = progressData[0];

  return {
    totalSessions: progressData.length,
    currentMaxWeight: latest.maxWeight,
    currentMaxReps: latest.maxReps,
    currentVolume: latest.volume,
    weightProgress: latest.maxWeight - first.maxWeight,
    volumeProgress: latest.volume - first.volume,
    averageRpe:
      progressData
        .filter((d) => d.rpe)
        .reduce((sum, d) => sum + (d.rpe || 0), 0) /
      progressData.filter((d) => d.rpe).length,
  };
}

/**
 * Formate une date pour l'affichage
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

/**
 * Formate une date courte pour les graphiques
 */
export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}
