import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export enum MealType {
  Breakfast = 'BREAKFAST',
  Lunch = 'LUNCH',
  Dinner = 'DINNER',
  Snack = 'SNACK',
  Other = 'OTHER'
}

export enum Day {
  Day_1 = 'DAY_1',
  Day_2 = 'DAY_2',
  Day_3 = 'DAY_3',
  Day_4 = 'DAY_4',
  Day_5 = 'DAY_5',
  Day_6 = 'DAY_6',
  Day_7 = 'DAY_7'
}

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

export enum UnitMeasure {
  Gram = 'GRAM',
  Liter = 'LITER'
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

export type DietPlan = {
  __typename?: 'DietPlan';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  meals: Array<Meal>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type PlanAssociation = {
  __typename?: 'PlanAssociation';
  userId: Scalars['Int'];
  planId: Scalars['Int'];
  association: DocumentAssociation;
  user: User;
  plan: Plan;
};

export enum DocumentAssociation {
  Manager = 'MANAGER',
  Visualizer = 'VISUALIZER'
}

export type Exercise = {
  __typename?: 'Exercise';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  userId: Scalars['Int'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  user: User;
  workoutExercises: Array<WorkoutExercise>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Workout = {
  __typename?: 'Workout';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  workoutRoutine: WorkoutRoutine;
  workoutExercises: Array<WorkoutExercise>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type WorkoutExercise = {
  __typename?: 'WorkoutExercise';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  exerciseId: Scalars['Int'];
  workoutId?: Maybe<Scalars['Int']>;
  workoutRoutineId: Scalars['Int'];
  sets: Scalars['Int'];
  reps?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  seconds?: Maybe<Scalars['Int']>;
  comments?: Maybe<Scalars['String']>;
  order: Scalars['Int'];
  day: Day;
  workoutRoutine: WorkoutRoutine;
  workout?: Maybe<Workout>;
  exercise: Exercise;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  isDeleted: Scalars['Boolean'];
};

export type WorkoutRoutine = {
  __typename?: 'WorkoutRoutine';
  id: Scalars['Int'];
  uuid: Scalars['String'];
  plan: Plan;
  workoutExercises: Array<WorkoutExercise>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

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
  owner: User;
  createdAt: Scalars['DateTime'];
  finishedAt?: Maybe<Scalars['DateTime']>;
  startAt?: Maybe<Scalars['DateTime']>;
  expireAt?: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
};

export enum IntervalPlan {
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  Year = 'YEAR'
}

export enum Scope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export enum PlanType {
  Custom = 'CUSTOM',
  NonCustom = 'NON_CUSTOM'
}

export enum Currency {
  Us = 'US',
  Crc = 'CRC'
}

export enum PlanStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
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
  type: UserType;
  status: UserStatus;
  gender?: Maybe<Gender>;
  scope: Scope;
  ingredients: Array<Ingredient>;
  meals: Array<Meal>;
  currentActivePlan?: Maybe<Plan>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum UserType {
  Customer = 'CUSTOMER',
  PersonalTrainer = 'PERSONAL_TRAINER'
}

export enum UserStatus {
  Invited = 'INVITED',
  Registered = 'REGISTERED',
  Confirmed = 'CONFIRMED',
  Blocked = 'BLOCKED'
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

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

export type Training = {
  __typename?: 'Training';
  workoutExercises: Array<WorkoutExercise>;
};

export type Query = {
  __typename?: 'Query';
  user: User;
  users: Array<User>;
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
  workout: Workout;
  workouts: Array<Workout>;
  training?: Maybe<Training>;
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
  skip: Scalars['Int'];
  take: Scalars['Int'];
  cursor?: Maybe<PlanWhereUniqueInput>;
  orderBy?: Maybe<PlanOrderByInput>;
  where?: Maybe<PlanWhereInput>;
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
};

export type QueryWorkoutRoutineArgs = {
  where: WorkoutRoutineWhereUniqueInput;
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
};

export type QueryTrainingArgs = {
  where: TrainingWhereInput;
};

export type UserWhereUniqueInput = {
  email: Scalars['String'];
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

export enum OrderByArg {
  Asc = 'ASC',
  Desc = 'DESC'
}

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

export type IngredientWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type IngredientOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  description?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type IngredientWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MealWhereUniqueInput = {
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

export type MealIngredientWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type MealIngredientOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  quantity?: Maybe<OrderByArg>;
  unitMeasure?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type MealIngredientWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
  unitMeasure?: Maybe<UnitMeasure>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type DietPlanWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type DietPlanOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type DietPlanWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PlanWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type PlanOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type PlanWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ExerciseWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type ExerciseOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  name?: Maybe<OrderByArg>;
  description?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type ExerciseWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PlanInvitationWhereUniqueInput = {
  uuid: Scalars['String'];
};

export type PlanInvitationOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
};

export type PlanInvitationWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  template?: Maybe<Scalars['String']>;
};

export type ClientWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type ClientOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  email?: Maybe<OrderByArg>;
  username?: Maybe<OrderByArg>;
  firstName?: Maybe<OrderByArg>;
  lastName?: Maybe<OrderByArg>;
  phone?: Maybe<OrderByArg>;
  birthday?: Maybe<OrderByArg>;
  gender?: Maybe<OrderByArg>;
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

export type WorkoutRoutineWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type WorkoutWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type WorkoutOrderByInput = {
  id?: Maybe<OrderByArg>;
  uuid?: Maybe<OrderByArg>;
  createdAt?: Maybe<OrderByArg>;
  updatedAt?: Maybe<OrderByArg>;
};

export type WorkoutWhereInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TrainingWhereInput = {
  day: Day;
};

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
  createPlan: Plan;
  updatePlan: Plan;
  deletePlan: Plan;
  buyPlan: Plan;
  createExercise: Exercise;
  updateExercise: Exercise;
  createPlanInvitation: PlanInvitation;
  acceptPlanInvitation: PlanInvitation;
  updateWorkoutRoutine: WorkoutRoutine;
  createWorkout: Workout;
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

export type MutationUpdateWorkoutRoutineArgs = {
  where: WorkoutRoutineWhereUniqueInput;
  data: WorkoutRoutineUpdateInput;
};

export type MutationCreateWorkoutArgs = {
  data: WorkoutCreateInput;
};

export type UserCreateInput = {
  email: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  type: UserType;
};

export type UserUpdateInput = {
  avatarBase64?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['String']>;
  scope?: Maybe<Scope>;
  gender?: Maybe<Gender>;
};

export type IngredientCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  user: UserCreateOneWithoutIngredientInput;
};

export type UserCreateOneWithoutIngredientInput = {
  connect: UserWhereUniqueInput;
};

export type IngredientUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type MealCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  imageBase64?: Maybe<Scalars['String']>;
  ingredients: Array<IngredientWhereUniqueInput>;
};

export type MealUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  imageBase64?: Maybe<Scalars['String']>;
  ingredients: IngredientUpdateManyWithoutMealInput;
};

export type IngredientUpdateManyWithoutMealInput = {
  create?: Maybe<Array<IngredientWhereUniqueInput>>;
  delete?: Maybe<Array<IngredientWhereUniqueInput>>;
};

export type MealIngredientCreateInput = {
  quantity: Scalars['Int'];
  unitMeasure: UnitMeasure;
  ingredient: IngredientCreateOneWithoutMealIngredientInput;
  meal: MealCreateOneWithoutMealIngredientInput;
};

export type IngredientCreateOneWithoutMealIngredientInput = {
  connect: IngredientWhereUniqueInput;
};

export type MealCreateOneWithoutMealIngredientInput = {
  connect: MealWhereUniqueInput;
};

export type MealIngredientUpdateInput = {
  quantity?: Maybe<Scalars['Int']>;
  unitMeasure?: Maybe<UnitMeasure>;
};

export type DietPlanCreateInput = {
  meals: MealCreateManyInput;
};

export type MealCreateManyInput = {
  connect: Array<MealWhereUniqueInput>;
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

export type PlanBuyInput = {
  startAt: Scalars['String'];
};

export type ExerciseCreateInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type ExerciseUpdateInput = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type PlanInvitationCreateInput = {
  plan: PlanCreateOneWithoutPlanInvitationInput;
  user: UserCreateOneWithoutPlanInvitationInput;
};

export type PlanCreateOneWithoutPlanInvitationInput = {
  connect: PlanWhereUniqueInput;
};

export type UserCreateOneWithoutPlanInvitationInput = {
  connect: UserWhereUniqueInput;
};

export type PlanInvitationAcceptInput = {
  uuid: Scalars['String'];
  startAt: Scalars['String'];
};

export type WorkoutRoutineUpdateInput = {
  workoutExercises: WorkoutExerciseCreateManyWithoutWorkoutRoutineInput;
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
  reps?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  seconds?: Maybe<Scalars['Int']>;
  comments?: Maybe<Scalars['String']>;
  exercise: ExerciseCreateOneWithoutWorkoutExercisesInput;
};

export type ExerciseCreateOneWithoutWorkoutExercisesInput = {
  connect: ExerciseWhereUniqueInput;
};

export type WorkoutExerciseUpdateManyWithWhereWithoutWorkoutRoutineInput = {
  data: WorkoutExerciseUpdateWithoutWorkoutRoutineInput;
  where: WorkoutExerciseWhereUniqueInput;
};

export type WorkoutExerciseUpdateWithoutWorkoutRoutineInput = {
  sets?: Maybe<Scalars['Int']>;
  order?: Maybe<Scalars['Int']>;
  day?: Maybe<Day>;
  reps?: Maybe<Scalars['Int']>;
  weight?: Maybe<Scalars['Int']>;
  seconds?: Maybe<Scalars['Int']>;
  comments?: Maybe<Scalars['String']>;
  exercise?: Maybe<ExerciseCreateOneWithoutWorkoutExercisesInput>;
};

export type WorkoutExerciseWhereUniqueInput = {
  id?: Maybe<Scalars['Int']>;
  uuid?: Maybe<Scalars['String']>;
};

export type WorkoutCreateInput = {
  workoutRoutine: WorkoutRoutineWhereUniqueInput;
  workoutExercises: WorkoutExerciseCreateManyWithoutWorkoutInput;
};

export type WorkoutExerciseCreateManyWithoutWorkoutInput = {
  create: Array<WorkoutExerciseCreateWithoutWorkoutRoutineInput>;
};

export type CreateUserMutationVariables = Exact<{
  data: UserCreateInput;
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser: { __typename?: 'User' } & Pick<User, 'id'>;
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
}>;

export type GetClientsQuery = { __typename?: 'Query' } & {
  payload: Array<
    { __typename?: 'Client' } & Pick<Client, 'uuid' | 'firstName' | 'lastName' | 'email' | 'phone' | 'avatar'>
  >;
};

export type CreateExerciseMutationVariables = Exact<{
  data: ExerciseCreateInput;
}>;

export type CreateExerciseMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'Exercise' } & Pick<Exercise, 'uuid'>;
};

export type GetExerciseQueryVariables = Exact<{
  where: ExerciseWhereUniqueInput;
}>;

export type GetExerciseQuery = { __typename?: 'Query' } & {
  payload: { __typename?: 'Exercise' } & Pick<Exercise, 'name' | 'description'>;
};

export type GetExercisesQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
  order: ExerciseOrderByInput;
}>;

export type GetExercisesQuery = { __typename?: 'Query' } & {
  payload: Array<{ __typename?: 'Exercise' } & Pick<Exercise, 'uuid' | 'name' | 'description'>>;
};

export type UpdateExerciseMutationVariables = Exact<{
  where: ExerciseWhereUniqueInput;
  data: ExerciseUpdateInput;
}>;

export type UpdateExerciseMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'Exercise' } & Pick<Exercise, 'name' | 'description'>;
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
      dietPlan?: Maybe<{ __typename?: 'DietPlan' } & Pick<DietPlan, 'uuid'>>;
      workoutRoutine?: Maybe<{ __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid'>>;
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
}>;

export type GetPlansQuery = { __typename?: 'Query' } & {
  payload: Array<
    { __typename?: 'Plan' } & Pick<
      Plan,
      'uuid' | 'name' | 'price' | 'currency' | 'intervalCount' | 'intervalPlan' | 'status'
    >
  >;
};

export type UpdatePlanMutationVariables = Exact<{
  data: PlanUpdateInput;
  where: PlanWhereUniqueInput;
}>;

export type UpdatePlanMutation = { __typename?: 'Mutation' } & {
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

export type GetAllExercisesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllExercisesQuery = { __typename?: 'Query' } & {
  payload: Array<{ __typename?: 'Exercise' } & Pick<Exercise, 'uuid' | 'name' | 'description'>>;
};

export type GetWorkoutRoutineQueryVariables = Exact<{
  where: WorkoutRoutineWhereUniqueInput;
}>;

export type GetWorkoutRoutineQuery = { __typename?: 'Query' } & {
  payload: { __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid'> & {
      workoutExercises: Array<
        { __typename?: 'WorkoutExercise' } & Pick<
          WorkoutExercise,
          'uuid' | 'sets' | 'reps' | 'weight' | 'seconds' | 'day' | 'comments' | 'order'
        > & { exercise: { __typename?: 'Exercise' } & Pick<Exercise, 'uuid' | 'name' | 'description'> }
      >;
    };
};

export type UpdateWorkoutRoutineMutationVariables = Exact<{
  data: WorkoutRoutineUpdateInput;
  where: WorkoutRoutineWhereUniqueInput;
}>;

export type UpdateWorkoutRoutineMutation = { __typename?: 'Mutation' } & {
  payload: { __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid'> & {
      plan: { __typename?: 'Plan' } & Pick<Plan, 'uuid'>;
    };
};

export type GetWorkoutsQueryVariables = Exact<{
  skip: Scalars['Int'];
  take: Scalars['Int'];
  order: WorkoutOrderByInput;
}>;

export type GetWorkoutsQuery = { __typename?: 'Query' } & {
  payload: Array<
    { __typename?: 'Workout' } & Pick<Workout, 'uuid' | 'createdAt'> & {
        workoutRoutine: { __typename?: 'WorkoutRoutine' } & Pick<WorkoutRoutine, 'uuid'> & {
            plan: { __typename?: 'Plan' } & Pick<Plan, 'name'> & {
                planAssociations: Array<
                  { __typename?: 'PlanAssociation' } & {
                    user: { __typename?: 'User' } & Pick<User, 'avatar' | 'firstName' | 'lastName'>;
                  }
                >;
                owner: { __typename?: 'User' } & Pick<User, 'avatar' | 'firstName' | 'lastName'>;
              };
          };
        workoutExercises: Array<{ __typename?: 'WorkoutExercise' } & Pick<WorkoutExercise, 'uuid'>>;
      }
  >;
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
export type CreateUserComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateUserMutation, CreateUserMutationVariables>,
  'mutation'
>;

export const CreateUserComponent = (props: CreateUserComponentProps) => (
  <ApolloReactComponents.Mutation<CreateUserMutation, CreateUserMutationVariables>
    mutation={CreateUserDocument}
    {...props}
  />
);

export type CreateUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;
} &
  TChildProps;
export function withCreateUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateUserMutation,
    CreateUserMutationVariables,
    CreateUserProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateUserMutation,
    CreateUserMutationVariables,
    CreateUserProps<TChildProps, TDataName>
  >(CreateUserDocument, {
    alias: 'createUser',
    ...operationOptions
  });
}

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
export type GetClientComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetClientQuery, GetClientQueryVariables>,
  'query'
> &
  ({ variables: GetClientQueryVariables; skip?: boolean } | { skip: boolean });

export const GetClientComponent = (props: GetClientComponentProps) => (
  <ApolloReactComponents.Query<GetClientQuery, GetClientQueryVariables> query={GetClientDocument} {...props} />
);

export type GetClientProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetClientQuery, GetClientQueryVariables>;
} &
  TChildProps;
export function withGetClient<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetClientQuery,
    GetClientQueryVariables,
    GetClientProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetClientQuery,
    GetClientQueryVariables,
    GetClientProps<TChildProps, TDataName>
  >(GetClientDocument, {
    alias: 'getClient',
    ...operationOptions
  });
}

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
  query getClients($skip: Int!, $take: Int!, $order: ClientOrderByInput!) {
    payload: clients(skip: $skip, take: $take, orderBy: $order) {
      uuid
      firstName
      lastName
      email
      phone
      avatar
    }
  }
`;
export type GetClientsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetClientsQuery, GetClientsQueryVariables>,
  'query'
> &
  ({ variables: GetClientsQueryVariables; skip?: boolean } | { skip: boolean });

export const GetClientsComponent = (props: GetClientsComponentProps) => (
  <ApolloReactComponents.Query<GetClientsQuery, GetClientsQueryVariables> query={GetClientsDocument} {...props} />
);

export type GetClientsProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetClientsQuery, GetClientsQueryVariables>;
} &
  TChildProps;
export function withGetClients<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetClientsQuery,
    GetClientsQueryVariables,
    GetClientsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetClientsQuery,
    GetClientsQueryVariables,
    GetClientsProps<TChildProps, TDataName>
  >(GetClientsDocument, {
    alias: 'getClients',
    ...operationOptions
  });
}

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
export const CreateExerciseDocument = gql`
  mutation createExercise($data: ExerciseCreateInput!) {
    payload: createExercise(data: $data) {
      uuid
    }
  }
`;
export type CreateExerciseMutationFn = ApolloReactCommon.MutationFunction<
  CreateExerciseMutation,
  CreateExerciseMutationVariables
>;
export type CreateExerciseComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateExerciseMutation, CreateExerciseMutationVariables>,
  'mutation'
>;

export const CreateExerciseComponent = (props: CreateExerciseComponentProps) => (
  <ApolloReactComponents.Mutation<CreateExerciseMutation, CreateExerciseMutationVariables>
    mutation={CreateExerciseDocument}
    {...props}
  />
);

export type CreateExerciseProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateExerciseMutation, CreateExerciseMutationVariables>;
} &
  TChildProps;
export function withCreateExercise<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateExerciseMutation,
    CreateExerciseMutationVariables,
    CreateExerciseProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateExerciseMutation,
    CreateExerciseMutationVariables,
    CreateExerciseProps<TChildProps, TDataName>
  >(CreateExerciseDocument, {
    alias: 'createExercise',
    ...operationOptions
  });
}

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
    }
  }
`;
export type GetExerciseComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetExerciseQuery, GetExerciseQueryVariables>,
  'query'
> &
  ({ variables: GetExerciseQueryVariables; skip?: boolean } | { skip: boolean });

export const GetExerciseComponent = (props: GetExerciseComponentProps) => (
  <ApolloReactComponents.Query<GetExerciseQuery, GetExerciseQueryVariables> query={GetExerciseDocument} {...props} />
);

export type GetExerciseProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetExerciseQuery, GetExerciseQueryVariables>;
} &
  TChildProps;
export function withGetExercise<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetExerciseQuery,
    GetExerciseQueryVariables,
    GetExerciseProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetExerciseQuery,
    GetExerciseQueryVariables,
    GetExerciseProps<TChildProps, TDataName>
  >(GetExerciseDocument, {
    alias: 'getExercise',
    ...operationOptions
  });
}

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
  query getExercises($skip: Int!, $take: Int!, $order: ExerciseOrderByInput!) {
    payload: exercises(skip: $skip, take: $take, orderBy: $order) {
      uuid
      name
      description
    }
  }
`;
export type GetExercisesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetExercisesQuery, GetExercisesQueryVariables>,
  'query'
> &
  ({ variables: GetExercisesQueryVariables; skip?: boolean } | { skip: boolean });

export const GetExercisesComponent = (props: GetExercisesComponentProps) => (
  <ApolloReactComponents.Query<GetExercisesQuery, GetExercisesQueryVariables> query={GetExercisesDocument} {...props} />
);

export type GetExercisesProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetExercisesQuery, GetExercisesQueryVariables>;
} &
  TChildProps;
export function withGetExercises<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetExercisesQuery,
    GetExercisesQueryVariables,
    GetExercisesProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetExercisesQuery,
    GetExercisesQueryVariables,
    GetExercisesProps<TChildProps, TDataName>
  >(GetExercisesDocument, {
    alias: 'getExercises',
    ...operationOptions
  });
}

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
    }
  }
`;
export type UpdateExerciseMutationFn = ApolloReactCommon.MutationFunction<
  UpdateExerciseMutation,
  UpdateExerciseMutationVariables
>;
export type UpdateExerciseComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<UpdateExerciseMutation, UpdateExerciseMutationVariables>,
  'mutation'
>;

export const UpdateExerciseComponent = (props: UpdateExerciseComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateExerciseMutation, UpdateExerciseMutationVariables>
    mutation={UpdateExerciseDocument}
    {...props}
  />
);

export type UpdateExerciseProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateExerciseMutation, UpdateExerciseMutationVariables>;
} &
  TChildProps;
export function withUpdateExercise<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateExerciseMutation,
    UpdateExerciseMutationVariables,
    UpdateExerciseProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateExerciseMutation,
    UpdateExerciseMutationVariables,
    UpdateExerciseProps<TChildProps, TDataName>
  >(UpdateExerciseDocument, {
    alias: 'updateExercise',
    ...operationOptions
  });
}

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
export type CreateMealComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateMealMutation, CreateMealMutationVariables>,
  'mutation'
>;

export const CreateMealComponent = (props: CreateMealComponentProps) => (
  <ApolloReactComponents.Mutation<CreateMealMutation, CreateMealMutationVariables>
    mutation={CreateMealDocument}
    {...props}
  />
);

export type CreateMealProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateMealMutation, CreateMealMutationVariables>;
} &
  TChildProps;
export function withCreateMeal<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateMealMutation,
    CreateMealMutationVariables,
    CreateMealProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateMealMutation,
    CreateMealMutationVariables,
    CreateMealProps<TChildProps, TDataName>
  >(CreateMealDocument, {
    alias: 'createMeal',
    ...operationOptions
  });
}

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
export type DeleteMealComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<DeleteMealMutation, DeleteMealMutationVariables>,
  'mutation'
>;

export const DeleteMealComponent = (props: DeleteMealComponentProps) => (
  <ApolloReactComponents.Mutation<DeleteMealMutation, DeleteMealMutationVariables>
    mutation={DeleteMealDocument}
    {...props}
  />
);

export type DeleteMealProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteMealMutation, DeleteMealMutationVariables>;
} &
  TChildProps;
export function withDeleteMeal<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeleteMealMutation,
    DeleteMealMutationVariables,
    DeleteMealProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeleteMealMutation,
    DeleteMealMutationVariables,
    DeleteMealProps<TChildProps, TDataName>
  >(DeleteMealDocument, {
    alias: 'deleteMeal',
    ...operationOptions
  });
}

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
export type GetAllIngredientsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>,
  'query'
>;

export const GetAllIngredientsComponent = (props: GetAllIngredientsComponentProps) => (
  <ApolloReactComponents.Query<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>
    query={GetAllIngredientsDocument}
    {...props}
  />
);

export type GetAllIngredientsProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetAllIngredientsQuery, GetAllIngredientsQueryVariables>;
} &
  TChildProps;
export function withGetAllIngredients<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetAllIngredientsQuery,
    GetAllIngredientsQueryVariables,
    GetAllIngredientsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetAllIngredientsQuery,
    GetAllIngredientsQueryVariables,
    GetAllIngredientsProps<TChildProps, TDataName>
  >(GetAllIngredientsDocument, {
    alias: 'getAllIngredients',
    ...operationOptions
  });
}

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
export type GetMealComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetMealQuery, GetMealQueryVariables>,
  'query'
> &
  ({ variables: GetMealQueryVariables; skip?: boolean } | { skip: boolean });

export const GetMealComponent = (props: GetMealComponentProps) => (
  <ApolloReactComponents.Query<GetMealQuery, GetMealQueryVariables> query={GetMealDocument} {...props} />
);

export type GetMealProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetMealQuery, GetMealQueryVariables>;
} &
  TChildProps;
export function withGetMeal<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetMealQuery,
    GetMealQueryVariables,
    GetMealProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<TProps, GetMealQuery, GetMealQueryVariables, GetMealProps<TChildProps, TDataName>>(
    GetMealDocument,
    {
      alias: 'getMeal',
      ...operationOptions
    }
  );
}

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
export type GetMealsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetMealsQuery, GetMealsQueryVariables>,
  'query'
> &
  ({ variables: GetMealsQueryVariables; skip?: boolean } | { skip: boolean });

export const GetMealsComponent = (props: GetMealsComponentProps) => (
  <ApolloReactComponents.Query<GetMealsQuery, GetMealsQueryVariables> query={GetMealsDocument} {...props} />
);

export type GetMealsProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetMealsQuery, GetMealsQueryVariables>;
} &
  TChildProps;
export function withGetMeals<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetMealsQuery,
    GetMealsQueryVariables,
    GetMealsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<TProps, GetMealsQuery, GetMealsQueryVariables, GetMealsProps<TChildProps, TDataName>>(
    GetMealsDocument,
    {
      alias: 'getMeals',
      ...operationOptions
    }
  );
}

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
export type UpdateMealComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<UpdateMealMutation, UpdateMealMutationVariables>,
  'mutation'
>;

export const UpdateMealComponent = (props: UpdateMealComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateMealMutation, UpdateMealMutationVariables>
    mutation={UpdateMealDocument}
    {...props}
  />
);

export type UpdateMealProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateMealMutation, UpdateMealMutationVariables>;
} &
  TChildProps;
export function withUpdateMeal<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateMealMutation,
    UpdateMealMutationVariables,
    UpdateMealProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateMealMutation,
    UpdateMealMutationVariables,
    UpdateMealProps<TChildProps, TDataName>
  >(UpdateMealDocument, {
    alias: 'updateMeal',
    ...operationOptions
  });
}

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
export type AcceptPlanInvitationComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<AcceptPlanInvitationMutation, AcceptPlanInvitationMutationVariables>,
  'mutation'
>;

export const AcceptPlanInvitationComponent = (props: AcceptPlanInvitationComponentProps) => (
  <ApolloReactComponents.Mutation<AcceptPlanInvitationMutation, AcceptPlanInvitationMutationVariables>
    mutation={AcceptPlanInvitationDocument}
    {...props}
  />
);

export type AcceptPlanInvitationProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    AcceptPlanInvitationMutation,
    AcceptPlanInvitationMutationVariables
  >;
} &
  TChildProps;
export function withAcceptPlanInvitation<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    AcceptPlanInvitationMutation,
    AcceptPlanInvitationMutationVariables,
    AcceptPlanInvitationProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    AcceptPlanInvitationMutation,
    AcceptPlanInvitationMutationVariables,
    AcceptPlanInvitationProps<TChildProps, TDataName>
  >(AcceptPlanInvitationDocument, {
    alias: 'acceptPlanInvitation',
    ...operationOptions
  });
}

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
export type CreatePlanInvitationComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreatePlanInvitationMutation, CreatePlanInvitationMutationVariables>,
  'mutation'
>;

export const CreatePlanInvitationComponent = (props: CreatePlanInvitationComponentProps) => (
  <ApolloReactComponents.Mutation<CreatePlanInvitationMutation, CreatePlanInvitationMutationVariables>
    mutation={CreatePlanInvitationDocument}
    {...props}
  />
);

export type CreatePlanInvitationProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    CreatePlanInvitationMutation,
    CreatePlanInvitationMutationVariables
  >;
} &
  TChildProps;
export function withCreatePlanInvitation<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreatePlanInvitationMutation,
    CreatePlanInvitationMutationVariables,
    CreatePlanInvitationProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreatePlanInvitationMutation,
    CreatePlanInvitationMutationVariables,
    CreatePlanInvitationProps<TChildProps, TDataName>
  >(CreatePlanInvitationDocument, {
    alias: 'createPlanInvitation',
    ...operationOptions
  });
}

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
export type GetPlanInvitationComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetPlanInvitationQuery, GetPlanInvitationQueryVariables>,
  'query'
> &
  ({ variables: GetPlanInvitationQueryVariables; skip?: boolean } | { skip: boolean });

export const GetPlanInvitationComponent = (props: GetPlanInvitationComponentProps) => (
  <ApolloReactComponents.Query<GetPlanInvitationQuery, GetPlanInvitationQueryVariables>
    query={GetPlanInvitationDocument}
    {...props}
  />
);

export type GetPlanInvitationProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetPlanInvitationQuery, GetPlanInvitationQueryVariables>;
} &
  TChildProps;
export function withGetPlanInvitation<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetPlanInvitationQuery,
    GetPlanInvitationQueryVariables,
    GetPlanInvitationProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetPlanInvitationQuery,
    GetPlanInvitationQueryVariables,
    GetPlanInvitationProps<TChildProps, TDataName>
  >(GetPlanInvitationDocument, {
    alias: 'getPlanInvitation',
    ...operationOptions
  });
}

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
  query getPlanInvitations($skip: Int!, $take: Int!, $order: PlanInvitationOrderByInput!) {
    payload: planInvitations(skip: $skip, take: $take, orderBy: $order) {
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
export type GetPlanInvitationsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetPlanInvitationsQuery, GetPlanInvitationsQueryVariables>,
  'query'
> &
  ({ variables: GetPlanInvitationsQueryVariables; skip?: boolean } | { skip: boolean });

export const GetPlanInvitationsComponent = (props: GetPlanInvitationsComponentProps) => (
  <ApolloReactComponents.Query<GetPlanInvitationsQuery, GetPlanInvitationsQueryVariables>
    query={GetPlanInvitationsDocument}
    {...props}
  />
);

export type GetPlanInvitationsProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetPlanInvitationsQuery, GetPlanInvitationsQueryVariables>;
} &
  TChildProps;
export function withGetPlanInvitations<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetPlanInvitationsQuery,
    GetPlanInvitationsQueryVariables,
    GetPlanInvitationsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetPlanInvitationsQuery,
    GetPlanInvitationsQueryVariables,
    GetPlanInvitationsProps<TChildProps, TDataName>
  >(GetPlanInvitationsDocument, {
    alias: 'getPlanInvitations',
    ...operationOptions
  });
}

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
export type CreatePlanComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreatePlanMutation, CreatePlanMutationVariables>,
  'mutation'
>;

export const CreatePlanComponent = (props: CreatePlanComponentProps) => (
  <ApolloReactComponents.Mutation<CreatePlanMutation, CreatePlanMutationVariables>
    mutation={CreatePlanDocument}
    {...props}
  />
);

export type CreatePlanProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreatePlanMutation, CreatePlanMutationVariables>;
} &
  TChildProps;
export function withCreatePlan<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreatePlanMutation,
    CreatePlanMutationVariables,
    CreatePlanProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreatePlanMutation,
    CreatePlanMutationVariables,
    CreatePlanProps<TChildProps, TDataName>
  >(CreatePlanDocument, {
    alias: 'createPlan',
    ...operationOptions
  });
}

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
export type DeletePlanComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<DeletePlanMutation, DeletePlanMutationVariables>,
  'mutation'
>;

export const DeletePlanComponent = (props: DeletePlanComponentProps) => (
  <ApolloReactComponents.Mutation<DeletePlanMutation, DeletePlanMutationVariables>
    mutation={DeletePlanDocument}
    {...props}
  />
);

export type DeletePlanProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<DeletePlanMutation, DeletePlanMutationVariables>;
} &
  TChildProps;
export function withDeletePlan<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    DeletePlanMutation,
    DeletePlanMutationVariables,
    DeletePlanProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    DeletePlanMutation,
    DeletePlanMutationVariables,
    DeletePlanProps<TChildProps, TDataName>
  >(DeletePlanDocument, {
    alias: 'deletePlan',
    ...operationOptions
  });
}

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
      dietPlan {
        uuid
      }
      workoutRoutine {
        uuid
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
export type GetPlanDetailComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetPlanDetailQuery, GetPlanDetailQueryVariables>,
  'query'
> &
  ({ variables: GetPlanDetailQueryVariables; skip?: boolean } | { skip: boolean });

export const GetPlanDetailComponent = (props: GetPlanDetailComponentProps) => (
  <ApolloReactComponents.Query<GetPlanDetailQuery, GetPlanDetailQueryVariables>
    query={GetPlanDetailDocument}
    {...props}
  />
);

export type GetPlanDetailProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetPlanDetailQuery, GetPlanDetailQueryVariables>;
} &
  TChildProps;
export function withGetPlanDetail<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetPlanDetailQuery,
    GetPlanDetailQueryVariables,
    GetPlanDetailProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetPlanDetailQuery,
    GetPlanDetailQueryVariables,
    GetPlanDetailProps<TChildProps, TDataName>
  >(GetPlanDetailDocument, {
    alias: 'getPlanDetail',
    ...operationOptions
  });
}

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
export type GetPlanComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetPlanQuery, GetPlanQueryVariables>,
  'query'
> &
  ({ variables: GetPlanQueryVariables; skip?: boolean } | { skip: boolean });

export const GetPlanComponent = (props: GetPlanComponentProps) => (
  <ApolloReactComponents.Query<GetPlanQuery, GetPlanQueryVariables> query={GetPlanDocument} {...props} />
);

export type GetPlanProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetPlanQuery, GetPlanQueryVariables>;
} &
  TChildProps;
export function withGetPlan<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetPlanQuery,
    GetPlanQueryVariables,
    GetPlanProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<TProps, GetPlanQuery, GetPlanQueryVariables, GetPlanProps<TChildProps, TDataName>>(
    GetPlanDocument,
    {
      alias: 'getPlan',
      ...operationOptions
    }
  );
}

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
  query getPlans($take: Int!, $skip: Int!, $order: PlanOrderByInput!) {
    payload: plans(take: $take, skip: $skip, orderBy: $order) {
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
export type GetPlansComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetPlansQuery, GetPlansQueryVariables>,
  'query'
> &
  ({ variables: GetPlansQueryVariables; skip?: boolean } | { skip: boolean });

export const GetPlansComponent = (props: GetPlansComponentProps) => (
  <ApolloReactComponents.Query<GetPlansQuery, GetPlansQueryVariables> query={GetPlansDocument} {...props} />
);

export type GetPlansProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetPlansQuery, GetPlansQueryVariables>;
} &
  TChildProps;
export function withGetPlans<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetPlansQuery,
    GetPlansQueryVariables,
    GetPlansProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<TProps, GetPlansQuery, GetPlansQueryVariables, GetPlansProps<TChildProps, TDataName>>(
    GetPlansDocument,
    {
      alias: 'getPlans',
      ...operationOptions
    }
  );
}

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
export const UpdatePlanDocument = gql`
  mutation updatePlan($data: PlanUpdateInput!, $where: PlanWhereUniqueInput!) {
    payload: updatePlan(data: $data, where: $where) {
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
export type UpdatePlanComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<UpdatePlanMutation, UpdatePlanMutationVariables>,
  'mutation'
>;

export const UpdatePlanComponent = (props: UpdatePlanComponentProps) => (
  <ApolloReactComponents.Mutation<UpdatePlanMutation, UpdatePlanMutationVariables>
    mutation={UpdatePlanDocument}
    {...props}
  />
);

export type UpdatePlanProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<UpdatePlanMutation, UpdatePlanMutationVariables>;
} &
  TChildProps;
export function withUpdatePlan<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdatePlanMutation,
    UpdatePlanMutationVariables,
    UpdatePlanProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdatePlanMutation,
    UpdatePlanMutationVariables,
    UpdatePlanProps<TChildProps, TDataName>
  >(UpdatePlanDocument, {
    alias: 'updatePlan',
    ...operationOptions
  });
}

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
export type UpdateUserComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<UpdateUserMutation, UpdateUserMutationVariables>,
  'mutation'
>;

export const UpdateUserComponent = (props: UpdateUserComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateUserMutation, UpdateUserMutationVariables>
    mutation={UpdateUserDocument}
    {...props}
  />
);

export type UpdateUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
} &
  TChildProps;
export function withUpdateUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateUserMutation,
    UpdateUserMutationVariables,
    UpdateUserProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateUserMutation,
    UpdateUserMutationVariables,
    UpdateUserProps<TChildProps, TDataName>
  >(UpdateUserDocument, {
    alias: 'updateUser',
    ...operationOptions
  });
}

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
export type CreateWorkoutComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<CreateWorkoutMutation, CreateWorkoutMutationVariables>,
  'mutation'
>;

export const CreateWorkoutComponent = (props: CreateWorkoutComponentProps) => (
  <ApolloReactComponents.Mutation<CreateWorkoutMutation, CreateWorkoutMutationVariables>
    mutation={CreateWorkoutDocument}
    {...props}
  />
);

export type CreateWorkoutProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<CreateWorkoutMutation, CreateWorkoutMutationVariables>;
} &
  TChildProps;
export function withCreateWorkout<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    CreateWorkoutMutation,
    CreateWorkoutMutationVariables,
    CreateWorkoutProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    CreateWorkoutMutation,
    CreateWorkoutMutationVariables,
    CreateWorkoutProps<TChildProps, TDataName>
  >(CreateWorkoutDocument, {
    alias: 'createWorkout',
    ...operationOptions
  });
}

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
export type GetTrainingComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetTrainingQuery, GetTrainingQueryVariables>,
  'query'
> &
  ({ variables: GetTrainingQueryVariables; skip?: boolean } | { skip: boolean });

export const GetTrainingComponent = (props: GetTrainingComponentProps) => (
  <ApolloReactComponents.Query<GetTrainingQuery, GetTrainingQueryVariables> query={GetTrainingDocument} {...props} />
);

export type GetTrainingProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetTrainingQuery, GetTrainingQueryVariables>;
} &
  TChildProps;
export function withGetTraining<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetTrainingQuery,
    GetTrainingQueryVariables,
    GetTrainingProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetTrainingQuery,
    GetTrainingQueryVariables,
    GetTrainingProps<TChildProps, TDataName>
  >(GetTrainingDocument, {
    alias: 'getTraining',
    ...operationOptions
  });
}

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
export type GetWorkoutComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetWorkoutQuery, GetWorkoutQueryVariables>,
  'query'
> &
  ({ variables: GetWorkoutQueryVariables; skip?: boolean } | { skip: boolean });

export const GetWorkoutComponent = (props: GetWorkoutComponentProps) => (
  <ApolloReactComponents.Query<GetWorkoutQuery, GetWorkoutQueryVariables> query={GetWorkoutDocument} {...props} />
);

export type GetWorkoutProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetWorkoutQuery, GetWorkoutQueryVariables>;
} &
  TChildProps;
export function withGetWorkout<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetWorkoutQuery,
    GetWorkoutQueryVariables,
    GetWorkoutProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetWorkoutQuery,
    GetWorkoutQueryVariables,
    GetWorkoutProps<TChildProps, TDataName>
  >(GetWorkoutDocument, {
    alias: 'getWorkout',
    ...operationOptions
  });
}

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
export const GetAllExercisesDocument = gql`
  query getAllExercises {
    payload: exercises(orderBy: { createdAt: DESC }) {
      uuid
      name
      description
    }
  }
`;
export type GetAllExercisesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetAllExercisesQuery, GetAllExercisesQueryVariables>,
  'query'
>;

export const GetAllExercisesComponent = (props: GetAllExercisesComponentProps) => (
  <ApolloReactComponents.Query<GetAllExercisesQuery, GetAllExercisesQueryVariables>
    query={GetAllExercisesDocument}
    {...props}
  />
);

export type GetAllExercisesProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetAllExercisesQuery, GetAllExercisesQueryVariables>;
} &
  TChildProps;
export function withGetAllExercises<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetAllExercisesQuery,
    GetAllExercisesQueryVariables,
    GetAllExercisesProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetAllExercisesQuery,
    GetAllExercisesQueryVariables,
    GetAllExercisesProps<TChildProps, TDataName>
  >(GetAllExercisesDocument, {
    alias: 'getAllExercises',
    ...operationOptions
  });
}

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
export const GetWorkoutRoutineDocument = gql`
  query getWorkoutRoutine($where: WorkoutRoutineWhereUniqueInput!) {
    payload: workoutRoutine(where: $where) {
      uuid
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
        }
      }
    }
  }
`;
export type GetWorkoutRoutineComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetWorkoutRoutineQuery, GetWorkoutRoutineQueryVariables>,
  'query'
> &
  ({ variables: GetWorkoutRoutineQueryVariables; skip?: boolean } | { skip: boolean });

export const GetWorkoutRoutineComponent = (props: GetWorkoutRoutineComponentProps) => (
  <ApolloReactComponents.Query<GetWorkoutRoutineQuery, GetWorkoutRoutineQueryVariables>
    query={GetWorkoutRoutineDocument}
    {...props}
  />
);

export type GetWorkoutRoutineProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetWorkoutRoutineQuery, GetWorkoutRoutineQueryVariables>;
} &
  TChildProps;
export function withGetWorkoutRoutine<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetWorkoutRoutineQuery,
    GetWorkoutRoutineQueryVariables,
    GetWorkoutRoutineProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetWorkoutRoutineQuery,
    GetWorkoutRoutineQueryVariables,
    GetWorkoutRoutineProps<TChildProps, TDataName>
  >(GetWorkoutRoutineDocument, {
    alias: 'getWorkoutRoutine',
    ...operationOptions
  });
}

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
export const UpdateWorkoutRoutineDocument = gql`
  mutation updateWorkoutRoutine($data: WorkoutRoutineUpdateInput!, $where: WorkoutRoutineWhereUniqueInput!) {
    payload: updateWorkoutRoutine(data: $data, where: $where) {
      uuid
      plan {
        uuid
      }
    }
  }
`;
export type UpdateWorkoutRoutineMutationFn = ApolloReactCommon.MutationFunction<
  UpdateWorkoutRoutineMutation,
  UpdateWorkoutRoutineMutationVariables
>;
export type UpdateWorkoutRoutineComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<UpdateWorkoutRoutineMutation, UpdateWorkoutRoutineMutationVariables>,
  'mutation'
>;

export const UpdateWorkoutRoutineComponent = (props: UpdateWorkoutRoutineComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateWorkoutRoutineMutation, UpdateWorkoutRoutineMutationVariables>
    mutation={UpdateWorkoutRoutineDocument}
    {...props}
  />
);

export type UpdateWorkoutRoutineProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
  [key in TDataName]: ApolloReactCommon.MutationFunction<
    UpdateWorkoutRoutineMutation,
    UpdateWorkoutRoutineMutationVariables
  >;
} &
  TChildProps;
export function withUpdateWorkoutRoutine<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UpdateWorkoutRoutineMutation,
    UpdateWorkoutRoutineMutationVariables,
    UpdateWorkoutRoutineProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    UpdateWorkoutRoutineMutation,
    UpdateWorkoutRoutineMutationVariables,
    UpdateWorkoutRoutineProps<TChildProps, TDataName>
  >(UpdateWorkoutRoutineDocument, {
    alias: 'updateWorkoutRoutine',
    ...operationOptions
  });
}

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
  query getWorkouts($skip: Int!, $take: Int!, $order: WorkoutOrderByInput!) {
    payload: workouts(skip: $skip, take: $take, orderBy: $order) {
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
export type GetWorkoutsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetWorkoutsQuery, GetWorkoutsQueryVariables>,
  'query'
> &
  ({ variables: GetWorkoutsQueryVariables; skip?: boolean } | { skip: boolean });

export const GetWorkoutsComponent = (props: GetWorkoutsComponentProps) => (
  <ApolloReactComponents.Query<GetWorkoutsQuery, GetWorkoutsQueryVariables> query={GetWorkoutsDocument} {...props} />
);

export type GetWorkoutsProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<GetWorkoutsQuery, GetWorkoutsQueryVariables>;
} &
  TChildProps;
export function withGetWorkouts<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    GetWorkoutsQuery,
    GetWorkoutsQueryVariables,
    GetWorkoutsProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    GetWorkoutsQuery,
    GetWorkoutsQueryVariables,
    GetWorkoutsProps<TChildProps, TDataName>
  >(GetWorkoutsDocument, {
    alias: 'getWorkouts',
    ...operationOptions
  });
}

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
export type UserProfileComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<UserProfileQuery, UserProfileQueryVariables>,
  'query'
> &
  ({ variables: UserProfileQueryVariables; skip?: boolean } | { skip: boolean });

export const UserProfileComponent = (props: UserProfileComponentProps) => (
  <ApolloReactComponents.Query<UserProfileQuery, UserProfileQueryVariables> query={UserProfileDocument} {...props} />
);

export type UserProfileProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<UserProfileQuery, UserProfileQueryVariables>;
} &
  TChildProps;
export function withUserProfile<TProps, TChildProps = {}, TDataName extends string = 'data'>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    UserProfileQuery,
    UserProfileQueryVariables,
    UserProfileProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    UserProfileQuery,
    UserProfileQueryVariables,
    UserProfileProps<TChildProps, TDataName>
  >(UserProfileDocument, {
    alias: 'userProfile',
    ...operationOptions
  });
}

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
