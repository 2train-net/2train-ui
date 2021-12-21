import {
  PLAN_TITLE_STEP_CREATE_TEXT,
  PLAN_ACTION_STEP_CREATE_TEXT,
  PLAN_DESCRIPTION_STEP_CREATE_TEXT,
  PLAN_INVITATION_TITLE_STEP_CREATE_TEXT,
  PLAN_INVITATION_ACTION_STEP_CREATE_TEXT,
  PLAN_INVITATION_DESCRIPTION_STEP_CREATE_TEXT
} from 'modules/navigation/shared/constants';

import { PLAN_ADD, PLAN_INVITATION_ADD } from 'shared/routes';

export interface UserGuideProgress {
  isCreatePlanStepCompleted: boolean;
  isInviteClientStepCompleted: boolean;
}

interface Step {
  key: keyof UserGuideProgress;
  url: string;
  title: string;
  description: string;
  actionText: string;
}

export const guideSteps: Step[] = [
  {
    key: 'isCreatePlanStepCompleted',
    url: PLAN_ADD,
    title: PLAN_TITLE_STEP_CREATE_TEXT,
    description: PLAN_DESCRIPTION_STEP_CREATE_TEXT,
    actionText: PLAN_ACTION_STEP_CREATE_TEXT
  },
  {
    key: 'isInviteClientStepCompleted',
    url: PLAN_INVITATION_ADD,
    title: PLAN_INVITATION_TITLE_STEP_CREATE_TEXT,
    description: PLAN_INVITATION_DESCRIPTION_STEP_CREATE_TEXT,
    actionText: PLAN_INVITATION_ACTION_STEP_CREATE_TEXT
  }
];
