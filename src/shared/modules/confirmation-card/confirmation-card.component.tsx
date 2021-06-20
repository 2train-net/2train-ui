import React, { FC, ReactElement } from 'react';

import { Card, Typography, Row, Col, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Button, { ButtonColor } from 'shared/modules/button/button.component';
import Icon, { IconType } from 'shared/modules/icon/icon.component';
import { CANCEL_TEXT, CONTINUE_TEXT } from 'shared/constants';

import useStyles from './confirmation-card.style';

const { Title, Text } = Typography;

interface IConfirmationCard {
  title: string;
  icon: IconType;
  message?: string;
  color?: ButtonColor;
  confirmText?: string;
  cancelText?: string;
  contentRender?: ReactElement;
  isCancelButtonAvailable?: boolean;
  isSubmitButtonAvailable?: boolean;
  isLoading?: boolean;
  onConfirm: () => unknown;
  onCancel: () => unknown;
}

const ConfirmationCard: FC<IConfirmationCard> = ({
  title,
  icon,
  message,
  color = 'default',
  isCancelButtonAvailable = true,
  isSubmitButtonAvailable = true,
  isLoading = false,
  confirmText,
  cancelText,
  contentRender,
  onConfirm,
  onCancel
}) => {
  const classes = useStyles({ color });

  return (
    <Card className={classes.root}>
      <Row>
        <Col span={24}>
          <div className="icon">
            {isLoading ? (
              <Spin indicator={<LoadingOutlined className="loading-spinner" spin />} />
            ) : (
              <Icon type={icon} />
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title level={2} className="title">
            {title}
          </Title>
        </Col>
      </Row>
      {(contentRender || message) && (
        <Row>
          <Col span={24}>
            {contentRender ? (
              <>{contentRender}</>
            ) : (
              <Text strong type="secondary">
                {message}
              </Text>
            )}
          </Col>
        </Row>
      )}
      <Row className="confirmation-card-actions">
        {isCancelButtonAvailable && (
          <Col span={isSubmitButtonAvailable ? 12 : 24}>
            <Button onClick={onCancel} color="default" size="medium" disabled={isLoading} loading={isLoading}>
              {cancelText || CANCEL_TEXT}
            </Button>
          </Col>
        )}
        {isSubmitButtonAvailable && (
          <Col span={isCancelButtonAvailable ? 12 : 24}>
            <Button
              onClick={onConfirm}
              color={color}
              size="medium"
              disabled={isLoading}
              fullWidth={!isCancelButtonAvailable}
            >
              {confirmText || CONTINUE_TEXT}
            </Button>
          </Col>
        )}
      </Row>
    </Card>
  );
};

export default ConfirmationCard;
