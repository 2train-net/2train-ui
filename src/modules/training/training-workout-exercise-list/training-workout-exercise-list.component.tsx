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
import { Button, Icon, ListItem } from 'shared/modules';
import { AuthContext, ModalContext } from 'shared/contexts';
import { TrainingService, WorkoutRoutineService } from 'shared/services';
import { useGetTrainingQuery, useCreateWorkoutMutation } from 'shared/generated';
import { COMPLETE_TEXT, DAY_TEXT, FINALIZE_TEXT, UNCOMPLETE_TEXT } from 'shared/constants';

const { parseToTrainingWorkoutExercise, parseToWorkoutExercises } = TrainingService;

const { parseNumberToDay } = WorkoutRoutineService;

const { Title } = Typography;

interface ITrainingWorkoutExercisesFormValues {
  workoutExercises: ITrainingWorkoutExercise[];
}

const TrainingWorkoutExerciseList: FC = () => {
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
    <Card style={{ height: '100%', marginTop: 24 }} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
      <Row>
        <Title style={{ marginLeft: 15 }} level={5}>
          {DAY_TEXT} {day + 1}:{' '}
        </Title>

        {values.workoutExercises.map((item, index) => (
          <Col key={`${index}-${item.uuid}`} span={24}>
            <ListItem
              title={item.exercise.name}
              description={`${item.sets} x ${item.reps ? item.reps : item.seconds + 'seconds'} | ${item.weight} lbs`}
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
                      ></AButton>
                    ]
                  : []
              }
            />
          </Col>
        ))}

        <Col span={24} style={{ marginTop: 40, justifyContent: 'center', paddingRight: 30, paddingLeft: 30 }}>
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
