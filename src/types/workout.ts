export interface Exercise {
  id: string;
  name: string;
  muscle_groups: string[];
  created_at: Date;
  is_custom: boolean;
}

export interface WorkoutSet {
  set_number: number;
  weight: number;
  reps: number;
  rpe?: number; // optionnel, échelle 1-10
}

export interface WorkoutExercise {
  exercise_id: string;
  exercise_name: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id: string;
  name: string;
  date: Date;
  exercises: WorkoutExercise[];
  is_favorite: boolean;
  created_at: Date;
}
