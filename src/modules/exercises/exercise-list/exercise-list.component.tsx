import React, { FC } from 'react';

import { ExerciseCard } from 'modules/exercises/shared/components';

import MasterList from 'shared/modules/master-list/master-list.component';

import { useGetExercisesQuery } from 'shared/generated/graphql-schema';

import { IExercise } from '../shared/model';

const ExerciseList: FC = () => {
  return <MasterList<IExercise> title="Exercises" render={ExerciseCard} useQuery={useGetExercisesQuery} />;
};

export default ExerciseList;
