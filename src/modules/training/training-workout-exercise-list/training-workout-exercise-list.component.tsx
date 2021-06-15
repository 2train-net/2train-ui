import React, { FC, useContext, useEffect, useRef, useState } from 'react';

import { Redirect, useHistory, useParams } from 'react-router-dom';

import { useFormik } from 'formik';

import { Card, Col, Row, Typography } from 'antd';

import { ITrainingWorkoutExercise, TrainingWorkoutExerciseForm } from 'modules/training/training.module';

import { NOT_FOUND, TRAINING } from 'shared/routes';
import { Button, Icon, ListItem } from 'shared/modules';
import { AuthContext, ModalContext } from 'shared/contexts';
import { TrainingService, WorkoutRoutineService } from 'shared/services';
import { useGetTrainingQuery, useCreateWorkoutMutation } from 'shared/generated';
import { COMPLETE_TEXT, DAY_TEXT, FINALIZE_TEXT } from 'shared/constants';

const { parseToTrainingWorkoutExercise, parseToWorkoutExercises } = TrainingService;

const { parseNumberToDay } = WorkoutRoutineService;

const { Title } = Typography;

interface ITrainingWorkoutExercisesFormValues {
  workoutExercises: ITrainingWorkoutExercise[];
}

const TrainingWorkoutExerciseList: FC = () => {
  const { user } = useContext(AuthContext);

  const history = useHistory();

  const params = useParams<{ day: string }>();

  const day = parseInt(params.day);

  const modalProvider = useContext(ModalContext);

  const itemFormRef = useRef<HTMLFormElement>(null);

  const [createWorkout] = useCreateWorkoutMutation();

  const training = useGetTrainingQuery({
    fetchPolicy: 'network-only',
    variables: {
      where: {
        day: parseNumberToDay(day)
      }
    }
  });

  const displayUpdateModal = (workoutExercise: ITrainingWorkoutExercise, index: number) => {
    modalProvider.show({
      type: 'secondary',
      title: workoutExercise.exercise.name,
      confirmText: COMPLETE_TEXT,
      icon: 'thunderbolt',
      contentRender: (
        <TrainingWorkoutExerciseForm
          initialValues={{ workoutExercise, focus: 2 }}
          onComplete={data => {
            values.workoutExercises[index] = data.workoutExercise as ITrainingWorkoutExercise;
            values.workoutExercises[index].completed = true;
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

      history.push(`${TRAINING}/detail/${workout.data?.payload.uuid}`);
    }
  };

  useEffect(() => {
    setWorkoutExercises(parsed ? parsed : []);
  }, [training]);

  const routineWorkoutExercises = training.data?.payload?.workoutExercises;

  const parsed = parseToTrainingWorkoutExercise(routineWorkoutExercises);

  const [workoutExercises, setWorkoutExercises] = useState<ITrainingWorkoutExercise[]>(parsed ? parsed : []);

  const { handleSubmit, values } = useFormik<ITrainingWorkoutExercisesFormValues>({
    onSubmit: onFinalize,
    initialValues: { workoutExercises },
    enableReinitialize: true
  });

  console.log(routineWorkoutExercises);

  if (!routineWorkoutExercises?.length && !training.loading) {
    return <Redirect to={NOT_FOUND} />;
  }

  const isAtLeastOneCompleted = values.workoutExercises.filter(({ completed }) => completed).length > 0;

  return (
    <Card style={{ height: '100%', marginTop: 10 }} bodyStyle={{ paddingLeft: 0, paddingRight: 0 }}>
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
              actions={item.completed ? [<Icon type="check" />] : []}
            />
          </Col>
        ))}

        <Col span={24} style={{ marginTop: 40, justifyContent: 'center', paddingRight: 30, paddingLeft: 30 }}>
          <Button
            size="medium"
            color="secondary"
            fullWidth
            onClick={handleSubmit}
            loading={training.loading}
            disabled={!isAtLeastOneCompleted}
          >
            {training.loading ? '' : FINALIZE_TEXT}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TrainingWorkoutExerciseList;
