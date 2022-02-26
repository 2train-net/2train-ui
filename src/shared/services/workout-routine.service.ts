import { Day } from 'shared/generated';
import { IWorkoutRoutine } from 'shared/model';

interface WorkoutExercise {
  day: Day;
  [data: string]: any;
}
const days = {
  [Day.Day_1]: 0,
  [Day.Day_2]: 1,
  [Day.Day_3]: 2,
  [Day.Day_4]: 3,
  [Day.Day_5]: 4,
  [Day.Day_6]: 5,
  [Day.Day_7]: 6,
};

const numbers: { [key: number]: any } = {
  0: Day.Day_1,
  1: Day.Day_2,
  2: Day.Day_3,
  3: Day.Day_4,
  4: Day.Day_5,
  5: Day.Day_6,
  6: Day.Day_7,
};

const strings: { [key: string]: any } = {
  DAY_1: 0,
  DAY_2: 1,
  DAY_3: 2,
  DAY_4: 3,
  DAY_5: 4,
  DAY_6: 5,
  DAY_7: 6,
};

export class WorkoutRoutineService {
  parseDayToNumber = (day: Day) => {
    return days[day];
  };
  parseNumberToDay = (number: number) => {
    return numbers[number];
  };
  parseStringToDayNumber = (string: string) => {
    return strings[string];
  };

  getActiveWorkoutExercises = (workoutRoutine?: IWorkoutRoutine) => {
    return workoutRoutine?.workoutExercises.filter(({ isDeleted }) => !isDeleted);
  };

  getMaxDay = (workoutExercises: WorkoutExercise[] | undefined) => {
    return workoutExercises
      ? workoutExercises.length > 0
        ? this.parseDayToNumber(workoutExercises.reduce((a, b) => (a.day > b.day ? a : b)).day)
        : -1
      : -1;
  };
}

const instance = new WorkoutRoutineService();

export default instance;
