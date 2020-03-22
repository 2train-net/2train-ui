import React, { FC, useState } from 'react';

import { Button, Timeline, Typography } from 'antd';

import { ClockCircleOutlined } from '@ant-design/icons';

import { WorkoutRoutineService } from './workout-routine.module';

const { Item } = Timeline;
const { Text } = Typography;

const WorkoutRoutine: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep(1 + currentStep);
  };

  const getItemColor = (index: number) => {
    if (index === currentStep) {
      return 'blue';
    }

    return index < currentStep ? 'green' : 'gray';
  };

  return (
    <>
      <Timeline>
        {WorkoutRoutineService.get().map(({ muscleGroup, exercises }, index) => (
          <Item
            color={getItemColor(index)}
            dot={index === currentStep && <ClockCircleOutlined style={{ fontSize: '16px' }} />}
          >
            <Text strong>{muscleGroup.toUpperCase()}</Text>
            <br />
            {exercises.map(({ name, sets, reps, seconds }) => (
              <>
                <Text type="secondary">{`- ${name.toUpperCase()} (${sets}x${
                  reps ? `${reps} reps` : `${seconds} sec`
                })`}</Text>
                <br />
              </>
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
