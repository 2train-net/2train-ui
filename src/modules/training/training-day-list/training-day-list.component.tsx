import React, { FC, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Card, Col, Typography } from 'antd';

import _ from 'lodash';

import { ListItem } from 'shared/modules';
import { AuthContext } from 'shared/contexts';
import { IWorkoutExercise } from 'shared/model';
import { WorkoutRoutineService } from 'shared/services';

import { SELECT_TRAINING_DAY_TITLE } from 'modules/training/training.module';
import { DAY_TEXT } from 'shared/constants';
import { AMOUNT_OF_EXERCISES_TEXT } from '../shared/constants';

const { parseNumberToDay, getMaxDay } = WorkoutRoutineService;

const { Title } = Typography;

const TrainingDayList: FC = () => {
  const { user } = useContext(AuthContext);

  const history = useHistory();

  const workoutExercises = WorkoutRoutineService.getActiveWorkoutExercises(user?.currentActivePlan?.workoutRoutine);

  const days = Array.from(Array(getMaxDay(workoutExercises) + 1).keys());

  const grouped = _.groupBy(workoutExercises, 'day');

  const calculateAmountOfWorkoutExercises = (workoutExercises: IWorkoutExercise[]) => {
    return workoutExercises.reduce((acc, current) => {
      if (!current.workoutId) acc++;
      return acc;
    }, 0);
  };

  return (
    <Card style={{ height: '100%', marginTop: 10 }} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
      <Title style={{ marginLeft: 15 }} level={5}>
        {SELECT_TRAINING_DAY_TITLE}
      </Title>

      {days.map(day => {
        return parseNumberToDay(day) in grouped ? (
          <Col span={24} key={`list-item-${day}`}>
            <ListItem
              title={`${DAY_TEXT} ${day + 1}`}
              description={`${AMOUNT_OF_EXERCISES_TEXT}: ${calculateAmountOfWorkoutExercises(
                grouped[parseNumberToDay(day)]
              )}`}
              onDetail={() => history.push(`training/workout/${day}`)}
            />
          </Col>
        ) : (
          ''
        );
      })}
    </Card>
  );
};

export default TrainingDayList;
