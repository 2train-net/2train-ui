import React, { FC, useContext } from 'react';

import { Button, Timeline, Typography } from 'antd';

import { ClockCircleOutlined } from '@ant-design/icons';

import { WorkoutRoutineContext } from 'modules/workout-routine/workout-routine.module';

const { Item } = Timeline;
const { Text } = Typography;

const WorkoutRoutine: FC = () => {
  const { workoutRoutine, currentStep, handleNextStep } = useContext(WorkoutRoutineContext);

  const getItemColor = (index: number) => {
    if (index === currentStep) {
      return 'blue';
    }

    return index < currentStep ? 'green' : 'gray';
  };

  return (
    <>
      <Timeline>
        {workoutRoutine.map(({ muscleGroup, exercises }: any, i: number) => (
          <Item
            key={`muscle-group-${i}`}
            color={getItemColor(i)}
            dot={i === currentStep && <ClockCircleOutlined style={{ fontSize: '16px' }} />}
          >
            <Text strong>{muscleGroup.toUpperCase()}</Text>
            <br />
            {exercises.map(({ name, sets, reps, seconds }: any, j: number) => (
              <div key={`exercise-${i}-${j}`}>
                <Text type="secondary">{`- ${name.toUpperCase()} (${sets}x${
                  reps ? `${reps} reps` : `${seconds} sec`
                })`}</Text>
              </div>
            ))}
          </Item>
        ))}
      </Timeline>
      <Button type="primary" block onClick={handleNextStep}>
        Next
      </Button>
    </>
  );
};

export default WorkoutRoutine;
