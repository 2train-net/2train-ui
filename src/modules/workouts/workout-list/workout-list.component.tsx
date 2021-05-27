import React, { FC, useContext } from 'react';

import {
  WorkoutCard,
  IWorkoutPayload,
  PLURAL_WORKOUTS_TITLE,
  SINGULAR_WORKOUTS_TITLE
} from 'modules/workouts/workouts.module';

import { MasterList } from 'shared/modules';
import { AuthContext } from 'shared/contexts';
import { useGetWorkoutsQuery, UserType } from 'shared/generated';

const WorkoutList: FC = () => {
  const { user } = useContext(AuthContext);

  const isCustomer = user?.type === UserType.Customer;

  return (
    <MasterList<IWorkoutPayload>
      title={[SINGULAR_WORKOUTS_TITLE, PLURAL_WORKOUTS_TITLE]}
      render={WorkoutCard}
      useQuery={useGetWorkoutsQuery}
      isCreateButtonAvailable={isCustomer}
    />
  );
};

export default WorkoutList;
