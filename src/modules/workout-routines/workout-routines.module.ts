import WorkoutRoutines from './workout-routines.component';

import WorkoutRoutineList from './workout-routine-list/workout-routine-list.component';
import WorkoutRoutineCreate from './workout-routine-create/workout-routine-create.component';
import WorkoutRoutineUpdate from './workout-routine-update/workout-routine-update.component';
import WorkoutRoutineDetail from './workout-routine-detail/workout-routine-detail.component';

import ExerciseItemCard from './shared/components/exercise-item-card/exercise-item-card-component';
import WorkoutRoutineCard from './shared/components/workout-routine-card/workout-routine-card.component';
import WorkoutRoutineForm from './shared/components/workout-routine-form/workout-routine-form.component';
import WorkoutExerciseForm from './shared/components/workout-exercise-form/workout-exercise-form.component';
import ExerciseOptionCreate from './shared/components/exercise-option-create/exercise-option-create.component';
import WorkoutExerciseDetail from './shared/components/workout-exercise-detail/workout-exercise-detail.component';
import WorkoutExerciseItemCard from './shared/components/workout-exercise-item-card/workout-exercise-item-card.component';

export * from './shared/model';
export * from './shared/constants';
export * from './shared/components/workout-exercise-form/workout-exercise-form.util';

export * from './workout-routine-update/workout-routine-update.util';

export {
  WorkoutRoutineCreate,
  WorkoutRoutineList,
  WorkoutRoutineUpdate,
  WorkoutRoutineDetail,
  ExerciseOptionCreate,
  ExerciseItemCard,
  WorkoutRoutineCard,
  WorkoutRoutineForm,
  WorkoutExerciseItemCard,
  WorkoutExerciseForm,
  WorkoutExerciseDetail
};

export default WorkoutRoutines;
