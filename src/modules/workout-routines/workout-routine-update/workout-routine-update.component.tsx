import React, { FC, useContext, useEffect, useState } from 'react';

import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';

import { Button } from 'antd';

import {
  useGetAllWorkoutRoutinesQuery,
  useGetWorkoutRoutineQuery,
  useGetAllExercisesQuery,
  useUpdateWorkoutRoutineMutation,
  useSendWorkoutRoutineMutation,
  GetWorkoutRoutineDocument,
} from 'shared/generated';

import { parseUpdate, parseCreate, parseDelete } from './workout-routine-update.util';

import {
  TEMPLATE_ROUTINES_MODAL,
  IWorkoutExercisePayload,
  IMPORT_TEMPLATE_MODAL,
  DragAndDropRoutine,
} from 'modules/workout-routines/workout-routines.module';

import { useErrorHandler } from 'shared/hooks';
import { ModalContext } from 'shared/contexts';
import { DETAIL, NOT_FOUND, PLANS, WORKOUT_ROUTINES } from 'shared/routes';
import { Icon, ListItem } from 'shared/modules';

const WorkoutRoutineUpdate: FC = () => {
  const {
    params: { uuid },
  } = useRouteMatch<{ uuid: string }>();
  const history = useHistory();

  const where = { uuid };
  const redirect = history.push;

  const workoutRoutinePayload = useGetWorkoutRoutineQuery({
    fetchPolicy: 'network-only',
    variables: {
      where,
    },
  });

  useErrorHandler(workoutRoutinePayload.error);

  const modalProvider = useContext(ModalContext);

  const exercises = useGetAllExercisesQuery();

  const [workoutRoutine, setWorkoutRoutine] = useState<any | undefined>();

  const templateRoutines = useGetAllWorkoutRoutinesQuery();

  const notFound = !workoutRoutinePayload.data?.payload && !workoutRoutinePayload.loading;

  const [updateWorkoutRoutine, updateWorkoutRoutinePayload] = useUpdateWorkoutRoutineMutation();

  const [sendWorkoutRoutine, sendWorkoutRoutinePayload] = useSendWorkoutRoutineMutation();

  const displayImportTemplateModal = (workoutExercises: IWorkoutExercisePayload[]) => {
    modalProvider.show({
      ...IMPORT_TEMPLATE_MODAL,
      onConfirm: () => {
        const x = { ...workoutRoutine, workoutExercises: workoutExercises };
        setWorkoutRoutine(x);
        modalProvider.close();
      },
    });
  };

  const onSubmit = async (data: any, routine?: { name: string }) => {
    if (workoutRoutine.loading || updateWorkoutRoutinePayload.loading) return;

    const payload = {
      name: routine ? routine.name : undefined,
      workoutExercises: {
        create: parseCreate(data.create),
        update: parseUpdate(data.update),
        delete: parseDelete(data.delete),
      },
    };

    const response = await updateWorkoutRoutine({
      variables: {
        where,
        data: payload,
      },
    });
    if (workoutRoutine.data?.payload.isTemplate) {
      redirect(WORKOUT_ROUTINES);
    } else {
      if (!workoutRoutinePayload.data?.payload.isTemplate) {
        redirect(`${PLANS}/${DETAIL}/${response.data?.payload.plan?.uuid}`);
      } else {
        redirect(WORKOUT_ROUTINES);
      }
    }
  };

  const onSend = async () => {
    if (workoutRoutine.loading || sendWorkoutRoutinePayload.loading) return;

    await sendWorkoutRoutine({
      variables: {
        where,
      },
      update: (cache, { data }) => {
        cache.writeQuery({
          data,
          query: GetWorkoutRoutineDocument,
          variables: {
            where,
          },
        });
      },
    });
  };

  const templateRoutinesModal = {
    ...TEMPLATE_ROUTINES_MODAL,
    contentRender: (
      <div style={{ height: 240, overflowY: 'scroll' }}>
        {templateRoutines.data?.payload.map((item) => (
          <ListItem
            key={item.uuid}
            title={item.name || ''}
            isLeftBorderVisible={false}
            isDetailActionEnabled={false}
            style={{
              padding: 16,
              cursor: 'pointer',
              borderBottom: '1px solid #b3b2b226',
            }}
            actions={[
              <Button
                shape="circle"
                icon={<Icon type="select" />}
                onClick={() => {
                  displayImportTemplateModal(item.workoutExercises);
                }}
              />,
            ]}
          />
        ))}
      </div>
    ),
  };

  useEffect(() => {
    setWorkoutRoutine(workoutRoutinePayload.data?.payload);
  }, [workoutRoutinePayload]);

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <DragAndDropRoutine
      workoutRoutine={workoutRoutine}
      options={exercises.data?.payload}
      onSubmit={onSubmit}
      onSend={onSend}
      isLoading={
        workoutRoutinePayload.loading || updateWorkoutRoutinePayload.loading || sendWorkoutRoutinePayload.loading
      }
      importTemplateModal={templateRoutinesModal}
      isCreateRoutineForm={workoutRoutinePayload.data?.payload.isTemplate}
    />
  );
};

export default WorkoutRoutineUpdate;
