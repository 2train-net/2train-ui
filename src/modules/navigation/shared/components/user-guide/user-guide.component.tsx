import React, { FC } from 'react';

import { Link } from 'react-router-dom';

import { Collapse, Typography } from 'antd';

import { USER_GUIDE_DESCRIPTION_TEXT } from 'modules/navigation/navigation.module';

import { Icon, Button } from 'shared/modules';
import { CLOSE_TEXT } from 'shared/constants';

import { guideSteps, UserGuideProgress } from './user-guide.util';

import useStyles from './user-guide.style';

interface IUserGuide {
  userGuideProgress: UserGuideProgress;
  onClose: () => any;
}

const { Title } = Typography;

const UserGuide: FC<IUserGuide> = ({ userGuideProgress, onClose }) => {
  const classes = useStyles();

  const defaultActiveStep = guideSteps.findIndex(step => !userGuideProgress[step.key]);

  return (
    <div className={classes.root}>
      <p>{USER_GUIDE_DESCRIPTION_TEXT}</p>

      <Collapse defaultActiveKey={[defaultActiveStep]} expandIconPosition="right" ghost>
        {guideSteps.map((step, index) => {
          const isCompleted = userGuideProgress[step.key];

          const header = (
            <div className="step-header">
              <span className={`step-dot ${isCompleted ? 'step-completed' : ''}`}>
                {isCompleted ? <Icon type="check" /> : index + 1}
              </span>
              <Title level={5}>{step.title}</Title>
            </div>
          );

          return (
            <Collapse.Panel header={header} key={index}>
              <p>{step.description}</p>
              <Link to={step.url} onClick={onClose}>
                {step.actionText}
              </Link>
            </Collapse.Panel>
          );
        })}
      </Collapse>
      <br />

      <div className="footer">
        <Button size="small" onClick={onClose}>
          {CLOSE_TEXT}
        </Button>
      </div>
    </div>
  );
};

export default UserGuide;
