import React, { FC, useEffect } from 'react';

import { useRouteMatch } from 'react-router-dom';

import { Card } from 'antd';

import { IMealFormValues, MealForm, UPDATE_MEAL_TITLE } from 'modules/meals/meals.module';

import FormHeader from 'shared/modules/form-header/form-header.component';

import { Message } from 'shared/modules';
import { arrayDifferences, objectDifferences } from 'shared/util';
import { useGetAllIngredientsQuery, useUpdateMealMutation, useGetMealQuery, GetMealDocument } from 'shared/generated';

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

  const [updateMeal, updateMealPayload] = useUpdateMealMutation();

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
      if (!updateMealPayload.loading) {
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
      }
    } catch (error) {}
  };

  useEffect(() => {
    const { error } = mealPayload || updateMealPayload;

    if (error) {
      Message.error(error.graphQLErrors[0].message);
    }
  }, [mealPayload.error, updateMealPayload.error]);

  return (
    <>
      <FormHeader title={UPDATE_MEAL_TITLE} />
      <br />
      <Card>
        <MealForm
          onSubmit={onSubmit}
          ingredients={ingredients}
          initialValues={meal}
          isLoading={mealPayload.loading || updateMealPayload.loading}
        />
      </Card>
    </>
  );
};

export default MealUpdate;
