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
  filters = [],
  render: Component,
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

  const [firstFilter] = filters;
  const [firstTake] = entriesPerPage;

  const [skip, setSkip] = useState(0);
  const [filterSearch, setFilterSearch] = useState('');

  const order = { createdAt: OrderByArg.Desc };

  const [deleteEntity, deleteEntityPayload] = useDeleteMutation();

  const { values, setFieldValue, handleChange } = useFormik<ISearchForm<K>>({
    onSubmit: () => {},
    initialValues: {
      search: '',
      take: firstTake?.value,
      filter: firstFilter?.value,
    },
  });

  const { take, filter, search } = values;

  // TODO CURRENTLY WE ONLY SUPPORT STRING TYPE FILTERING, DOUBLE CHECK API REQUEST ARGS NOT USE OTHER TYPE LIKE INT OR BOOLEAN

  const where = _.set<K>({}, filter, filterSearch);

  const {
    data = { payload: [] },
    loading,
    error: queryError,
    fetchMore,
    refetch,
  } = useQuery({
    fetchPolicy,
    variables: { take, order, skip: 0, where: filterSearch ? where : undefined },
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
              where: { uuid },
            },
          });

          reload();

          history.goBack();
        },
      });
    }
  };

  const pageHeaderActions = [];

  const notifyFilterSearch = useCallback(debounce(setFilterSearch, DEBOUNCE_SEARCH_TIMEOUT), []);

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

  if (filters.length) {
    pageHeaderActions.push(
      <Row className="search-bar">
        <Col xs={8} md={5}>
          <Select name="take" setFieldValue={setFieldValue} options={entriesPerPage} value={take} />
        </Col>
        <Col xs={16} md={9}>
          <Select name="filter" setFieldValue={setFieldValue} options={filters} value={filter} />
        </Col>
        <Col xs={24} md={10}>
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
