import React, { FC, useContext, useEffect, useState } from 'react';

import { Redirect, useHistory, useLocation } from 'react-router-dom';

import { Col, PageHeader, Row } from 'antd';

import { TrainingContext } from 'modules/training/training.module';

import { Steps } from 'shared/modules';
import { NOT_FOUND, TRAINING } from 'shared/routes';
import { WorkoutRoutineService } from 'shared/services';
import { AuthContext, ModalContext } from 'shared/contexts';
import { ALERT_UNSAVED_MODAL, DAYS_TEXT, DETAIL_TEXT, TO_TRAIN_TEXT } from 'shared/constants';

enum TrainingSteps {
  SELECT_DAY,
  TRAINING,
  DETAIL
}

const steps = [{ label: DAYS_TEXT }, { label: TO_TRAIN_TEXT }, { label: DETAIL_TEXT }];

const TrainingLayout: FC = ({ children }) => {
  const { user } = useContext(AuthContext);

  const { hasWorkoutExerciseListChange } = useContext(TrainingContext);

  const [current, setCurrent] = useState(TrainingSteps.SELECT_DAY);

  const history = useHistory();

  const location = useLocation();

  const modalProvider = useContext(ModalContext);

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
      if (hasWorkoutExerciseListChange) {
        modalProvider.show({
          ...ALERT_UNSAVED_MODAL,
          onConfirm: () => {
            setCurrent(next);
            history.push(TRAINING);
          }
        });
      } else {
        setCurrent(next);
        history.push(TRAINING);
      }
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
        <Col span={24}>{children}</Col>
      </Row>
    </>
  );
};

export default TrainingLayout;
