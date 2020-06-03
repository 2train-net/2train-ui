import React, { FC, useContext } from 'react';

import { GymProfile } from './profile.module';

import UserProfile from './shared/components/user-profile/user-profile.component';

import { AuthContext } from 'shared/contexts';
import { UserTypes } from 'shared/generated/graphql-schema';

const { Admin, Gym, Trainer, Customer } = UserTypes;

const Profile: FC = () => {
  const { user } = useContext(AuthContext);

  const USER_PROFILES = {
    [Admin]: null,
    [Gym]: <GymProfile />,
    [Trainer]: null,
    [Customer]: null
  };

  return (
    <>
      <UserProfile />

      {user && USER_PROFILES[user.type.id]}
    </>
  );
};

export default Profile;
