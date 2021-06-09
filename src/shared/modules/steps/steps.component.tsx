import React, { FC } from 'react';

import { Steps as ASteps } from 'antd';

import useStyles from './steps.style';

const { Step } = ASteps;

export type StepColor = 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'info' | 'default';

interface IStep {
  label: string;
  description?: string;
  iconRender?: FC<any>;
}

interface IStepsValues {
  steps: IStep[];
  activeStep: number;
  color: StepColor;
  onChange?: (current: number) => void;
}

const Steps: FC<IStepsValues> = ({ steps, activeStep, color, onChange }) => {
  const classes = useStyles({ color });
  return (
    <ASteps className={classes.root} current={activeStep} responsive onChange={onChange}>
      {steps.map(({ label, description, iconRender: Icon }, i) => (
        <Step key={`step-${i}`} title={label} description={description} icon={Icon ? <Icon /> : undefined}></Step>
      ))}
    </ASteps>
  );
};

export default Steps;
