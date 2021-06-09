import { Day } from 'shared/generated';

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
  [Day.Day_7]: 6
};

const numbers: { [key: number]: any } = {
  0: Day.Day_1,
  1: Day.Day_2,
  2: Day.Day_3,
  3: Day.Day_4,
  4: Day.Day_5,
  5: Day.Day_6,
  6: Day.Day_7
};

export class WorkoutRoutineService {
  parseDayToNumber = (day: Day) => {
    return days[day];
  };
  parseNumberToDay = (number: number) => {
    return numbers[number];
  };

  getMaxDay = (workoutExercises: WorkoutExercise[] | undefined) => {
    return workoutExercises
      ? workoutExercises.length > 0
        ? this.parseDayToNumber(workoutExercises.reduce((a, b) => (a.day > b.day ? a : b)).day)
        : 0
      : 0;
  };
}

const instance = new WorkoutRoutineService();

export default instance;
