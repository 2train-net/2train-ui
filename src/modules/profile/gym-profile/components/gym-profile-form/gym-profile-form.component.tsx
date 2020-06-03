import React, { FC, useContext } from 'react';

import { useFormik } from 'formik';
import { Form, Card, Row, Col } from 'antd';
import { ShopOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';

import { GymProfile as GymProfileModel, IGymProfileForm as IGymProfileFormModel } from 'modules/profile/shared/model';

import Button from 'shared/modules/button/button.component';
import { AuthContext } from 'shared/contexts';
import { Field, Upload } from 'shared/modules/form';
import { useCreateGymMutation } from 'shared/generated/graphql-schema';

import { GYM_PROFILE_FORM_SCHEMA } from './gym-profile-form.util';
import useStyles from './gym-profile-form.style';

const { Item } = Form;

interface IGymProfileForm {
  gymProfile: GymProfileModel;
}

const GymProfileForm: FC<IGymProfileForm> = ({ gymProfile }) => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [createGym] = useCreateGymMutation();

  const onSubmit = async (data: IGymProfileFormModel) => {
    if (gymProfile.uuid) {
    } else {
      const response = await createGym({
        variables: { data: { name: data.name, phone: data.phone, owner: { connect: { email: user && user.email } } } }
      });
      console.log(response);
    }
  };

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik<IGymProfileFormModel>({
    onSubmit,
    initialValues: gymProfile.gymProfileForm,
    validationSchema: GYM_PROFILE_FORM_SCHEMA,
    enableReinitialize: true
  });

  return (
    <Card title="Información de compañia" className={classes.root} bordered>
      <Form onSubmitCapture={handleSubmit}>
        <Row gutter={24}>
          <Col xs={24} md={4}>
            <Item
              style={{
                textAlign: 'center',
                marginTop: 16,
                marginBottom: 16
              }}
            >
              <Upload
                className="avatar-uploader"
                name="avatarBase64"
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
              icon={<ShopOutlined />}
              name="name"
              placeholder="Nombre de compañia"
              value={values.name}
              error={errors.name}
              onChange={handleChange}
              hasBeenTouched={touched.name}
            />
          </Col>
          <Col xs={24} md={8}>
            <Field
              icon={<PhoneOutlined />}
              name="phone"
              placeholder="Número de télefono"
              value={values.phone}
              error={errors.phone}
              onChange={handleChange}
              hasBeenTouched={touched.phone}
            />
          </Col>
        </Row>

        <Item className="submit-button">
          <Button type="submit" color="secondary">
            {gymProfile.uuid ? 'GUARDAR' : 'CREAR'}
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default GymProfileForm;
