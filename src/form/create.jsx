import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextInput from "./text_input";
import grey from "@material-ui/core/colors/grey";

const maxLength = 24;

const useStyles = makeStyles(() => ({
  button: {
    marginBottom: 16,
    marginLeft: 8,
  },
  buttons: {
    textAlign: "right",
  },
  container: {
    border: "1px solid",
    borderColor: grey[300],
    borderRadius: 4,
  },
}));

const Create = () => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    setValue,
  } = useFormContext();
  const classes = useStyles();

  useEffect(() => {
    setValue("name", "Kevin");
  }, [setValue]);

  const handleReset = () => {
    reset();
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Typography variant="body1" color="primary">
        Material-UI and React Hook Form
      </Typography>
      <Typography variant="body2" color="secondary">
        Demonstration of a reuseable controlled input built with useController
        and useFormContext. Works in my browser as desired, but fails unit test
        about the error message.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextInput name="name" label="Name" readOnly />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              name="street"
              label="Street"
              rules={{
                required: true,
                maxLength: {
                  value: maxLength,
                  message: `Street must be ${maxLength} characters or less.`,
                },
              }}
            />
          </Grid>
          <Grid item xs={8}>
            <TextInput
              name="city"
              label="City"
              placeholder="Where you at?"
              rules={{
                required: true,
                maxLength: {
                  value: maxLength,
                  message: `City must be ${maxLength} characters or less.`,
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              helperText="Standard 2-letter abbrev"
              name="state"
              label="State"
              rules={{
                maxLength: {
                  value: 2,
                  message: "State must be 2 characters.",
                },
                minLength: {
                  value: 2,
                  message: "State must be 2 characters.",
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextInput
              helperText="Numbers only"
              name="zip"
              label="Postal Code"
              rules={{
                required: true,
                validate: (value) => {
                  if (!/^\d+$/.test(value)) {
                    return "Must be numerals only.";
                  }
                },
              }}
              variant="compact"
            />
          </Grid>
          <Grid item xs={12} className={classes.buttons}>
            <Button
              className={classes.button}
              color="secondary"
              onClick={handleReset}
              variant="outlined"
            >
              Reset
            </Button>
            <Button
              className={classes.button}
              color="secondary"
              disabled={!isValid}
              type="submit"
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Box></Box>
      </form>
      <DevTool control={control} />
    </Container>
  );
};

export default Create;
