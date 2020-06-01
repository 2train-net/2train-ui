import React, { FC, useContext } from 'react';

import moment from 'moment';
import { useFormik } from 'formik';
import { Form, Card, Row, Col } from 'antd';
import { UserOutlined, PhoneOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';

import { UserProfile as UserProfileModel, IUserProfileForm } from 'modules/profile/shared/model';

import { Field, Select, DatePicker, Upload } from 'shared/modules/form';
import Button from 'shared/modules/button/button.component';

import { AuthContext } from 'shared/contexts';
import { Gender, useUpdateUserMutation } from 'shared/generated/graphql-schema';

import { PROFILE_FORM_SCHEMA } from './user-profile.util';
import userStyles from './user-profile.style';

const { Item } = Form;

const UserProfile: FC = () => {
  const classes = userStyles();
  const { user } = useContext(AuthContext);
  const [updateUser] = useUpdateUserMutation();

  const gymProfile = new UserProfileModel(user);

  const onSubmit = async ({ avatarBase64, ...data }: IUserProfileForm) => {
    await updateUser({
      variables: {
        data: {
          avatarBase64,
          person: {
            update: {
              firstName: data.firstName,
              lastName: data.lastName,
              phone: data.phone,
              birthday: data.birthday,
              gender: data.gender
            }
          }
        },
        where: { email: user && user.email }
      }
    });
  };

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<IUserProfileForm>({
    onSubmit,
    initialValues: gymProfile.userProfileForm,
    validationSchema: PROFILE_FORM_SCHEMA,
    enableReinitialize: true
  });

  return (
    <Card title="Personal Information" className={classes.root} bordered>
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
                    <PlusOutlined />
                    <p>Logo</p>
                  </>
                )}
              </Upload>
            </Item>
          </Col>
          <Col xs={24} md={8}>
            <Field
              icon={<UserOutlined />}
              name="firstName"
              placeholder="Nombre"
              value={values.firstName}
              error={errors.firstName}
              onChange={handleChange}
              hasBeenTouched={touched.firstName}
            />

            <Field
              icon={<UserOutlined />}
              name="lastName"
              placeholder="Apellido"
              value={values.lastName}
              error={errors.lastName}
              onChange={handleChange}
              hasBeenTouched={touched.lastName}
            />

            <DatePicker
              value={moment()}
              name="birthday"
              placeholder="Fecha de cumpleaños"
              error={errors.birthday}
              setFieldValue={setFieldValue}
              hasBeenTouched={touched.birthday}
              disabledDate={date => !date || date.isAfter(moment())}
            />
          </Col>
          <Col xs={24} md={8}>
            <Field
              isDisabled={true}
              icon={<MailOutlined />}
              name="email"
              placeholder="Email"
              value={values.email}
              error={errors.email}
              onChange={handleChange}
              hasBeenTouched={touched.email}
            />

            <Field
              icon={<PhoneOutlined />}
              name="phone"
              placeholder="Número de télefono"
              value={values.phone}
              error={errors.phone}
              onChange={handleChange}
              hasBeenTouched={touched.phone}
            />

            <Select
              value={values.gender}
              name="gender"
              placeholder="Género"
              options={[
                { label: 'Male', value: Gender.Male },
                { label: 'Female', value: Gender.Female }
              ]}
              error={errors.gender}
              setFieldValue={setFieldValue}
              hasBeenTouched={touched.gender}
            />
          </Col>
        </Row>

        <Item className="submit-button">
          <Button type="submit">GUARDAR</Button>
        </Item>
      </Form>
    </Card>
  );
};

export default UserProfile;
