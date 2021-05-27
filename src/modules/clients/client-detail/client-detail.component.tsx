import React, { FC, useEffect } from 'react';

import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';

import { Row, Col, Card } from 'antd';

import { ProfileDetail } from 'modules/profile/profile.module';

import { DETAIL, NOT_FOUND, PLANS } from 'shared/routes';
import { ItemListTab, Message } from 'shared/modules';
import { UserService, DateService } from 'shared/services';
import { DEFAULT_DATE_FORMAT, ISO } from 'shared/constants';
import { useGetClientQuery } from 'shared/generated';

const ClientDetail: FC = () => {
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
    <Row gutter={24}>
      <Col xs={24} md={8}>
        <ProfileDetail
          data={client}
          avatar={client?.avatar}
          title={client ? `${client.firstName} ${client.lastName}` : ''}
          description={client ? `@${client.username}` : ''}
          itemList={[
            { key: 'email', label: 'Correo eléctronico' },
            { key: 'phone', label: 'Numero telefónico' },
            {
              key: 'birthday',
              label: 'Fecha de nacimiento',
              formatter: date => DateService.format(date)
            },
            {
              key: 'gender',
              label: 'Género',
              formatter: UserService.parseGender
            }
          ]}
        />
      </Col>
      <Col xs={24} md={16}>
        <Card style={{ height: '100%' }} bodyStyle={{ paddingLeft: 0 }}>
          <ItemListTab
            tabs={['Plans']}
            itemList={data?.payload.plans.map(({ uuid, name, startAt, expireAt }) => ({
              key: uuid,
              title: name,
              description: `
              ${DateService.format(startAt, DEFAULT_DATE_FORMAT, ISO)} -
              ${DateService.format(expireAt, DEFAULT_DATE_FORMAT, ISO)}
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
