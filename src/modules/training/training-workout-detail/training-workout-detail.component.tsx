import React, { FC } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import { Card, Col, Row, Typography } from 'antd';

import { Button, ListItem } from 'shared/modules';
import { useGetWorkoutQuery } from 'shared/generated';
import { WORKOUTS } from 'shared/routes';

const { Title } = Typography;

export interface Params {
  uuid: string;
}

const TrainingWorkoutDetail: FC = () => {
  const params = useParams<Params>();

  const history = useHistory();

  const uuid = params.uuid;

  const workout = useGetWorkoutQuery({
    variables: {
      where: {
        uuid
      }
    }
  });

  const completed = workout.data?.payload.workoutExercises;

  return (
    <Card style={{ height: '100%', marginTop: 10 }} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
      <Title style={{ marginLeft: 15 }} level={5}>
        Ejercicios completados:
      </Title>
      <Row>
        {completed
          ? completed.map(item => (
              <Col key={item.uuid} span={24}>
                <ListItem
                  title={item.exercise.name}
                  description={`${item.sets} x ${item.reps ? item.reps : item.seconds + 'seconds'} | ${
                    item.weight
                  } lbs`}
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
            Listo
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TrainingWorkoutDetail;
