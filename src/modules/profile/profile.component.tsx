import React, { FC, useContext } from 'react';

import { useFormik } from 'formik';
import { Form, Card, Row, Col } from 'antd';

import { PERSONAL_INFO_TEXT } from './profile.module';

import {
  UserProfile as UserProfileModel,
  IUserProfileForm,
  IUpdateUserProfileForm
} from 'modules/profile/shared/model';

import { Button, Icon } from 'shared/modules';
import { Field, Select, DatePicker, Upload } from 'shared/modules/form';

import { AuthContext } from 'shared/contexts';
import { UserService } from 'shared/services';
import { objectDifferences } from 'shared/util/object-differences';
import {
  BIRTHDAY_TEXT,
  DISCONNECT_TEXT,
  EMAIL_TEXT,
  FIRST_NAME_TEXT,
  GENDER_TEXT,
  LAST_NAME_TEXT,
  PHONE_TEXT,
  PROFILE_TEXT,
  PROFILE_VISIBILITY,
  SAVE_TEXT,
  USERNAME_TEXT
} from 'shared/constants';
import { Gender, Scope, useUpdateUserMutation } from 'shared/generated';

import { PROFILE_FORM_SCHEMA } from './profile.util';

import useStyles from './profile.style';

import * as config from '../../../package.json';

const { Item } = Form;

const Profile: FC = () => {
  const classes = useStyles();
  const { user, refreshUser, logout } = useContext(AuthContext);
  const [updateProfile, { loading }] = useUpdateUserMutation();

  const userProfile = new UserProfileModel(user);

  const onSubmit = async ({ username, email, ...values }: IUserProfileForm) => {
    const data: IUpdateUserProfileForm = objectDifferences(values, userProfile.userProfileForm);

    try {
      await updateProfile({
        variables: {
          data
        }
      });

      // TODO WE CAN PASS THE USER RESPONSE OF THE UPDATE FUNCTION TO THE REFRESH SO WE DONT HAVE DO TO AN EXTRA QUERY FOR UPDATING CURRENT USER
      refreshUser();
    } catch (error) {}
  };

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<IUserProfileForm>({
    onSubmit,
    initialValues: userProfile.userProfileForm,
    validationSchema: PROFILE_FORM_SCHEMA,
    enableReinitialize: true
  });

  const haveValuesChanged = !Object.keys(objectDifferences(userProfile.userProfileForm, values)).length;

  return (
    <Card
      bordered
      title={PERSONAL_INFO_TEXT}
      className={classes.root}
      actions={[<span className="version">{config.version}</span>]}
    >
      <Form onSubmitCapture={handleSubmit}>
        <Row gutter={24}>
          <Col xs={24} md={4}>
            <Item className="profile-form-title">
              <Upload
                name="avatarBase64"
                className="avatar-uploader"
                error={errors.avatarBase64}
                setFieldValue={setFieldValue}
                hasBeenTouched={touched.avatarBase64}
              >
                {values.avatarBase64 ? (
                  <img src={values.avatarBase64} alt="Avatar" />
                ) : (
                  <>
                    <Icon type="plus" />
                    <p>{PROFILE_TEXT}</p>
                  </>
                )}
              </Upload>
              <Button size="small" onClick={logout}>
                {DISCONNECT_TEXT}
              </Button>
            </Item>
          </Col>
          <Col xs={24} md={8}>
            <Field
              isDisabled
              icon={<Icon type="crown" />}
              name="username"
              placeholder={USERNAME_TEXT}
              value={values.username}
              error={errors.username}
              onChange={handleChange}
              hasBeenTouched={touched.username}
            />

            <Field
              isDisabled
              icon={<Icon type="mail" />}
              name="email"
              value={values.email}
              error={errors.email}
              placeholder={EMAIL_TEXT}
              hasBeenTouched={touched.email}
              onChange={handleChange}
            />

            <Field
              icon={<Icon type="phone" />}
              name="phone"
              value={values.phone}
              error={errors.phone}
              isDisabled={loading}
              placeholder={PHONE_TEXT}
              hasBeenTouched={touched.phone}
              onChange={handleChange}
            />

            <Select
              value={values.scope}
              name="scope"
              options={[
                { label: 'Privado', value: Scope.Private },
                { label: 'Público', value: Scope.Public }
              ]}
              error={errors.scope}
              isDisabled={loading}
              placeholder={PROFILE_VISIBILITY}
              hasBeenTouched={touched.scope}
              setFieldValue={setFieldValue}
            />
          </Col>
          <Col xs={24} md={8}>
            <Field
              icon={<Icon type="user" />}
              name="firstName"
              value={values.firstName}
              error={errors.firstName}
              isDisabled={loading}
              placeholder={FIRST_NAME_TEXT}
              hasBeenTouched={touched.firstName}
              onChange={handleChange}
            />

            <Field
              icon={<Icon type="user" />}
              name="lastName"
              value={values.lastName}
              error={errors.lastName}
              isDisabled={loading}
              placeholder={LAST_NAME_TEXT}
              hasBeenTouched={touched.lastName}
              onChange={handleChange}
            />

            <DatePicker
              value={values.birthday}
              name="birthday"
              error={errors.birthday}
              isDisabled={loading}
              placeholder={BIRTHDAY_TEXT}
              hasBeenTouched={touched.birthday}
              setFieldValue={setFieldValue}
              disabledDate={
                values.birthday
                  ? {
                      date: 'today',
                      condition: 'isAfter'
                    }
                  : undefined
              }
            />

            <Select
              value={values.gender}
              name="gender"
              options={[
                { label: UserService.parseGender(Gender.Male), value: Gender.Male },
                { label: UserService.parseGender(Gender.Female), value: Gender.Female },
                { label: UserService.parseGender(Gender.NotSpecified), value: Gender.NotSpecified }
              ]}
              error={errors.gender}
              isDisabled={loading}
              placeholder={GENDER_TEXT}
              setFieldValue={setFieldValue}
              hasBeenTouched={touched.gender}
            />
          </Col>
        </Row>

        <Item className="submit-button">
          <Button type="submit" disabled={haveValuesChanged} loading={loading}>
            {SAVE_TEXT}
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default Profile;
