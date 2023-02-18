import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "../text_input";

const errorMessage = "This is the error message";
const helperText = "This is the helper text.";
const label = "Test Label";
const maxLength = 127;
const maxLengthForError = 7;
const name = "testName";
const value = "This is what the user types in.";

const Wrapped = (props) => {
  const methods = useForm({
    defaultValues: {
      [name]: "",
    },
  });
  return (
    <FormProvider {...methods}>
      <TextInput name={name} label={label} {...props} />
    </FormProvider>
  );
};

describe("<TextInput />", () => {
  it("renders without crashing", () => {
    render(<Wrapped />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { container } = render(<Wrapped />);
    expect(container).toMatchSnapshot();
  });

  it("displays the label", () => {
    render(<Wrapped />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("displays the value", () => {
    render(<Wrapped />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value },
    });
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it("displays the helper text", () => {
    render(<Wrapped helperText={helperText} />);
    expect(screen.getByText(helperText)).toBeInTheDocument();
  });

  it("displays the required indicator", () => {
    render(<Wrapped rules={{ required: true }} />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("displays the max length indicator", () => {
    render(
      <Wrapped
        rules={{
          maxLength: {
            value: maxLength,
            message: `Name must be less than ${maxLength} characters.`,
          },
        }}
      />
    );
    expect(screen.getByText(`0/${maxLength}`)).toBeInTheDocument();
  });

  it("displays the error message", async () => {
    const user = userEvent.setup();
    render(
      <Wrapped
        rules={{
          maxLength: {
            value: maxLengthForError,
            message: errorMessage,
          },
        }}
      />
    );
    await user.click(screen.getByRole("textbox"));
    await user.keyboard(value);
    expect(screen.getByText(value)).toBeInTheDocument();
    expect(
      screen.getByText(`${value.length}/${maxLengthForError}`)
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
