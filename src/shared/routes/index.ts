const CUSTOMERS = 'customers';
const TRAINERS = 'trainers';

export const ROOT = '/';
export const LOGIN = '/login';
export const REGISTER = '/register';
export const FORGOT_PASSWORD = '/forgot-password';
export const RESET_PASSWORD = '/reset-password';
export const COMPLETE_PROFILE = '/complete-profile';
export const CONFIRM_ACCOUNT = '/confirm-account';

export const HOME = '/home';
export const PROFILE = '/profile';

export const TEAM = '/team';
export const TEAM_TRAINERS = `${TEAM}/${TRAINERS}`;
export const TEAM_CUSTOMERS = `${TEAM}/${CUSTOMERS}`;

export const SUBSCRIPTIONS = '/subscriptions';
export const SUBSCRIPTIONS_TRAINERS = `${SUBSCRIPTIONS}/${TRAINERS}`;
export const SUBSCRIPTIONS_CUSTOMERS = `${SUBSCRIPTIONS}/${CUSTOMERS}`;

export const TRAINING = '/training';

export const SETTINGS = '/settings';

export const BODY_MEASURES = '/body-measures';
export const BODY_MEASURE_ADD = `${BODY_MEASURES}/add`;
export const BODY_MEASURE_EDIT = `${BODY_MEASURES}/edit/:id`;
export const BODY_MEASURE_DETAIL = `${BODY_MEASURES}/detail/:id`;

export const WORKOUT_ROUTINES = '/workout-routines';
export const WORKOUT_ROUTINE = `${WORKOUT_ROUTINES}/:id`;
