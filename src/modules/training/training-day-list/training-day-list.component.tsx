import React, { FC, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Card, Col, Typography } from 'antd';

import _ from 'lodash';

import { ListItem } from 'shared/modules';
import { AuthContext } from 'shared/contexts';
import { IWorkoutExercise } from 'shared/model';
import { WorkoutRoutineService } from 'shared/services';

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
        Elegir día de entrenamiento:
      </Title>

      {days.map(day => {
        return parseNumberToDay(day) in grouped ? (
          <Col span={24} key={`list-item-${day}`}>
            <ListItem
              title={`Día ${day + 1}`}
              description={`Cantidad de ejercicios: ${calculateAmountOfWorkoutExercises(
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
