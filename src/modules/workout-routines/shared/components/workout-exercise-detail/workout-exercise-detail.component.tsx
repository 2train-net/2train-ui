import React, { FC } from 'react';

import { Col, Row, Typography } from 'antd';

import {
  COMMENTS_TITLE,
  REPS_TITLE,
  SECONDS_TITLE,
  SETS_TITLE,
  WEIGHT_TITLE,
  INITIAL_WORKOUT_EXERCISE_FORM_VALUES,
  IWorkoutExerciseFormValues
} from 'modules/workout-routines/workout-routines.module';

import { NONE_TEXT } from 'shared/constants';

const { Text } = Typography;

interface IWorkoutExerciseForm {
  values?: IWorkoutExerciseFormValues;
}

const WorkoutExerciseDetail: FC<IWorkoutExerciseForm> = ({ values = INITIAL_WORKOUT_EXERCISE_FORM_VALUES }) => {
  return (
    <>
      <Row>
        <Col span={8}>
          <Text strong>{`${SETS_TITLE}: `}</Text>
          <Text>{values.sets}</Text>
        </Col>
        {values.reps ? (
          <Col span={8}>
            <Text strong>{`${REPS_TITLE}: `}</Text>
            <Text>{values.reps}</Text>
          </Col>
        ) : (
          <Col span={8}>
            <Text strong>{`${SECONDS_TITLE}: `}</Text>
            <Text>{values.seconds}</Text>
          </Col>
        )}
        <Col span={8}>
          <Text strong>{`${WEIGHT_TITLE}: `}</Text>
          <Text>{values.weight}</Text>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={24}>
          <Text strong>{`${COMMENTS_TITLE}: `}</Text>
          <Text>{values.comments?.length ? values.comments : NONE_TEXT}</Text>
        </Col>
      </Row>
    </>
  );
};

export default WorkoutExerciseDetail;
