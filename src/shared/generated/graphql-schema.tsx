import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type BodyMeasure = {
  __typename?: 'BodyMeasure';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  planId: Scalars['Int'];
  height: Scalars['Int'];
  weight: Scalars['Int'];
  frontBodyImage?: Maybe<Scalars['String']>;
  backBodyImage?: Maybe<Scalars['String']>;
  rightSideBodyImage?: Maybe<Scalars['String']>;
  leftSideBodyImage?: Maybe<Scalars['String']>;
  plan: Plan;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type BodyMeasureCreateInput = {
  height: Scalars['Int'];
  weight: Scalars['Int'];
  frontBodyBase64?: Maybe<Scalars['String']>;
  backBodyBase64?: Maybe<Scalars['String']>;
  rightSideBodyBase64?: Maybe<Scalars['String']>;
  leftSideBodyBase64?: Maybe<Scalars['String']>;
  plan: PlanCreateOneWithoutBodyMeasureInput;
};

export type BodyMeasureOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type BodyMeasureWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  plan?: Maybe<PlanWhereInput>;
};

export type BodyMeasureWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type Client = {
  __typename?: 'Client';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  plans: Array<Plan>;
};

export type ClientOrderByInput = {
  createdAt?: Maybe<OrderByArg>;
};

export type ClientWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
};

export type ClientWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type Coach = {
  __typename?: 'Coach';
  uuid: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
};

export type CoachWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
};

export enum Currency {
  Us = 'US',
  Crc = 'CRC',
}

export enum Day {
  Day_1 = 'DAY_1',
  Day_2 = 'DAY_2',
  Day_3 = 'DAY_3',
  Day_4 = 'DAY_4',
  Day_5 = 'DAY_5',
  Day_6 = 'DAY_6',
  Day_7 = 'DAY_7',
}

export type DietPlan = {
  __typename?: 'DietPlan';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  file?: Maybe<Scalars['String']>;
  meals: Array<Meal>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type DietPlanCreateInput = {
  meals: MealCreateManyInput;
};

export type DietPlanOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type DietPlanUpdateInput = {
  fileBase64: Scalars['String'];
};

export type DietPlanWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DietPlanWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export enum DocumentAssociation {
  Manager = 'MANAGER',
  Visualizer = 'VISUALIZER',
}

export type Exercise = {
  __typename?: 'Exercise';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  userId: Scalars['Int'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
  user: User;
  muscleGroups: Array<MuscleGroup>;
  workoutExercises: Array<WorkoutExercise>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ExerciseCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
  muscleGroups?: Maybe<Array<MuscleGroup>>;
};

export type ExerciseCreateOneWithoutWorkoutExercisesInput = {
  connect: ExerciseWhereUniqueInput;
};

export type ExerciseOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  description?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type ExerciseUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  video?: Maybe<Scalars['String']>;
  muscleGroups: ExerciseUpdateManyWithoutExerciseMuscleGroupInput;
};

export type ExerciseUpdateManyWithoutExerciseMuscleGroupInput = {
  create?: Maybe<Array<MuscleGroup>>;
  delete?: Maybe<Array<MuscleGroup>>;
};

export type ExerciseWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ExerciseWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
  NotSpecified = 'NOT_SPECIFIED',
}

export type Ingredient = {
  __typename?: 'Ingredient';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  user: User;
  mealIngredients: Array<MealIngredient>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type IngredientCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  user: UserCreateOneWithoutIngredientInput;
};

export type IngredientCreateOneWithoutMealIngredientInput = {
  connect: IngredientWhereUniqueInput;
};

export type IngredientOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  description?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type IngredientUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type IngredientUpdateManyWithoutMealInput = {
  create?: Maybe<Array<IngredientWhereUniqueInput>>;
  delete?: Maybe<Array<IngredientWhereUniqueInput>>;
};

export type IngredientWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type IngredientWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export enum IntervalPlan {
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  Year = 'YEAR',
}

export enum Language {
  Spanish = 'SPANISH',
  English = 'ENGLISH',
}

export type Meal = {
  __typename?: 'Meal';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  position: Scalars['Int'];
  type: MealType;
  day: Day;
  user: User;
  mealIngredients: Array<MealIngredient>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type MealCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  imageBase64?: Maybe<Scalars['String']>;
  ingredients: Array<IngredientWhereUniqueInput>;
};

export type MealCreateManyInput = {
  connect: Array<MealWhereUniqueInput>;
};

export type MealCreateOneWithoutMealIngredientInput = {
  connect: MealWhereUniqueInput;
};

export type MealIngredient = {
  __typename?: 'MealIngredient';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  quantity: Scalars['Int'];
  unitMeasure: UnitMeasure;
  ingredient: Ingredient;
  meal: Meal;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type MealIngredientCreateInput = {
  quantity: Scalars['Int'];
  unitMeasure: UnitMeasure;
  ingredient: IngredientCreateOneWithoutMealIngredientInput;
  meal: MealCreateOneWithoutMealIngredientInput;
};

export type MealIngredientOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  quantity?: Maybe<OrderByArg>;
  unitMeasure?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type MealIngredientUpdateInput = {
  quantity?: Maybe<Scalars['Int']>;
  unitMeasure?: Maybe<UnitMeasure>;
};

export type MealIngredientWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  unitMeasure?: Maybe<UnitMeasure>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MealIngredientWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type MealOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  description?: Maybe<OrderByArg>;
  position?: Maybe<OrderByArg>;
  type?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export enum MealType {
  Breakfast = 'BREAKFAST',
  Lunch = 'LUNCH',
  Dinner = 'DINNER',
  Snack = 'SNACK',
  Other = 'OTHER',
}

export type MealUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageBase64?: Maybe<Scalars['String']>;
  ingredients: IngredientUpdateManyWithoutMealInput;
};

export type MealWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  type?: Maybe<MealType>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MealWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export enum MuscleGroup {
  Chest = 'CHEST',
  Back = 'BACK',
  Arms = 'ARMS',
  Abs = 'ABS',
  Legs = 'LEGS',
  Shoulders = 'SHOULDERS',
  Calves = 'CALVES',
  Hamstrings = 'HAMSTRINGS',
  Quadriceps = 'QUADRICEPS',
  Glutes = 'GLUTES',
  Biceps = 'BICEPS',
  Triceps = 'TRICEPS',
  Forearms = 'FOREARMS',
  Trapezius = 'TRAPEZIUS',
  Latissimus = 'LATISSIMUS',
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  deleteUser: User;
  createIngredient: Ingredient;
  updateIngredient: Ingredient;
  deleteIngredient: Ingredient;
  createMeal: Meal;
  updateMeal: Meal;
  deleteMeal: Meal;
  createMealIngredient: MealIngredient;
  updateMealIngredient: MealIngredient;
  deleteMealIngredient: MealIngredient;
  creatDietPlan: DietPlan;
  updateDietPlan: DietPlan;
  createPlan: Plan;
  updatePlan: Plan;
  deletePlan: Plan;
  buyPlan: Plan;
  renovatePlan: Plan;
  createExercise: Exercise;
  updateExercise: Exercise;
  createPlanInvitation: PlanInvitation;
  acceptPlanInvitation: PlanInvitation;
  sendWorkoutRoutine: WorkoutRoutine;
  updateWorkoutRoutine: WorkoutRoutine;
  createWorkoutRoutine: WorkoutRoutine;
  createWorkout: Workout;
  updateWorkout: Workout;
  updatePlanActivity: PlanActivity;
  cleanNewPlanActivities: Array<PlanActivity>;
  readAllPlanActivities: Array<PlanActivity>;
  createBodyMeasure: BodyMeasure;
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
};

export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};

export type MutationCreateIngredientArgs = {
  data: IngredientCreateInput;
};

export type MutationUpdateIngredientArgs = {
  where: IngredientWhereUniqueInput;
  data: IngredientUpdateInput;
};

export type MutationDeleteIngredientArgs = {
  where: IngredientWhereUniqueInput;
};

export type MutationCreateMealArgs = {
  data: MealCreateInput;
};

export type MutationUpdateMealArgs = {
  where: MealWhereUniqueInput;
  data: MealUpdateInput;
};

export type MutationDeleteMealArgs = {
  where: MealWhereUniqueInput;
};

export type MutationCreateMealIngredientArgs = {
  data: MealIngredientCreateInput;
};

export type MutationUpdateMealIngredientArgs = {
  where: MealIngredientWhereUniqueInput;
  data: MealIngredientUpdateInput;
};

export type MutationDeleteMealIngredientArgs = {
  where: MealIngredientWhereUniqueInput;
};

export type MutationCreatDietPlanArgs = {
  data: DietPlanCreateInput;
};

export type MutationUpdateDietPlanArgs = {
  where: DietPlanWhereUniqueInput;
  data: DietPlanUpdateInput;
};

export type MutationCreatePlanArgs = {
  data: PlanCreateInput;
};

export type MutationUpdatePlanArgs = {
  where: PlanWhereUniqueInput;
  data: PlanUpdateInput;
};

export type MutationDeletePlanArgs = {
  where: PlanWhereUniqueInput;
};

export type MutationBuyPlanArgs = {
  where: PlanWhereUniqueInput;
  data: PlanBuyInput;
};

export type MutationRenovatePlanArgs = {
  where: PlanWhereUniqueInput;
  data: PlanBuyInput;
};

export type MutationCreateExerciseArgs = {
  data: ExerciseCreateInput;
};

export type MutationUpdateExerciseArgs = {
  where: ExerciseWhereUniqueInput;
  data: ExerciseUpdateInput;
};

export type MutationCreatePlanInvitationArgs = {
  data: PlanInvitationCreateInput;
};

export type MutationAcceptPlanInvitationArgs = {
  data: PlanInvitationAcceptInput;
};

export type MutationSendWorkoutRoutineArgs = {
  where: WorkoutRoutineWhereUniqueInput;
};

export type MutationUpdateWorkoutRoutineArgs = {
  where: WorkoutRoutineWhereUniqueInput;
  data: WorkoutRoutineUpdateInput;
};

export type MutationCreateWorkoutRoutineArgs = {
  data: WorkoutRoutineCreateInput;
};

export type MutationCreateWorkoutArgs = {
  data: WorkoutCreateInput;
};

export type MutationUpdateWorkoutArgs = {
  where: WorkoutWhereUniqueInput;
  data: WorkoutUpdateInput;
};

export type MutationUpdatePlanActivityArgs = {
  where: PlanActivityWhereUniqueInput;
  data: PlanActivityUpdateInput;
};

export type MutationCreateBodyMeasureArgs = {
  data: BodyMeasureCreateInput;
};

export enum OrderByArg {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Plan = {
  __typename?: 'Plan';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  dietPlanId?: Maybe<Scalars['Int']>;
  isExercisesPlanEnabled: Scalars['Boolean'];
  isDietPlanEnabled: Scalars['Boolean'];
  isChatEnabled: Scalars['Boolean'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  intervalCount: Scalars['Int'];
  intervalPlan: IntervalPlan;
  scope: Scope;
  type: PlanType;
  currency: Currency;
  status: PlanStatus;
  dietPlan?: Maybe<DietPlan>;
  workoutRoutine?: Maybe<WorkoutRoutine>;
  planAssociations: Array<PlanAssociation>;
  purchasedPlans: Array<Plan>;
  bodyMeasures: Array<BodyMeasure>;
  purchasePlan?: Maybe<Plan>;
  owner: User;
  createdAt: Scalars['DateTime'];
  finishedAt?: Maybe<Scalars['DateTime']>;
  startAt?: Maybe<Scalars['DateTime']>;
  expireAt?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export type PlanActivity = {
  __typename?: 'PlanActivity';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  isNew: Scalars['Boolean'];
  seen: Scalars['Boolean'];
  type: PlanActivityType;
  user: User;
  plan: Plan;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum PlanActivityType {
  NewClient = 'NEW_CLIENT',
  PlanPurchase = 'PLAN_PURCHASE',
  PlanRenovation = 'PLAN_RENOVATION',
  PlanInvitationAccept = 'PLAN_INVITATION_ACCEPT',
  PlanInvitationCreate = 'PLAN_INVITATION_CREATE',
  WorkoutRoutineCreate = 'WORKOUT_ROUTINE_CREATE',
  WorkoutRoutineUpdate = 'WORKOUT_ROUTINE_UPDATE',
  DietPlanFileCreate = 'DIET_PLAN_FILE_CREATE',
  DietPlanFileUpdate = 'DIET_PLAN_FILE_UPDATE',
  BodyMeasureCreate = 'BODY_MEASURE_CREATE',
}

export type PlanActivityUpdateInput = {
  isNew?: Maybe<Scalars['Boolean']>;
  seen?: Maybe<Scalars['Boolean']>;
};

export type PlanActivityWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PlanActivityWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type PlanAssociation = {
  __typename?: 'PlanAssociation';
  userId: Scalars['Int'];
  planId: Scalars['Int'];
  association: DocumentAssociation;
  user: User;
  plan: Plan;
};

export type PlanBuyInput = {
  startAt: Scalars['String'];
};

export type PlanCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  intervalCount: Scalars['Int'];
  intervalPlan: IntervalPlan;
  currency: Currency;
  status: PlanStatus;
  isDietPlanEnabled: Scalars['Boolean'];
  isExercisesPlanEnabled: Scalars['Boolean'];
};

export type PlanCreateOneWithoutBodyMeasureInput = {
  connect: PlanWhereUniqueInput;
};

export type PlanCreateOneWithoutPlanInvitationInput = {
  connect: PlanWhereUniqueInput;
};

export type PlanInvitation = {
  __typename?: 'PlanInvitation';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  userId: Scalars['Int'];
  planId: Scalars['Int'];
  link?: Maybe<Scalars['String']>;
  template: Scalars['String'];
  user: User;
  plan: Plan;
};

export type PlanInvitationAcceptInput = {
  uuid: Scalars['String'];
  startAt: Scalars['String'];
};

export type PlanInvitationCreateInput = {
  plan: PlanCreateOneWithoutPlanInvitationInput;
  user: UserCreateOneWithoutPlanInvitationInput;
  startAt?: Maybe<Scalars['String']>;
};

export type PlanInvitationOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
};

export type PlanInvitationWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  user?: Maybe<UserWhereInput>;
  plan?: Maybe<PlanWhereInput>;
  template?: Maybe<Scalars['String']>;
};

export type PlanInvitationWhereUniqueInput = {
  uuid: Scalars['String'];
};

export type PlanOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export enum PlanStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum PlanType {
  Custom = 'CUSTOM',
  NonCustom = 'NON_CUSTOM',
}

export type PlanUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  intervalCount?: Maybe<Scalars['Int']>;
  intervalPlan?: Maybe<IntervalPlan>;
  currency?: Maybe<Currency>;
  status?: Maybe<PlanStatus>;
  isDietPlanEnabled?: Maybe<Scalars['Boolean']>;
  isExercisesPlanEnabled?: Maybe<Scalars['Boolean']>;
};

export type PlanWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PlanWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type Program = {
  __typename?: 'Program';
  uuid: Scalars['String'];
  name: Scalars['String'];
};

export type ProgramWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type PublicUser = {
  __typename?: 'PublicUser';
  email: Scalars['String'];
  username: Scalars['String'];
  type: UserType;
};

export enum PublicUserStatusFilter {
  All = 'ALL',
  ExcludeInvitedStatus = 'EXCLUDE_INVITED_STATUS',
}

export type PublicUserWhereUniqueInput = {
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  status?: Maybe<PublicUserStatusFilter>;
};

export type Query = {
  __typename?: 'Query';
  user: User;
  users: Array<User>;
  coaches: Array<Coach>;
  coach: Coach;
  program: Program;
  programs: Array<Program>;
  ingredient: Ingredient;
  ingredients: Array<Ingredient>;
  meal: Meal;
  meals: Array<Meal>;
  mealIngredient: MealIngredient;
  mealIngredients: Array<MealIngredient>;
  dietPlan: DietPlan;
  dietPlans: Array<DietPlan>;
  plan: Plan;
  plans: Array<Plan>;
  exercise: Exercise;
  exercises: Array<Exercise>;
  planInvitation: PlanInvitation;
  planInvitations: Array<PlanInvitation>;
  client: Client;
  clients: Array<Client>;
  workoutRoutine: WorkoutRoutine;
  workoutRoutines: Array<WorkoutRoutine>;
  workout: Workout;
  workouts: Array<Workout>;
  training?: Maybe<Training>;
  publicUser?: Maybe<PublicUser>;
  planActivities: Array<PlanActivity>;
  bodyMeasure: BodyMeasure;
  bodyMeasures: Array<BodyMeasure>;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUsersArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  cursor?: Maybe<UserWhereUniqueInput>;
  orderBy?: Maybe<UserOrderByInput>;
  where?: Maybe<UserWhereInput>;
};

export type QueryCoachesArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  cursor?: Maybe<CoachWhereUniqueInput>;
  search?: Maybe<SearchInput>;
};

export type QueryCoachArgs = {
  where: CoachWhereUniqueInput;
};

export type QueryProgramArgs = {
  where: ProgramWhereUniqueInput;
};

export type QueryProgramsArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  cursor?: Maybe<ProgramWhereUniqueInput>;
  search?: Maybe<SearchInput>;
};

export type QueryIngredientArgs = {
  where: IngredientWhereUniqueInput;
};

export type QueryIngredientsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  cursor?: Maybe<IngredientWhereUniqueInput>;
  orderBy?: Maybe<IngredientOrderByInput>;
  where?: Maybe<IngredientWhereInput>;
};

export type QueryMealArgs = {
  where: MealWhereUniqueInput;
};

export type QueryMealsArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  cursor?: Maybe<MealWhereUniqueInput>;
  orderBy?: Maybe<MealOrderByInput>;
  where?: Maybe<MealWhereInput>;
};

export type QueryMealIngredientArgs = {
  where: MealIngredientWhereUniqueInput;
};

export type QueryMealIngredientsArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  cursor?: Maybe<MealIngredientWhereUniqueInput>;
  orderBy?: Maybe<MealIngredientOrderByInput>;
  where?: Maybe<MealIngredientWhereInput>;
};

export type QueryDietPlanArgs = {
  where: DietPlanWhereUniqueInput;
};

export type QueryDietPlansArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  cursor?: Maybe<DietPlanWhereUniqueInput>;
  orderBy?: Maybe<DietPlanOrderByInput>;
  where?: Maybe<DietPlanWhereInput>;
};

export type QueryPlanArgs = {
  where: PlanWhereUniqueInput;
};

export type QueryPlansArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  cursor?: Maybe<PlanWhereUniqueInput>;
  orderBy?: Maybe<PlanOrderByInput>;
  where?: Maybe<PlanWhereInput>;
  search?: Maybe<SearchInput>;
};

export type QueryExerciseArgs = {
  where: ExerciseWhereUniqueInput;
};

export type QueryExercisesArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  cursor?: Maybe<ExerciseWhereUniqueInput>;
  orderBy?: Maybe<ExerciseOrderByInput>;
  where?: Maybe<ExerciseWhereInput>;
  search?: Maybe<SearchInput>;
};

export type QueryPlanInvitationArgs = {
  where: PlanInvitationWhereUniqueInput;
};

export type QueryPlanInvitationsArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  cursor?: Maybe<PlanInvitationWhereUniqueInput>;
  orderBy?: Maybe<PlanInvitationOrderByInput>;
  where?: Maybe<PlanInvitationWhereInput>;
  search?: Maybe<SearchInput>;
};

export type QueryClientArgs = {
  where: ClientWhereUniqueInput;
};

export type QueryClientsArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  cursor?: Maybe<ClientWhereUniqueInput>;
  orderBy?: Maybe<ClientOrderByInput>;
  where?: Maybe<ClientWhereInput>;
  search?: Maybe<SearchInput>;
};

export type QueryWorkoutRoutineArgs = {
  where: WorkoutRoutineWhereUniqueInput;
};

export type QueryWorkoutRoutinesArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  cursor?: Maybe<WorkoutRoutineWhereUniqueInput>;
  orderBy?: Maybe<WorkoutRoutineOrderByInput>;
  where?: Maybe<WorkoutRoutineWhereInput>;
  search?: Maybe<SearchInput>;
};

export type QueryWorkoutArgs = {
  where: WorkoutWhereUniqueInput;
};

export type QueryWorkoutsArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
  cursor?: Maybe<WorkoutWhereUniqueInput>;
  orderBy?: Maybe<WorkoutOrderByInput>;
  where?: Maybe<WorkoutWhereInput>;
  search?: Maybe<SearchInput>;
};

export type QueryTrainingArgs = {
  where: TrainingWhereInput;
};

export type QueryPublicUserArgs = {
  where: PublicUserWhereUniqueInput;
};

export type QueryPlanActivitiesArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  cursor?: Maybe<PlanActivityWhereUniqueInput>;
  where?: Maybe<PlanActivityWhereInput>;
};

export type QueryBodyMeasureArgs = {
  where: BodyMeasureWhereUniqueInput;
};

export type QueryBodyMeasuresArgs = {
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  cursor?: Maybe<BodyMeasureWhereUniqueInput>;
  orderBy?: Maybe<BodyMeasureOrderByInput>;
  where?: Maybe<BodyMeasureWhereInput>;
};

export enum Scope {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
}

export type SearchInput = {
  value: Scalars['String'];
};

export type Training = {
  __typename?: 'Training';
  workoutExercises: Array<WorkoutExercise>;
};

export type TrainingWhereInput = {
  day: Day;
};

export enum UnitMeasure {
  Gram = 'GRAM',
  Liter = 'LITER',
  Kilogram = 'KILOGRAM',
  Pound = 'POUND',
}

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  plansCount: Scalars['Float'];
  planInvitationsCount: Scalars['Float'];
  bodyMeasuresCount: Scalars['Float'];
  type: UserType;
  status: UserStatus;
  language: Language;
  gender?: Maybe<Gender>;
  scope: Scope;
  ingredients: Array<Ingredient>;
  meals: Array<Meal>;
  currentActivePlan?: Maybe<Plan>;
  progress?: Maybe<UserProgress>;
  isNotificationEnabled: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type UserCreateInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  type: UserType;
};

export type UserCreateOneWithoutIngredientInput = {
  connect: UserWhereUniqueInput;
};

export type UserCreateOneWithoutPlanInvitationInput = {
  connect?: Maybe<UserWhereUniqueInput>;
  invite?: Maybe<UserInviteOneWithoutPlanInvitationInput>;
};

export type UserInviteOneWithoutPlanInvitationInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type UserOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  email?: Maybe<OrderByArg>;
  username?: Maybe<OrderByArg>;
  firstName?: Maybe<OrderByArg>;
  lastName?: Maybe<OrderByArg>;
  avatar?: Maybe<OrderByArg>;
  type?: Maybe<OrderByArg>;
  status?: Maybe<OrderByArg>;
  gender?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type UserProgress = {
  __typename?: 'UserProgress';
  hasPlanInvitations: Scalars['Boolean'];
  hasPlans: Scalars['Boolean'];
  weeklyWorkouts: Array<Workout>;
};

export enum UserStatus {
  Invited = 'INVITED',
  Registered = 'REGISTERED',
  Confirmed = 'CONFIRMED',
  Blocked = 'BLOCKED',
}

export enum UserType {
  Customer = 'CUSTOMER',
  PersonalTrainer = 'PERSONAL_TRAINER',
}

export type UserUpdateInput = {
  avatarBase64?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  scope?: Maybe<Scope>;
  gender?: Maybe<Gender>;
  language?: Maybe<Language>;
  isNotificationEnabled?: Maybe<Scalars['Boolean']>;
};

export type UserWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  type?: Maybe<UserType>;
  status?: Maybe<UserStatus>;
  gender?: Maybe<Gender>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type UserWhereUniqueInput = {
  email: Scalars['String'];
};

export type Workout = {
  __typename?: 'Workout';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  duration?: Maybe<Scalars['Int']>;
  difficultyLevel?: Maybe<Scalars['Int']>;
  enjoymentLevel?: Maybe<Scalars['Int']>;
  workoutRoutine: WorkoutRoutine;
  workoutExercises: Array<WorkoutExercise>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type WorkoutCreateInput = {
  duration?: Maybe<Scalars['Int']>;
  workoutRoutine: WorkoutRoutineWhereUniqueInput;
  workoutExercises: WorkoutExerciseCreateManyWithoutWorkoutInput;
};

export type WorkoutExercise = {
  __typename?: 'WorkoutExercise';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  exerciseId: Scalars['Int'];
  workoutId?: Maybe<Scalars['Int']>;
  workoutRoutineId: Scalars['Int'];
  break: Scalars['Int'];
  sets: Scalars['Int'];
  reps?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  seconds?: Maybe<Scalars['Int']>;
  comments?: Maybe<Scalars['String']>;
  unitMeasure?: Maybe<UnitMeasure>;
  order: Scalars['Int'];
  day: Day;
  workoutRoutine: WorkoutRoutine;
  workout?: Maybe<Workout>;
  exercise: Exercise;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  isDeleted: Scalars['Boolean'];
};

export type WorkoutExerciseCreateManyWithoutWorkoutInput = {
  create: Array<WorkoutExerciseCreateWithoutWorkoutRoutineInput>;
};

export type WorkoutExerciseCreateManyWithoutWorkoutRoutineInput = {
  create?: Maybe<Array<WorkoutExerciseCreateWithoutWorkoutRoutineInput>>;
  update?: Maybe<Array<WorkoutExerciseUpdateManyWithWhereWithoutWorkoutRoutineInput>>;
  delete?: Maybe<Array<WorkoutExerciseWhereUniqueInput>>;
};

export type WorkoutExerciseCreateWithoutWorkoutRoutineInput = {
  sets: Scalars['Int'];
  order: Scalars['Int'];
  day: Day;
  break?: Maybe<Scalars['Int']>;
  reps?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  seconds?: Maybe<Scalars['Int']>;
  comments?: Maybe<Scalars['String']>;
  unitMeasure?: Maybe<UnitMeasure>;
  exercise: ExerciseCreateOneWithoutWorkoutExercisesInput;
};

export type WorkoutExerciseUpdateManyWithWhereWithoutWorkoutRoutineInput = {
  data: WorkoutExerciseUpdateWithoutWorkoutRoutineInput;
  where: WorkoutExerciseWhereUniqueInput;
};

export type WorkoutExerciseUpdateWithoutWorkoutRoutineInput = {
  sets?: Maybe<Scalars['Int']>;
  break?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  day?: Maybe<Day>;
  reps?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  seconds?: Maybe<Scalars['Int']>;
  comments?: Maybe<Scalars['String']>;
  unitMeasure?: Maybe<UnitMeasure>;
  exercise?: Maybe<ExerciseCreateOneWithoutWorkoutExercisesInput>;
};

export type WorkoutExerciseWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type WorkoutOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type WorkoutRoutine = {
  __typename?: 'WorkoutRoutine';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
  isTemplate: Scalars['Boolean'];
  isDraft: Scalars['Boolean'];
  user?: Maybe<User>;
  plan?: Maybe<Plan>;
  workoutExercises: Array<WorkoutExercise>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type WorkoutRoutineCreateInput = {
  name: Scalars['String'];
  workoutExercises: WorkoutExerciseCreateManyWithoutWorkoutRoutineInput;
};

export type WorkoutRoutineOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type WorkoutRoutineUpdateInput = {
  name?: Maybe<Scalars['String']>;
  workoutExercises: WorkoutExerciseCreateManyWithoutWorkoutRoutineInput;
};

export type WorkoutRoutineWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type WorkoutRoutineWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type WorkoutUpdateInput = {
  difficultyLevel?: Maybe<Scalars['Int']>;
  enjoymentLevel?: Maybe<Scalars['Int']>;
};

export type WorkoutWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  user?: Maybe<UserWhereInput>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type WorkoutWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type CreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: { __typename?: 'User' } & Pick<User, 'id'>;
};

export type CreateBodyMeasureMutationVariables = Exact<{
  data: BodyMeasureCreateInput;
}>;

export type CreateBodyMeasureMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'BodyMeasure' } & Pick<
    BodyMeasure,
    | 'uuid'
    | 'height'
    | 'weight'
    | 'frontBodyImage'
    | 'backBodyImage'
    | 'rightSideBodyImage'
    | 'leftSideBodyImage'
    | 'createdAt'
  >;
};

export type GetPlanBodyMeasuresQueryVariables = Exact<{
  where: BodyMeasureWhereInput;
}>;

export type GetPlanBodyMeasuresQuery = { __typename?: 'Query' } & {
  payload: Array<
    { __typename?: 'BodyMeasure' } & Pick<
      BodyMeasure,
      | 'uuid'
      | 'height'
      | 'weight'
      | 'frontBodyImage'
      | 'backBodyImage'
      | 'rightSideBodyImage'
      | 'leftSideBodyImage'
      | 'createdAt'
    >
  >;
};

export type GetClientQueryVariables = Exact<{
  where: ClientWhereUniqueInput;
}>;

export type GetClientQuery = { __typename?: 'Query' } & {
  payload: { __typename?: 'Client' } & Pick<
    Client,
    'uuid' | 'email' | 'username' | 'firstName' | 'lastName' | 'phone' | 'birthday' | 'avatar' | 'gender'
  > & {
      plans: Array<
        { __typename?: 'Plan' } & Pick<
          Plan,
          'uuid' | 'name' | 'price' | 'currency' | 'intervalCount' | 'intervalPlan' | 'status' | 'startAt' | 'expireAt'
        >
      >;
    };
};

export type GetClientsQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
  order: ClientOrderByInput;
  where?: Maybe<ClientWhereInput>;
  search?: Maybe<SearchInput>;
}>;

export type GetClientsQuery = { __typename?: 'Query' } & {
  payload: Array<
    { __typename?: 'Client' } & Pick<Client, 'uuid' | 'firstName' | 'lastName' | 'email' | 'phone' | 'avatar'>
  >;
};

export type GetDietPlanQueryVariables = Exact<{
  where: DietPlanWhereUniqueInput;
}>;

export type GetDietPlanQuery = { __typename?: 'Query' } & {
  payload: { __typename?: 'DietPlan' } & Pick<DietPlan, 'uuid' | 'file'>;
};

export type UpdateDietPlanMutationVariables = Exact<{
  data: DietPlanUpdateInput;
  where: DietPlanWhereUniqueInput;
}>;

export type UpdateDietPlanMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'DietPlan' } & Pick<DietPlan, 'uuid' | 'file'>;
};

export type CreateExerciseMutationVariables = Exact<{
  data: ExerciseCreateInput;
}>;

export type CreateExerciseMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'Exercise' } & Pick<Exercise, 'uuid' | 'name' | 'description' | 'muscleGroups'> & {
      user: { __typename?: 'User' } & Pick<User, 'uuid'>;
    };
};

export type GetExerciseQueryVariables = Exact<{
  where: ExerciseWhereUniqueInput;
}>;

export type GetExerciseQuery = { __typename?: 'Query' } & {
  payload: { __typename?: 'Exercise' } & Pick<Exercise, 'name' | 'description' | 'image' | 'video' | 'muscleGroups'> & {
      user: { __typename?: 'User' } & Pick<User, 'uuid'>;
    };
};

export type GetExercisesQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
  order: ExerciseOrderByInput;
  where?: Maybe<ExerciseWhereInput>;
  search?: Maybe<SearchInput>;
}>;

export type GetExercisesQuery = { __typename?: 'Query' } & {
  payload: Array<
    { __typename?: 'Exercise' } & Pick<Exercise, 'uuid' | 'name' | 'description' | 'image' | 'muscleGroups'> & {
        user: { __typename?: 'User' } & Pick<User, 'uuid'>;
      }
  >;
};

export type UpdateExerciseMutationVariables = Exact<{
  where: ExerciseWhereUniqueInput;
  data: ExerciseUpdateInput;
}>;

export type UpdateExerciseMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'Exercise' } & Pick<Exercise, 'name' | 'description' | 'muscleGroups'>;
};

export type CreateMealMutationVariables = Exact<{
  data: MealCreateInput;
}>;

export type CreateMealMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'Meal' } & Pick<Meal, 'uuid'>;
};

export type DeleteMealMutationVariables = Exact<{
  where: MealWhereUniqueInput;
}>;

export type DeleteMealMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'Meal' } & Pick<Meal, 'uuid'>;
};

export type GetAllIngredientsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllIngredientsQuery = { __typename?: 'Query' } & {
  payload: Array<{ __typename?: 'Ingredient' } & Pick<Ingredient, 'uuid' | 'name'>>;
};

export type GetMealQueryVariables = Exact<{
  where: MealWhereUniqueInput;
}>;

export type GetMealQuery = { __typename?: 'Query' } & {
  payload: { __typename?: 'Meal' } & Pick<Meal, 'name' | 'description' | 'image'> & {
      mealIngredients: Array<
        { __typename?: 'MealIngredient' } & { ingredient: { __typename?: 'Ingredient' } & Pick<Ingredient, 'uuid'> }
      >;
    };
};

export type GetMealsQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
  order: MealOrderByInput;
}>;

export type GetMealsQuery = { __typename?: 'Query' } & {
  payload: Array<{ __typename?: 'Meal' } & Pick<Meal, 'uuid' | 'name' | 'description' | 'image'>>;
};

export type UpdateMealMutationVariables = Exact<{
  data: MealUpdateInput;
  where: MealWhereUniqueInput;
}>;

export type UpdateMealMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'Meal' } & Pick<Meal, 'name' | 'description' | 'image'> & {
      mealIngredients: Array<
        { __typename?: 'MealIngredient' } & { ingredient: { __typename?: 'Ingredient' } & Pick<Ingredient, 'uuid'> }
      >;
    };
};

export type CleanNewPlanActivitiesMutationVariables = Exact<{ [key: string]: never }>;

export type CleanNewPlanActivitiesMutation = { __typename?: 'Mutation' } & {
  payload: Array<{ __typename?: 'PlanActivity' } & Pick<PlanActivity, 'uuid'>>;
};

export type GetPlanActivitiesQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
}>;

export type GetPlanActivitiesQuery = { __typename?: 'Query' } & {
  payload: Array<
    { __typename?: 'PlanActivity' } & Pick<PlanActivity, 'uuid' | 'type' | 'seen' | 'isNew' | 'createdAt'> & {
        plan: { __typename?: 'Plan' } & Pick<Plan, 'uuid' | 'name' | 'price' | 'currency'> & {
            owner: { __typename?: 'User' } & Pick<User, 'uuid' | 'firstName' | 'lastName'>;
            workoutRoutine?: Maybe<{ __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid'>>;
            planAssociations: Array<
              { __typename?: 'PlanAssociation' } & Pick<PlanAssociation, 'association'> & {
                  user: { __typename?: 'User' } & Pick<User, 'firstName' | 'lastName'>;
                }
            >;
          };
      }
  >;
};

export type ReadAllPlanActivitiesMutationVariables = Exact<{ [key: string]: never }>;

export type ReadAllPlanActivitiesMutation = { __typename?: 'Mutation' } & {
  payload: Array<{ __typename?: 'PlanActivity' } & Pick<PlanActivity, 'uuid'>>;
};

export type UpdatePlanActivityMutationVariables = Exact<{
  where: PlanActivityWhereUniqueInput;
  data: PlanActivityUpdateInput;
}>;

export type UpdatePlanActivityMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'PlanActivity' } & Pick<PlanActivity, 'uuid'>;
};

export type AcceptPlanInvitationMutationVariables = Exact<{
  data: PlanInvitationAcceptInput;
}>;

export type AcceptPlanInvitationMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'PlanInvitation' } & Pick<PlanInvitation, 'link'>;
};

export type CreatePlanInvitationMutationVariables = Exact<{
  data: PlanInvitationCreateInput;
}>;

export type CreatePlanInvitationMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'PlanInvitation' } & Pick<PlanInvitation, 'uuid'>;
};

export type GetPlanInvitationQueryVariables = Exact<{
  where: PlanInvitationWhereUniqueInput;
}>;

export type GetPlanInvitationQuery = { __typename?: 'Query' } & {
  payload: { __typename?: 'PlanInvitation' } & Pick<PlanInvitation, 'link'> & {
      plan: { __typename?: 'Plan' } & Pick<Plan, 'name' | 'price' | 'currency' | 'intervalCount' | 'intervalPlan'>;
    };
};

export type GetPlanInvitationsQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
  order: PlanInvitationOrderByInput;
  where?: Maybe<PlanInvitationWhereInput>;
  search?: Maybe<SearchInput>;
}>;

export type GetPlanInvitationsQuery = { __typename?: 'Query' } & {
  payload: Array<
    { __typename?: 'PlanInvitation' } & Pick<PlanInvitation, 'uuid' | 'link'> & {
        plan: { __typename?: 'Plan' } & Pick<Plan, 'name' | 'price' | 'currency' | 'intervalCount' | 'intervalPlan'> & {
            owner: { __typename?: 'User' } & Pick<User, 'uuid' | 'avatar' | 'firstName' | 'lastName'>;
          };
        user: { __typename?: 'User' } & Pick<User, 'uuid' | 'avatar' | 'firstName' | 'lastName'>;
      }
  >;
};

export type CreatePlanMutationVariables = Exact<{
  data: PlanCreateInput;
}>;

export type CreatePlanMutation = { __typename?: 'Mutation' } & { payload: { __typename?: 'Plan' } & Pick<Plan, 'id'> };

export type DeletePlanMutationVariables = Exact<{
  where: PlanWhereUniqueInput;
}>;

export type DeletePlanMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'Plan' } & Pick<Plan, 'uuid'>;
};

export type GetAllPlansQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllPlansQuery = { __typename?: 'Query' } & {
  payload: Array<{ __typename?: 'Plan' } & Pick<Plan, 'uuid' | 'name' | 'status' | 'intervalCount' | 'intervalPlan'>>;
};

export type GetPlanDetailQueryVariables = Exact<{
  where: PlanWhereUniqueInput;
}>;

export type GetPlanDetailQuery = { __typename?: 'Query' } & {
  payload: { __typename?: 'Plan' } & Pick<
    Plan,
    | 'uuid'
    | 'name'
    | 'price'
    | 'currency'
    | 'intervalCount'
    | 'intervalPlan'
    | 'status'
    | 'scope'
    | 'description'
    | 'isDietPlanEnabled'
    | 'isExercisesPlanEnabled'
    | 'createdAt'
    | 'finishedAt'
    | 'startAt'
    | 'expireAt'
  > & {
      owner: { __typename?: 'User' } & Pick<User, 'uuid' | 'avatar' | 'firstName' | 'lastName'>;
      purchasePlan?: Maybe<{ __typename?: 'Plan' } & Pick<Plan, 'uuid' | 'status'>>;
      dietPlan?: Maybe<{ __typename?: 'DietPlan' } & Pick<DietPlan, 'uuid' | 'file'>>;
      workoutRoutine?: Maybe<{ __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid' | 'isDraft'>>;
      planAssociations: Array<
        { __typename?: 'PlanAssociation' } & Pick<PlanAssociation, 'association'> & {
            user: { __typename?: 'User' } & Pick<User, 'uuid' | 'firstName' | 'lastName' | 'avatar'>;
          }
      >;
    };
};

export type GetPlanQueryVariables = Exact<{
  where: PlanWhereUniqueInput;
}>;

export type GetPlanQuery = { __typename?: 'Query' } & {
  payload: { __typename?: 'Plan' } & Pick<
    Plan,
    | 'name'
    | 'price'
    | 'currency'
    | 'intervalCount'
    | 'intervalPlan'
    | 'status'
    | 'description'
    | 'isDietPlanEnabled'
    | 'isExercisesPlanEnabled'
  >;
};

export type GetPlansQueryVariables = Exact<{
  take: Scalars['Int'];
  skip: Scalars['Int'];
  order: PlanOrderByInput;
  where?: Maybe<PlanWhereInput>;
  search?: Maybe<SearchInput>;
}>;

export type GetPlansQuery = { __typename?: 'Query' } & {
  payload: Array<
    { __typename?: 'Plan' } & Pick<
      Plan,
      'uuid' | 'name' | 'price' | 'currency' | 'intervalCount' | 'intervalPlan' | 'status'
    >
  >;
};

export type RenovatePlanMutationVariables = Exact<{
  data: PlanBuyInput;
  where: PlanWhereUniqueInput;
}>;

export type RenovatePlanMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'Plan' } & Pick<Plan, 'uuid'>;
};

export type UpdatePlanMutationVariables = Exact<{
  data: PlanUpdateInput;
  where: PlanWhereUniqueInput;
}>;

export type UpdatePlanMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'Plan' } & Pick<
    Plan,
    | 'uuid'
    | 'name'
    | 'price'
    | 'currency'
    | 'intervalCount'
    | 'intervalPlan'
    | 'status'
    | 'description'
    | 'isDietPlanEnabled'
    | 'isExercisesPlanEnabled'
  >;
};

export type UpdateUserMutationVariables = Exact<{
  data: UserUpdateInput;
}>;

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser: { __typename?: 'User' } & Pick<
    User,
    'uuid' | 'email' | 'firstName' | 'lastName' | 'gender' | 'avatar' | 'status'
  >;
};

export type CreateWorkoutMutationVariables = Exact<{
  data: WorkoutCreateInput;
}>;

export type CreateWorkoutMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'Workout' } & Pick<Workout, 'uuid'>;
};

export type GetTrainingQueryVariables = Exact<{
  where: TrainingWhereInput;
}>;

export type GetTrainingQuery = { __typename?: 'Query' } & {
  payload?: Maybe<
    { __typename?: 'Training' } & {
      workoutExercises: Array<
        { __typename?: 'WorkoutExercise' } & Pick<
          WorkoutExercise,
          'uuid' | 'sets' | 'reps' | 'weight' | 'seconds' | 'comments' | 'order' | 'day'
        > & { exercise: { __typename?: 'Exercise' } & Pick<Exercise, 'uuid' | 'name'> }
      >;
    }
  >;
};

export type GetWorkoutQueryVariables = Exact<{
  where: WorkoutWhereUniqueInput;
}>;

export type GetWorkoutQuery = { __typename?: 'Query' } & {
  payload: { __typename?: 'Workout' } & {
    workoutExercises: Array<
      { __typename?: 'WorkoutExercise' } & Pick<WorkoutExercise, 'uuid' | 'sets' | 'reps' | 'weight' | 'seconds'> & {
          exercise: { __typename?: 'Exercise' } & Pick<Exercise, 'uuid' | 'name'>;
        }
    >;
  };
};

export type CreateWorkoutRoutineMutationVariables = Exact<{
  data: WorkoutRoutineCreateInput;
}>;

export type CreateWorkoutRoutineMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid'>;
};

export type GetAllExercisesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllExercisesQuery = { __typename?: 'Query' } & {
  payload: Array<
    { __typename?: 'Exercise' } & Pick<Exercise, 'uuid' | 'name' | 'description' | 'muscleGroups'> & {
        user: { __typename?: 'User' } & Pick<User, 'uuid'>;
      }
  >;
};

export type GetAllWorkoutRoutinesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllWorkoutRoutinesQuery = { __typename?: 'Query' } & {
  payload: Array<
    { __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid' | 'name'> & {
        workoutExercises: Array<
          { __typename?: 'WorkoutExercise' } & Pick<
            WorkoutExercise,
            'uuid' | 'sets' | 'reps' | 'weight' | 'seconds' | 'day' | 'comments' | 'unitMeasure' | 'order'
          > & {
              exercise: { __typename?: 'Exercise' } & Pick<
                Exercise,
                'uuid' | 'name' | 'description' | 'muscleGroups'
              > & { user: { __typename?: 'User' } & Pick<User, 'uuid'> };
            }
        >;
      }
  >;
};

export type GetWorkoutRoutineQueryVariables = Exact<{
  where: WorkoutRoutineWhereUniqueInput;
}>;

export type GetWorkoutRoutineQuery = { __typename?: 'Query' } & {
  payload: { __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid' | 'isTemplate' | 'name' | 'isDraft'> & {
      workoutExercises: Array<
        { __typename?: 'WorkoutExercise' } & Pick<
          WorkoutExercise,
          'uuid' | 'sets' | 'reps' | 'weight' | 'seconds' | 'day' | 'comments' | 'unitMeasure' | 'order'
        > & {
            exercise: { __typename?: 'Exercise' } & Pick<Exercise, 'uuid' | 'name' | 'description' | 'muscleGroups'> & {
                user: { __typename?: 'User' } & Pick<User, 'uuid'>;
              };
          }
      >;
    };
};

export type GetWorkoutRoutinesQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
  order: WorkoutRoutineOrderByInput;
  where?: Maybe<WorkoutRoutineWhereInput>;
  search?: Maybe<SearchInput>;
}>;

export type GetWorkoutRoutinesQuery = { __typename?: 'Query' } & {
  payload: Array<{ __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid' | 'name' | 'isDraft'>>;
};

export type SendWorkoutRoutineMutationVariables = Exact<{
  where: WorkoutRoutineWhereUniqueInput;
}>;

export type SendWorkoutRoutineMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid'> & {
      plan?: Maybe<{ __typename?: 'Plan' } & Pick<Plan, 'uuid'>>;
    };
};

export type UpdateWorkoutRoutineMutationVariables = Exact<{
  data: WorkoutRoutineUpdateInput;
  where: WorkoutRoutineWhereUniqueInput;
}>;

export type UpdateWorkoutRoutineMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid'> & {
      plan?: Maybe<{ __typename?: 'Plan' } & Pick<Plan, 'uuid'>>;
      workoutExercises: Array<
        { __typename?: 'WorkoutExercise' } & Pick<
          WorkoutExercise,
          'uuid' | 'sets' | 'reps' | 'weight' | 'seconds' | 'day' | 'comments' | 'order'
        > & {
            exercise: { __typename?: 'Exercise' } & Pick<Exercise, 'uuid' | 'name' | 'description' | 'muscleGroups'> & {
                user: { __typename?: 'User' } & Pick<User, 'uuid'>;
              };
          }
      >;
    };
};

export type GetWorkoutsQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
  order: WorkoutOrderByInput;
  where?: Maybe<WorkoutWhereInput>;
}>;

export type GetWorkoutsQuery = { __typename?: 'Query' } & {
  payload: Array<
    { __typename?: 'Workout' } & Pick<Workout, 'uuid' | 'createdAt'> & {
        workoutRoutine: { __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid'> & {
            plan?: Maybe<
              { __typename?: 'Plan' } & Pick<Plan, 'name'> & {
                  planAssociations: Array<
                    { __typename?: 'PlanAssociation' } & {
                      user: { __typename?: 'User' } & Pick<User, 'avatar' | 'firstName' | 'lastName'>;
                    }
                  >;
                  owner: { __typename?: 'User' } & Pick<User, 'avatar' | 'firstName' | 'lastName'>;
                }
            >;
          };
        workoutExercises: Array<{ __typename?: 'WorkoutExercise' } & Pick<WorkoutExercise, 'uuid'>>;
      }
  >;
};

export type PublicUserQueryVariables = Exact<{
  where: PublicUserWhereUniqueInput;
}>;

export type PublicUserQuery = { __typename?: 'Query' } & {
  payload?: Maybe<{ __typename?: 'PublicUser' } & Pick<PublicUser, 'email' | 'username' | 'type'>>;
};

export type UserProfileQueryVariables = Exact<{
  where: UserWhereUniqueInput;
}>;

export type UserProfileQuery = { __typename?: 'Query' } & {
  user: { __typename?: 'User' } & Pick<
    User,
    | 'uuid'
    | 'email'
    | 'username'
    | 'firstName'
    | 'lastName'
    | 'phone'
    | 'gender'
    | 'avatar'
    | 'status'
    | 'scope'
    | 'birthday'
    | 'type'
  > & {
      progress?: Maybe<{ __typename?: 'UserProgress' } & Pick<UserProgress, 'hasPlans' | 'hasPlanInvitations'>>;
      currentActivePlan?: Maybe<
        { __typename?: 'Plan' } & Pick<Plan, 'uuid' | 'expireAt'> & {
            workoutRoutine?: Maybe<
              { __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid'> & {
                  workoutExercises: Array<
                    { __typename?: 'WorkoutExercise' } & Pick<
                      WorkoutExercise,
                      'uuid' | 'day' | 'workoutId' | 'isDeleted'
                    >
                  >;
                }
            >;
          }
      >;
    };
};

export const CreateUserDocument = gql`
  mutation createUser($data: UserCreateInput!) {
    createUser(data: $data) {
      id
    }
  }
`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>
) {
  return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUserMutation,
  CreateUserMutationVariables
>;
export const CreateBodyMeasureDocument = gql`
  mutation createBodyMeasure($data: BodyMeasureCreateInput!) {
    payload: createBodyMeasure(data: $data) {
      uuid
      height
      weight
      frontBodyImage
      backBodyImage
      rightSideBodyImage
      leftSideBodyImage
      createdAt
    }
  }
`;
export type CreateBodyMeasureMutationFn = ApolloReactCommon.MutationFunction<
  CreateBodyMeasureMutation,
  CreateBodyMeasureMutationVariables
>;

/**
 * __useCreateBodyMeasureMutation__
 *
 * To run a mutation, you first call `useCreateBodyMeasureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBodyMeasureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBodyMeasureMutation, { data, loading, error }] = useCreateBodyMeasureMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBodyMeasureMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateBodyMeasureMutation, CreateBodyMeasureMutationVariables>
) {
  return ApolloReactHooks.useMutation<CreateBodyMeasureMutation, CreateBodyMeasureMutationVariables>(
    CreateBodyMeasureDocument,
    baseOptions
  );
}
export type CreateBodyMeasureMutationHookResult = ReturnType<typeof useCreateBodyMeasureMutation>;
export type CreateBodyMeasureMutationResult = ApolloReactCommon.MutationResult<CreateBodyMeasureMutation>;
export type CreateBodyMeasureMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateBodyMeasureMutation,
  CreateBodyMeasureMutationVariables
>;
export const GetPlanBodyMeasuresDocument = gql`
  query getPlanBodyMeasures($where: BodyMeasureWhereInput!) {
    payload: bodyMeasures(where: $where, orderBy: { createdAt: DESC }) {
      uuid
      height
      weight
      frontBodyImage
      backBodyImage
      rightSideBodyImage
      leftSideBodyImage
      createdAt
    }
  }
`;

/**
 * __useGetPlanBodyMeasuresQuery__
 *
 * To run a query within a React component, call `useGetPlanBodyMeasuresQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlanBodyMeasuresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlanBodyMeasuresQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetPlanBodyMeasuresQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetPlanBodyMeasuresQuery, GetPlanBodyMeasuresQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetPlanBodyMeasuresQuery, GetPlanBodyMeasuresQueryVariables>(
    GetPlanBodyMeasuresDocument,
    baseOptions
  );
}
export function useGetPlanBodyMeasuresLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlanBodyMeasuresQuery, GetPlanBodyMeasuresQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetPlanBodyMeasuresQuery, GetPlanBodyMeasuresQueryVariables>(
    GetPlanBodyMeasuresDocument,
    baseOptions
  );
}
export type GetPlanBodyMeasuresQueryHookResult = ReturnType<typeof useGetPlanBodyMeasuresQuery>;
export type GetPlanBodyMeasuresLazyQueryHookResult = ReturnType<typeof useGetPlanBodyMeasuresLazyQuery>;
export type GetPlanBodyMeasuresQueryResult = ApolloReactCommon.QueryResult<
  GetPlanBodyMeasuresQuery,
  GetPlanBodyMeasuresQueryVariables
>;
export const GetClientDocument = gql`
  query getClient($where: ClientWhereUniqueInput!) {
    payload: client(where: $where) {
      uuid
      email
      username
      firstName
      lastName
      phone
      birthday
      avatar
      gender
      plans {
        uuid
        name
        price
        currency
        intervalCount
        intervalPlan
        status
        startAt
        expireAt
      }
    }
  }
`;

/**
 * __useGetClientQuery__
 *
 * To run a query within a React component, call `useGetClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetClientQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetClientQuery, GetClientQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetClientQuery, GetClientQueryVariables>(GetClientDocument, baseOptions);
}
export function useGetClientLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientQuery, GetClientQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetClientQuery, GetClientQueryVariables>(GetClientDocument, baseOptions);
}
export type GetClientQueryHookResult = ReturnType<typeof useGetClientQuery>;
export type GetClientLazyQueryHookResult = ReturnType<typeof useGetClientLazyQuery>;
export type GetClientQueryResult = ApolloReactCommon.QueryResult<GetClientQuery, GetClientQueryVariables>;
export const GetClientsDocument = gql`
  query getClients(
    $skip: Int!
    $take: Int!
    $order: ClientOrderByInput!
    $where: ClientWhereInput
    $search: SearchInput
  ) {
    payload: clients(skip: $skip, take: $take, orderBy: $order, where: $where, search: $search) {
      uuid
      firstName
      lastName
      email
      phone
      avatar
    }
  }
`;

/**
 * __useGetClientsQuery__
 *
 * To run a query within a React component, call `useGetClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      order: // value for 'order'
 *      where: // value for 'where'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetClientsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetClientsQuery, GetClientsQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetClientsQuery, GetClientsQueryVariables>(GetClientsDocument, baseOptions);
}
export function useGetClientsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetClientsQuery, GetClientsQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetClientsQuery, GetClientsQueryVariables>(GetClientsDocument, baseOptions);
}
export type GetClientsQueryHookResult = ReturnType<typeof useGetClientsQuery>;
export type GetClientsLazyQueryHookResult = ReturnType<typeof useGetClientsLazyQuery>;
export type GetClientsQueryResult = ApolloReactCommon.QueryResult<GetClientsQuery, GetClientsQueryVariables>;
export const GetDietPlanDocument = gql`
  query getDietPlan($where: DietPlanWhereUniqueInput!) {
    payload: dietPlan(where: $where) {
      uuid
      file
    }
  }
`;

/**
 * __useGetDietPlanQuery__
 *
 * To run a query within a React component, call `useGetDietPlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDietPlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDietPlanQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetDietPlanQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetDietPlanQuery, GetDietPlanQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetDietPlanQuery, GetDietPlanQueryVariables>(GetDietPlanDocument, baseOptions);
}
export function useGetDietPlanLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDietPlanQuery, GetDietPlanQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetDietPlanQuery, GetDietPlanQueryVariables>(GetDietPlanDocument, baseOptions);
}
export type GetDietPlanQueryHookResult = ReturnType<typeof useGetDietPlanQuery>;
export type GetDietPlanLazyQueryHookResult = ReturnType<typeof useGetDietPlanLazyQuery>;
export type GetDietPlanQueryResult = ApolloReactCommon.QueryResult<GetDietPlanQuery, GetDietPlanQueryVariables>;
export const UpdateDietPlanDocument = gql`
  mutation updateDietPlan($data: DietPlanUpdateInput!, $where: DietPlanWhereUniqueInput!) {
    payload: updateDietPlan(data: $data, where: $where) {
      uuid
      file
    }
  }
`;
export type UpdateDietPlanMutationFn = ApolloReactCommon.MutationFunction<
  UpdateDietPlanMutation,
  UpdateDietPlanMutationVariables
>;

/**
 * __useUpdateDietPlanMutation__
 *
 * To run a mutation, you first call `useUpdateDietPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDietPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDietPlanMutation, { data, loading, error }] = useUpdateDietPlanMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateDietPlanMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateDietPlanMutation, UpdateDietPlanMutationVariables>
) {
  return ApolloReactHooks.useMutation<UpdateDietPlanMutation, UpdateDietPlanMutationVariables>(
    UpdateDietPlanDocument,
    baseOptions
  );
}
export type UpdateDietPlanMutationHookResult = ReturnType<typeof useUpdateDietPlanMutation>;
export type UpdateDietPlanMutationResult = ApolloReactCommon.MutationResult<UpdateDietPlanMutation>;
export type UpdateDietPlanMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateDietPlanMutation,
  UpdateDietPlanMutationVariables
>;
export const CreateExerciseDocument = gql`
  mutation createExercise($data: ExerciseCreateInput!) {
    payload: createExercise(data: $data) {
      uuid
      name
      description
      muscleGroups
      user {
        uuid
      }
    }
  }
`;
export type CreateExerciseMutationFn = ApolloReactCommon.MutationFunction<
  CreateExerciseMutation,
  CreateExerciseMutationVariables
>;

/**
 * __useCreateExerciseMutation__
 *
 * To run a mutation, you first call `useCreateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExerciseMutation, { data, loading, error }] = useCreateExerciseMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateExerciseMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateExerciseMutation, CreateExerciseMutationVariables>
) {
  return ApolloReactHooks.useMutation<CreateExerciseMutation, CreateExerciseMutationVariables>(
    CreateExerciseDocument,
    baseOptions
  );
}
export type CreateExerciseMutationHookResult = ReturnType<typeof useCreateExerciseMutation>;
export type CreateExerciseMutationResult = ApolloReactCommon.MutationResult<CreateExerciseMutation>;
export type CreateExerciseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateExerciseMutation,
  CreateExerciseMutationVariables
>;
export const GetExerciseDocument = gql`
  query getExercise($where: ExerciseWhereUniqueInput!) {
    payload: exercise(where: $where) {
      name
      description
      image
      video
      muscleGroups
      user {
        uuid
      }
    }
  }
`;

/**
 * __useGetExerciseQuery__
 *
 * To run a query within a React component, call `useGetExerciseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExerciseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExerciseQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetExerciseQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetExerciseQuery, GetExerciseQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetExerciseQuery, GetExerciseQueryVariables>(GetExerciseDocument, baseOptions);
}
export function useGetExerciseLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetExerciseQuery, GetExerciseQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetExerciseQuery, GetExerciseQueryVariables>(GetExerciseDocument, baseOptions);
}
export type GetExerciseQueryHookResult = ReturnType<typeof useGetExerciseQuery>;
export type GetExerciseLazyQueryHookResult = ReturnType<typeof useGetExerciseLazyQuery>;
export type GetExerciseQueryResult = ApolloReactCommon.QueryResult<GetExerciseQuery, GetExerciseQueryVariables>;
export const GetExercisesDocument = gql`
  query getExercises(
    $skip: Int!
    $take: Int!
    $order: ExerciseOrderByInput!
    $where: ExerciseWhereInput
    $search: SearchInput
  ) {
    payload: exercises(skip: $skip, take: $take, orderBy: $order, where: $where, search: $search) {
      uuid
      name
      description
      image
      muscleGroups
      user {
        uuid
      }
    }
  }
`;

/**
 * __useGetExercisesQuery__
 *
 * To run a query within a React component, call `useGetExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExercisesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      order: // value for 'order'
 *      where: // value for 'where'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetExercisesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetExercisesQuery, GetExercisesQueryVariables>(GetExercisesDocument, baseOptions);
}
export function useGetExercisesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetExercisesQuery, GetExercisesQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetExercisesQuery, GetExercisesQueryVariables>(
    GetExercisesDocument,
    baseOptions
  );
}
export type GetExercisesQueryHookResult = ReturnType<typeof useGetExercisesQuery>;
export type GetExercisesLazyQueryHookResult = ReturnType<typeof useGetExercisesLazyQuery>;
export type GetExercisesQueryResult = ApolloReactCommon.QueryResult<GetExercisesQuery, GetExercisesQueryVariables>;
export const UpdateExerciseDocument = gql`
  mutation updateExercise($where: ExerciseWhereUniqueInput!, $data: ExerciseUpdateInput!) {
    payload: updateExercise(where: $where, data: $data) {
      name
      description
      muscleGroups
    }
  }
`;
export type UpdateExerciseMutationFn = ApolloReactCommon.MutationFunction<
  UpdateExerciseMutation,
  UpdateExerciseMutationVariables
>;

/**
 * __useUpdateExerciseMutation__
 *
 * To run a mutation, you first call `useUpdateExerciseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExerciseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateExerciseMutation, { data, loading, error }] = useUpdateExerciseMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateExerciseMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateExerciseMutation, UpdateExerciseMutationVariables>
) {
  return ApolloReactHooks.useMutation<UpdateExerciseMutation, UpdateExerciseMutationVariables>(
    UpdateExerciseDocument,
    baseOptions
  );
}
export type UpdateExerciseMutationHookResult = ReturnType<typeof useUpdateExerciseMutation>;
export type UpdateExerciseMutationResult = ApolloReactCommon.MutationResult<UpdateExerciseMutation>;
export type UpdateExerciseMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateExerciseMutation,
  UpdateExerciseMutationVariables
>;
export const CreateMealDocument = gql`
  mutation createMeal($data: MealCreateInput!) {
    payload: createMeal(data: $data) {
      uuid
    }
  }
`;
export type CreateMealMutationFn = ApolloReactCommon.MutationFunction<CreateMealMutation, CreateMealMutationVariables>;

/**
 * __useCreateMealMutation__
 *
 * To run a mutation, you first call `useCreateMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMealMutation, { data, loading, error }] = useCreateMealMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateMealMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateMealMutation, CreateMealMutationVariables>
) {
  return ApolloReactHooks.useMutation<CreateMealMutation, CreateMealMutationVariables>(CreateMealDocument, baseOptions);
}
export type CreateMealMutationHookResult = ReturnType<typeof useCreateMealMutation>;
export type CreateMealMutationResult = ApolloReactCommon.MutationResult<CreateMealMutation>;
export type CreateMealMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateMealMutation,
  CreateMealMutationVariables
>;
export const DeleteMealDocument = gql`
  mutation deleteMeal($where: MealWhereUniqueInput!) {
    payload: deleteMeal(where: $where) {
      uuid
    }
  }
`;
export type DeleteMealMutationFn = ApolloReactCommon.MutationFunction<DeleteMealMutation, DeleteMealMutationVariables>;

/**
 * __useDeleteMealMutation__
 *
 * To run a mutation, you first call `useDeleteMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMealMutation, { data, loading, error }] = useDeleteMealMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteMealMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteMealMutation, DeleteMealMutationVariables>
) {
  return ApolloReactHooks.useMutation<DeleteMealMutation, DeleteMealMutationVariables>(DeleteMealDocument, baseOptions);
}
export type DeleteMealMutationHookResult = ReturnType<typeof useDeleteMealMutation>;
export type DeleteMealMutationResult = ApolloReactCommon.MutationResult<DeleteMealMutation>;
export type DeleteMealMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteMealMutation,
  DeleteMealMutationVariables
>;
export const GetAllIngredientsDocument = gql`
  query getAllIngredients {
    payload: ingredients {
      uuid
      name
    }
  }
`;

/**
 * __useGetAllIngredientsQuery__
 *
 * To run a query within a React component, call `useGetAllIngredientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllIngredientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllIngredientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllIngredientsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>(
    GetAllIngredientsDocument,
    baseOptions
  );
}
export function useGetAllIngredientsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>(
    GetAllIngredientsDocument,
    baseOptions
  );
}
export type GetAllIngredientsQueryHookResult = ReturnType<typeof useGetAllIngredientsQuery>;
export type GetAllIngredientsLazyQueryHookResult = ReturnType<typeof useGetAllIngredientsLazyQuery>;
export type GetAllIngredientsQueryResult = ApolloReactCommon.QueryResult<
  GetAllIngredientsQuery,
  GetAllIngredientsQueryVariables
>;
export const GetMealDocument = gql`
  query getMeal($where: MealWhereUniqueInput!) {
    payload: meal(where: $where) {
      name
      description
      image
      mealIngredients {
        ingredient {
          uuid
        }
      }
    }
  }
`;

/**
 * __useGetMealQuery__
 *
 * To run a query within a React component, call `useGetMealQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMealQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMealQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetMealQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMealQuery, GetMealQueryVariables>) {
  return ApolloReactHooks.useQuery<GetMealQuery, GetMealQueryVariables>(GetMealDocument, baseOptions);
}
export function useGetMealLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMealQuery, GetMealQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetMealQuery, GetMealQueryVariables>(GetMealDocument, baseOptions);
}
export type GetMealQueryHookResult = ReturnType<typeof useGetMealQuery>;
export type GetMealLazyQueryHookResult = ReturnType<typeof useGetMealLazyQuery>;
export type GetMealQueryResult = ApolloReactCommon.QueryResult<GetMealQuery, GetMealQueryVariables>;
export const GetMealsDocument = gql`
  query getMeals($take: Int!, $skip: Int!, $order: MealOrderByInput!) {
    payload: meals(take: $take, skip: $skip, orderBy: $order) {
      uuid
      name
      description
      image
    }
  }
`;

/**
 * __useGetMealsQuery__
 *
 * To run a query within a React component, call `useGetMealsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMealsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMealsQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      order: // value for 'order'
 *   },
 * });
 */
export function useGetMealsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetMealsQuery, GetMealsQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetMealsQuery, GetMealsQueryVariables>(GetMealsDocument, baseOptions);
}
export function useGetMealsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMealsQuery, GetMealsQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetMealsQuery, GetMealsQueryVariables>(GetMealsDocument, baseOptions);
}
export type GetMealsQueryHookResult = ReturnType<typeof useGetMealsQuery>;
export type GetMealsLazyQueryHookResult = ReturnType<typeof useGetMealsLazyQuery>;
export type GetMealsQueryResult = ApolloReactCommon.QueryResult<GetMealsQuery, GetMealsQueryVariables>;
export const UpdateMealDocument = gql`
  mutation updateMeal($data: MealUpdateInput!, $where: MealWhereUniqueInput!) {
    payload: updateMeal(data: $data, where: $where) {
      name
      description
      image
      mealIngredients {
        ingredient {
          uuid
        }
      }
    }
  }
`;
export type UpdateMealMutationFn = ApolloReactCommon.MutationFunction<UpdateMealMutation, UpdateMealMutationVariables>;

/**
 * __useUpdateMealMutation__
 *
 * To run a mutation, you first call `useUpdateMealMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMealMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMealMutation, { data, loading, error }] = useUpdateMealMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateMealMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMealMutation, UpdateMealMutationVariables>
) {
  return ApolloReactHooks.useMutation<UpdateMealMutation, UpdateMealMutationVariables>(UpdateMealDocument, baseOptions);
}
export type UpdateMealMutationHookResult = ReturnType<typeof useUpdateMealMutation>;
export type UpdateMealMutationResult = ApolloReactCommon.MutationResult<UpdateMealMutation>;
export type UpdateMealMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateMealMutation,
  UpdateMealMutationVariables
>;
export const CleanNewPlanActivitiesDocument = gql`
  mutation cleanNewPlanActivities {
    payload: cleanNewPlanActivities {
      uuid
    }
  }
`;
export type CleanNewPlanActivitiesMutationFn = ApolloReactCommon.MutationFunction<
  CleanNewPlanActivitiesMutation,
  CleanNewPlanActivitiesMutationVariables
>;

/**
 * __useCleanNewPlanActivitiesMutation__
 *
 * To run a mutation, you first call `useCleanNewPlanActivitiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCleanNewPlanActivitiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cleanNewPlanActivitiesMutation, { data, loading, error }] = useCleanNewPlanActivitiesMutation({
 *   variables: {
 *   },
 * });
 */
export function useCleanNewPlanActivitiesMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CleanNewPlanActivitiesMutation,
    CleanNewPlanActivitiesMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<CleanNewPlanActivitiesMutation, CleanNewPlanActivitiesMutationVariables>(
    CleanNewPlanActivitiesDocument,
    baseOptions
  );
}
export type CleanNewPlanActivitiesMutationHookResult = ReturnType<typeof useCleanNewPlanActivitiesMutation>;
export type CleanNewPlanActivitiesMutationResult = ApolloReactCommon.MutationResult<CleanNewPlanActivitiesMutation>;
export type CleanNewPlanActivitiesMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CleanNewPlanActivitiesMutation,
  CleanNewPlanActivitiesMutationVariables
>;
export const GetPlanActivitiesDocument = gql`
  query getPlanActivities($take: Int!, $skip: Int!) {
    payload: planActivities(take: $take, skip: $skip) {
      uuid
      type
      seen
      isNew
      plan {
        uuid
        name
        price
        currency
        owner {
          uuid
          firstName
          lastName
        }
        workoutRoutine {
          uuid
        }
        planAssociations {
          association
          user {
            firstName
            lastName
          }
        }
      }
      createdAt
    }
  }
`;

/**
 * __useGetPlanActivitiesQuery__
 *
 * To run a query within a React component, call `useGetPlanActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlanActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlanActivitiesQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetPlanActivitiesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetPlanActivitiesQuery, GetPlanActivitiesQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetPlanActivitiesQuery, GetPlanActivitiesQueryVariables>(
    GetPlanActivitiesDocument,
    baseOptions
  );
}
export function useGetPlanActivitiesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlanActivitiesQuery, GetPlanActivitiesQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetPlanActivitiesQuery, GetPlanActivitiesQueryVariables>(
    GetPlanActivitiesDocument,
    baseOptions
  );
}
export type GetPlanActivitiesQueryHookResult = ReturnType<typeof useGetPlanActivitiesQuery>;
export type GetPlanActivitiesLazyQueryHookResult = ReturnType<typeof useGetPlanActivitiesLazyQuery>;
export type GetPlanActivitiesQueryResult = ApolloReactCommon.QueryResult<
  GetPlanActivitiesQuery,
  GetPlanActivitiesQueryVariables
>;
export const ReadAllPlanActivitiesDocument = gql`
  mutation readAllPlanActivities {
    payload: readAllPlanActivities {
      uuid
    }
  }
`;
export type ReadAllPlanActivitiesMutationFn = ApolloReactCommon.MutationFunction<
  ReadAllPlanActivitiesMutation,
  ReadAllPlanActivitiesMutationVariables
>;

/**
 * __useReadAllPlanActivitiesMutation__
 *
 * To run a mutation, you first call `useReadAllPlanActivitiesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReadAllPlanActivitiesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [readAllPlanActivitiesMutation, { data, loading, error }] = useReadAllPlanActivitiesMutation({
 *   variables: {
 *   },
 * });
 */
export function useReadAllPlanActivitiesMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ReadAllPlanActivitiesMutation,
    ReadAllPlanActivitiesMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<ReadAllPlanActivitiesMutation, ReadAllPlanActivitiesMutationVariables>(
    ReadAllPlanActivitiesDocument,
    baseOptions
  );
}
export type ReadAllPlanActivitiesMutationHookResult = ReturnType<typeof useReadAllPlanActivitiesMutation>;
export type ReadAllPlanActivitiesMutationResult = ApolloReactCommon.MutationResult<ReadAllPlanActivitiesMutation>;
export type ReadAllPlanActivitiesMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ReadAllPlanActivitiesMutation,
  ReadAllPlanActivitiesMutationVariables
>;
export const UpdatePlanActivityDocument = gql`
  mutation updatePlanActivity($where: PlanActivityWhereUniqueInput!, $data: PlanActivityUpdateInput!) {
    payload: updatePlanActivity(where: $where, data: $data) {
      uuid
    }
  }
`;
export type UpdatePlanActivityMutationFn = ApolloReactCommon.MutationFunction<
  UpdatePlanActivityMutation,
  UpdatePlanActivityMutationVariables
>;

/**
 * __useUpdatePlanActivityMutation__
 *
 * To run a mutation, you first call `useUpdatePlanActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlanActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlanActivityMutation, { data, loading, error }] = useUpdatePlanActivityMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePlanActivityMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePlanActivityMutation, UpdatePlanActivityMutationVariables>
) {
  return ApolloReactHooks.useMutation<UpdatePlanActivityMutation, UpdatePlanActivityMutationVariables>(
    UpdatePlanActivityDocument,
    baseOptions
  );
}
export type UpdatePlanActivityMutationHookResult = ReturnType<typeof useUpdatePlanActivityMutation>;
export type UpdatePlanActivityMutationResult = ApolloReactCommon.MutationResult<UpdatePlanActivityMutation>;
export type UpdatePlanActivityMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatePlanActivityMutation,
  UpdatePlanActivityMutationVariables
>;
export const AcceptPlanInvitationDocument = gql`
  mutation acceptPlanInvitation($data: PlanInvitationAcceptInput!) {
    payload: acceptPlanInvitation(data: $data) {
      link
    }
  }
`;
export type AcceptPlanInvitationMutationFn = ApolloReactCommon.MutationFunction<
  AcceptPlanInvitationMutation,
  AcceptPlanInvitationMutationVariables
>;

/**
 * __useAcceptPlanInvitationMutation__
 *
 * To run a mutation, you first call `useAcceptPlanInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptPlanInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptPlanInvitationMutation, { data, loading, error }] = useAcceptPlanInvitationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAcceptPlanInvitationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AcceptPlanInvitationMutation,
    AcceptPlanInvitationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<AcceptPlanInvitationMutation, AcceptPlanInvitationMutationVariables>(
    AcceptPlanInvitationDocument,
    baseOptions
  );
}
export type AcceptPlanInvitationMutationHookResult = ReturnType<typeof useAcceptPlanInvitationMutation>;
export type AcceptPlanInvitationMutationResult = ApolloReactCommon.MutationResult<AcceptPlanInvitationMutation>;
export type AcceptPlanInvitationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AcceptPlanInvitationMutation,
  AcceptPlanInvitationMutationVariables
>;
export const CreatePlanInvitationDocument = gql`
  mutation createPlanInvitation($data: PlanInvitationCreateInput!) {
    payload: createPlanInvitation(data: $data) {
      uuid
    }
  }
`;
export type CreatePlanInvitationMutationFn = ApolloReactCommon.MutationFunction<
  CreatePlanInvitationMutation,
  CreatePlanInvitationMutationVariables
>;

/**
 * __useCreatePlanInvitationMutation__
 *
 * To run a mutation, you first call `useCreatePlanInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlanInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlanInvitationMutation, { data, loading, error }] = useCreatePlanInvitationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePlanInvitationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreatePlanInvitationMutation,
    CreatePlanInvitationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<CreatePlanInvitationMutation, CreatePlanInvitationMutationVariables>(
    CreatePlanInvitationDocument,
    baseOptions
  );
}
export type CreatePlanInvitationMutationHookResult = ReturnType<typeof useCreatePlanInvitationMutation>;
export type CreatePlanInvitationMutationResult = ApolloReactCommon.MutationResult<CreatePlanInvitationMutation>;
export type CreatePlanInvitationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePlanInvitationMutation,
  CreatePlanInvitationMutationVariables
>;
export const GetPlanInvitationDocument = gql`
  query getPlanInvitation($where: PlanInvitationWhereUniqueInput!) {
    payload: planInvitation(where: $where) {
      link
      plan {
        name
        price
        currency
        intervalCount
        intervalPlan
      }
    }
  }
`;

/**
 * __useGetPlanInvitationQuery__
 *
 * To run a query within a React component, call `useGetPlanInvitationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlanInvitationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlanInvitationQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetPlanInvitationQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetPlanInvitationQuery, GetPlanInvitationQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetPlanInvitationQuery, GetPlanInvitationQueryVariables>(
    GetPlanInvitationDocument,
    baseOptions
  );
}
export function useGetPlanInvitationLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlanInvitationQuery, GetPlanInvitationQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetPlanInvitationQuery, GetPlanInvitationQueryVariables>(
    GetPlanInvitationDocument,
    baseOptions
  );
}
export type GetPlanInvitationQueryHookResult = ReturnType<typeof useGetPlanInvitationQuery>;
export type GetPlanInvitationLazyQueryHookResult = ReturnType<typeof useGetPlanInvitationLazyQuery>;
export type GetPlanInvitationQueryResult = ApolloReactCommon.QueryResult<
  GetPlanInvitationQuery,
  GetPlanInvitationQueryVariables
>;
export const GetPlanInvitationsDocument = gql`
  query getPlanInvitations(
    $skip: Int!
    $take: Int!
    $order: PlanInvitationOrderByInput!
    $where: PlanInvitationWhereInput
    $search: SearchInput
  ) {
    payload: planInvitations(skip: $skip, take: $take, orderBy: $order, where: $where, search: $search) {
      uuid
      link
      plan {
        name
        price
        currency
        intervalCount
        intervalPlan
        owner {
          uuid
          avatar
          firstName
          lastName
        }
      }
      user {
        uuid
        avatar
        firstName
        lastName
      }
    }
  }
`;

/**
 * __useGetPlanInvitationsQuery__
 *
 * To run a query within a React component, call `useGetPlanInvitationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlanInvitationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlanInvitationsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      order: // value for 'order'
 *      where: // value for 'where'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetPlanInvitationsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetPlanInvitationsQuery, GetPlanInvitationsQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetPlanInvitationsQuery, GetPlanInvitationsQueryVariables>(
    GetPlanInvitationsDocument,
    baseOptions
  );
}
export function useGetPlanInvitationsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlanInvitationsQuery, GetPlanInvitationsQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetPlanInvitationsQuery, GetPlanInvitationsQueryVariables>(
    GetPlanInvitationsDocument,
    baseOptions
  );
}
export type GetPlanInvitationsQueryHookResult = ReturnType<typeof useGetPlanInvitationsQuery>;
export type GetPlanInvitationsLazyQueryHookResult = ReturnType<typeof useGetPlanInvitationsLazyQuery>;
export type GetPlanInvitationsQueryResult = ApolloReactCommon.QueryResult<
  GetPlanInvitationsQuery,
  GetPlanInvitationsQueryVariables
>;
export const CreatePlanDocument = gql`
  mutation createPlan($data: PlanCreateInput!) {
    payload: createPlan(data: $data) {
      id
    }
  }
`;
export type CreatePlanMutationFn = ApolloReactCommon.MutationFunction<CreatePlanMutation, CreatePlanMutationVariables>;

/**
 * __useCreatePlanMutation__
 *
 * To run a mutation, you first call `useCreatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlanMutation, { data, loading, error }] = useCreatePlanMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePlanMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePlanMutation, CreatePlanMutationVariables>
) {
  return ApolloReactHooks.useMutation<CreatePlanMutation, CreatePlanMutationVariables>(CreatePlanDocument, baseOptions);
}
export type CreatePlanMutationHookResult = ReturnType<typeof useCreatePlanMutation>;
export type CreatePlanMutationResult = ApolloReactCommon.MutationResult<CreatePlanMutation>;
export type CreatePlanMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreatePlanMutation,
  CreatePlanMutationVariables
>;
export const DeletePlanDocument = gql`
  mutation deletePlan($where: PlanWhereUniqueInput!) {
    payload: deletePlan(where: $where) {
      uuid
    }
  }
`;
export type DeletePlanMutationFn = ApolloReactCommon.MutationFunction<DeletePlanMutation, DeletePlanMutationVariables>;

/**
 * __useDeletePlanMutation__
 *
 * To run a mutation, you first call `useDeletePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePlanMutation, { data, loading, error }] = useDeletePlanMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeletePlanMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePlanMutation, DeletePlanMutationVariables>
) {
  return ApolloReactHooks.useMutation<DeletePlanMutation, DeletePlanMutationVariables>(DeletePlanDocument, baseOptions);
}
export type DeletePlanMutationHookResult = ReturnType<typeof useDeletePlanMutation>;
export type DeletePlanMutationResult = ApolloReactCommon.MutationResult<DeletePlanMutation>;
export type DeletePlanMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeletePlanMutation,
  DeletePlanMutationVariables
>;
export const GetAllPlansDocument = gql`
  query getAllPlans {
    payload: plans {
      uuid
      name
      status
      intervalCount
      intervalPlan
    }
  }
`;

/**
 * __useGetAllPlansQuery__
 *
 * To run a query within a React component, call `useGetAllPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPlansQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPlansQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllPlansQuery, GetAllPlansQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetAllPlansQuery, GetAllPlansQueryVariables>(GetAllPlansDocument, baseOptions);
}
export function useGetAllPlansLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllPlansQuery, GetAllPlansQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetAllPlansQuery, GetAllPlansQueryVariables>(GetAllPlansDocument, baseOptions);
}
export type GetAllPlansQueryHookResult = ReturnType<typeof useGetAllPlansQuery>;
export type GetAllPlansLazyQueryHookResult = ReturnType<typeof useGetAllPlansLazyQuery>;
export type GetAllPlansQueryResult = ApolloReactCommon.QueryResult<GetAllPlansQuery, GetAllPlansQueryVariables>;
export const GetPlanDetailDocument = gql`
  query getPlanDetail($where: PlanWhereUniqueInput!) {
    payload: plan(where: $where) {
      uuid
      name
      price
      currency
      intervalCount
      intervalPlan
      status
      scope
      description
      isDietPlanEnabled
      isExercisesPlanEnabled
      createdAt
      finishedAt
      startAt
      expireAt
      owner {
        uuid
        avatar
        firstName
        lastName
      }
      purchasePlan {
        uuid
        status
      }
      dietPlan {
        uuid
        file
      }
      workoutRoutine {
        uuid
        isDraft
      }
      planAssociations {
        association
        user {
          uuid
          firstName
          lastName
          avatar
        }
      }
    }
  }
`;

/**
 * __useGetPlanDetailQuery__
 *
 * To run a query within a React component, call `useGetPlanDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlanDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlanDetailQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetPlanDetailQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetPlanDetailQuery, GetPlanDetailQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetPlanDetailQuery, GetPlanDetailQueryVariables>(GetPlanDetailDocument, baseOptions);
}
export function useGetPlanDetailLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlanDetailQuery, GetPlanDetailQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetPlanDetailQuery, GetPlanDetailQueryVariables>(
    GetPlanDetailDocument,
    baseOptions
  );
}
export type GetPlanDetailQueryHookResult = ReturnType<typeof useGetPlanDetailQuery>;
export type GetPlanDetailLazyQueryHookResult = ReturnType<typeof useGetPlanDetailLazyQuery>;
export type GetPlanDetailQueryResult = ApolloReactCommon.QueryResult<GetPlanDetailQuery, GetPlanDetailQueryVariables>;
export const GetPlanDocument = gql`
  query getPlan($where: PlanWhereUniqueInput!) {
    payload: plan(where: $where) {
      name
      price
      currency
      intervalCount
      intervalPlan
      status
      description
      isDietPlanEnabled
      isExercisesPlanEnabled
    }
  }
`;

/**
 * __useGetPlanQuery__
 *
 * To run a query within a React component, call `useGetPlanQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlanQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlanQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetPlanQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPlanQuery, GetPlanQueryVariables>) {
  return ApolloReactHooks.useQuery<GetPlanQuery, GetPlanQueryVariables>(GetPlanDocument, baseOptions);
}
export function useGetPlanLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlanQuery, GetPlanQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetPlanQuery, GetPlanQueryVariables>(GetPlanDocument, baseOptions);
}
export type GetPlanQueryHookResult = ReturnType<typeof useGetPlanQuery>;
export type GetPlanLazyQueryHookResult = ReturnType<typeof useGetPlanLazyQuery>;
export type GetPlanQueryResult = ApolloReactCommon.QueryResult<GetPlanQuery, GetPlanQueryVariables>;
export const GetPlansDocument = gql`
  query getPlans($take: Int!, $skip: Int!, $order: PlanOrderByInput!, $where: PlanWhereInput, $search: SearchInput) {
    payload: plans(take: $take, skip: $skip, orderBy: $order, where: $where, search: $search) {
      uuid
      name
      price
      currency
      intervalCount
      intervalPlan
      status
    }
  }
`;

/**
 * __useGetPlansQuery__
 *
 * To run a query within a React component, call `useGetPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlansQuery({
 *   variables: {
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *      order: // value for 'order'
 *      where: // value for 'where'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetPlansQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetPlansQuery, GetPlansQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetPlansQuery, GetPlansQueryVariables>(GetPlansDocument, baseOptions);
}
export function useGetPlansLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPlansQuery, GetPlansQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetPlansQuery, GetPlansQueryVariables>(GetPlansDocument, baseOptions);
}
export type GetPlansQueryHookResult = ReturnType<typeof useGetPlansQuery>;
export type GetPlansLazyQueryHookResult = ReturnType<typeof useGetPlansLazyQuery>;
export type GetPlansQueryResult = ApolloReactCommon.QueryResult<GetPlansQuery, GetPlansQueryVariables>;
export const RenovatePlanDocument = gql`
  mutation renovatePlan($data: PlanBuyInput!, $where: PlanWhereUniqueInput!) {
    payload: renovatePlan(data: $data, where: $where) {
      uuid
    }
  }
`;
export type RenovatePlanMutationFn = ApolloReactCommon.MutationFunction<
  RenovatePlanMutation,
  RenovatePlanMutationVariables
>;

/**
 * __useRenovatePlanMutation__
 *
 * To run a mutation, you first call `useRenovatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenovatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renovatePlanMutation, { data, loading, error }] = useRenovatePlanMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useRenovatePlanMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<RenovatePlanMutation, RenovatePlanMutationVariables>
) {
  return ApolloReactHooks.useMutation<RenovatePlanMutation, RenovatePlanMutationVariables>(
    RenovatePlanDocument,
    baseOptions
  );
}
export type RenovatePlanMutationHookResult = ReturnType<typeof useRenovatePlanMutation>;
export type RenovatePlanMutationResult = ApolloReactCommon.MutationResult<RenovatePlanMutation>;
export type RenovatePlanMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RenovatePlanMutation,
  RenovatePlanMutationVariables
>;
export const UpdatePlanDocument = gql`
  mutation updatePlan($data: PlanUpdateInput!, $where: PlanWhereUniqueInput!) {
    payload: updatePlan(data: $data, where: $where) {
      uuid
      name
      price
      currency
      intervalCount
      intervalPlan
      status
      description
      isDietPlanEnabled
      isExercisesPlanEnabled
    }
  }
`;
export type UpdatePlanMutationFn = ApolloReactCommon.MutationFunction<UpdatePlanMutation, UpdatePlanMutationVariables>;

/**
 * __useUpdatePlanMutation__
 *
 * To run a mutation, you first call `useUpdatePlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePlanMutation, { data, loading, error }] = useUpdatePlanMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdatePlanMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdatePlanMutation, UpdatePlanMutationVariables>
) {
  return ApolloReactHooks.useMutation<UpdatePlanMutation, UpdatePlanMutationVariables>(UpdatePlanDocument, baseOptions);
}
export type UpdatePlanMutationHookResult = ReturnType<typeof useUpdatePlanMutation>;
export type UpdatePlanMutationResult = ApolloReactCommon.MutationResult<UpdatePlanMutation>;
export type UpdatePlanMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdatePlanMutation,
  UpdatePlanMutationVariables
>;
export const UpdateUserDocument = gql`
  mutation updateUser($data: UserUpdateInput!) {
    updateUser(data: $data) {
      uuid
      email
      firstName
      lastName
      gender
      avatar
      status
    }
  }
`;
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>
) {
  return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const CreateWorkoutDocument = gql`
  mutation createWorkout($data: WorkoutCreateInput!) {
    payload: createWorkout(data: $data) {
      uuid
    }
  }
`;
export type CreateWorkoutMutationFn = ApolloReactCommon.MutationFunction<
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables
>;

/**
 * __useCreateWorkoutMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutMutation, { data, loading, error }] = useCreateWorkoutMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateWorkoutMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>
) {
  return ApolloReactHooks.useMutation<CreateWorkoutMutation, CreateWorkoutMutationVariables>(
    CreateWorkoutDocument,
    baseOptions
  );
}
export type CreateWorkoutMutationHookResult = ReturnType<typeof useCreateWorkoutMutation>;
export type CreateWorkoutMutationResult = ApolloReactCommon.MutationResult<CreateWorkoutMutation>;
export type CreateWorkoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateWorkoutMutation,
  CreateWorkoutMutationVariables
>;
export const GetTrainingDocument = gql`
  query getTraining($where: TrainingWhereInput!) {
    payload: training(where: $where) {
      workoutExercises {
        uuid
        sets
        reps
        weight
        seconds
        comments
        order
        day
        exercise {
          uuid
          name
        }
      }
    }
  }
`;

/**
 * __useGetTrainingQuery__
 *
 * To run a query within a React component, call `useGetTrainingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrainingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrainingQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetTrainingQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetTrainingQuery, GetTrainingQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetTrainingQuery, GetTrainingQueryVariables>(GetTrainingDocument, baseOptions);
}
export function useGetTrainingLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTrainingQuery, GetTrainingQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetTrainingQuery, GetTrainingQueryVariables>(GetTrainingDocument, baseOptions);
}
export type GetTrainingQueryHookResult = ReturnType<typeof useGetTrainingQuery>;
export type GetTrainingLazyQueryHookResult = ReturnType<typeof useGetTrainingLazyQuery>;
export type GetTrainingQueryResult = ApolloReactCommon.QueryResult<GetTrainingQuery, GetTrainingQueryVariables>;
export const GetWorkoutDocument = gql`
  query getWorkout($where: WorkoutWhereUniqueInput!) {
    payload: workout(where: $where) {
      workoutExercises {
        uuid
        sets
        reps
        weight
        seconds
        exercise {
          uuid
          name
        }
      }
    }
  }
`;

/**
 * __useGetWorkoutQuery__
 *
 * To run a query within a React component, call `useGetWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkoutQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkoutQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetWorkoutQuery, GetWorkoutQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetWorkoutQuery, GetWorkoutQueryVariables>(GetWorkoutDocument, baseOptions);
}
export function useGetWorkoutLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetWorkoutQuery, GetWorkoutQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetWorkoutQuery, GetWorkoutQueryVariables>(GetWorkoutDocument, baseOptions);
}
export type GetWorkoutQueryHookResult = ReturnType<typeof useGetWorkoutQuery>;
export type GetWorkoutLazyQueryHookResult = ReturnType<typeof useGetWorkoutLazyQuery>;
export type GetWorkoutQueryResult = ApolloReactCommon.QueryResult<GetWorkoutQuery, GetWorkoutQueryVariables>;
export const CreateWorkoutRoutineDocument = gql`
  mutation createWorkoutRoutine($data: WorkoutRoutineCreateInput!) {
    payload: createWorkoutRoutine(data: $data) {
      uuid
    }
  }
`;
export type CreateWorkoutRoutineMutationFn = ApolloReactCommon.MutationFunction<
  CreateWorkoutRoutineMutation,
  CreateWorkoutRoutineMutationVariables
>;

/**
 * __useCreateWorkoutRoutineMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutRoutineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutRoutineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutRoutineMutation, { data, loading, error }] = useCreateWorkoutRoutineMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateWorkoutRoutineMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateWorkoutRoutineMutation,
    CreateWorkoutRoutineMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<CreateWorkoutRoutineMutation, CreateWorkoutRoutineMutationVariables>(
    CreateWorkoutRoutineDocument,
    baseOptions
  );
}
export type CreateWorkoutRoutineMutationHookResult = ReturnType<typeof useCreateWorkoutRoutineMutation>;
export type CreateWorkoutRoutineMutationResult = ApolloReactCommon.MutationResult<CreateWorkoutRoutineMutation>;
export type CreateWorkoutRoutineMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateWorkoutRoutineMutation,
  CreateWorkoutRoutineMutationVariables
>;
export const GetAllExercisesDocument = gql`
  query getAllExercises {
    payload: exercises(orderBy: { createdAt: DESC }) {
      uuid
      name
      description
      muscleGroups
      user {
        uuid
      }
    }
  }
`;

/**
 * __useGetAllExercisesQuery__
 *
 * To run a query within a React component, call `useGetAllExercisesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllExercisesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllExercisesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllExercisesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllExercisesQuery, GetAllExercisesQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetAllExercisesQuery, GetAllExercisesQueryVariables>(
    GetAllExercisesDocument,
    baseOptions
  );
}
export function useGetAllExercisesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllExercisesQuery, GetAllExercisesQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetAllExercisesQuery, GetAllExercisesQueryVariables>(
    GetAllExercisesDocument,
    baseOptions
  );
}
export type GetAllExercisesQueryHookResult = ReturnType<typeof useGetAllExercisesQuery>;
export type GetAllExercisesLazyQueryHookResult = ReturnType<typeof useGetAllExercisesLazyQuery>;
export type GetAllExercisesQueryResult = ApolloReactCommon.QueryResult<
  GetAllExercisesQuery,
  GetAllExercisesQueryVariables
>;
export const GetAllWorkoutRoutinesDocument = gql`
  query getAllWorkoutRoutines {
    payload: workoutRoutines(orderBy: { createdAt: DESC }) {
      uuid
      name
      workoutExercises {
        uuid
        sets
        reps
        weight
        seconds
        day
        comments
        unitMeasure
        order
        exercise {
          uuid
          name
          description
          muscleGroups
          user {
            uuid
          }
        }
      }
    }
  }
`;

/**
 * __useGetAllWorkoutRoutinesQuery__
 *
 * To run a query within a React component, call `useGetAllWorkoutRoutinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllWorkoutRoutinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllWorkoutRoutinesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllWorkoutRoutinesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetAllWorkoutRoutinesQuery, GetAllWorkoutRoutinesQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetAllWorkoutRoutinesQuery, GetAllWorkoutRoutinesQueryVariables>(
    GetAllWorkoutRoutinesDocument,
    baseOptions
  );
}
export function useGetAllWorkoutRoutinesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetAllWorkoutRoutinesQuery, GetAllWorkoutRoutinesQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetAllWorkoutRoutinesQuery, GetAllWorkoutRoutinesQueryVariables>(
    GetAllWorkoutRoutinesDocument,
    baseOptions
  );
}
export type GetAllWorkoutRoutinesQueryHookResult = ReturnType<typeof useGetAllWorkoutRoutinesQuery>;
export type GetAllWorkoutRoutinesLazyQueryHookResult = ReturnType<typeof useGetAllWorkoutRoutinesLazyQuery>;
export type GetAllWorkoutRoutinesQueryResult = ApolloReactCommon.QueryResult<
  GetAllWorkoutRoutinesQuery,
  GetAllWorkoutRoutinesQueryVariables
>;
export const GetWorkoutRoutineDocument = gql`
  query getWorkoutRoutine($where: WorkoutRoutineWhereUniqueInput!) {
    payload: workoutRoutine(where: $where) {
      uuid
      isTemplate
      name
      isDraft
      workoutExercises {
        uuid
        sets
        reps
        weight
        seconds
        day
        comments
        unitMeasure
        order
        exercise {
          uuid
          name
          description
          muscleGroups
          user {
            uuid
          }
        }
      }
    }
  }
`;

/**
 * __useGetWorkoutRoutineQuery__
 *
 * To run a query within a React component, call `useGetWorkoutRoutineQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkoutRoutineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkoutRoutineQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkoutRoutineQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetWorkoutRoutineQuery, GetWorkoutRoutineQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetWorkoutRoutineQuery, GetWorkoutRoutineQueryVariables>(
    GetWorkoutRoutineDocument,
    baseOptions
  );
}
export function useGetWorkoutRoutineLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetWorkoutRoutineQuery, GetWorkoutRoutineQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetWorkoutRoutineQuery, GetWorkoutRoutineQueryVariables>(
    GetWorkoutRoutineDocument,
    baseOptions
  );
}
export type GetWorkoutRoutineQueryHookResult = ReturnType<typeof useGetWorkoutRoutineQuery>;
export type GetWorkoutRoutineLazyQueryHookResult = ReturnType<typeof useGetWorkoutRoutineLazyQuery>;
export type GetWorkoutRoutineQueryResult = ApolloReactCommon.QueryResult<
  GetWorkoutRoutineQuery,
  GetWorkoutRoutineQueryVariables
>;
export const GetWorkoutRoutinesDocument = gql`
  query getWorkoutRoutines(
    $skip: Int!
    $take: Int!
    $order: WorkoutRoutineOrderByInput!
    $where: WorkoutRoutineWhereInput
    $search: SearchInput
  ) {
    payload: workoutRoutines(skip: $skip, take: $take, orderBy: $order, where: $where, search: $search) {
      uuid
      name
      isDraft
    }
  }
`;

/**
 * __useGetWorkoutRoutinesQuery__
 *
 * To run a query within a React component, call `useGetWorkoutRoutinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkoutRoutinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkoutRoutinesQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      order: // value for 'order'
 *      where: // value for 'where'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetWorkoutRoutinesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetWorkoutRoutinesQuery, GetWorkoutRoutinesQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetWorkoutRoutinesQuery, GetWorkoutRoutinesQueryVariables>(
    GetWorkoutRoutinesDocument,
    baseOptions
  );
}
export function useGetWorkoutRoutinesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetWorkoutRoutinesQuery, GetWorkoutRoutinesQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetWorkoutRoutinesQuery, GetWorkoutRoutinesQueryVariables>(
    GetWorkoutRoutinesDocument,
    baseOptions
  );
}
export type GetWorkoutRoutinesQueryHookResult = ReturnType<typeof useGetWorkoutRoutinesQuery>;
export type GetWorkoutRoutinesLazyQueryHookResult = ReturnType<typeof useGetWorkoutRoutinesLazyQuery>;
export type GetWorkoutRoutinesQueryResult = ApolloReactCommon.QueryResult<
  GetWorkoutRoutinesQuery,
  GetWorkoutRoutinesQueryVariables
>;
export const SendWorkoutRoutineDocument = gql`
  mutation sendWorkoutRoutine($where: WorkoutRoutineWhereUniqueInput!) {
    payload: sendWorkoutRoutine(where: $where) {
      uuid
      plan {
        uuid
      }
    }
  }
`;
export type SendWorkoutRoutineMutationFn = ApolloReactCommon.MutationFunction<
  SendWorkoutRoutineMutation,
  SendWorkoutRoutineMutationVariables
>;

/**
 * __useSendWorkoutRoutineMutation__
 *
 * To run a mutation, you first call `useSendWorkoutRoutineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendWorkoutRoutineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendWorkoutRoutineMutation, { data, loading, error }] = useSendWorkoutRoutineMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSendWorkoutRoutineMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SendWorkoutRoutineMutation, SendWorkoutRoutineMutationVariables>
) {
  return ApolloReactHooks.useMutation<SendWorkoutRoutineMutation, SendWorkoutRoutineMutationVariables>(
    SendWorkoutRoutineDocument,
    baseOptions
  );
}
export type SendWorkoutRoutineMutationHookResult = ReturnType<typeof useSendWorkoutRoutineMutation>;
export type SendWorkoutRoutineMutationResult = ApolloReactCommon.MutationResult<SendWorkoutRoutineMutation>;
export type SendWorkoutRoutineMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SendWorkoutRoutineMutation,
  SendWorkoutRoutineMutationVariables
>;
export const UpdateWorkoutRoutineDocument = gql`
  mutation updateWorkoutRoutine($data: WorkoutRoutineUpdateInput!, $where: WorkoutRoutineWhereUniqueInput!) {
    payload: updateWorkoutRoutine(data: $data, where: $where) {
      uuid
      plan {
        uuid
      }
      workoutExercises {
        uuid
        sets
        reps
        weight
        seconds
        day
        comments
        order
        exercise {
          uuid
          name
          description
          muscleGroups
          user {
            uuid
          }
        }
      }
    }
  }
`;
export type UpdateWorkoutRoutineMutationFn = ApolloReactCommon.MutationFunction<
  UpdateWorkoutRoutineMutation,
  UpdateWorkoutRoutineMutationVariables
>;

/**
 * __useUpdateWorkoutRoutineMutation__
 *
 * To run a mutation, you first call `useUpdateWorkoutRoutineMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkoutRoutineMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkoutRoutineMutation, { data, loading, error }] = useUpdateWorkoutRoutineMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateWorkoutRoutineMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateWorkoutRoutineMutation,
    UpdateWorkoutRoutineMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<UpdateWorkoutRoutineMutation, UpdateWorkoutRoutineMutationVariables>(
    UpdateWorkoutRoutineDocument,
    baseOptions
  );
}
export type UpdateWorkoutRoutineMutationHookResult = ReturnType<typeof useUpdateWorkoutRoutineMutation>;
export type UpdateWorkoutRoutineMutationResult = ApolloReactCommon.MutationResult<UpdateWorkoutRoutineMutation>;
export type UpdateWorkoutRoutineMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateWorkoutRoutineMutation,
  UpdateWorkoutRoutineMutationVariables
>;
export const GetWorkoutsDocument = gql`
  query getWorkouts($skip: Int!, $take: Int!, $order: WorkoutOrderByInput!, $where: WorkoutWhereInput) {
    payload: workouts(skip: $skip, take: $take, orderBy: $order, where: $where) {
      uuid
      workoutRoutine {
        uuid
        plan {
          name
          planAssociations {
            user {
              avatar
              firstName
              lastName
            }
          }
          owner {
            avatar
            firstName
            lastName
          }
        }
      }
      workoutExercises {
        uuid
      }
      createdAt
    }
  }
`;

/**
 * __useGetWorkoutsQuery__
 *
 * To run a query within a React component, call `useGetWorkoutsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkoutsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkoutsQuery({
 *   variables: {
 *      skip: // value for 'skip'
 *      take: // value for 'take'
 *      order: // value for 'order'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkoutsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<GetWorkoutsQuery, GetWorkoutsQueryVariables>
) {
  return ApolloReactHooks.useQuery<GetWorkoutsQuery, GetWorkoutsQueryVariables>(GetWorkoutsDocument, baseOptions);
}
export function useGetWorkoutsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetWorkoutsQuery, GetWorkoutsQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<GetWorkoutsQuery, GetWorkoutsQueryVariables>(GetWorkoutsDocument, baseOptions);
}
export type GetWorkoutsQueryHookResult = ReturnType<typeof useGetWorkoutsQuery>;
export type GetWorkoutsLazyQueryHookResult = ReturnType<typeof useGetWorkoutsLazyQuery>;
export type GetWorkoutsQueryResult = ApolloReactCommon.QueryResult<GetWorkoutsQuery, GetWorkoutsQueryVariables>;
export const PublicUserDocument = gql`
  query publicUser($where: PublicUserWhereUniqueInput!) {
    payload: publicUser(where: $where) {
      email
      username
      type
    }
  }
`;

/**
 * __usePublicUserQuery__
 *
 * To run a query within a React component, call `usePublicUserQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicUserQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function usePublicUserQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<PublicUserQuery, PublicUserQueryVariables>
) {
  return ApolloReactHooks.useQuery<PublicUserQuery, PublicUserQueryVariables>(PublicUserDocument, baseOptions);
}
export function usePublicUserLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicUserQuery, PublicUserQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<PublicUserQuery, PublicUserQueryVariables>(PublicUserDocument, baseOptions);
}
export type PublicUserQueryHookResult = ReturnType<typeof usePublicUserQuery>;
export type PublicUserLazyQueryHookResult = ReturnType<typeof usePublicUserLazyQuery>;
export type PublicUserQueryResult = ApolloReactCommon.QueryResult<PublicUserQuery, PublicUserQueryVariables>;
export const UserProfileDocument = gql`
  query userProfile($where: UserWhereUniqueInput!) {
    user(where: $where) {
      uuid
      email
      username
      firstName
      lastName
      phone
      gender
      avatar
      status
      scope
      birthday
      type
      progress {
        hasPlans
        hasPlanInvitations
      }
      currentActivePlan {
        uuid
        workoutRoutine {
          uuid
          workoutExercises {
            uuid
            day
            workoutId
            isDeleted
          }
        }
        expireAt
      }
    }
  }
`;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUserProfileQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<UserProfileQuery, UserProfileQueryVariables>
) {
  return ApolloReactHooks.useQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
}
export function useUserProfileLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserProfileQuery, UserProfileQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(UserProfileDocument, baseOptions);
}
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<typeof useUserProfileLazyQuery>;
export type UserProfileQueryResult = ApolloReactCommon.QueryResult<UserProfileQuery, UserProfileQueryVariables>;
