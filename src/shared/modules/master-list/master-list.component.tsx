import React, { PropsWithChildren, useState } from 'react';

import { Row, Col } from 'antd';

import Button from 'shared/modules/button/button.component';

import { IMasterList, Entity } from './master-list.util';

import useStyles from './master-list.style';

const MasterList = <T,>({
  take = 10,
  fetchPolicy = 'cache-and-network',
  render: Component,
  useQuery
}: PropsWithChildren<IMasterList<T>>) => {
  const classes = useStyles();

  const [skip, setSkip] = useState(0);

  const { data = { payload: [] }, loading, error, fetchMore } = useQuery({
    fetchPolicy,
    variables: { take, skip: 0 }
  });

  const loadMore = async () => {
    const nextSkip = skip + take;

    await fetchMore({
      variables: {
        take,
        skip: nextSkip
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          payload: [...prev.payload, ...fetchMoreResult.payload]
        });
      }
    });

    setSkip(nextSkip);
  };

  return (
    <div className={`master-list ${classes.root}`}>
      <Row className="master-list-content" gutter={[24, 24]}>
        {data.payload.map((data: Entity<T>) => (
          <Col sm={{ order: 24 }} md={{ order: 12 }} lg={{ order: 6 }}>
            <Component data={data} key={data.uuid} />
          </Col>
        ))}
      </Row>
      <Row className="master-list-loading">
        <Button type="button" onClick={loadMore} loading={loading}>
          {loading ? '' : 'Load more'}
        </Button>
      </Row>
    </div>
  );
};

export default MasterList;
