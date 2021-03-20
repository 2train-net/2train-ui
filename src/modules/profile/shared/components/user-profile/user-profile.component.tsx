import React, { FC, useContext } from 'react';

import moment from 'moment';
import { useFormik } from 'formik';
import { Form, Card, Row, Col } from 'antd';
import { UserOutlined, PhoneOutlined, PlusOutlined, MailOutlined } from '@ant-design/icons';

import {
  UserProfile as UserProfileModel,
  IUserProfileForm,
  IUpdateUserProfileForm
} from 'modules/profile/shared/model';

import { Field, Select, DatePicker, Upload } from 'shared/modules/form';
import Button from 'shared/modules/button/button.component';

import { AuthContext } from 'shared/contexts';
import { objectDifferences } from 'shared/util/object-differences';
import { Gender } from 'shared/generated/graphql-schema';

import { PROFILE_FORM_SCHEMA } from './user-profile.util';
import useStyles from './user-profile.style';

const { Item } = Form;

const UserProfile: FC = () => {
  const classes = useStyles();
  const { user, refreshUser } = useContext(AuthContext);

  const userProfile = new UserProfileModel(user);

  const onSubmit = async (data: IUserProfileForm) => {
    const values: IUpdateUserProfileForm = objectDifferences(data, userProfile.userProfileForm);

    refreshUser();
  };

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<IUserProfileForm>({
    onSubmit,
    initialValues: userProfile.userProfileForm,
    validationSchema: PROFILE_FORM_SCHEMA,
    enableReinitialize: true
  });

  const haveValuesChanged = !Object.keys(objectDifferences(userProfile.userProfileForm, values)).length;

  return (
    <Card title="Información personal" className={classes.root} bordered>
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
                    <p>Perfil</p>
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
              value={values.birthday && moment(values.birthday)}
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
              placeholder="Correo Electrónico"
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
          <Button type="submit" disabled={haveValuesChanged}>
            GUARDAR
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default UserProfile;
