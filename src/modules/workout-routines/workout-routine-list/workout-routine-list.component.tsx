import React, { FC, useContext, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router';

import {
  WorkoutRoutineCard,
  IWorkoutRoutinePayload,
  SINGULAR_ROUTINE_TEMPLATE_TITLE,
  PLURAL_ROUTINE_TEMPLATE_TITLE,
} from 'modules/workout-routines/workout-routines.module';

import { MasterList } from 'shared/modules';
import { AuthContext, ModalContext } from 'shared/contexts';
import { DELETE_MODAL } from 'shared/constants';
import { DELETE, WORKOUT_ROUTINES } from 'shared/routes';
import { useGetWorkoutRoutinesQuery, UserType, WorkoutRoutineWhereInput } from 'shared/generated';

const ExerciseList: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const { user } = useContext(AuthContext);
  const modalProvider = useContext(ModalContext);

  const isPersonaTrainer = user?.type === UserType.PersonalTrainer;

  const redirectToWorkoutRoutines = () => {
    history.push(WORKOUT_ROUTINES);
  };

  const deleteWorkoutRoutine = () => {};

  const displayDeleteConfirmation = () => {
    modalProvider.show({
      ...DELETE_MODAL,
      onConfirm: deleteWorkoutRoutine,
      onCancel: redirectToWorkoutRoutines,
    });
  };

  useEffect(() => {
    if (location.pathname.match(DELETE)) {
      displayDeleteConfirmation();
    }
  }, [location]);

  return (
    <MasterList<IWorkoutRoutinePayload, WorkoutRoutineWhereInput>
      title={[SINGULAR_ROUTINE_TEMPLATE_TITLE, PLURAL_ROUTINE_TEMPLATE_TITLE]}
      render={WorkoutRoutineCard}
      isCreateButtonAvailable={isPersonaTrainer}
      useQuery={useGetWorkoutRoutinesQuery}
    />
  );
};

export default ExerciseList;
