import React, { FC, useContext, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router';

import { ExerciseCard, IExercisePayload } from 'modules/exercises/exercises.module';

import { MasterList } from 'shared/modules';
import { ModalContext } from 'shared/contexts';
import { DELETE_MODAL } from 'shared/constants';
import { EXERCISES, DELETE } from 'shared/routes';
import { useGetExercisesQuery } from 'shared/generated';

const ExerciseList: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const modalProvider = useContext(ModalContext);

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

  return <MasterList<IExercisePayload> title="Exercises" render={ExerciseCard} useQuery={useGetExercisesQuery} />;
};

export default ExerciseList;
