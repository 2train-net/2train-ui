import React, { FC } from 'react';

import { useRouteMatch } from 'react-router-dom';

import { Card } from 'antd';

import { IMealFormValues, MealForm, UPDATE_MEAL_TITLE } from 'modules/meals/meals.module';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { useGetAllIngredientsQuery, useUpdateMealMutation, useGetMealQuery, GetMealDocument } from 'shared/generated';
import { arrayDifferences, objectDifferences } from 'shared/util';

const MealUpdate: FC = () => {
  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const where = { uuid };

  const ingredientsPayload = useGetAllIngredientsQuery({
    fetchPolicy: 'cache-and-network'
  });

  const mealPayload = useGetMealQuery({
    variables: {
      where
    }
  });

  const [updateMeal] = useUpdateMealMutation();

  const { mealIngredients = [], image, ...mealInfo } = mealPayload?.data?.payload! || {};
  const meal = {
    ...mealInfo,
    imageBase64: image,
    ingredients: mealIngredients.map(({ ingredient: { uuid } }) => uuid)
  };
  const ingredients = ingredientsPayload.data?.payload.map(({ uuid, name }) => ({ label: name, value: uuid }));

  const onSubmit = async ({ ingredients: newIngredients, ...values }: IMealFormValues) => {
    // TODO ADD INTERFACE FOR THE RESPONSE OF THE objectDifferences
    const data = objectDifferences(values, { ...mealInfo, imageBase64: image });
    const differences = arrayDifferences(meal.ingredients, newIngredients);

    try {
      await updateMeal({
        variables: {
          where,
          data: {
            ...data,
            ingredients: {
              create: differences.create.map(uuid => ({ uuid })),
              delete: differences.delete.map(uuid => ({ uuid }))
            }
          }
        },
        update: (cache, { data }) => {
          cache.writeQuery({
            data,
            query: GetMealDocument,
            variables: {
              where
            }
          });
        }
      });
    } catch (error) {}
  };

  return (
    <>
      <FormHeader title={UPDATE_MEAL_TITLE} />
      <br />
      <Card>
        <MealForm onSubmit={onSubmit} ingredients={ingredients} initialValues={meal} />
      </Card>
    </>
  );
};

export default MealUpdate;
