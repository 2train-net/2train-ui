import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';

import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import { Row, Col, PageHeader, Typography, Empty } from 'antd';

import { ADD, DELETE } from 'shared/routes';
import { ModalContext } from 'shared/contexts';
import { useErrorHandler } from 'shared/hooks';
import { CREATE_TEXT, DELETE_MODAL, LOAD_MORE_TEXT, NO_DATA_TEXT, RELOAD_TEXT } from 'shared/constants';
import { Button, Skeleton } from 'shared/modules';
import { OrderByArg } from 'shared/generated';

import { IMasterList, Entity } from './master-list.util';

import useStyles from './master-list.style';

const { Text } = Typography;

const MasterList = <T,>({
  take = 10,
  fetchPolicy = 'cache-and-network',
  title,
  render: Component,
  isCreateButtonAvailable = true,
  useQuery,
  useDeleteMutation = () => [] as any
}: PropsWithChildren<IMasterList<T>>) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();

  const modalProvider = useContext(ModalContext);

  const [skip, setSkip] = useState(0);

  const order = { createdAt: OrderByArg.Desc };

  const [deleteEntity, deleteEntityPayload] = useDeleteMutation();

  const { data = { payload: [] }, loading, error: queryError, fetchMore, refetch } = useQuery({
    fetchPolicy,
    variables: { take, order, skip: 0 }
  });

  const error = queryError || deleteEntityPayload?.error;
  const isEmpty = !data.payload.length && !loading;

  const headerName = typeof title === 'string' ? title : data.payload.length === 1 ? title[0] : title[1];

  useErrorHandler(error);

  const loadMore = async () => {
    const nextSkip = skip + take;

    await fetchMore({
      variables: {
        take,
        skip: nextSkip
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          payload: [...prev.payload, ...fetchMoreResult.payload]
        });
      }
    });

    setSkip(nextSkip);
  };

  const reload = () => {
    refetch({ take, order, skip: 0 });
  };

  const displayDeleteConfirmation = () => {
    if (deleteEntity) {
      modalProvider.show({
        ...DELETE_MODAL,
        onCancel: history.goBack,
        onConfirm: async () => {
          await deleteEntity({
            variables: {
              where: { uuid }
            }
          });

          reload();

          history.goBack();
        }
      });
    }
  };

  const pageHeaderActions = [];

  if (isCreateButtonAvailable) {
    pageHeaderActions.push(
      <Link key="create-link" to={location => `${location.pathname}/${ADD}`}>
        <Button type="button" color="primary" size="small">
          {CREATE_TEXT}
        </Button>
      </Link>
    );
  }

  useEffect(() => {
    const { pathname } = location;

    if (pathname.match(DELETE)) {
      displayDeleteConfirmation();
    }
  }, [location]);

  return (
    <div className={`master-list ${classes.root}`}>
      <PageHeader ghost={false} title={`${data.payload.length} ${headerName}`} extra={pageHeaderActions} />

      <Row className="master-list-content" gutter={[24, 24]}>
        <Skeleton isLoading={loading} multiple={3} type="card" spaceBetween={3}>
          {!isEmpty ? (
            data?.payload?.map((data: Entity<T>) => (
              <Col key={data.uuid} sm={{ order: 24 }} md={{ order: 12 }} lg={{ order: 6 }}>
                <Component data={data} />
              </Col>
            ))
          ) : (
            <Empty
              description={
                <Text type="secondary" strong>
                  {NO_DATA_TEXT}
                </Text>
              }
              imageStyle={{ fill: 'white' }}
            >
              <Button onClick={reload}>{RELOAD_TEXT}</Button>
            </Empty>
          )}
        </Skeleton>
      </Row>

      {!isEmpty && (
        <Row className="master-list-loading">
          <Button type="button" onClick={loadMore} loading={loading}>
            {loading ? '' : LOAD_MORE_TEXT}
          </Button>
        </Row>
      )}
    </div>
  );
};

export default MasterList;
