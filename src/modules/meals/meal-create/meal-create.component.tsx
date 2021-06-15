import React, { FC } from 'react';

import { useHistory } from 'react-router-dom';

import { Card } from 'antd';

import { CREATE_MEAL_TITLE, IMealFormValues, MealForm } from 'modules/meals/meals.module';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { MEALS } from 'shared/routes';
import { useGetAllIngredientsQuery, useCreateMealMutation } from 'shared/generated';

const MealCreate: FC = () => {
  const history = useHistory();

  const { data } = useGetAllIngredientsQuery({
    fetchPolicy: 'cache-and-network'
  });

  const [createMeal] = useCreateMealMutation();

  const ingredients = data?.payload.map(({ uuid, name }) => ({ label: name, value: uuid }));

  const redirectToExercises = () => {
    history.push(MEALS);
  };

  const onSubmit = async ({ ingredients, ...data }: IMealFormValues) => {
    try {
      await createMeal({
        variables: {
          data: {
            ...data,
            ingredients: ingredients.map(uuid => ({ uuid }))
          }
        }
      });

      redirectToExercises();
    } catch (error) {}
  };

  return (
    <>
      <FormHeader title={CREATE_MEAL_TITLE} />
      <br />
      <Card>
        <MealForm onSubmit={onSubmit} ingredients={ingredients} />
      </Card>
    </>
  );
};

export default MealCreate;
