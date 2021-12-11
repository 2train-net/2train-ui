import React, { FC, useContext, useEffect, useState } from 'react';

import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';

import { Card, Col, PageHeader, Row, Statistic } from 'antd';

import {
  HEIGHT_TEXT,
  WEIGHT_TEXT,
  HEIGHT_MEASURE_TEXT,
  WEIGHT_MEASURE_TEXT
} from 'modules/body-measures/body-measures.module';

import { Button } from 'shared/modules';
import { DateService } from 'shared/services';
import { AuthContext } from 'shared/contexts';
import {
  DATE_TEXT,
  BODY_MEASURE_TEXT,
  BODY_MEASURES_TEXT,
  CREATE_TEXT,
  DEFAULT_DATE_FORMAT,
  DEFAULT_SERVER_DATE_FORMAT,
  LOOK_IMAGES_TEXT,
  HIDE_IMAGES_TEXT
} from 'shared/constants';
import { NOT_FOUND, UUID_PARAM, PLAN_DETAIL, BODY_MEASURE_ADD_BY_PLAN } from 'shared/routes';
import { useGetPlanBodyMeasuresQuery, UserType } from 'shared/generated';

import useStyles from './body-measure-list.style';

export interface IBodyMeasurePayload {
  uuid: string;
  height: number;
  weight: number;
  frontBodyImage?: string | null;
  backBodyImage?: string | null;
  rightSideBodyImage?: string | null;
  leftSideBodyImage?: string | null;
}

const BodyMeasureList: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const [bodyMeasuresToggle, setBodyMeasuresToggle] = useState<{ [key: string]: boolean }>({});

  const redirect = history.push;
  const [, planSearch = ''] = location.search.split('&');
  const [, uuid] = planSearch.split('=');

  const pageHeaderActions =
    user?.type === UserType.Customer
      ? [
          <Link key="create-link" to={BODY_MEASURE_ADD_BY_PLAN.replace(UUID_PARAM, uuid)}>
            <Button type="button" color="primary" size="small">
              {CREATE_TEXT}
            </Button>
          </Link>
        ]
      : [];

  const { data } = useGetPlanBodyMeasuresQuery({
    variables: {
      where: {
        plan: {
          uuid
        }
      }
    }
  });

  useEffect(() => {
    setBodyMeasuresToggle(
      data?.payload?.reduce(
        (previous, { uuid }) => ({
          ...previous,
          [uuid]: false
        }),
        {}
      ) || {}
    );
  }, [data?.payload]);

  const toggleBodyImages = (uuid: string, isBodyImagesToggled: boolean) => {
    setBodyMeasuresToggle({ ...bodyMeasuresToggle, [uuid]: isBodyImagesToggled });
  };

  return planSearch && uuid ? (
    <div className={classes.root}>
      <PageHeader
        ghost={false}
        title={`${data?.payload.length || 0} ${data?.payload.length === 1 ? BODY_MEASURE_TEXT : BODY_MEASURES_TEXT}`}
        extra={pageHeaderActions}
        onBack={() => redirect(PLAN_DETAIL.replace(UUID_PARAM, uuid))}
      />

      <div className="content">
        {data?.payload.map((bodyMeasure, i) => {
          const {
            uuid,
            weight,
            height,
            frontBodyImage,
            backBodyImage,
            rightSideBodyImage,
            leftSideBodyImage,
            createdAt
          } = bodyMeasure;
          const bodyImages = [frontBodyImage, backBodyImage, rightSideBodyImage, leftSideBodyImage];
          const isBodyImagesToggled = bodyMeasuresToggle[uuid];

          return (
            <Card key={uuid} className="body-measure-container">
              <Row className="body-measures-info">
                <Col span={8}>
                  <Statistic
                    title={DATE_TEXT}
                    value={DateService.format(createdAt, DEFAULT_DATE_FORMAT, DEFAULT_SERVER_DATE_FORMAT)}
                  />
                </Col>
                <Col span={8}>
                  <Statistic title={HEIGHT_TEXT} value={`${height}${HEIGHT_MEASURE_TEXT}`} />
                </Col>
                <Col span={8}>
                  <Statistic title={WEIGHT_TEXT} value={`${weight}${WEIGHT_MEASURE_TEXT}`} />
                </Col>
              </Row>

              {isBodyImagesToggled && (
                <Row gutter={24} className="body-pictures">
                  {bodyImages.map((imageUrl, j) => (
                    <Col key={`col-${i}-${j}`} xs={24} md={12} lg={6} className="body-picture-column">
                      {imageUrl && <img src={imageUrl} />}
                    </Col>
                  ))}
                </Row>
              )}

              <a onClick={() => toggleBodyImages(uuid, !isBodyImagesToggled)}>
                {!isBodyImagesToggled ? LOOK_IMAGES_TEXT : HIDE_IMAGES_TEXT}
              </a>
            </Card>
          );
        })}
      </div>
    </div>
  ) : (
    <Redirect to={NOT_FOUND} />
  );
};

export default BodyMeasureList;
