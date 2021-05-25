import React, { FC } from 'react';

import { WorkoutCard, IWorkoutPayload } from 'modules/workouts/workouts.module';

import { MasterList } from 'shared/modules';
import { useGetWorkoutsQuery } from 'shared/generated';

const WorkoutList: FC = () => {
  return <MasterList<IWorkoutPayload> title="Entrenamientos" render={WorkoutCard} useQuery={useGetWorkoutsQuery} />;
};

export default WorkoutList;
