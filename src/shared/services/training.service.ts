import { ICreateWorkoutExercise, ITrainingWorkoutExercise, IWorkoutExercise } from 'modules/training/shared/model';

export class WorkoutRoutineService {
  parseToTrainingWorkoutExercise = (workoutExercises: IWorkoutExercise[] | undefined) => {
    return workoutExercises ? workoutExercises.map(item => ({ completed: false, ...item })) : undefined;
  };
  parseToWorkoutExercises = (workoutExercises: ITrainingWorkoutExercise[]) => {
    const completedExercises: ICreateWorkoutExercise[] = [];
    workoutExercises.forEach(item => {
      const { completed, uuid, exercise, ...newItem } = item;
      completedExercises.push({ exercise: { connect: { uuid: exercise.uuid } }, ...newItem });
    });
    return completedExercises;
  };
}

const instance = new WorkoutRoutineService();

export default instance;
