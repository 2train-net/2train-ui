import React, { FC, useState } from 'react';

import TrainingContext from './training.context';

const TrainingProvider: FC = ({ children }) => {
  const [hasWorkoutExerciseListChange, setHasWorkoutExerciseListChange] = useState<boolean>(false);

  return (
    <TrainingContext.Provider value={{ hasWorkoutExerciseListChange, setHasWorkoutExerciseListChange }}>
      {children}
    </TrainingContext.Provider>
  );
};

export default TrainingProvider;
