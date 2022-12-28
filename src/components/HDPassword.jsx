import React, {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Password } from "primereact/password";
import EventExecutor from "../service/EventExecutor";
import { useUpdateMetaContext } from "../context/MetaContext";

/* type PasswordProps = {
  element: any;
} */

const HDPassword = forwardRef((props, ref) => {
  const { updateMeta } = useUpdateMetaContext();
  const { element, meta } = props;
  const [passwordValue, setPasswordValue] = useState("");
  const passwordRef = useRef(ref);

  const handlePasswordChangeVal = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleOnBlurEvent = () => {
    const onBlurEvent = element.attributes?.onBlurEvent;
    if (onBlurEvent) {
      EventExecutor.executeEvent(meta, onBlurEvent, null);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return passwordValue;
      },
      setValue(passwordVal) {
        setPasswordValue(passwordVal);
      },
    };
  });

  useEffect(() => {
    updateMeta(meta); //This is necesary, put in all the components... we need to update the meta.elementMap so need to call thuis method after the input is rendered
  }, []);

  return (
    <Fragment>
      <Password
        ref={passwordRef}
        value={passwordValue}
        onChange={handlePasswordChangeVal}
        feedback={element.attributes.showStrengthIndicator}
        onBlur={handleOnBlurEvent}
        placeholder={element.attributes?.placeholder}
      />
    </Fragment>
  );
});

export default HDPassword;
