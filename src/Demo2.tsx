import { Field, FieldProps, Form, Formik, FormikProps, useField } from 'formik';
import Button from '@mui/material/Button';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import { validationSchema } from './validation';
import CountryCitySelect from './CountryCitySelect';
import { ChangeEventHandler } from 'react';

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  password: string;
}

const NameField: React.FC<TextFieldProps> = (props) => {
  if (!props.name) throw new Error('name does not exists in props');  
  const [field, meta, helpers] = useField(props.name);
  return (
    <TextField
      {...props}
      {...field} // onChange, onBlur, name, and value
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

type MyTextFieldProps = Omit<FieldProps<string, FormValues>, 'meta'> & TextFieldProps;

const MyTextField: React.FC<MyTextFieldProps> = ({ field, form, onChange, ...props }) => {
  // `meta` not available in props due to backwards compatibility
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (onChange) onChange(e);
    field.onChange(e);
  }
  return (
    <TextField
      {...field} // onChange, onBlur, name, and value
      {...props}
      onChange={handleChange}
    />
  );
};

const initialValues = {
  firstName: 'foo',
  lastName: 'bar',
  email: 'foobar@example.com',
  country: '',
  city: '',
  password: 'foobar',
};

const MaterialForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {({ values, errors, handleChange, submitForm, touched }: FormikProps<FormValues>) => (
        <Form>
          {/* Most concise */}
          <NameField
            fullWidth
            name="firstName"
            label="First Name"
          />
          <Field as={TextField}
            fullWidth
            name="lastName"
            label="Last Name"
            error={touched.lastName && !!errors.lastName}
            helperText={touched.lastName && errors.lastName}
          />
          {/* Verbose due to render props */}
          <Field
            name="email"
          >
            {({ field, form, meta}: FieldProps<string, FormValues>) => (
              <TextField
                {...field} // onChange, onBlur, name, and value
                fullWidth
                error={meta.touched && !!meta.error}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          {/* `Meta` is not reuqired */}
          <Field
            fullWidth
            name="password"
            type="password"
            component={MyTextField}
            error={touched.password && !!errors.password}
            helperText={touched.password && errors.password}
          />
          <CountryCitySelect />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MaterialForm;
