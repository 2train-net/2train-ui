import React, { FC } from 'react';

import { IWorkoutPayload } from 'modules/workouts/shared/model';

import { DEFAULT_DATE_FORMAT, ISO } from 'shared/constants';
import { Avatar, ListCard } from 'shared/modules';
import { DateService, UserService } from 'shared/services';

import { IMasterComponent } from 'shared/modules/master-list/master-list.util';

interface IWorkoutCard extends IMasterComponent<IWorkoutPayload> {
  data: IWorkoutPayload;
}

const WorkoutCard: FC<IWorkoutCard> = ({ data }) => {
  const user = data.workoutRoutine.plan.planAssociations[0].user;

  return (
    <ListCard
      leftContent={
        <Avatar size="large" url={user.avatar} letter={UserService.getAvatarLetters(user.firstName, user.lastName)} />
      }
      uuid={data.uuid}
      title={data.workoutRoutine.plan.name}
      description={`${DateService.format(data.createdAt, DEFAULT_DATE_FORMAT, ISO)} | ${
        data.workoutExercises.length
      } ejercicios`}
      isDeleteActionEnabled={false}
      isEditActionEnabled={false}
    />
  );
};

export default WorkoutCard;
