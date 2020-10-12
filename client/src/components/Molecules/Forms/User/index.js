import React from "react";
import PropTypes from "prop-types";
import { Field, Form, Formik } from "formik";
import { Button, Grid } from "@material-ui/core";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";

let userSchema = Yup.object().shape({
  name: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email().required(),
  phoneNumber: Yup.string().required(),
});

const initialValues = {
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const FormUser = (props) => {
  return (
    <Formik
      initialValues={props.data || initialValues}
      validationSchema={userSchema}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        const submit = await props.onSubmit(values);
        console.log("submit", submit);
        if (submit && !submit.status) {
          setErrors(submit.errors);
          setSubmitting(false);
        }
      }}
      render={({ isValid, isSubmitting }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Field
                component={TextField}
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                component={TextField}
                fullWidth
                name="lastName"
                label="Surname"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                fullWidth
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextField}
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={props.onCancel}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                type="submit"
                color="primary"
                disabled={!isValid || isSubmitting}
              >
                Add user
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    />
  );
};

FormUser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default FormUser;
