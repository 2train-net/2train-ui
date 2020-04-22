import React, { FC } from 'react';

import { Row, Col, Card, Empty } from 'antd';

interface IBodyPictures {
  bodyPictures: { title: string; url: string }[];
}

const BodyPictures: FC<IBodyPictures> = ({ bodyPictures }) => {
  return (
    <Row>
      <Col>
        <Card title="Body pictures" bordered={false}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {!!bodyPictures.length ? (
              bodyPictures.map(({ title, url }, index) => (
                <Card
                  key={`body-card-${index}`}
                  style={{ width: 240, marginRight: 24, textAlign: 'center' }}
                  hoverable
                  cover={<img alt={`body-${index}`} src={url} />}
                >
                  <Card.Meta title={title} />
                </Card>
              ))
            ) : (
              <Empty />
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default BodyPictures;
