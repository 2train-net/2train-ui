import React, { FC, useContext, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router';

import {
  ExerciseCard,
  IExercisePayload,
  SINGULAR_EXERCISES_TITLE,
  PLURAL_EXERCISES_TITLE
} from 'modules/exercises/exercises.module';

import { MasterList } from 'shared/modules';
import { AuthContext, ModalContext } from 'shared/contexts';
import { DELETE_MODAL } from 'shared/constants';
import { EXERCISES, DELETE } from 'shared/routes';
import { useGetExercisesQuery, UserType } from 'shared/generated';

const ExerciseList: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const { user } = useContext(AuthContext);
  const modalProvider = useContext(ModalContext);

  const isPersonaTrainer = user?.type === UserType.PersonalTrainer;

  const redirectToExercises = () => {
    history.push(EXERCISES);
  };

  const deleteExercise = () => {};

  const displayDeleteConfirmation = () => {
    modalProvider.show({
      ...DELETE_MODAL,
      onConfirm: deleteExercise,
      onCancel: redirectToExercises
    });
  };

  useEffect(() => {
    if (location.pathname.match(DELETE)) {
      displayDeleteConfirmation();
    }
  }, [location]);

  return (
    <MasterList<IExercisePayload>
      title={[SINGULAR_EXERCISES_TITLE, PLURAL_EXERCISES_TITLE]}
      render={ExerciseCard}
      isCreateButtonAvailable={isPersonaTrainer}
      useQuery={useGetExercisesQuery}
    />
  );
};

export default ExerciseList;
