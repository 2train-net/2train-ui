import React, { FC } from 'react';

import { Card, Typography, Row, Col } from 'antd';

import Button, { ButtonColor } from 'shared/modules/button/button.component';

import useStyles from './confirmation-card.style';

const { Title, Text } = Typography;

interface IConfirmationCard {
  title: string;
  message?: string;
  Icon: FC;
  onConfirm: () => unknown;
  onCancel?: () => unknown;
  color?: ButtonColor;
}

const ConfirmationCard: FC<IConfirmationCard> = ({ title, Icon, message, onConfirm, onCancel, color = 'default' }) => {
  const classes = useStyles({ color });

  return (
    <Card className={classes.root}>
      <Row>
        <Col span={24}>
          <div className="icon">
            <Icon />
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
      <Row>
        <Col span={24}>
          <Text strong type="secondary">
            {message}
          </Text>
        </Col>
      </Row>
      <Row>
        {onCancel && (
          <Col span={12}>
            <Button onClick={onCancel} color="default" size="medium">
              Cancel
            </Button>
          </Col>
        )}
        <Col span={onCancel ? 12 : 24}>
          <Button onClick={onConfirm} color={color} size="medium">
            Continue
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default ConfirmationCard;
