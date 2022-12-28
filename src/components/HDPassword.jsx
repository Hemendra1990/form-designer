import React, { Fragment, useState } from "react";
import { Password } from "primereact/password";
import EventExecutor from "../service/EventExecutor";

/* type PasswordProps = {
  element: any;
} */

const HDPassword = (props) => {
  const { element, meta, ref } = props;
  const [passwordValue, setPasswordValue] = useState("");

  const handlePasswordChangeVal = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleOnBlurEvent = () => {
    const onBlurEvent = element.attributes?.onBlurEvent;
    if (onBlurEvent) {
      EventExecutor.executeEvent(meta, onBlurEvent, null);
    }
  };

  return (
    <Fragment>
      <Password
        ref={ref}
        value={passwordValue}
        onChange={handlePasswordChangeVal}
        feedback={element.attributes.showStrengthIndicator}
        onBlur={handleOnBlurEvent}
        placeholder={element.attributes?.placeholder}
      />
    </Fragment>
  );
};

export default HDPassword;
