import React, { FC, useContext, useEffect, useRef, useState } from 'react';

import { Redirect } from 'react-router';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';

import { Card, Col, PageHeader, Row, Tooltip } from 'antd';

import {
  RENEW_PLAN_TEXT,
  PLAN_MEMBERS_TEXT,
  PLAN_RENOVATION_MODAL,
  PLAN_RENOVATION_SUCCESSFULLY,
  PlanPurchaseForm,
  IPlanPurchaseFormValues
} from 'modules/plans/plans.module';

import { getIsMobile } from 'shared/util';
import { useErrorHandler } from 'shared/hooks';
import { AuthContext, ModalContext } from 'shared/contexts';
import { DateService, UserService } from 'shared/services';
import { UUID_PARAM, CLIENT_DETAIL, NOT_FOUND, PLANS, PROFILE, PLAN_DETAIL } from 'shared/routes';
import { PlanStatus, UserType, useGetPlanDetailQuery, useRenovatePlanMutation } from 'shared/generated';
import { Avatar, Button, IconCard, InfoItem, ListItem, Message, Skeleton } from 'shared/modules';

import { format } from './plan-detail.util';

import useStyles from './plan-detail.style';

const RENOVATION_COUNTDOWN_DAYS = 5;

const PlanDetail: FC = () => {
  const classes = useStyles();

  const {
    params: { uuid }
  } = useRouteMatch<{ uuid: string }>();
  const history = useHistory();

  const { user } = useContext(AuthContext);
  const modalProvider = useContext(ModalContext);

  const where = { uuid };
  const redirect = history.push;

  const [renovatePlan, renovatePlanPayload] = useRenovatePlanMutation();

  const { data, loading, error } = useGetPlanDetailQuery({
    variables: {
      where
    }
  });

  useErrorHandler(error);

  const [isMobile, _setIsMobile] = useState(getIsMobile());

  const isMobileRef = useRef(isMobile);
  const planPurchaseFormRef = useRef<HTMLFormElement>(null);

  const plan = data?.payload;
  const notFound = !plan && !loading;

  const { info, owner, members, iconCards, isClient } = format(user?.type, plan);

  const planActions = [];
  const today = new Date();
  const pendingExpireDays = plan && DateService.difference(plan.expireAt, today, 'days');
  const isRenovateButtonEnabled =
    isClient &&
    plan?.purchasePlan?.status === PlanStatus.Active &&
    pendingExpireDays &&
    pendingExpireDays <= RENOVATION_COUNTDOWN_DAYS;

  const onBackUrl =
    owner && user?.type === UserType.PersonalTrainer ? CLIENT_DETAIL.replace(UUID_PARAM, owner.uuid) : PLANS;
  const onProfileUrl =
    owner && user?.type === UserType.PersonalTrainer ? CLIENT_DETAIL.replace(UUID_PARAM, owner.uuid) : PROFILE;

  const setIsMobile = (value: boolean) => {
    isMobileRef.current = value;
    _setIsMobile(value);
  };

  const redirectTo = (url: string, isNewTabRedirection: boolean) => {
    return isNewTabRedirection ? window.open(url, '_blank') : redirect(url);
  };

  const handleResize = () => {
    const isMobileMatch = getIsMobile();

    if ((!isMobileRef.current && isMobileMatch) || (isMobileRef.current && !isMobileMatch)) {
      setIsMobile(isMobileMatch);
    }
  };

  const confirmPurchasePlan = async () => {
    planPurchaseFormRef?.current?.dispatchEvent(new Event('submit'));
  };

  const redirectToPlanDetail = (uuid: string) => {
    redirect(PLAN_DETAIL.replace(UUID_PARAM, uuid));
  };

  const handlePlanRenovation = () => {
    if (plan) {
      modalProvider.show({
        ...PLAN_RENOVATION_MODAL,
        isLoading: false,
        title: plan.name,
        contentRender: (
          <PlanPurchaseForm
            plan={plan}
            formRef={planPurchaseFormRef}
            onSubmit={onPlanPurchaseSubmit}
            currentActivePlan={user?.currentActivePlan}
          />
        ),
        message: `
          ${plan.currency} ${plan.price} |
          ${plan.intervalCount} ${plan.intervalPlan}
        `,
        onConfirm: confirmPurchasePlan,
        onCancel: () => {}
      });
    }
  };

  const onPlanPurchaseSubmit = async ({ startAt }: IPlanPurchaseFormValues) => {
    try {
      const newPlan = await renovatePlan({
        variables: {
          data: {
            startAt
          },
          where: {
            uuid: plan?.uuid
          }
        }
      });

      const { uuid } = newPlan?.data?.payload || {};

      Message.success(PLAN_RENOVATION_SUCCESSFULLY);

      modalProvider.close();

      uuid && redirectToPlanDetail(uuid);
    } catch (error) {}
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize, false);
    return () => {
      window.removeEventListener('resize', handleResize, false);
    };
  }, []);

  const ownerFullName = owner && (
    <Skeleton isLoading={loading} type="input" size="small">
      <Link to={onProfileUrl} className="client-name-link">{`${owner?.firstName} ${owner?.lastName}`}</Link>
    </Skeleton>
  );

  if (isRenovateButtonEnabled) {
    planActions.push(
      <Button key="renew" size="small" onClick={handlePlanRenovation}>
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
          {iconCards.map(({ url, isNewTabRedirection, ...iconCard }, index) => (
            <Col className="icon-card-col" key={`icon-card-col-${index}`} xs={24} sm={12} md={8} lg={6}>
              <IconCard
                {...iconCard}
                onClick={
                  plan && !iconCard.isDisabled ? () => redirectTo(url || NOT_FOUND, isNewTabRedirection) : undefined
                }
              />
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
