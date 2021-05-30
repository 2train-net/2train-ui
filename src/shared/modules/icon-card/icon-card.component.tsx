import React, { FC } from 'react';

import { Card, Typography } from 'antd';

import { Button } from 'shared/modules';
import Icon, { IconType } from 'shared/modules/icon/icon.component';

import useStyles from './icon-card.style';

export interface IIconCard {
  title: string;
  icon: IconType;
  buttonText: string;
  style?: React.CSSProperties;
  isDisabled?: boolean;
  onClick?: () => any;
}

const { Title } = Typography;

const IconCard: FC<IIconCard> = ({ title, icon, buttonText, isDisabled = false, style, onClick }) => {
  const classes = useStyles();

  return (
    <Card className={`icon-card ${classes.root}`} style={style}>
      <div>
        <Icon type={icon} className="icon" />
        <Title level={5} className="title">
          {title}
        </Title>
      </div>
      <Button fullWidth size="medium" color="secondary" onClick={onClick} disabled={isDisabled}>
        {buttonText}
      </Button>
    </Card>
  );
};

export default IconCard;
