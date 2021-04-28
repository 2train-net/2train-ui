import React, { FC, useContext, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router';

import ExerciseCard from 'modules/exercises/shared/components/exercise-card/exercise-card.component';
import { IExercisePayload } from '../shared/model';

import MasterList from 'shared/modules/master-list/master-list.component';
import { ModalContext } from 'shared/contexts';
import { DELETE_MODAL } from 'shared/constants';
import { useGetExercisesQuery } from 'shared/generated/graphql-schema';

const ExerciseList: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const modalProvider = useContext(ModalContext);

  const redirectToExercises = () => {
    history.push('/exercises');
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
    if (location.pathname.match('delete')) {
      displayDeleteConfirmation();
    }
  }, [location]);

  return <MasterList<IExercisePayload> title="Exercises" render={ExerciseCard} useQuery={useGetExercisesQuery} />;
};

export default ExerciseList;
