import React, { FC, useState } from 'react';

import { Form, Input, Button, Card, Select, DatePicker, Upload } from 'antd';
import { UserOutlined, PhoneOutlined, PlusOutlined } from '@ant-design/icons';

import userStyles from './profile.style';
import { UploadChangeParam } from 'antd/lib/upload';

const { Item } = Form;
const { Option } = Select;

const Register: FC = () => {
  const classes = userStyles();
  const [avatar, setAvatar] = useState('');

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

  return (
    <Card className={classes.root} bordered={true}>
      <Form name="normal_profile" initialValues={{ remember: true }}>
        <Item className="profile-form-title">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            onChange={onUpload}
            showUploadList={false}
            beforeUpload={() => false}
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
          <Input prefix={<UserOutlined />} placeholder="First name" />
        </Item>
        <Item name="lastName" rules={[{ required: true, message: 'Please input your last name!' }]}>
          <Input prefix={<UserOutlined />} placeholder="Last name" />
        </Item>
        <Item name="phone" rules={[{ required: true, message: 'Please input your phone number!' }]}>
          <Input prefix={<PhoneOutlined />} placeholder="Phone number" />
        </Item>
        <Item name="birthday" rules={[{ required: true, message: 'Please input your birthday!' }]}>
          <DatePicker onChange={console.log} style={{ width: '100%' }} placeholder="Birthday" />
        </Item>
        <Item name="gender" rules={[{ message: 'Please input your gender!' }]}>
          <Select defaultValue="gender">
            <Option value="gym">Male</Option>
            <Option value="trainer">Female</Option>
          </Select>
        </Item>
        <Item className="submit-button">
          <Button type="primary" htmlType="submit" block>
            CONTINUE
          </Button>
        </Item>
      </Form>
    </Card>
  );
};

export default Register;
