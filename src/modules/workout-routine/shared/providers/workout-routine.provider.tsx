import React, { FC, useState, useEffect } from 'react';

import { WorkoutRoutineService, WorkoutRoutineContext } from 'modules/workout-routine/workout-routine.module';

const workoutRoutineService = new WorkoutRoutineService();

const WorkoutRoutineProvider: FC = ({ children }) => {
  const [workoutRoutine, setWorkoutRoutine] = useState([] as any);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setWorkoutRoutine(workoutRoutineService.get());
  }, []);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <WorkoutRoutineContext.Provider value={{ workoutRoutine, currentStep, handleNextStep }}>
      {children}
    </WorkoutRoutineContext.Provider>
  );
};

export default WorkoutRoutineProvider;
