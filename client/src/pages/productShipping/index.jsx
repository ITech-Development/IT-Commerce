import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik, useFormikContext } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function Home() {
  return (
    <Card>
      <CardContent style={{ maxWidth: "1520px", margin: "auto" }}>
        <FormikStepper
          initialValues={{
            firstName: "",
            lastName: "",
            dataValid: false,
            // description: "",
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            console.log("values", values);
          }}
        >
          <FormikStep label="Personal Data">
            <Box paddingBottom={8} style={{ marginBottom: "10px" }}>
              <Field
                fullWidth
                name="firstName"
                component={TextField}
                label="First Name"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                fullWidth
                name="lastName"
                component={TextField}
                label="Last Name"
              />
            </Box>
            <Box paddingBottom={2}>
              <Field
                name="dataValid"
                type="checkbox"
                component={CheckboxWithLabel}
                Label={{ label: "Data is Valid" }}
              />
            </Box>
          </FormikStep>
          <FormikStep label="More Info">
            <ComponentToShowFullName />
            <Box paddingBottom={2} paddingTop={2} style={{ margin: "20px 0" }}>
              <Field
                fullWidth
                name="contact"
                component={TextField}
                label="Contact Number"
              />
            </Box>
            <Box paddingBottom={2} paddingTop={2} style={{ margin: "20px 0" }}>
              <Field
                fullWidth
                name="address"
                component={TextField}
                label="Address"
              />
            </Box>
            <Box paddingBottom={2} paddingTop={2} style={{ margin: "20px 0" }}>
              <Field fullWidth name="city" component={TextField} label="City" />
            </Box>
            <Box paddingBottom={2} paddingTop={2} style={{ margin: "20px 0" }}>
              <Field
                fullWidth
                name="portal code"
                component={TextField}
                label="Portal Code"
              />
            </Box>
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

export function FormikStep({ children }) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = React.Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid container spacing={2}>
            {step > 0 ? (
              <Grid item>
                <Button
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

function ComponentToShowFullName() {
  const formikContext = useFormikContext();

  return (
    <Typography variant="h4" style={{ paddingBottom: "10px" }}>
      Hello,{" "}
      {formikContext.values.firstName + " " + formikContext.values.lastName}!
    </Typography>
  );
}
