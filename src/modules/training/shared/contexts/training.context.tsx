import { createContext } from 'react';

export interface ITrainingContext {
  hasWorkoutExerciseListChange: boolean;
  setHasWorkoutExerciseListChange: (newState: boolean) => void;
}

export default createContext<ITrainingContext>({
  hasWorkoutExerciseListChange: false,
  setHasWorkoutExerciseListChange: () => {}
});
