import React, { PropsWithChildren, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Row, Col, PageHeader, Typography, Empty } from 'antd';

import { ADD } from 'shared/routes';
import { Button, Message, Skeleton } from 'shared/modules';

import { IMasterList, Entity } from './master-list.util';

import useStyles from './master-list.style';

const { Text } = Typography;

const MasterList = <T,>({
  take = 10,
  fetchPolicy = 'cache-and-network',
  title,
  render: Component,
  isCreateButtonAvailable = true,
  useQuery
}: PropsWithChildren<IMasterList<T>>) => {
  const classes = useStyles();

  const [skip, setSkip] = useState(0);

  const { data = { payload: [] }, loading, error, fetchMore, refetch } = useQuery({
    fetchPolicy,
    variables: { take, skip: 0 }
  });

  const isEmpty = !data.payload.length && !loading;

  const headerName = typeof title === 'string' ? title : data.payload.length === 1 ? title[0] : title[1];

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

  const reload = () => {
    refetch({ take, skip: 0 });
  };

  const pageHeaderActions = [];

  if (isCreateButtonAvailable) {
    pageHeaderActions.push(
      <Link key="create-link" to={location => `${location.pathname}/${ADD}`}>
        <Button type="button" color="primary" size="small">
          Create
        </Button>
      </Link>
    );
  }

  useEffect(() => {
    if (error) {
      Message.error(error.graphQLErrors[0].message);
    }
  }, [error]);

  return (
    <div className={`master-list ${classes.root}`}>
      <PageHeader ghost={false} title={`${data.payload.length} ${headerName}`} extra={pageHeaderActions} />

      <Row className="master-list-content" gutter={[24, 24]}>
        <Skeleton isLoading={loading} multiple={3} type="card" spaceBetween={3}>
          {!isEmpty ? (
            data.payload.map((data: Entity<T>) => (
              <Col key={data.uuid} sm={{ order: 24 }} md={{ order: 12 }} lg={{ order: 6 }}>
                <Component data={data} />
              </Col>
            ))
          ) : (
            <Empty
              description={
                <Text type="secondary" strong>
                  Sin datos
                </Text>
              }
              imageStyle={{ fill: 'white' }}
            >
              <Button onClick={reload}>Recargar</Button>
            </Empty>
          )}
        </Skeleton>
      </Row>

      {!isEmpty && (
        <Row className="master-list-loading">
          <Button type="button" onClick={loadMore} loading={loading}>
            {loading ? '' : 'Load more'}
          </Button>
        </Row>
      )}
    </div>
  );
};

export default MasterList;
