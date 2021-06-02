import React, { FC } from 'react';

import { MealCard, IMealPayload, SINGULAR_MEALS_TITLE, PLURAL_MEALS_TITLE } from 'modules/meals/meals.module';

import { MasterList } from 'shared/modules';
import { useGetMealsQuery, useDeleteMealMutation } from 'shared/generated';

const MealList: FC = () => {
  return (
    <MasterList<IMealPayload>
      title={[SINGULAR_MEALS_TITLE, PLURAL_MEALS_TITLE]}
      render={MealCard}
      useQuery={useGetMealsQuery}
      useDeleteMutation={useDeleteMealMutation}
    />
  );
};

export default MealList;
