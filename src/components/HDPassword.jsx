import React, { Fragment, useState } from "react";
import { Password } from "primereact/password";

/* type PasswordProps = {
  element: any;
} */

const HDPassword = (props) => {
  const [passwordValue, setPasswordValue] = useState("");

  const handlePasswordChangeVal = (event) => {
    setPasswordValue(event.target.value);
  };

  return (
    <Fragment>
      <Password value={passwordValue} onChange={handlePasswordChangeVal} />
    </Fragment>
  );
};

export default HDPassword;
