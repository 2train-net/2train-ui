import React, { FC } from 'react';

import { IMealPayload } from 'modules/meals/shared/model';

import { ListCard } from 'shared/modules';

import { IMasterComponent } from 'shared/modules/master-list/master-list.util';

interface IMealCard extends IMasterComponent<IMealPayload> {
  data: IMealPayload;
}

const MealCard: FC<IMealCard> = ({ data }) => {
  return <ListCard image={data.image} uuid={data.uuid} title={data.name} isDetailActionEnabled={false} />;
};

export default MealCard;
