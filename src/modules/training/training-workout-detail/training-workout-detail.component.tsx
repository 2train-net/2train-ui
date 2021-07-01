import React, { FC } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import { Card, Col, Row, Typography } from 'antd';

import { WORKOUTS } from 'shared/routes';
import { Button, ListItem } from 'shared/modules';
import { useGetWorkoutQuery } from 'shared/generated';
import { LBS_TEXT, READY_TEXT, SECONDS_TEXT } from 'shared/constants';
import { COMPLETED_EXERCISES_TITLE } from '../shared/constants';

const { Title } = Typography;

const TrainingWorkoutDetail: FC = () => {
  const params = useParams<{ uuid: string }>();

  const history = useHistory();

  const uuid = params.uuid;

  const workout = useGetWorkoutQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        uuid
      }
    }
  });

  const completed = workout.data?.payload.workoutExercises;

  return (
    <Card style={{ height: '100%', marginTop: 24 }} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
      <Title style={{ marginLeft: 15 }} level={5}>
        {COMPLETED_EXERCISES_TITLE}
      </Title>
      <Row>
        {completed
          ? completed.map((item, index) => (
              <Col key={`${index}-${item.uuid}`} span={24}>
                <ListItem
                  title={item.exercise.name}
                  description={`${item.sets} x ${item.reps ? item.reps : item.seconds + SECONDS_TEXT} | ${
                    item.weight
                  } ${LBS_TEXT}`}
                  key={item.uuid}
                  emptyActions
                />
              </Col>
            ))
          : ''}
        <Col span={24} style={{ marginTop: 40, justifyContent: 'center', paddingRight: 30, paddingLeft: 30 }}>
          <Button
            size="medium"
            color="secondary"
            fullWidth
            onClick={() => history.push(WORKOUTS)}
            loading={workout.loading}
          >
            {READY_TEXT}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TrainingWorkoutDetail;
