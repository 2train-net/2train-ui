const TRAINERS = 'trainers';
const CUSTOMERS = 'customers';
const GYM_BRANCHES = 'gym-branches';

export const ROOT = '/';
export const LOGIN = '/login';
export const REGISTER = '/register';
export const FORGOT_PASSWORD = '/forgot-password';
export const RESET_PASSWORD = '/reset-password';
export const CONFIRM_ACCOUNT = '/confirm-account';

export const HOME = '/home';
export const PROFILE = '/profile';

export const TEAM = '/team';
export const TEAM_TRAINERS = `${TEAM}/${TRAINERS}`;
export const TEAM_CUSTOMERS = `${TEAM}/${CUSTOMERS}`;
export const TEAM_GYM_BRANCHES = `${TEAM}/${GYM_BRANCHES}`;

export const SUBSCRIPTIONS = '/subscriptions';
export const SUBSCRIPTIONS_TRAINERS = `${SUBSCRIPTIONS}/${TRAINERS}`;
export const SUBSCRIPTIONS_CUSTOMERS = `${SUBSCRIPTIONS}/${CUSTOMERS}`;

export const TRAINING = '/training';

export const SETTINGS = '/settings';

export const PLANS = '/plans';
export const PLAN_ADD = `${PLANS}/add`;
export const PLAN_EDIT = `${PLANS}/edit/:id`;
export const PLAN_DETAIL = `${PLANS}/detail/:id`;

export const BODY_MEASURES = '/body-measures';
export const BODY_MEASURE_ADD = `${BODY_MEASURES}/add`;
export const BODY_MEASURE_EDIT = `${BODY_MEASURES}/edit/:id`;
export const BODY_MEASURE_DETAIL = `${BODY_MEASURES}/detail/:id`;

export const WORKOUT_ROUTINES = '/workout-routines';
export const WORKOUT_ROUTINE = `${WORKOUT_ROUTINES}/:id`;
