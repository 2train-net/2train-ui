import Exercises from './exercises.component';

import ExerciseList from './exercise-list/exercise-list.component';
import ExerciseCreate from './exercise-create/exercise-create.component';
import ExerciseUpdate from './exercise-update/exercise-update.component';

import ExerciseCard from './shared/components/exercise-card/exercise-card.component';
import ExerciseForm from './shared/components/exercise-form/exercise-form.component';

export * from './shared/model';
export * from './shared/components/exercise-form/exercise-form.util';

export { ExerciseList, ExerciseCreate, ExerciseUpdate, ExerciseForm, ExerciseCard };

export default Exercises;
