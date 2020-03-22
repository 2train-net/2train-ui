interface IWorkoutRoutineService {
  get: () => any;
}

class WorkoutRoutineService implements IWorkoutRoutineService {
  public get() {
    return [
      {
        muscleGroup: 'abs',
        exercises: [
          {
            name: 'sit-ups',
            weight: null,
            reps: 20,
            sets: 4,
            seconds: null
          },
          {
            name: 'reverse crunches',
            weight: null,
            reps: null,
            sets: 4,
            seconds: 40
          }
        ]
      },
      {
        muscleGroup: 'bicep',
        exercises: [
          {
            name: 'chin-ups',
            weight: null,
            reps: 15,
            sets: 3,
            seconds: null
          },
          {
            name: 'body rows',
            weight: null,
            reps: 20,
            sets: 5,
            seconds: null
          }
        ]
      },
      {
        muscleGroup: 'chest',
        exercises: [
          {
            name: 'push-ups',
            weight: null,
            reps: 20,
            sets: 4,
            seconds: null
          },
          {
            name: 'clapping push-ups',
            weight: null,
            reps: 10,
            sets: 3,
            seconds: null
          }
        ]
      }
    ];
  }
}

const instance = new WorkoutRoutineService();

export { WorkoutRoutineService };
export default instance;
