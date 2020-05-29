import React, { FC, useContext } from 'react';

import moment from 'moment';
import { useFormik } from 'formik';
import { Form, Card, Row, Col, Collapse } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  PlusOutlined,
  MailOutlined,
  ShopOutlined,
  FieldNumberOutlined,
  BarcodeOutlined,
  TeamOutlined,
  GlobalOutlined
} from '@ant-design/icons';

import { GymProfile as GymProfileModel, IGymProfileForm } from 'modules/profile/shared/model/gym-profile.model';

import { Field, Select, DatePicker, Upload } from 'shared/modules/form';
import Button from 'shared/modules/button/button.component';

import { AuthContext } from 'shared/contexts';
import { Gender, useGymProfileQuery } from 'shared/generated/graphql-schema';

import { PROFILE_FORM_SCHEMA } from './gym-profile.util';
import userStyles from './gym-profile.style';

const { Item } = Form;

const GymProfile: FC = () => {
  const classes = userStyles();
  const { user } = useContext(AuthContext);
  const { data } = useGymProfileQuery({
    variables: { where: { uuid: user ? user.uuid : undefined } }
  });

  const gymProfile = new GymProfileModel(data && data.user);

  console.log(gymProfile.form);

  const onSubmit = async (data: IGymProfileForm) => {
    console.log(data);
  };

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<IGymProfileForm>({
    onSubmit,
    initialValues: gymProfile.form,
    validationSchema: PROFILE_FORM_SCHEMA,
    enableReinitialize: true
  });

  return (
    <>
      <Card title="Information" className={classes.root} bordered>
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
              <Field
                icon={<ShopOutlined />}
                name="company"
                placeholder="Nombre de compañia"
                value={values.company}
                error={errors.company}
                onChange={handleChange}
                hasBeenTouched={touched.company}
              />
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
                name="birthday"
                placeholder="Fecha de cumpleaños"
                error={errors.birthday}
                setFieldValue={setFieldValue}
                hasBeenTouched={touched.birthday}
                disabledDate={date => !date || date.isAfter(moment())}
              />

              <Select
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
            <Col xs={24} md={8}>
              <Field
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

              <Field
                icon={<FieldNumberOutlined />}
                name="phone"
                placeholder="Cédula Jurídica"
                value={values.phone}
                error={errors.phone}
                onChange={handleChange}
                hasBeenTouched={touched.phone}
              />

              <Field
                icon={<BarcodeOutlined />}
                name="phone"
                placeholder="Token de Hacienda"
                value={values.phone}
                error={errors.phone}
                onChange={handleChange}
                hasBeenTouched={touched.phone}
              />
            </Col>
          </Row>

          <Item className="submit-button">
            <Button type="submit">GUARDAR</Button>
          </Item>
        </Form>
      </Card>
      <Row style={{ marginTop: 16, marginBottom: 16 }}>
        <Col>
          <Collapse defaultActiveKey={['1']} onChange={console.log}>
            <Collapse.Panel
              header={
                <>
                  <GlobalOutlined /> Website
                </>
              }
              key="1"
            >
              <p>Hello</p>
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
      <Row style={{ marginTop: 16, marginBottom: 16 }}>
        {gymProfile.branches.map(branch => (
          <Col xs={24} md={8} lg={6} key={branch.uuid}>
            <Card
              title="Heredia, Belén (CRC)"
              extra={
                <>
                  <TeamOutlined /> 67
                </>
              }
              hoverable
            >
              <Card.Meta description={'50 metros al oeste del cementerio de la ribera'} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default GymProfile;
