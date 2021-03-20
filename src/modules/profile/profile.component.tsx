import React, { FC, useContext } from 'react';

import { GymProfile } from './profile.module';

import UserProfile from './shared/components/user-profile/user-profile.component';

import { AuthContext } from 'shared/contexts';
import { UserType } from 'shared/generated/graphql-schema';

const { Customer } = UserType;

const Profile: FC = () => {
  const { user } = useContext(AuthContext);

  const USER_PROFILES = {
    [Customer]: <GymProfile />
  };

  return (
    <>
      <UserProfile />

      {user && USER_PROFILES['CUSTOMER']}
    </>
  );
};

export default Profile;
