interface IWorkoutRoutineService {
  get: () => any;
}

class WorkoutRoutineService implements IWorkoutRoutineService {
  public get(): any[] {
    return [
      {
        muscleGroup: 'abs',
        exercises: [
          {
            exerciseId: 1,
            name: 'sit-ups',
            weight: null,
            reps: 20,
            sets: 4,
            seconds: null
          },
          {
            exerciseId: 2,
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
            exerciseId: 3,
            name: 'chin-ups',
            weight: null,
            reps: 15,
            sets: 3,
            seconds: null
          },
          {
            exerciseId: 4,
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

export default WorkoutRoutineService;
