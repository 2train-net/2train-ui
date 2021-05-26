import React, { PropsWithChildren, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Row, Col, PageHeader } from 'antd';

import { ADD } from 'shared/routes';
import { Button, Message, Skeleton } from 'shared/modules';

import { IMasterList, Entity } from './master-list.util';

import useStyles from './master-list.style';

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
      <PageHeader ghost={false} title={`${data.payload.length} ${title}`} extra={pageHeaderActions} />

      <Row className="master-list-content" gutter={[24, 24]}>
        <Skeleton isLoading={loading} multiple={3} type="card" spaceBetween={3}>
          {data.payload.map((data: Entity<T>) => (
            <Col key={data.uuid} sm={{ order: 24 }} md={{ order: 12 }} lg={{ order: 6 }}>
              <Component data={data} />
            </Col>
          ))}
        </Skeleton>
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
