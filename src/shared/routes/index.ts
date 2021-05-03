export const ROOT = '/';

export const UUID = 'uuid';
export const ADD = 'add';
export const EDIT = 'edit';
export const DELETE = 'delete';
export const DETAIL = 'detail';
export const INVITE = 'invite';

export const NOT_FOUND = '/not-found';

export const LOGIN = '/login';
export const REGISTER = '/register';
export const FORGOT_PASSWORD = '/forgot-password';
export const RESET_PASSWORD = '/reset-password';
export const CONFIRM_ACCOUNT = '/confirm-account';

export const HOME = '/home';

export const PROFILE = '/profile';

export const TRAINING = '/training';

export const SETTINGS = '/settings';

export const PLANS = '/plans';
export const PLAN_ADD = `${PLANS}/${ADD}`;
export const PLAN_EDIT = `${PLANS}/${EDIT}/:${UUID}`;
export const PLAN_DETAIL = `${PLANS}/${DETAIL}/:${UUID}`;
export const PLAN_DELETE = `${PLANS}/${DELETE}/:${UUID}`;
export const PLAN_INVITE = `${PLANS}/${INVITE}/:${UUID}`;

export const PLAN_INVITATIONS = '/plan-invitations';
export const PLAN_INVITATION_ACCEPT = `${PLAN_INVITATIONS}/${INVITE}/:${UUID}`;

export const EXERCISES = '/exercises';
export const EXERCISE_ADD = `${EXERCISES}/${ADD}`;
export const EXERCISE_EDIT = `${EXERCISES}/${EDIT}/:${UUID}`;
export const EXERCISE_DETAIL = `${EXERCISES}/${DETAIL}/:${UUID}`;
export const EXERCISE_DELETE = `${EXERCISES}/${DELETE}/:${UUID}`;

export const BODY_MEASURES = '/body-measures';
export const BODY_MEASURE_ADD = `${BODY_MEASURES}/${ADD}`;
export const BODY_MEASURE_EDIT = `${BODY_MEASURES}/${EDIT}/:${UUID}`;
export const BODY_MEASURE_DETAIL = `${BODY_MEASURES}/${DETAIL}/:${UUID}`;

export const WORKOUT_ROUTINES = '/workout-routines';
export const WORKOUT_ROUTINE = `${WORKOUT_ROUTINES}/:${UUID}`;
