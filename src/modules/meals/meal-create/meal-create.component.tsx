import React, { FC, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import { Card } from 'antd';

import { CREATE_MEAL_TITLE, IMealFormValues, MealForm } from 'modules/meals/meals.module';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { MEALS } from 'shared/routes';
import { Message } from 'shared/modules';
import { useGetAllIngredientsQuery, useCreateMealMutation } from 'shared/generated';

const MealCreate: FC = () => {
  const history = useHistory();

  const { data } = useGetAllIngredientsQuery({
    fetchPolicy: 'cache-and-network'
  });

  const [createMeal, { loading, error }] = useCreateMealMutation();

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

  useEffect(() => {
    if (error) {
      Message.error(error.graphQLErrors[0].message);
    }
  }, [error]);

  return (
    <>
      <FormHeader title={CREATE_MEAL_TITLE} />
      <br />
      <Card>
        <MealForm onSubmit={onSubmit} ingredients={ingredients} isLoading={loading} />
      </Card>
    </>
  );
};

export default MealCreate;
