import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  inputForm: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(3),
  },
  inputField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  errorMsg: {
    color: "red",
  },
}));

const SecondStep = (props) => {
  const classes = useStyles();
  const { user } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_email: user.user_email,
      user_password: user.user_password,
    },
  });

  const onSubmit = (data) => {
    props.updateUser(data);
  };

  return (
    <form className={classes.inputForm} onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        <TextField
          id="user_email"
          label="Email"
          variant="outlined"
          name="user_email"
          type="email"
          placeholder="Enter your email address"
          autoComplete="off"
          {...register("user_email", {
            required: "Email is required.",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Email is not valid.",
            },
          })}
          className={`${errors.user_email ? "input-error" : ""} ${
            classes.inputField
          }`}
          error={!!errors.user_email}
          helperText={errors.user_email && errors.user_email.message}
        />

        <TextField
          id="user_password"
          label="Password"
          variant="outlined"
          name="user_password"
          type="password"
          placeholder="Choose a password"
          autoComplete="off"
          {...register("user_password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password should have at least 6 characters.",
            },
          })}
          className={`${errors.user_password ? "input-error" : ""} ${
            classes.inputField
          }`}
          error={!!errors.user_password}
          helperText={errors.user_password && errors.user_password.message}
        />

        <Button variant="contained" color="primary" type="submit">
          Next
        </Button>
      </motion.div>
    </form>
  );
};

export default SecondStep;
