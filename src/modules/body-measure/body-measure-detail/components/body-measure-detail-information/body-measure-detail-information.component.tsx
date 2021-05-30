import React, { FC, ReactElement } from 'react';

import { Row, Col, Descriptions, Card, Badge, Popover, Progress, Typography } from 'antd';

import { Icon } from 'shared/modules';

const { Item } = Descriptions;

interface IBodyMeasureDetailInformation {
  bodyComposition: {
    bodyWater: number;
    proteins: number;
    minerals: number;
    bodyFat: number;
    weight: number;
    height: number;
  };
  muscleFat: {
    weight: number;
    skeletalMuscleMass: number;
    bodyFatMass: number;
  };
  obesity: {
    bodyMassIndex: number;
    percentageBodyFat: number;
  };
  bodyObjective: {
    bodyWater: number;
    proteins: number;
    minerals: number;
    bodyFat: number;
    weight: number;
    height: number;
  };
  bodyObjectivePercentage: number;
}

const SectionDescription: FC<{ children: ReactElement; description: string }> = ({ description, children }) => (
  <Popover content={description} title="Description" placement="right" overlayStyle={{ width: 500 }}>
    {children}
  </Popover>
);

const SectionTitle: FC<{ title: string; description: string }> = ({ title, description }) => (
  <>
    {`${title} `}
    <SectionDescription description={description}>
      <Icon type="infoCircle" />
    </SectionDescription>
  </>
);

const BodyMeasureDetailInformation: FC<IBodyMeasureDetailInformation> = ({
  bodyComposition,
  muscleFat,
  obesity,
  bodyObjectivePercentage
}) => (
  <Row gutter={16}>
    <Col xs={24} lg={15} xl={17}>
      <Card bordered={false}>
        <Descriptions
          title={
            <SectionTitle
              title="Body composition"
              description="
                Displays the weight of Total Body Water (Intracellular water (ICW) and extracellular water (ECW)), 
                dry lean mass, and body fat mass. Body weight is the total of these three components.
              "
            />
          }
          column={{ sm: 1, lg: 2, xxl: 3 }}
          bordered
        >
          <Item label="Body Water">{bodyComposition.bodyWater} L</Item>
          <Item label="Proteins">{bodyComposition.proteins} Kg</Item>
          <Item label="Minerals">{bodyComposition.minerals} Kg</Item>
          <Item label="Body Fat">{bodyComposition.bodyFat} Kg</Item>
          <Item label="Weight">{bodyComposition.weight} Kg</Item>
          <Item label="Height">{bodyComposition.height} m</Item>
          <Item label="Status">
            <Badge status="success" text="Healthy" />
          </Item>
        </Descriptions>
        <br />
        <Descriptions
          title={
            <SectionTitle
              title="Muscle Fat Analysis"
              description="
                Indicate the relationship between the current weight to the average value for that specific segment, 
                based on the examinee’s height.
              "
            />
          }
          column={{ sm: 1, xxl: 3 }}
          bordered
        >
          <Item label="Weight">{muscleFat.weight} Kg</Item>
          <Item label="Skeletal Muscle Mass">{muscleFat.skeletalMuscleMass} Kg</Item>
          <Item label="Body Fat Mass">{muscleFat.bodyFatMass} Kg</Item>
          <Item label="Status">
            <Badge status="success" text="Healthy" />
          </Item>
        </Descriptions>

        <br />
        <Descriptions
          title={
            <SectionTitle
              title="Obesity Analysis"
              description="
                Displays both BMI and percent body fat. 
                PBF is a more accurate determination of your health because it compares your fat levels to your weight. 
                Although outdated, BMI is included on the InBody result sheets because it is commonly used in scientific research.
              "
            />
          }
          column={{ sm: 1, xxl: 2 }}
          bordered
        >
          <Item label="Body Mass Index">{obesity.bodyMassIndex} Kg/㎡</Item>
          <Item label="Percentage Body Fat">{obesity.percentageBodyFat} %</Item>
          <Item label="Status">
            <Badge status="error" text="Risk" />
          </Item>
        </Descriptions>
      </Card>
    </Col>
    <Col xs={24} lg={9} xl={7}>
      <Card bordered={false} style={{ height: '100%' }}>
        <Descriptions title="Body Objective" bordered column={1}>
          <Item label="Status">
            <Badge status="success" text="Healthy" />
          </Item>
          <Item label="Body Water">{bodyComposition.bodyWater} L</Item>
          <Item label="Proteins">{bodyComposition.proteins} Kg</Item>
          <Item label="Minerals">{bodyComposition.minerals} Kg</Item>
          <Item label="Body Fat">{bodyComposition.bodyFat} Kg</Item>
          <Item label="Weight">{bodyComposition.weight} Kg</Item>
          <Item label="Height">{bodyComposition.height} m</Item>
        </Descriptions>
        <br />
        <Typography.Text type="secondary" code>
          Percentage:
        </Typography.Text>
        <Progress percent={bodyObjectivePercentage} />
      </Card>
    </Col>
  </Row>
);

export default BodyMeasureDetailInformation;
