import React, { FC } from 'react';

import PlanCard from 'modules/plans/shared/components/plan-card/plan-card.component';

import MasterList from 'shared/modules/master-list/master-list.component';

import { IPlanPayload } from 'modules/plans/shared/model';

import { useGetPlansQuery } from 'shared/generated/graphql-schema';

const PlanList: FC = () => {
  return <MasterList<IPlanPayload> title="Plans" render={PlanCard} useQuery={useGetPlansQuery} />;
};

export default PlanList;
