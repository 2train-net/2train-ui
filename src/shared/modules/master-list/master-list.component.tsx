import React, { PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import _ from 'lodash';
import { debounce } from 'lodash';
import { useFormik } from 'formik';
import { Row, Col, PageHeader, Typography, Empty } from 'antd';

import { ADD, DELETE } from 'shared/routes';
import { OrderByArg } from 'shared/generated';
import { ModalContext } from 'shared/contexts';
import { useErrorHandler } from 'shared/hooks';
import { Button, Skeleton } from 'shared/modules';
import { Field, Select } from 'shared/modules/form';
import { CREATE_TEXT, SEARCH_TEXT, DELETE_MODAL, LOAD_MORE_TEXT, NO_DATA_TEXT, RELOAD_TEXT } from 'shared/constants';

import { IMasterList, Entity, ISearchForm, entriesPerPage, DEBOUNCE_SEARCH_TIMEOUT } from './master-list.util';

import useStyles from './master-list.style';

const { Text } = Typography;

const MasterList = <T, K = unknown>({
  title,
  render: Component,
  searchable = true,
  isCreateButtonAvailable = true,
  fetchPolicy = 'cache-and-network',
  useQuery,
  useDeleteMutation = () => [] as any,
}: PropsWithChildren<IMasterList<T, K>>) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const {
    params: { uuid },
  } = useRouteMatch<{ uuid: string }>();

  const modalProvider = useContext(ModalContext);

  const [firstTake] = entriesPerPage;

  const [skip, setSkip] = useState(0);
  const [filterSearch, setFilterSearch] = useState('');

  const order = { createdAt: OrderByArg.Desc };

  const [deleteEntity, deleteEntityPayload] = useDeleteMutation();

  const { values, setFieldValue, handleChange } = useFormik<ISearchForm>({
    onSubmit: () => {},
    initialValues: {
      search: '',
      take: firstTake?.value,
    },
  });

  const pageHeaderActions = [];
  const { take, search } = values;

  const {
    data = { payload: [] },
    loading,
    error: queryError,
    fetchMore,
    refetch,
  } = useQuery({
    fetchPolicy,
    variables: { take, order, skip: 0, search: filterSearch ? { value: filterSearch } : undefined },
  });

  const error = queryError || deleteEntityPayload?.error;
  const isEmpty = !data.payload.length && !loading;

  const headerName = typeof title === 'string' ? title : data.payload.length === 1 ? title[0] : title[1];

  useErrorHandler(error);

  const notifyFilterSearch = useCallback(debounce(setFilterSearch, DEBOUNCE_SEARCH_TIMEOUT), []);

  const loadMore = useCallback(async () => {
    const nextSkip = skip + take;

    await fetchMore({
      variables: {
        take,
        skip: nextSkip,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        if (!fetchMoreResult) return prev;

        return Object.assign({}, prev, {
          payload: [...prev.payload, ...fetchMoreResult.payload],
        });
      },
    });

    setSkip(nextSkip);
  }, [skip, take, setSkip]);

  const reload = useCallback(() => {
    refetch({ take, order, skip: 0 });
  }, [take, order, refetch]);

  const displayDeleteConfirmation = useCallback(() => {
    if (deleteEntity) {
      modalProvider.show({
        ...DELETE_MODAL,
        onCancel: history.goBack,
        onConfirm: async () => {
          await deleteEntity({
            variables: {
              where: { uuid },
            },
          });

          reload();

          history.goBack();
        },
      });
    }
  }, [uuid, modalProvider, deleteEntity]);

  useEffect(() => {
    const { pathname } = location;

    if (pathname.match(DELETE)) {
      displayDeleteConfirmation();
    }
  }, [location]);

  useEffect(() => {
    notifyFilterSearch.cancel();
    notifyFilterSearch(search);
  }, [search]);

  if (searchable) {
    pageHeaderActions.push(
      <Row key="search-bar" className="search-bar">
        <Col xs={8}>
          <Select name="take" setFieldValue={setFieldValue} options={entriesPerPage} value={take} />
        </Col>
        <Col xs={16}>
          <Field name="search" placeholder={SEARCH_TEXT} onChange={handleChange} value={search} clearable />
        </Col>
      </Row>
    );
  }

  if (isCreateButtonAvailable) {
    pageHeaderActions.push(
      <Link key="create-link" to={(location) => `${location.pathname}/${ADD}`}>
        <Button type="button" color="primary" size="small">
          {CREATE_TEXT}
        </Button>
      </Link>
    );
  }

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
