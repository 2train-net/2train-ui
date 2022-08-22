import {
  CALVES_TEXT,
  HAMSTRINGS_TEXT,
  QUADRICEPS_TEXT,
  GLUTES_TEXT,
  BICEPS_TEXT,
  TRICEPS_TEXT,
  FOREARMS_TEXT,
  TRAPEZIUS_TEXT,
  LATISSIMUS_TEXT,
  CHEST_TEXT,
  BACK_TEXT,
  ARMS_TEXT,
  ABS_TEXT,
  LEGS_TEXT,
  SHOULDERS_TEXT,
} from 'shared/constants';
import { MuscleGroup } from 'shared/generated';

const muscleGroups = {
  [MuscleGroup.Calves]: CALVES_TEXT,
  [MuscleGroup.Hamstrings]: HAMSTRINGS_TEXT,
  [MuscleGroup.Quadriceps]: QUADRICEPS_TEXT,
  [MuscleGroup.Glutes]: GLUTES_TEXT,
  [MuscleGroup.Biceps]: BICEPS_TEXT,
  [MuscleGroup.Triceps]: TRICEPS_TEXT,
  [MuscleGroup.Forearms]: FOREARMS_TEXT,
  [MuscleGroup.Trapezius]: TRAPEZIUS_TEXT,
  [MuscleGroup.Latissimus]: LATISSIMUS_TEXT,
  [MuscleGroup.Chest]: CHEST_TEXT,
  [MuscleGroup.Back]: BACK_TEXT,
  [MuscleGroup.Arms]: ARMS_TEXT,
  [MuscleGroup.Abs]: ABS_TEXT,
  [MuscleGroup.Legs]: LEGS_TEXT,
  [MuscleGroup.Shoulders]: SHOULDERS_TEXT,
};

export class ExerciseService {
  parseMuscleGroup = (muscleGroup: MuscleGroup) => {
    return muscleGroups[muscleGroup] || muscleGroup;
  };
}

const instance = new ExerciseService();

export default instance;
