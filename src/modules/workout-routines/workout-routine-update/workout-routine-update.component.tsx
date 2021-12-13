import React, { FC, useContext, useEffect, useState } from 'react';

import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';

import { Button } from 'antd';

import {
  useGetAllWorkoutRoutinesQuery,
  useGetWorkoutRoutineQuery,
  useGetAllExercisesQuery,
  useUpdateWorkoutRoutineMutation,
  UserType
} from 'shared/generated';

import { parseWorkoutExerciseToItem, parseUpdate, parseCreate, parseDelete } from './workout-routine-update.util';

import {
  ExerciseItemCard,
  WorkoutExerciseItemCard,
  ExerciseOptionCreate,
  WorkoutExerciseForm,
  WORKOUT_EXERCISE_MODAL,
  EXERCISE_NOT_EXISTS_TEXT,
  NOT_REPEAT_EXERCISE_EXCEPTION,
  SEARCH_EXERCISE_TEXT,
  TEMPLATE_ROUTINES_MODAL,
  IWorkoutExercisePayload,
  IMPORT_TEMPLATE_MODAL
} from 'modules/workout-routines/workout-routines.module';

import { useErrorHandler } from 'shared/hooks';
import { WorkoutRoutineService } from 'shared/services';
import { AuthContext, ModalContext } from 'shared/contexts';
import { DETAIL, NOT_FOUND, PLANS, WORKOUT_ROUTINES } from 'shared/routes';
import { DragAndDropRoutine, Icon, ListItem } from 'shared/modules';
import { EXERCISES_TEXT, WORKOUT_ROUTINE_TEXT } from 'shared/constants';
import { IDragAndDropRoutineFormValues } from 'shared/modules/drag-and-drop-routine/shared/model/column-items.interface';

const WorkoutRoutineUpdate: FC = () => {
  const { getMaxDay } = WorkoutRoutineService;

  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();
  const history = useHistory();
  const { user } = useContext(AuthContext);

  const where = { uuid };
  const redirect = history.push;
  const isEditModeEnabled = user?.type === UserType.PersonalTrainer;

  const workoutRoutine = useGetWorkoutRoutineQuery({
    fetchPolicy: 'network-only',
    variables: {
      where
    }
  });

  useErrorHandler(workoutRoutine.error);

  const modalProvider = useContext(ModalContext);

  const exercises = useGetAllExercisesQuery();

  const [workoutExercises, setWorkoutExercises] = useState<IWorkoutExercisePayload[]>();

  const templateRoutines = useGetAllWorkoutRoutinesQuery();

  const notFound = !workoutRoutine.data?.payload && !workoutRoutine.loading;

  const [updateWorkoutRoutine, updateWorkoutRoutinePayload] = useUpdateWorkoutRoutineMutation();

  const displayImportTemplateModal = (workoutExercises: IWorkoutExercisePayload[]) => {
    modalProvider.show({
      ...IMPORT_TEMPLATE_MODAL,
      onConfirm: () => {
        setWorkoutExercises(workoutExercises);
      }
    });
  };

  const onSubmit = async (data: IDragAndDropRoutineFormValues) => {
    if (workoutRoutine.loading || updateWorkoutRoutinePayload.loading) return;

    const payload = {
      workoutExercises: {
        create: parseCreate(data.create),
        update: parseUpdate(data.update),
        delete: parseDelete(data.delete)
      }
    };
    const response = await updateWorkoutRoutine({
      variables: {
        where,
        data: payload
      }
    });
    if (workoutRoutine.data?.payload.isTemplate) {
      redirect(WORKOUT_ROUTINES);
    } else {
      redirect(`${PLANS}/${DETAIL}/${response.data?.payload.plan?.uuid}`);
    }
  };

  const templateRoutinesModal = {
    ...TEMPLATE_ROUTINES_MODAL,
    contentRender: (
      <div style={{ height: 240, overflowY: 'scroll' }}>
        {templateRoutines.data?.payload.map(item => (
          <ListItem
            key={item.uuid}
            title={item.name || ''}
            isLeftBorderVisible={false}
            isDetailActionEnabled={false}
            style={{
              padding: 16,
              cursor: 'pointer',
              borderBottom: '1px solid #b3b2b226'
            }}
            actions={[
              <Button
                shape="circle"
                icon={<Icon type="select" />}
                onClick={() => {
                  if (!workoutExercises?.length) {
                    setWorkoutExercises(item.workoutExercises);
                    modalProvider.close();
                  } else {
                    displayImportTemplateModal(item.workoutExercises);
                  }
                }}
              />
            ]}
          />
        ))}
      </div>
    )
  };

  useEffect(() => {
    if (!workoutExercises && workoutRoutine) setWorkoutExercises(workoutRoutine.data?.payload.workoutExercises);
  }, [workoutRoutine]);

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <DragAndDropRoutine
      optionsTitle={EXERCISES_TEXT}
      routineTitle={WORKOUT_ROUTINE_TEXT}
      searchOptionText={SEARCH_EXERCISE_TEXT}
      notRepeatOptionsText={NOT_REPEAT_EXERCISE_EXCEPTION}
      optionNotExistsText={EXERCISE_NOT_EXISTS_TEXT}
      data={parseWorkoutExerciseToItem(workoutExercises)}
      options={isEditModeEnabled ? exercises.data?.payload : undefined}
      renderColumnCard={WorkoutExerciseItemCard}
      renderOptionCard={ExerciseItemCard}
      renderForm={WorkoutExerciseForm}
      createOptionsRenderForm={ExerciseOptionCreate}
      formModal={WORKOUT_EXERCISE_MODAL}
      onSubmit={onSubmit}
      isEditModeEnabled={isEditModeEnabled}
      isLoading={workoutRoutine.loading || updateWorkoutRoutinePayload.loading}
      maxColumn={getMaxDay(workoutExercises)}
      acceptsRepeated={false}
      importTemplateModal={templateRoutinesModal}
    />
  );
};

export default WorkoutRoutineUpdate;
