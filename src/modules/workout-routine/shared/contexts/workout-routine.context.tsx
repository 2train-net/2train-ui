import { createContext } from 'react';

export interface IWorkoutRoutineContext {
  currentStep: number;
  workoutRoutine: any[];
  handleNextStep: () => void;
}

export default createContext<IWorkoutRoutineContext>({
  currentStep: 0,
  workoutRoutine: [],
  handleNextStep: () => {}
});
