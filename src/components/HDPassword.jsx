import React, {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Password } from "primereact/password";
import { Divider } from 'primereact/divider';
import EventExecutor from "../service/EventExecutor";
import { useUpdateMetaContext } from "../context/MetaContext";

/* type PasswordProps = {
  element: any;
} */

const HDPassword = forwardRef((props, ref) => {
  const { updateMeta } = useUpdateMetaContext();
  const { element, meta } = props;
  const [passwordValue, setPasswordValue] = useState();
  const passwordRef = useRef(ref);

  const footer = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  const handlePasswordChangeVal = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleOnBlurEvent = () => {
    const onBlurEvent = element.attributes?.onBlurEvent;
    if (onBlurEvent) {
      EventExecutor.executeEvent(meta, onBlurEvent, null);
    }
  };

  const checkShowStrengthIndicatorValue = () => {
    if (!element.attributes.showStrengthIndicator && element.attributes.showStrengthIndicator === null) {
      element.attributes.showStrengthIndicator = false
    } else {
      element.attributes.showStrengthIndicator = false
    }
  }

  const checkPanelFooterForPasswordValue = () => {
    if (element.attributes.panelFooterForPassword) {
      return (footer)
    } else {
      return null;
    }
  }

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
    checkShowStrengthIndicatorValue();
    checkPanelFooterForPasswordValue();
    updateMeta(meta); //This is necesary, put in all the components... we need to update the meta.elementMap so need to call this method after the input is rendered
  }, []);

  return (
    <Fragment>
      <Password
        ref={passwordRef}
        value={passwordValue}
        onChange={handlePasswordChangeVal}
        feedback={element.attributes?.showStrengthIndicator}
        onBlur={handleOnBlurEvent}
        placeholder={element.attributes?.placeholder}
        toggleMask={element.attributes?.showIconToDisplayPassword}
        footer={checkPanelFooterForPasswordValue}
      />
    </Fragment>
  );
});

export default HDPassword;
