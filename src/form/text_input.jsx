import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import _ from "lodash";
import { useController, useFormContext } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";
import CancelIcon from "@material-ui/icons/Cancel";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";

const useStyles = makeStyles((theme) => ({
  caption: {
    color: grey[500],
    float: "right",
    fontSize: 12,
    transform: "translateY(15px)",
  },
  errorText: {
    color: red[700],
  },
  helperText: {
    color: grey[500],
  },
  icon: {
    color: grey[500],
  },
}));

const CancelEndAdornment = (props) => {
  const classes = useStyles();
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="clear input"
        className={classes.icon}
        edge="end"
        onClick={props.onClick}
        tabIndex={-1}
        title="Clear"
      >
        <CancelIcon fontSize="small" />
      </IconButton>
    </InputAdornment>
  );
};

const ErrorEndAdornment = () => {
  const classes = useStyles();
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="input error"
        className={classes.errorText}
        edge="end"
        tabIndex={-1}
        title="Error"
      >
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
    </InputAdornment>
  );
};

const TextInput = (props) => {
  const { helperText, label, name, placeholder, readOnly, rules, variant } =
    props;
  const { control, resetField } = useFormContext();
  const {
    field: { onBlur, onChange, ref, value },
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
  });
  const classes = useStyles();

  const charsLimit = rules?.maxLength?.value || undefined;
  const htmlId = "text-input-" + name;

  const handleReset = () => {
    resetField(name);
  };

  const EndAdornment = () => {
    if (error) {
      return <ErrorEndAdornment />;
    }
    if (readOnly) {
      return null;
    }
    if (value) {
      return <CancelEndAdornment onClick={handleReset} />;
    }
    return null;
  };

  const TopLabel = ({ charsLimit, value }) => {
    if (charsLimit) {
      if (value) {
        return <div>{`${value.length}/${charsLimit}`}</div>;
      } else {
        return <div>{`0/${charsLimit}`}</div>;
      }
    }
    return <div>&nbsp;</div>;
  };

  return (
    <Box pb={1}>
      {variant !== "compact" && (
        <Typography variant="caption" className={classes.caption}>
          <TopLabel charsLimit={charsLimit} value={value} />
        </Typography>
      )}
      <FormControl fullWidth color={readOnly ? "primary" : "secondary"}>
        {label && (
          <InputLabel htmlFor={htmlId} required={rules?.required}>
            {label}
          </InputLabel>
        )}
        <Input
          error={!_.isNil(error)}
          id={htmlId}
          multiline
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={props.readOnly}
          ref={ref}
          value={value}
          endAdornment={<EndAdornment />}
        />
        <FormHelperText
          className={clsx({
            [classes.helperText]: !error,
            [classes.errorText]: error,
          })}
          role={error ? "alert" : "note"}
        >
          {error ? error.message : helperText}
        </FormHelperText>
      </FormControl>
    </Box>
  );
};

TextInput.propTypes = {
  helperText: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired, // react-hook-form
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  rules: PropTypes.object, // react-hook-form
  variant: PropTypes.oneOf(["compact", "normal"]),
};

TextInput.defaultProps = {
  helperText: "",
  label: "",
  placeholder: "",
  readOnly: false,
  variant: "normal",
};

export default TextInput;
