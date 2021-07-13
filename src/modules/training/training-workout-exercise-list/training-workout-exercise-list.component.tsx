import React, { FC, useContext, useEffect, useRef, useState } from 'react';

import { Redirect, useHistory, useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import { Card, Col, Row, Typography, Button as AButton } from 'antd';

import {
  ITrainingWorkoutExercise,
  TrainingWorkoutExerciseForm,
  TrainingContext
} from 'modules/training/training.module';

import { DETAIL, NOT_FOUND, TRAINING } from 'shared/routes';
import { Button, Icon, ListItem, Skeleton } from 'shared/modules';
import { AuthContext, ModalContext } from 'shared/contexts';
import { TrainingService, WorkoutRoutineService } from 'shared/services';
import { useGetTrainingQuery, useCreateWorkoutMutation } from 'shared/generated';
import { COMPLETE_TEXT, DAY_TEXT, FINALIZE_TEXT, LBS_TEXT, SECONDS_TEXT, UNCOMPLETE_TEXT } from 'shared/constants';

import useStyles from './training-workout-exercise-list.style';

const { parseToTrainingWorkoutExercise, parseToWorkoutExercises } = TrainingService;

const { parseNumberToDay } = WorkoutRoutineService;

const { Title } = Typography;

interface ITrainingWorkoutExercisesFormValues {
  workoutExercises: ITrainingWorkoutExercise[];
}

const TrainingWorkoutExerciseList: FC = () => {
  const classes = useStyles();

  const { user } = useContext(AuthContext);

  const { hasWorkoutExerciseListChange, setHasWorkoutExerciseListChange } = useContext(TrainingContext);

  const history = useHistory();

  const params = useParams<{ day: string }>();

  const day = parseInt(params.day);

  const modalProvider = useContext(ModalContext);

  const itemFormRef = useRef<HTMLFormElement>(null);

  const [createWorkout, { loading }] = useCreateWorkoutMutation();

  const training = useGetTrainingQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        day: parseNumberToDay(day)
      }
    }
  });

  const displayUpdateModal = (workoutExercise: ITrainingWorkoutExercise, index: number) => {
    const { completed } = values.workoutExercises[index];

    modalProvider.show({
      type: 'secondary',
      title: workoutExercise.exercise.name,
      confirmText: values.workoutExercises[index].completed ? UNCOMPLETE_TEXT : COMPLETE_TEXT,
      icon: 'thunderbolt',
      contentRender: (
        <TrainingWorkoutExerciseForm
          initialValues={{ workoutExercise, focus: 2 }}
          onComplete={data => {
            if (parsed) {
              setFieldValue(
                `workoutExercises[${index}]`,
                completed ? parsed[index] : (data.workoutExercise as ITrainingWorkoutExercise)
              );
            }
            setFieldValue(`workoutExercises[${index}].completed`, !completed);
            modalProvider.close();
          }}
          formRef={itemFormRef}
        />
      ),
      onConfirm: () => {
        itemFormRef?.current?.dispatchEvent(new Event('submit'));
      }
    });
  };

  const onFinalize = async () => {
    const create = parseToWorkoutExercises(values.workoutExercises);

    if (!loading) {
      if (create.length) {
        const workout = await createWorkout({
          variables: {
            data: {
              workoutRoutine: {
                uuid: user?.currentActivePlan?.workoutRoutine?.uuid
              },
              workoutExercises: {
                create
              }
            }
          }
        });
        history.push(`${TRAINING}/${DETAIL}/${workout.data?.payload.uuid}`);
      }
    }
  };

  useEffect(() => {
    setWorkoutExercises(parsed ? parsed : []);
  }, [training]);

  const routineWorkoutExercises = training.data?.payload?.workoutExercises;

  const parsed = parseToTrainingWorkoutExercise(routineWorkoutExercises);

  const [workoutExercises, setWorkoutExercises] = useState<ITrainingWorkoutExercise[]>(parsed ? parsed : []);

  const { values, handleSubmit, setFieldValue } = useFormik<ITrainingWorkoutExercisesFormValues>({
    onSubmit: onFinalize,
    initialValues: { workoutExercises },
    enableReinitialize: true
  });

  const isAtLeastOneCompleted = values.workoutExercises.filter(({ completed }) => completed).length > 0;

  useEffect(() => {
    if (hasWorkoutExerciseListChange && !isAtLeastOneCompleted) {
      setHasWorkoutExerciseListChange(false);
    }
    if (!hasWorkoutExerciseListChange && isAtLeastOneCompleted) {
      setHasWorkoutExerciseListChange(true);
    }
  }, [isAtLeastOneCompleted]);

  if (!routineWorkoutExercises?.length && !training.loading) {
    return <Redirect to={NOT_FOUND} />;
  }

  return (
    <Card className={classes.root} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
      <Row>
        <Col span={24}>
          <Title className="title" level={5}>
            {DAY_TEXT} {day + 1}:{' '}
          </Title>
        </Col>

        <Skeleton isLoading={training.loading} type="input" multiple={3} fullWidth>
          {values.workoutExercises.map((item, index) => (
            <Col key={`${index}-${item.uuid}`} span={24}>
              <ListItem
                title={item.exercise.name}
                description={`${item.sets} x ${item.reps ? item.reps : item.seconds + SECONDS_TEXT} | ${
                  item.weight
                } ${LBS_TEXT}`}
                key={item.uuid}
                isDetailActionEnabled={!item.completed}
                onDetail={() => displayUpdateModal(item, index)}
                actions={
                  item.completed
                    ? [
                        <AButton
                          shape="circle"
                          icon={<Icon type="check" />}
                          onClick={() => displayUpdateModal(item, index)}
                        />
                      ]
                    : []
                }
              />
            </Col>
          ))}
        </Skeleton>

        <Col span={24} className="submit-button">
          <Button
            size="medium"
            color="secondary"
            fullWidth
            onClick={handleSubmit}
            loading={training.loading || loading}
            disabled={!isAtLeastOneCompleted || loading}
          >
            {FINALIZE_TEXT}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TrainingWorkoutExerciseList;
