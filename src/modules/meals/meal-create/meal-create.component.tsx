import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';

import { CREATE_MEAL_TITLE, IMealFormValues, MealForm } from 'modules/meals/meals.module';

import { MEALS } from 'shared/routes';
import { FormPage } from 'shared/modules';
import { useErrorHandler } from 'shared/hooks';
import { useGetAllIngredientsQuery, useCreateMealMutation } from 'shared/generated';

const MealCreate: FC = () => {
  const history = useHistory();

  const { data } = useGetAllIngredientsQuery({
    fetchPolicy: 'cache-and-network'
  });

  const [createMeal, { loading, error }] = useCreateMealMutation();

  useErrorHandler(error);

  const ingredients = data?.payload.map(({ uuid, name }) => ({ label: name, value: uuid }));

  const redirectToExercises = () => {
    history.push(MEALS);
  };

  const onSubmit = async ({ ingredients, ...data }: IMealFormValues) => {
    try {
      if (!loading) {
        await createMeal({
          variables: {
            data: {
              ...data,
              ingredients: ingredients.map(uuid => ({ uuid }))
            }
          }
        });

        redirectToExercises();
      }
    } catch (error) {}
  };

  return (
    <FormPage title={CREATE_MEAL_TITLE}>
      <MealForm onSubmit={onSubmit} ingredients={ingredients} isLoading={loading} />
    </FormPage>
  );
};

export default MealCreate;
