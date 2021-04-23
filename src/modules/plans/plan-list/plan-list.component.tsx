import React, { FC, useContext, useEffect } from 'react';

import { useHistory, useLocation } from 'react-router';

import PlanCard from 'modules/plans/shared/components/plan-card/plan-card.component';
import { IPlanPayload } from 'modules/plans/shared/model';

import MasterList from 'shared/modules/master-list/master-list.component';
import { ModalContext } from 'shared/contexts';
import { DELETE_MODAL } from 'shared/constants';
import { useGetPlansQuery } from 'shared/generated/graphql-schema';

const PlanList: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const modalProvider = useContext(ModalContext);

  const redirectToPlans = () => {
    history.push('/plans');
  };

  const deletePlan = () => {};

  const displayDeleteConfirmation = () => {
    modalProvider.show({
      ...DELETE_MODAL,
      onConfirm: deletePlan,
      onCancel: redirectToPlans
    });
  };

  useEffect(() => {
    if (location.pathname.match('delete')) {
      displayDeleteConfirmation();
    }
  }, [location]);

  return <MasterList<IPlanPayload> title="Plans" render={PlanCard} useQuery={useGetPlansQuery} />;
};

export default PlanList;
