import Training from './training.component';

import TrainingLayout from './training-layout/training-layout.component';
import TrainingDayList from './training-day-list/training-day-list.component';
import TrainingWorkoutDetail from './training-workout-detail/training-workout-detail.component';
import TrainingWorkoutExerciseList from './training-workout-exercise-list/training-workout-exercise-list.component';

import TrainingContext from './shared/contexts/training.context';
import TrainingProvider from './shared/contexts/training.provider';
import TrainingWorkoutExerciseForm from './shared/components/training-workout-exercise-form/training-workout-exercise-form.component';

export * from './shared/model';
export * from './shared/constants';
export * from './shared/contexts';

export {
  TrainingLayout,
  TrainingDayList,
  TrainingWorkoutExerciseList,
  TrainingWorkoutDetail,
  TrainingWorkoutExerciseForm,
  TrainingContext,
  TrainingProvider
};

export default Training;
