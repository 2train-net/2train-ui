import React, { FC, useContext } from 'react';

import { IWorkoutPayload } from 'modules/workouts/shared/model';

import { DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT } from 'shared/constants';
import { Avatar, ListCard } from 'shared/modules';
import { DateService, UserService } from 'shared/services';

import { IMasterComponent } from 'shared/modules/master-list/master-list.util';
import { AuthContext } from 'shared/contexts';
import { UserType } from 'shared/generated';

interface IWorkoutCard extends IMasterComponent<IWorkoutPayload> {
  data: IWorkoutPayload;
}

const WorkoutCard: FC<IWorkoutCard> = ({ data }) => {
  const { user } = useContext(AuthContext);

  const profile =
    user?.type === UserType.Customer
      ? data.workoutRoutine.plan.planAssociations[0].user
      : data.workoutRoutine.plan.owner;

  return (
    <ListCard
      leftContent={
        <Avatar
          size="large"
          url={profile.avatar}
          letter={UserService.getAvatarLetters(profile.firstName, profile.lastName)}
        />
      }
      uuid={data.uuid}
      title={data.workoutRoutine.plan.name}
      description={`${DateService.format(data.createdAt, DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT)} | ${
        data.workoutExercises.length
      } ejercicio${data.workoutExercises.length > 1 ? 's' : ''}`}
      isDeleteActionEnabled={false}
      isEditActionEnabled={false}
      isDetailActionEnabled={false}
    />
  );
};

export default WorkoutCard;
