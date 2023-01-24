import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useImperativeHandle } from "react";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";
import EventExecutor from '../service/EventExecutor';

const HDInput = React.forwardRef((props, ref) => {

  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext()
  const { element } = props;

  const [value, setValue] = useState(element.value || "");
  const [controlStyle, setControlStyle] = useState();
  const [isRefInitialize, setRefInitialize] = useState(false);
  const [showHideFlag, setShowHideFlag] = useState(true); //will change later as the event modeler itself is going to change for showHide

  const showHide = (value) => {//expecing the value to be boolean
    setShowHideFlag(value);
  }
  const operations = {
    sayHello() {
      alert('Hello Imperative handle')
    },
    updateValue(value) {
      setValue(value);
    },
    getStyleAttributes: () => {
      return ControlStyleModel.getInputtextStyle();
    },
    addStyle(style = "") {
      setControlStyle(style);
    },
    showHide
  }

  /**
   * We can play with the component dynamically
   */
  useImperativeHandle(ref, () => {
    setRefInitialize(true);
    return operations;
  });

  const executeFocusEvent = (event) => {//TODO Shilpa will take care of it
    if (element.attributes && element.attributes.onFocus) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(props.meta, element.attributes.onFocus, { data: event.value }, null);
    }
  }
  const executeBlurEvent = (event) => {
    if (element.attributes && element.attributes.onBlur) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(props.meta, element.attributes.onBlur, { data: event.value }, null);
    }
  }

  const executeKeyupEvent = (event) => {
    if (element.attributes && element.attributes.onKeyup) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(props.meta, element.attributes.onKeyup, { data: event.value }, null);
    }
  }

  const executeKeyDownEvent = (event) => {
    if (element.attributes && element.attributes.onKeyDown) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(props.meta, element.attributes.onKeyDown, { data: event.value }, null);
    }
  }

  const handleBlur = (e) => {
    element.value = value;
  };

  useEffect(() => {
    updateMeta(meta); //This is necesary, put in all the components... we need to update the meta.elementMap so need to call thuis method after the input is rendered

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
        <InputText
          style={showHideFlag ? { display: 'block' } : { display: 'none' }}
          ref={ref}
          maxLength={element?.attributes?.maxLength}
          placeholder={element?.attributes?.placeholder}
          name={props.name}
          id={props.name}
          value={value || element?.attributes?.defaultValue}
          onChange={(e) => { setValue(e.target.value) }}
          onBlur={(e) => { executeBlurEvent(e) }}
          onFocus={(e) => { executeFocusEvent(e) }}
          onKeyUp={(e) => { executeKeyupEvent(e) }}
          onKeyDown={(e) => { executeKeyDownEvent(e) }}
        />
      </div>
    </>
  );
});

export default HDInput;
