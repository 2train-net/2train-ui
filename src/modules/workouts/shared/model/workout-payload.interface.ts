export interface IWorkoutPayload {
  uuid: string;
  workoutRoutine: {
    uuid: string;
    plan: {
      name: string;
      planAssociations: {
        user: {
          avatar?: string | null;
          firstName: string;
          lastName: string;
        };
      }[];
    };
  };
  workoutExercises: {
    uuid: string;
  }[];
  createdAt: Date;
}
