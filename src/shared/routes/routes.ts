export const ROOT = '/';

export const UUID = 'uuid';
export const DAY = 'day';
export const ADD = 'add';
export const EDIT = 'edit';
export const DELETE = 'delete';
export const DETAIL = 'detail';
export const INVITE = 'invite';
export const ACTION = 'action';
export const WORKOUT = 'workout';
export const UUID_PARAM = `:${UUID}`;

export const NOT_FOUND = '/not-found';

export const LOGIN = '/login';
export const REGISTER = '/register';
export const FORGOT_PASSWORD = '/forgot-password';
export const RESET_PASSWORD = '/reset-password';
export const CONFIRM_ACCOUNT = '/confirm-account';

export const HOME = '/home';

export const PROFILE = '/profile';

export const SETTINGS = '/settings';

export const CLIENTS = '/clients';
export const CLIENT_DETAIL = `${CLIENTS}/${DETAIL}/${UUID_PARAM}`;

export const TRANSACTIONS = '/transactions';

export const SUPPLIES = '/supplies';

export const PLANS = '/plans';
export const PLAN_ADD = `${PLANS}/${ADD}`;
export const PLAN_EDIT = `${PLANS}/${EDIT}/${UUID_PARAM}`;
export const PLAN_DETAIL = `${PLANS}/${DETAIL}/${UUID_PARAM}`;
export const PLAN_DELETE = `${PLANS}/${DELETE}/${UUID_PARAM}`;
export const PLAN_INVITE = `${PLANS}/${INVITE}/${UUID_PARAM}`;

export const PLAN_INVITATIONS = '/plan-invitations';
export const PLAN_INVITATION_ACCEPT = `${PLAN_INVITATIONS}/${INVITE}/${UUID_PARAM}`;

export const EXERCISES = '/exercises';
export const EXERCISE_ADD = `${EXERCISES}/${ADD}`;
export const EXERCISE_EDIT = `${EXERCISES}/${EDIT}/${UUID_PARAM}`;
export const EXERCISE_DETAIL = `${EXERCISES}/${DETAIL}/${UUID_PARAM}`;
export const EXERCISE_DELETE = `${EXERCISES}/${DELETE}/${UUID_PARAM}`;

export const BODY_MEASURES = '/body-measures';
export const BODY_MEASURE_ADD = `${BODY_MEASURES}/${ADD}`;
export const BODY_MEASURES_BY_PLAN = `${BODY_MEASURES}?&${UUID}=${UUID_PARAM}`;
export const BODY_MEASURE_ADD_BY_PLAN = `${BODY_MEASURE_ADD}?&${UUID}=${UUID_PARAM}`;

export const WORKOUTS = '/workouts';
export const WORKOUT_ADD = `${WORKOUTS}/${ADD}`;

export const WORKOUT_ROUTINES = '/workout-routines';
export const WORKOUT_ROUTINE_ADD = `${WORKOUT_ROUTINES}/${ADD}`;
export const WORKOUT_ROUTINE_EDIT = `${WORKOUT_ROUTINES}/${EDIT}/${UUID_PARAM}`;
export const WORKOUT_ROUTINE_DELETE = `${WORKOUT_ROUTINES}/${DELETE}/${UUID_PARAM}`;
export const WORKOUT_ROUTINE_DETAIL = `${WORKOUT_ROUTINES}/${DETAIL}/${UUID_PARAM}`;

export const DIET_PLANS = '/diet-plans';
export const DIET_PLAN_EDIT = `${DIET_PLANS}/${EDIT}/${UUID_PARAM}`;

export const MEALS = '/meals';
export const MEAL_ADD = `${MEALS}/${ADD}`;
export const MEAL_EDIT = `${MEALS}/${EDIT}/${UUID_PARAM}`;
export const MEAL_DELETE = `${MEALS}/${DELETE}/${UUID_PARAM}`;

export const TRAINING = '/training';
export const TRAINING_WORKOUT = `${TRAINING}/${WORKOUT}/:${DAY}`;
export const TRAINING_DETAIL = `${TRAINING}/${DETAIL}/${UUID_PARAM}`;
