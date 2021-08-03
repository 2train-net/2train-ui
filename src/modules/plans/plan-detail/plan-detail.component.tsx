import React, { FC, useContext, useEffect, useRef, useState } from 'react';

import { Redirect } from 'react-router';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import { Card, Col, PageHeader, Row, Tooltip } from 'antd';

import { RENEW_PLAN_TEXT, PLAN_MEMBERS_TEXT } from 'modules/plans/plans.module';

import { getIsMobile } from 'shared/util';
import { AuthContext } from 'shared/contexts';
import { DateService, UserService } from 'shared/services';
import { UUID_PARAM, CLIENT_DETAIL, NOT_FOUND, PLANS, PROFILE } from 'shared/routes';
import { PlanStatus, useGetPlanDetailQuery, UserType } from 'shared/generated';
import { Avatar, Button, IconCard, InfoItem, ListItem, Message, Skeleton } from 'shared/modules';

import { format } from './plan-detail.util';

import useStyles from './plan-detail.style';

const PlanDetail: FC = () => {
  const classes = useStyles();

  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();
  const history = useHistory();

  const { user } = useContext(AuthContext);

  const where = { uuid };
  const redirect = history.push;

  const { data, loading, error } = useGetPlanDetailQuery({
    variables: {
      where
    }
  });

  const [isMobile, _setIsMobile] = useState(getIsMobile());

  const isMobileRef = useRef(isMobile);

  const plan = data?.payload;
  const notFound = !plan && !loading;

  const { info, owner, members, iconCards } = format(user?.type, plan);

  const planActions = [];
  const today = new Date();
  const isActivePlan = plan?.status === PlanStatus.Active;
  const pendingDays = plan && isActivePlan && DateService.difference(plan.expireAt, today, 'days');
  const isRenovateButtonEnabled = pendingDays ? pendingDays <= 5 : false;

  const onBackUrl =
    owner && user?.type === UserType.PersonalTrainer ? CLIENT_DETAIL.replace(UUID_PARAM, owner.uuid) : PLANS;
  const onProfileUrl =
    owner && user?.type === UserType.PersonalTrainer ? CLIENT_DETAIL.replace(UUID_PARAM, owner.uuid) : PROFILE;

  const setIsMobile = (value: boolean) => {
    isMobileRef.current = value;
    _setIsMobile(value);
  };

  const handleResize = () => {
    const isMobileMatch = getIsMobile();

    if ((!isMobileRef.current && isMobileMatch) || (isMobileRef.current && !isMobileMatch)) {
      setIsMobile(isMobileMatch);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize, false);
    };
  }, []);

  useEffect(() => {
    if (error) {
      Message.error(error.graphQLErrors[0].message);
    }
  }, [error]);

  const ownerFullName = owner && (
    <Skeleton isLoading={loading} type="input" size="small">
      <Link to={onProfileUrl} className="client-name-link">{`${owner?.firstName} ${owner?.lastName}`}</Link>
    </Skeleton>
  );

  if (isRenovateButtonEnabled) {
    planActions.push(
      <Button key="renew" size="small">
        {RENEW_PLAN_TEXT}
      </Button>
    );
  }

  return notFound || plan?.scope === 'PUBLIC' ? (
    <Redirect to={NOT_FOUND} />
  ) : (
    <div className={classes.root}>
      <PageHeader
        ghost={false}
        onBack={owner ? () => redirect(onBackUrl) : undefined}
        title={ownerFullName}
        subTitle={plan?.name}
        extra={planActions}
      >
        <Row gutter={16}>
          <Col xs={24} md={9}>
            <InfoItem
              label={PLAN_MEMBERS_TEXT}
              valueRender={() => (
                <Skeleton isLoading={loading} type="avatar" multiple={3}>
                  {members &&
                    members.map(({ uuid, avatar, firstName, lastName }) => (
                      <Tooltip
                        key={uuid}
                        className="avatar-tooltip"
                        placement="bottom"
                        title={`${firstName} ${lastName}`}
                      >
                        <Avatar
                          size="default"
                          url={avatar}
                          letter={UserService.getAvatarLetters(firstName, lastName)}
                        />
                      </Tooltip>
                    ))}
                </Skeleton>
              )}
            />
          </Col>

          {info.map(({ col, items }, i) => (
            <Col key={`info-col-${i}`} className="info-col" {...col}>
              {items.map((info, j) => (
                <InfoItem key={`info-item-${i}-${j}`} {...info} isLoading={loading} />
              ))}
            </Col>
          ))}
        </Row>
      </PageHeader>

      {!isMobileRef.current ? (
        <Row className="icon-cards" gutter={24} justify="center" align="middle">
          {iconCards.map(({ url, ...iconCard }, index) => (
            <Col className="icon-card-col" key={`icon-card-col-${index}`} xs={24} sm={12} md={8} lg={6}>
              <IconCard {...iconCard} onClick={plan ? () => redirect(url || NOT_FOUND) : undefined} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card
          className="list-items"
          style={{ height: '100%', marginTop: 24 }}
          bodyStyle={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
        >
          {iconCards.map(({ url, ...iconCard }, index) => (
            <Col key={`icon-card-col-${index}`}>
              <ListItem
                icon={iconCard.icon}
                title={iconCard.title}
                isDetailActionEnabled
                isDetailButtonDisabled={iconCard.isDisabled}
                onDetail={plan ? () => redirect(url || NOT_FOUND) : undefined}
              />
            </Col>
          ))}
        </Card>
      )}
    </div>
  );
};

export default PlanDetail;
