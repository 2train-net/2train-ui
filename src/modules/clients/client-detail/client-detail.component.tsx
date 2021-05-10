import React, { FC } from 'react';

import { useHistory, useRouteMatch } from 'react-router-dom';

import { Row, Col, Card } from 'antd';

import { ProfileDetail } from 'modules/profile/profile.module';

import { DETAIL, PLANS } from 'shared/routes';
import { ItemListTab } from 'shared/modules';
import { UserService, DateService } from 'shared/services';
import { useGetClientQuery } from 'shared/generated';

const ClientDetail: FC = () => {
  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const history = useHistory();
  // TODO ADD ERROR HANDLER AND LOADING TOAST
  const { data, loading, error } = useGetClientQuery({
    variables: {
      where: {
        uuid
      }
    }
  });

  const redirect = history.push;
  const client = data?.payload;

  return (
    <>
      <Row gutter={24}>
        <Col xs={24} md={8}>
          <ProfileDetail
            data={client}
            avatar={client?.avatar}
            title={`${client?.firstName} ${client?.lastName}`}
            description={`@${client?.username}`}
            itemList={[
              { key: 'email', label: 'Correo eléctronico' },
              { key: 'phone', label: 'Numero telefónico' },
              {
                key: 'birthday',
                label: 'Fecha de nacimiento',
                formatter: date => DateService.format(date, 'DD-MM-YYYY')
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
              itemList={data?.payload.plans.map(({ uuid, name, createdAt, finishedAt }) => ({
                key: uuid,
                title: name,
                description: `
                ${DateService.format(createdAt, 'DD-MM-YYYY')} -
                ${DateService.format(finishedAt, 'DD-MM-YYYY')}
              `,
                onDetail: () => redirect(`${PLANS}/${DETAIL}/${uuid}`)
              }))}
              tabBarStyle={{ paddingLeft: 24, paddingRight: 24 }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ClientDetail;
