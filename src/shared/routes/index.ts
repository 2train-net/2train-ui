export const ROOT = '/';

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

export const INVITATIONS = '/invitations';

export const TRAINING = '/training';

export const SETTINGS = '/settings';

export const PLANS = '/plans';
export const PLAN_ADD = `${PLANS}/${ADD}`;
export const PLAN_EDIT = `${PLANS}/${EDIT}/:id`;
export const PLAN_DETAIL = `${PLANS}/${DETAIL}/:id`;
export const PLAN_DELETE = `${PLANS}/${DELETE}/:id`;
export const PLAN_INVITE = `${PLANS}/${INVITE}/:id`;

export const EXERCISES = '/exercises';
export const EXERCISE_ADD = `${EXERCISES}/${ADD}`;
export const EXERCISE_EDIT = `${EXERCISES}/${EDIT}/:id`;
export const EXERCISE_DETAIL = `${EXERCISES}/${DETAIL}/:id`;
export const EXERCISE_DELETE = `${EXERCISES}/${DELETE}/:id`;

export const BODY_MEASURES = '/body-measures';
export const BODY_MEASURE_ADD = `${BODY_MEASURES}/${ADD}`;
export const BODY_MEASURE_EDIT = `${BODY_MEASURES}/${EDIT}/:id`;
export const BODY_MEASURE_DETAIL = `${BODY_MEASURES}/${DETAIL}/:id`;

export const WORKOUT_ROUTINES = '/workout-routines';
export const WORKOUT_ROUTINE = `${WORKOUT_ROUTINES}/:id`;
