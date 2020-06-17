import React, { FC, useContext, useMemo, useEffect } from 'react';

import { Card, Row, Col, Collapse, message } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

import GymProfileForm from './components/gym-profile-form/gym-profile-form.component';
import { GymProfile as GymProfileModel } from 'modules/profile/shared/model/gym-profile.model';

import { AuthContext } from 'shared/contexts';
import { useGymProfileQuery } from 'shared/generated/graphql-schema';

import userStyles from './gym-profile.style';

const GymProfile: FC = () => {
  const classes = userStyles();
  const { user } = useContext(AuthContext);
  const { data, loading, refetch } = useGymProfileQuery({
    variables: { where: { uuid: user ? user.uuid : undefined } }
  });

  useEffect(() => {
    if (loading) {
      message.loading('Cargando datos del perfil...');
    }
  }, []);

  const gymProfile = useMemo(() => {
    return new GymProfileModel(data && data.user.gym);
  }, [data && data.user.gym]);

  return (
    <div className={classes.root}>
      <GymProfileForm gymProfile={gymProfile} refreshGym={refetch} />
      <Row style={{ marginTop: 16, marginBottom: 16 }}>
        <Col>
          <Collapse defaultActiveKey={['1']} onChange={console.log}>
            <Collapse.Panel header="Factura Electrónica" key="1">
              <p>Hello</p>
            </Collapse.Panel>
          </Collapse>
        </Col>
      </Row>
      <Row style={{ marginTop: 16, marginBottom: 16 }}>
        <Col>
          <Collapse defaultActiveKey={['1']} onChange={console.log}>
            <Collapse.Panel header="Página Web" key="1">
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
    </div>
  );
};

export default GymProfile;
