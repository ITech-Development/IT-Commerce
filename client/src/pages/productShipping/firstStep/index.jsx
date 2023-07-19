import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

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

const Index = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: user.first_name,
      last_name: user.last_name,
    },
  });

  const onSubmit = (data) => {
    props.updateUser(data);
    navigate("/second");
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
          id="first_name"
          label="First Name"
          variant="outlined"
          name="first_name"
          placeholder="Enter your first name"
          autoComplete="off"
          {...register("first_name", {
            required: "First name is required.",
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "First name should contain only characters.",
            },
          })}
          className={`${errors.first_name ? "input-error" : ""} ${
            classes.inputField
          }`}
          error={!!errors.first_name}
          helperText={errors.first_name && errors.first_name.message}
        />

        <TextField
          id="last_name"
          label="Last Name"
          variant="outlined"
          name="last_name"
          placeholder="Enter your last name"
          autoComplete="off"
          {...register("last_name", {
            required: "Last name is required.",
            pattern: {
              value: /^[a-zA-Z]+$/,
              message: "Last name should contain only characters.",
            },
          })}
          className={`${errors.last_name ? "input-error" : ""} ${
            classes.inputField
          }`}
          error={!!errors.last_name}
          helperText={errors.last_name && errors.last_name.message}
        />

        <Button variant="contained" color="primary" type="submit">
          Next
        </Button>
      </motion.div>
    </form>
  );
};

export default Index;
