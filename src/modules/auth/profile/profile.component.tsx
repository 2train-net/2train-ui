import React, { FC, useContext } from 'react';

import moment from 'moment';
import { useFormik } from 'formik';
import { Form, Button, Card } from 'antd';
import { UserOutlined, PhoneOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';

import { Field, Select, DatePicker, Upload } from 'shared/modules/form';

import { AuthContext } from 'shared/contexts';
import { CreateProfile, ICreateProfileData, Gender } from 'modules/auth/shared/model';

import { INITIAL_PROFILE_FORM_VALUES, PROFILE_FORM_SCHEMA } from './profile.util';
import userStyles from './profile.style';

const { Item } = Form;

const Register: FC = () => {
  const classes = userStyles();
  const { createProfile, isLoading } = useContext(AuthContext);

  const onSubmit = async (data: ICreateProfileData) => {
    if (!isLoading) {
      await createProfile(new CreateProfile(data));
    }
  };

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<ICreateProfileData>({
    onSubmit,
    initialValues: INITIAL_PROFILE_FORM_VALUES,
    validationSchema: PROFILE_FORM_SCHEMA
  });

  return (
    <Card className={classes.root} bordered>
      <Form onSubmitCapture={handleSubmit}>
        <Item className="profile-form-title">
          <Upload
            name="avatar"
            className="avatar-uploader"
            error={errors.avatar}
            setFieldValue={setFieldValue}
            isDisabled={isLoading}
            hasBeenTouched={touched.avatar}
          >
            {values.avatar ? (
              <img src={values.avatar} alt="avatar" />
            ) : (
              <>
                <PlusOutlined />
                <p>Avatar</p>
              </>
            )}
          </Upload>
        </Item>

        <Field
          icon={<UserOutlined />}
          name="firstName"
          placeholder="First name"
          value={values.firstName}
          error={errors.firstName}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.firstName}
        />

        <Field
          icon={<UserOutlined />}
          name="lastName"
          placeholder="Last name"
          value={values.lastName}
          error={errors.lastName}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.lastName}
        />

        <Field
          icon={<PhoneOutlined />}
          name="phone"
          placeholder="Phone"
          value={values.phone}
          error={errors.phone}
          onChange={handleChange}
          isDisabled={isLoading}
          hasBeenTouched={touched.phone}
        />

        <DatePicker
          name="birthday"
          placeholder="Birthday"
          error={errors.birthday}
          isDisabled={isLoading}
          setFieldValue={setFieldValue}
          hasBeenTouched={touched.birthday}
          disabledDate={date => !date || date.isAfter(moment())}
        />

        <Select
          name="gender"
          placeholder="Gender"
          options={[
            { label: 'Male', value: Gender.MALE },
            { label: 'Female', value: Gender.FEMALE }
          ]}
          error={errors.gender}
          isDisabled={isLoading}
          setFieldValue={setFieldValue}
          hasBeenTouched={touched.gender}
        />

        <Item className="submit-button">
          <Button type="primary" htmlType="submit" block>
            {isLoading ? <LoadingOutlined /> : 'CONTINUE'}
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default Register;
