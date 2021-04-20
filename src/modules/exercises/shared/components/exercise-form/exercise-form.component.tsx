import React from 'react';
import { useFormik } from 'formik';
import { Form } from 'antd';

import { useHistory } from 'react-router-dom';

import {
  EXERCISE_FORM_SCHEMA,
  IExerciseForm,
  INITIAL_EXERCISE_VALUES
} from 'modules/exercises/shared/components/exercise-form/exercise-form.util';

import { EXERCISES } from 'shared/routes';
import Button from 'shared/modules/button/button.component';
import { Field } from 'shared/modules/form';

const { Item } = Form;

interface Props {
  onSubmit: (data: IExerciseForm) => Promise<void>;
  initialValues?: IExerciseForm;
}

const ExerciseForm = ({ onSubmit, initialValues = INITIAL_EXERCISE_VALUES }: Props) => {
  const history = useHistory();

  const { handleSubmit, handleChange, values, errors, touched } = useFormik<IExerciseForm>({
    onSubmit,
    initialValues,
    validationSchema: EXERCISE_FORM_SCHEMA,
    enableReinitialize: true
  });

  return (
    <Form onSubmitCapture={handleSubmit}>
      <Item>
        <Field
          isDisabled={false}
          name="name"
          placeholder="Add Name"
          value={values.name}
          error={errors.name}
          onChange={handleChange}
          hasBeenTouched={touched.name}
        />
      </Item>
      <Item>
        <Field
          isDisabled={false}
          name="description"
          placeholder="Add Description"
          value={values.description}
          error={errors.description}
          onChange={handleChange}
          hasBeenTouched={touched.description}
        />
      </Item>

      <Button color="secondary" onClick={() => history.push(EXERCISES)}>
        Cancel
      </Button>
      <Button>Submit</Button>
    </Form>
  );
};

export default ExerciseForm;
