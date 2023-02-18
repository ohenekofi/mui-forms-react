import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import Create from "./create";

const FormIndex = () => {
  const defaultValues = {
    name: "Kevin",
    street: "",
    city: "",
    state: "",
    zip: "",
  };

  const methods = useForm({
    mode: "onChange",
    defaultValues: defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <Create />
    </FormProvider>
  );
};

export default FormIndex;
