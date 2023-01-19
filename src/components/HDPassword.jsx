import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Password } from "primereact/password";
import { Divider } from 'primereact/divider';
import EventExecutor from "../service/EventExecutor";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";

/* type PasswordProps = {
  element: any;
} */

const HDPassword = forwardRef((props, ref) => {
  const { updateMeta } = useUpdateMetaContext();
  const { element, meta } = props;
  const [passwordValue, setPasswordValue] = useState();
  const passwordRef = useRef(ref);
  //const { } = useMetaContext();
  const [controlStyle, setControlStyle] = useState();
  const [isRefInitialize, setRefInitialize] = useState(false);

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

  const handleOnBlurEvent = (event) => {
    if (element.attributes && element.attributes.onBlurEvent) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onBlurEvent,
        { data: event.value },
        null
      );
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
  const operations = {
    getValue() {
      return passwordValue;
    },
    setValue(passwordVal) {
      setPasswordValue(passwordVal);
    },
    getStyleAttributes: () => {
      return ControlStyleModel.getPasswordStyle();
    },
    addStyle(style = "") {
      setControlStyle(style);
    },
  };
  useImperativeHandle(ref, () => {
    setRefInitialize(true);
    return operations;
  });

  useEffect(() => {
    checkShowStrengthIndicatorValue();
    checkPanelFooterForPasswordValue();
    updateMeta(meta); //This is necesary, put in all the components... we need to update the meta.elementMap so need to call this method after the input is rendered

    //Apply style if the element already has
    if (element.ref && element.ref.current && element.ref.current.getStyleAttributes) {
      if (element.style) {
        const elementStyle = addElementStyle(
          element.style,
          element,
          meta,
          setControlStyle
        );
        setControlStyle(elementStyle);
      }
    }
  }, [isRefInitialize]);

  return (
    <>
      <style>{controlStyle}</style>
      <div id={element.id}>
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
      </div>
    </>
  );
});

export default HDPassword;
