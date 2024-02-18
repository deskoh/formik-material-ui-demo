# Formik with Material UI v5

Following are few ways to render form fields

## Using `formik` Render Props

```tsx
<Formik
  initialValues={initialValues}
  onSubmit={(values, actions) => {
    // ...
  }}
>
  {(props: FormikProps<FormValues>) => (
    <Form>
      {/* See options below */}
    </Form>
  )}
</Formik>
```

Following are example integrations using `Formik` render props.

1. Using `Field as` Wrapper [preferred]

   Formik will inject `onChange`, `onBlur`, `name`, and `value` props.

   > This example does not allow additional `onChange`, `onBlur` actions to be specified.
   
   ```tsx
   <Field as={TextField}
     name="username"
     label="Last Name"
     error={!!props.errors.username}
     helperText={props.errors.username}
   />
   ```

1. Using `Field component` Wrapper [preferred if custom action handlers required]

    Formik will inject `field` (containing `onChange`, `onBlur`, `name`, and `value`) and `form` props. Component likely be a wrapper to wrapper to spead `field`.
    
    ```tsx
    <Field component={MyTextFieldComponent}
      name="username"
      label="Last Name"
      error={!!props.errors.username}
      helperText={props.errors.username}
    />
    
    type MyTextFieldComponentProps = Omit<FieldProps<string, FormValues>, 'meta'> & TextFieldProps;
    
    const MyTextFieldComponent: React.FC<MyTextFieldComponentProps> = ({ field, form, ...props }) => {
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
    ```

1. Custom Component Wrapper

   In the example below `MyTextField` is used to wrap `TextField`.
   
   Use `useField` hook to get `field` and `meta` to handle form actions.
   
   > This example does not allow additional `onChange`, `onBlur` actions to be specified.
   
   ```tsx
   type MyTextFieldProps = Omit<FieldProps<string, FormValues>, 'meta'> & TextFieldProps;
   
   const MyTextField: React.FC<MyTextFieldProps> = (props) => {
     if (!props.name) throw new Error('name does not exists in props');  
     const [field, meta, helpers] = useField(props.name);
     const { touched, error } = meta;
     return (
       <TextField
         {...props}
         {...field} // onChange, onBlur, name, and value
       />
     );
   };
   ```

1. Using `Field` `render` props

   > This example does not allow additional `onChange`, `onBlur` actions to be specified.
   
   ```tsx
   <Field name="email" >
     {({ field, form, meta}: FieldProps<string, FormValues>) => (
       <TextField
         {...field} // onChange, onBlur, name, and value
         error={meta.touched && !!meta.error}
         helperText={meta.touched && meta.error}
       />
     )}
   </Field>
   ```

## Using `useFormik` Hook

See the example [here](https://formik.org/docs/api/useFormik).

> Be aware that `<Field>`, `<FastField>`, `<ErrorMessage>`, `connect()`, and `<FieldArray>` will **NOT** work with useFormik()

## Nested Components with Form Controls

Use [`useFormikContext`](https://formik.org/docs/api/useFormikContext) to get form values and event handlers.

## Testing Reference

[Don’t give up on testing when using Material UI with React](https://jskim1991.medium.com/react-dont-give-up-on-testing-when-using-material-ui-with-react-ff737969eec7)
