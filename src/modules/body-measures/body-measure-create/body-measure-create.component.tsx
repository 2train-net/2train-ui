import React, { FC, useEffect } from 'react';

import { Redirect, useHistory, useLocation } from 'react-router-dom';

import { IBodyMeasureFormValues, BodyMeasureForm } from 'modules/body-measures/body-measures.module';

import { FormId } from 'shared/model';
import { Button, FormPage, Message } from 'shared/modules';
import { BODY_MEASURES_TEXT, SAVE_TEXT } from 'shared/constants';
import { NOT_FOUND, UUID_PARAM, BODY_MEASURES_BY_PLAN } from 'shared/routes';
import { GetPlanBodyMeasuresDocument, GetPlanBodyMeasuresQuery, useCreateBodyMeasureMutation } from 'shared/generated';

import useStyles from './body-measure-create.style';

const BodyMeasureCreate: FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const redirect = history.push;
  const [, planSearch = ''] = location.search.split('&');
  const [, uuid] = planSearch.split('=');

  const [createBodyMeasure, { loading, error }] = useCreateBodyMeasureMutation();

  const onSubmit = async (values: IBodyMeasureFormValues) => {
    try {
      if (!loading) {
        await createBodyMeasure({
          variables: {
            data: {
              height: values.height,
              weight: values.weight,
              frontBodyBase64: values.frontSideBodyBase64,
              backBodyBase64: values.backSideBodyBase64,
              rightSideBodyBase64: values.rightSideBodyBase64,
              leftSideBodyBase64: values.leftSideBodyBase64,
              plan: {
                connect: {
                  uuid
                }
              }
            }
          },
          update: (cache, { data }) => {
            const variables = { where: { plan: { uuid } } };

            const query = cache.readQuery<GetPlanBodyMeasuresQuery>({
              query: GetPlanBodyMeasuresDocument,
              variables
            });

            const bodyMeasures = query?.payload || [];

            cache.writeQuery({
              data: {
                payload: [data?.payload, ...bodyMeasures]
              },
              variables,
              query: GetPlanBodyMeasuresDocument
            });
          }
        });
      }

      redirect(BODY_MEASURES_BY_PLAN.replace(UUID_PARAM, uuid));
    } catch (error) {}
  };

  useEffect(() => {
    if (error) {
      Message.error(error.graphQLErrors[0].message);
    }
  }, [error]);

  return planSearch && uuid ? (
    <FormPage
      title={BODY_MEASURES_TEXT}
      className={classes.root}
      isCardContentEnable={false}
      actions={[
        <Button
          key="submit"
          size="small"
          color="primary"
          loading={loading}
          disabled={loading}
          children={SAVE_TEXT}
          form={FormId.BODY_MEASURE_FORM_ID}
        />
      ]}
    >
      <BodyMeasureForm onSubmit={onSubmit} isLoading={loading} />
    </FormPage>
  ) : (
    <Redirect to={NOT_FOUND} />
  );
};

export default BodyMeasureCreate;
