import React, { FC, useState, useContext } from 'react';

import { UploadChangeParam } from 'antd/lib/upload';
import { Form, Input, Button, Card, Select, DatePicker, Upload } from 'antd';
import { UserOutlined, PhoneOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';

import { Profile } from 'shared/model';
import { AuthContext } from 'shared/contexts';

import userStyles from './profile.style';

const { Item } = Form;
const { Option } = Select;

const Register: FC = () => {
  const classes = userStyles();
  const [avatar, setAvatar] = useState('');
  const { createProfile, isLoading } = useContext(AuthContext);

  const getBase64 = (file: Blob, callback: (avatar: string | ArrayBuffer | null) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const onUpload = (info: UploadChangeParam<any>) => {
    getBase64(info.file, image => {
      if (image && typeof image === 'string') {
        setAvatar(image);
      }
    });
  };

  const onSubmit = async (data: any) => {
    if (!isLoading) {
      await createProfile(new Profile({ avatar, firstName: data.firstName, lastName: data.lastName }));
    }
  };

  return (
    <Card className={classes.root} bordered={true}>
      <Form name="normal_profile" initialValues={{ remember: true }} onFinish={onSubmit}>
        <Item className="profile-form-title">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            onChange={onUpload}
            showUploadList={false}
            beforeUpload={() => false}
            disabled={isLoading}
          >
            {avatar ? (
              <img src={avatar} alt="avatar" />
            ) : (
              <>
                <PlusOutlined />
                <p>Avatar</p>
              </>
            )}
          </Upload>
        </Item>

        <Item name="firstName" rules={[{ required: true, message: 'Please input your first name!' }]}>
          <Input prefix={<UserOutlined />} placeholder="First name" disabled={isLoading} />
        </Item>
        <Item name="lastName" rules={[{ required: true, message: 'Please input your last name!' }]}>
          <Input prefix={<UserOutlined />} placeholder="Last name" disabled={isLoading} />
        </Item>
        <Item name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
          <Input prefix={<PhoneOutlined />} placeholder="Phone number" disabled={isLoading} />
        </Item>
        <Item name="birthday" rules={[{ required: true, message: 'Please input your birthday!' }]}>
          <DatePicker style={{ width: '100%' }} placeholder="Birthday" disabled={isLoading} />
        </Item>
        <Item name="gender" rules={[{ message: 'Please input your gender!' }]}>
          <Select defaultValue="gender" disabled={isLoading}>
            <Option value="gym">Male</Option>
            <Option value="trainer">Female</Option>
          </Select>
        </Item>
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
