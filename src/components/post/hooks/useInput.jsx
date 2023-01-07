import { useState } from "react";

const useInput = (initailValue, validator) => {
  const [value, setValue] = useState(initailValue);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
  };
  let willUpdate = true;
  if (typeof validator === "function") {
    willUpdate = validator(value);
  }
  if (willUpdate) {
    setValue(value);
  }
  return { value, onChange };
};

export default useInput;
