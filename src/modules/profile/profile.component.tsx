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
  OTHER_TEXT,
  PHONE_TEXT,
  PROFILE_TEXT,
  PROFILE_VISIBILITY,
  SAVE_TEXT,
  USERNAME_TEXT
} from 'shared/constants';
import { Gender, Scope, useUpdateUserMutation } from 'shared/generated';

import { PROFILE_FORM_SCHEMA } from './profile.util';

import useStyles from './profile.style';

const { Item } = Form;

const Profile: FC = () => {
  const classes = useStyles();
  const { user, refreshUser, logout } = useContext(AuthContext);
  const [updateProfile] = useUpdateUserMutation();

  const userProfile = new UserProfileModel(user);

  const onSubmit = async (values: IUserProfileForm) => {
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
    <Card title={PERSONAL_INFO_TEXT} className={classes.root} bordered>
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
              isDisabled={true}
              icon={<Icon type="crown" />}
              name="username"
              placeholder={USERNAME_TEXT}
              value={values.username}
              error={errors.username}
              onChange={handleChange}
              hasBeenTouched={touched.username}
            />

            <Field
              isDisabled={true}
              icon={<Icon type="mail" />}
              name="email"
              placeholder={EMAIL_TEXT}
              value={values.email}
              error={errors.email}
              onChange={handleChange}
              hasBeenTouched={touched.email}
            />

            <Field
              icon={<Icon type="phone" />}
              name="phone"
              placeholder={PHONE_TEXT}
              value={values.phone}
              error={errors.phone}
              onChange={handleChange}
              hasBeenTouched={touched.phone}
            />

            <Select
              value={values.scope}
              name="scope"
              placeholder={PROFILE_VISIBILITY}
              options={[
                { label: 'Privado', value: Scope.Private },
                { label: 'Público', value: Scope.Public }
              ]}
              error={errors.scope}
              setFieldValue={setFieldValue}
              hasBeenTouched={touched.scope}
            />
          </Col>
          <Col xs={24} md={8}>
            <Field
              icon={<Icon type="user" />}
              name="firstName"
              placeholder={FIRST_NAME_TEXT}
              value={values.firstName}
              error={errors.firstName}
              onChange={handleChange}
              hasBeenTouched={touched.firstName}
            />

            <Field
              icon={<Icon type="user" />}
              name="lastName"
              placeholder={LAST_NAME_TEXT}
              value={values.lastName}
              error={errors.lastName}
              onChange={handleChange}
              hasBeenTouched={touched.lastName}
            />

            <DatePicker
              value={values.birthday}
              name="birthday"
              placeholder={BIRTHDAY_TEXT}
              error={errors.birthday}
              setFieldValue={setFieldValue}
              hasBeenTouched={touched.birthday}
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
              placeholder={GENDER_TEXT}
              options={[
                { label: UserService.parseGender(Gender.Male), value: Gender.Male },
                { label: UserService.parseGender(Gender.Female), value: Gender.Female },
                { label: OTHER_TEXT, value: null }
              ]}
              error={errors.gender}
              setFieldValue={setFieldValue}
              hasBeenTouched={touched.gender}
            />
          </Col>
        </Row>

        <Item className="submit-button">
          <Button type="submit" disabled={haveValuesChanged}>
            {SAVE_TEXT}
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default Profile;
