import React, { FC } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import { Card, Col, Row, Typography } from 'antd';

import { WORKOUTS } from 'shared/routes';
import { Button, ListItem } from 'shared/modules';
import { useGetWorkoutQuery } from 'shared/generated';

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
    <Card style={{ height: '100%', marginTop: 10 }} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
      <Title style={{ marginLeft: 15 }} level={5}>
        Ejercicios completados:
      </Title>
      <Row>
        {completed
          ? completed.map((item, index) => (
              <Col key={`${index}-${item.uuid}`} span={24}>
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
            {workout.loading ? '' : 'Listo'}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TrainingWorkoutDetail;
