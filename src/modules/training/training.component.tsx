import React, { FC, useContext, useEffect, useState } from 'react';

import { Redirect, Switch, useHistory, useLocation } from 'react-router-dom';

import { Col, PageHeader, Row } from 'antd';

import { TrainingDayList, TrainingWorkoutDetail, TrainingWorkoutExerciseList } from 'modules/training/training.module';

import { Steps } from 'shared/modules';
import { PrivateRoute } from 'shared/modules/route';

import { NOT_FOUND, TRAINING, TRAINING_DETAIL, TRAINING_WORKOUT, WORKOUTS } from 'shared/routes';
import { AuthContext } from 'shared/contexts';
import { WorkoutRoutineService } from 'shared/services';

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

  const workoutExercises = WorkoutRoutineService.getActiveWorkoutExercises(user?.currentActivePlan?.workoutRoutine);

  if (!workoutExercises?.length) {
    return <Redirect to={NOT_FOUND} />;
  }

  return (
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
  );
};

export default Training;
