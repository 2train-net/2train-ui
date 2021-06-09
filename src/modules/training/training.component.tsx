import React, { FC, useContext, useEffect, useState } from 'react';

import { Redirect, Switch, useHistory, useLocation } from 'react-router-dom';

import { Col, PageHeader, Result, Row } from 'antd';

import { TrainingDayList, TrainingWorkoutDetail, TrainingWorkoutExerciseList } from 'modules/training/training.module';

import { AuthContext } from 'shared/contexts';
import { Button, Steps } from 'shared/modules';
import { PrivateRoute } from 'shared/modules/route';

import { NOT_FOUND, TRAINING, TRAINING_DETAIL, TRAINING_WORKOUT, WORKOUTS } from 'shared/routes';

enum TrainingSteps {
  SELECT_DAY,
  TRAINING,
  DETAIL
}

const steps = [{ label: 'Días' }, { label: 'Entrenar' }, { label: 'Detalle' }];

const Training: FC = () => {
  const { user } = useContext(AuthContext);

  const [current, setCurrent] = useState(TrainingSteps.SELECT_DAY);

  const history = useHistory();

  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    if (pathname === TRAINING) {
      setCurrent(TrainingSteps.SELECT_DAY);
    }
    if (pathname.includes('workout')) {
      setCurrent(TrainingSteps.TRAINING);
    }
    if (pathname.includes('detail')) {
      setCurrent(TrainingSteps.DETAIL);
    }
  }, [location]);

  const onChangeSteps = (next: number) => {
    if (current === TrainingSteps.TRAINING && next === TrainingSteps.SELECT_DAY) {
      setCurrent(next);
      history.push(TRAINING);
    }
  };

  return (
    <div>
      {user?.currentActivePlan?.workoutRoutine ? (
        <>
          <PageHeader ghost={false}>
            <Steps color="secondary" steps={steps} activeStep={current} onChange={onChangeSteps}></Steps>
          </PageHeader>

          <Row>
            <Col span={24}>
              <Switch>
                <PrivateRoute exact path={TRAINING_WORKOUT} component={TrainingWorkoutExerciseList} />

                <PrivateRoute exact path={TRAINING_DETAIL} component={TrainingWorkoutDetail} />

                <PrivateRoute exact path={TRAINING} component={TrainingDayList} />

                <Redirect to={NOT_FOUND} />
              </Switch>
            </Col>
          </Row>
        </>
      ) : (
        <Result
          title="No cuenta con rutina de ejercicios activa"
          status="error"
          extra={
            <Button color="danger" key="console" onClick={() => history.push(WORKOUTS)}>
              Volver
            </Button>
          }
        />
      )}
    </div>
  );
};

export default Training;
