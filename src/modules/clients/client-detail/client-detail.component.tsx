import React, { FC, useEffect } from 'react';

import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';

import { Row, Col, Card } from 'antd';

import { ProfileDetail } from 'modules/profile/profile.module';

import { DETAIL, NOT_FOUND, PLANS } from 'shared/routes';
import { ItemListTab, Message } from 'shared/modules';
import { UserService, DateService } from 'shared/services';
import {
  BIRTHDAY_TEXT,
  DEFAULT_DATE_FORMAT,
  EMAIL_TEXT,
  GENDER_TEXT,
  DEFAULT_SERVER_DATE_FORMAT,
  PHONE_TEXT,
  PLANS_TEXT
} from 'shared/constants';
import { useGetClientQuery } from 'shared/generated';

import useStyles from './client-detail.style';

const ClientDetail: FC = () => {
  const classes = useStyles();
  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const history = useHistory();

  const { data, loading, error } = useGetClientQuery({
    variables: {
      where: {
        uuid
      }
    }
  });

  const redirect = history.push;
  const client = data?.payload;
  const notFound = !data?.payload && !loading;

  useEffect(() => {
    if (error) {
      Message.error(error.graphQLErrors[0].message);
    }
  }, [error]);

  return notFound ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <Row gutter={24} className={classes.root}>
      <Col xs={24} md={8}>
        <ProfileDetail
          data={client}
          isLoading={loading}
          avatar={client?.avatar}
          title={client ? `${client.firstName} ${client.lastName}` : ''}
          description={client ? `@${client.username}` : ''}
          itemList={[
            { key: 'email', label: EMAIL_TEXT },
            { key: 'phone', label: PHONE_TEXT },
            {
              key: 'birthday',
              label: BIRTHDAY_TEXT,
              formatter: date => DateService.format(date)
            },
            {
              key: 'gender',
              label: GENDER_TEXT,
              formatter: UserService.parseGender
            }
          ]}
        />
      </Col>
      <Col xs={24} md={16}>
        <Card style={{ height: '100%' }} bodyStyle={{ paddingLeft: 0 }}>
          <ItemListTab
            tabs={[PLANS_TEXT]}
            itemList={data?.payload.plans.map(({ uuid, name, startAt, expireAt }) => ({
              key: uuid,
              title: name,
              description: `
              ${DateService.format(startAt, DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT)} -
              ${DateService.format(expireAt, DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT)}
            `,
              onDetail: () => redirect(`${PLANS}/${DETAIL}/${uuid}`)
            }))}
            tabBarStyle={{ paddingLeft: 24, paddingRight: 24 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default ClientDetail;
