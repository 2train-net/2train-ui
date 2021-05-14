import React, { FC, useEffect } from 'react';

import { Redirect } from 'react-router';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Col, PageHeader, Row } from 'antd';

import { CLIENTS, DETAIL, NOT_FOUND } from 'shared/routes';
import { Avatar, IconCard, InfoItem, Message } from 'shared/modules';
import { UserService } from 'shared/services';
import { useGetPlanDetailQuery } from 'shared/generated';

import { format } from './plan-detail.util';

import useStyles from './plan-detail.style';

const PlanDetail: FC = () => {
  const classes = useStyles();

  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();
  const history = useHistory();

  const where = { uuid };
  const redirect = history.push;

  const { data, loading, error } = useGetPlanDetailQuery({
    variables: {
      where
    }
  });

  const plan = data?.payload;
  const notFound = !plan && !loading;

  const { info, owner, members, iconCards } = format(plan);

  useEffect(() => {
    if (error) {
      Message.error(error.graphQLErrors[0].message);
    }
  }, [error]);

  // TODO ADD THE SECTION TAG TO ALL OTHER MAIN MODULES LIKE WE ARE DOING IN HERE
  return notFound || plan?.scope === 'PUBLIC' ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <section className={classes.root}>
      <PageHeader
        ghost={false}
        onBack={owner ? () => redirect(`${CLIENTS}/${DETAIL}/${owner.uuid}`) : undefined}
        title={owner ? `${owner.firstName} ${owner.lastName}` : ''}
        subTitle={plan?.name || ''}
      >
        <Row gutter={16}>
          <Col xs={24} md={9}>
            <InfoItem
              label={plan ? 'Paticipantes' : ''}
              valueRender={() => (
                <>
                  {members &&
                    members.map(({ uuid, avatar, firstName, lastName }) => (
                      <Avatar
                        size="default"
                        key={uuid}
                        url={avatar}
                        letter={UserService.getAvatarLetters(firstName, lastName)}
                      />
                    ))}
                </>
              )}
            />
          </Col>

          {info.map(({ col, items }, i) => (
            <Col key={`info-col-${i}`} className="info-col" {...col}>
              {items.map((info, j) => (
                <InfoItem key={`info-item-${i}-${j}`} {...info} />
              ))}
            </Col>
          ))}
        </Row>
      </PageHeader>

      <Row gutter={24} justify="center" align="middle">
        {iconCards.map(({ url, ...iconCard }, index) => (
          <Col className="icon-card-col" key={`icon-card-col-${index}`} xs={24} sm={12} md={8} lg={6}>
            <IconCard {...iconCard} onClick={plan ? () => redirect(url || NOT_FOUND) : undefined} isDisabled={!url} />
          </Col>
        ))}
      </Row>
    </section>
  );
};

export default PlanDetail;
