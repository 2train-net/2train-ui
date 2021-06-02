import React, { FC } from 'react';

import { Redirect, Switch } from 'react-router-dom';

import { MealList, MealCreate, MealUpdate } from 'modules/meals/meals.module';

import { NOT_FOUND, MEALS, MEAL_ADD, MEAL_EDIT, MEAL_DELETE } from 'shared/routes';
import { PrivateRoute } from 'shared/modules/route';

const Meals: FC = () => (
  <Switch>
    <PrivateRoute exact path={MEAL_ADD} component={MealCreate} />
    <PrivateRoute exact path={MEAL_EDIT} component={MealUpdate} />
    <PrivateRoute exact path={MEAL_DELETE} component={MealList} />
    <PrivateRoute exact path={MEALS} component={MealList} />

    <Redirect to={NOT_FOUND} />
  </Switch>
);

export default Meals;
