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
import { Link } from "react-router-dom";

// Simulate asynchronous behavior
const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function Home() {
  const handleSubmitBackend = async (values) => {
    const accessToken = localStorage.getItem("access_token");
    try {
      // Send data to the backend using POST method or as needed.
      // Replace the URL and method with the appropriate ones for your backend.
      const response = await fetch("https://indoteknikserver-732012365989.herokuapp.com/checkouts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: accessToken,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from backend:", data);
        alert("Data successfully added!");
      } else {
        console.error("Failed to add data to the backend");
        alert("Failed to add data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while adding data.");
    }
  };

  return (
    <Card>
      <CardContent
        style={{
          maxWidth: "1520px",
          margin: "auto",
          position: "relative",
          top: "120px",
          height: "800px",
        }}
      >
        <FormikStepper
          initialValues={{
            firstName: "",
            lastName: "",
            dataValid: false,
          }}
          onSubmit={async (values) => {
            await sleep(3000);
            console.log("values", values);
            handleSubmitBackend(values); // Call the method to send data to the backend
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
            {/* ... */}
            {/* More fields */}
          </FormikStep>
        </FormikStepper>
      </CardContent>
    </Card>
  );
}

function FormikStep({ children }) {
  return <>{children}</>;
}

function FormikStepper({ children, ...props }) {
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
                <Link to="/check-trans">
                  {isSubmitting
                    ? "Submitting"
                    : isLastStep()
                    ? "Submit"
                    : "Next"}
                </Link>
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
