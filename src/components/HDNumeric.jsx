import React, { memo, useEffect, useImperativeHandle, useState, useRef } from "react";
import { InputNumber } from 'primereact/inputnumber';
import EventExecutor from '../service/EventExecutor';
import { addElementStyle } from "../control-styles/ControlStyles";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { useUpdateMetaContext } from "../context/MetaContext";

const HDNumeric = React.forwardRef((props, parentRef) => {
  const { element } = props;

  const meta = useUpdateMetaContext();
  const { updateMeta } = useUpdateMetaContext();

  const [value, setValue] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [controlStyle, setControlStyle] = useState();
  const [isRefInitialize, setRefInitialize] = useState(false);

  const getPrimeNumericRef = useRef(parentRef);
  const [showHideFlag, setShowHideFlag] = useState(true);

  const showHide = (value) => {//expecing the value to be boolean
    setShowHideFlag(value);
  }
  const operations = {
    getStyleAttributes: () => {
      return ControlStyleModel.getInputnumberStyle();
    },

    addStyle(style = "") {
      setControlStyle(style);
    },

    updateValue(value) {
      setValue(value);
    },

    getSelectedValue() {
      return selectedValue;
    },

    getActualRef: () => {
      return { ...parentRef };
    },

    getPrimeNumericRef,
    showHide
  }

  useImperativeHandle(parentRef, () => {
    setRefInitialize(true);
    return operations;
  });

  const executeOnChangeEvent = (event) => {
    if (element.attributes && element.attributes.onChangeEvent) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onChangeEvent,
        { data: event.value },
        null
      );
    }
  };

  const executeOnValueChangeEvent = (event) => {
    if (element.attributes && element.attributes.onValueChange) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onValueChange,
        { data: event.value },
        null
      );
    }
  };

  const executeOnFocusEvent = (event) => {
    if (element.attributes && element.attributes.onFocus) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onFocus,
        { data: event.value },
        null
      );
    }
  };

  const executeOnBlurEvent = (event) => {
    if (element.attributes && element.attributes.onBlur) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onBlur,
        { data: event.value },
        null
      );
    }
  };

  const executeOnKeyDownEvent = (event) => {
    if (element.attributes && element.attributes.onKeyDown) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onKeyDown,
        { data: event.value },
        null
      );
    }
  };


  useEffect(() => {
    updateMeta(meta);
    setValue(element.currAttribute?.value || "");
    setSelectedValue(element.currAttribute?.selectedValue || "");

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
        <InputNumber
          style={showHideFlag ? { display: 'flex' } : { display: 'none' }}
          ref={getPrimeNumericRef}
          value={value || element?.attributes?.numericValue}
          placeholder={element.attributes?.placeholder || "Please enter number"}
          onBlur={(e) => { executeOnBlurEvent(e) }}
          onFocus={(e) => { executeOnFocusEvent(e) }}
          onKeyDown={(e) => { executeOnKeyDownEvent(e) }}
          onValueChange={(e) => { executeOnValueChangeEvent(e) }}
          onChange={(e) => { setSelectedValue(e.value); executeOnChangeEvent(e); }}
          mode={element?.attributes?.selectedmode || "decimal"}
          currency={element?.attributes?.currencyValue || "INR"}
          locale={element?.attributes?.currencyCode || "en-IN"}
          minFractionDigits={element?.attributes?.minFractionDigits}
          maxFractionDigits={element?.attributes?.maxFractionDigits || element?.attributes?.minFractionDigits}
          useGrouping={false}

          showButtons buttonLayout="horizontal"
          decrementButtonClassName="p-button-danger"
          incrementButtonClassName="p-button-success"
          incrementButtonIcon="pi pi-plus"
          decrementButtonIcon="pi pi-minus"
        />
      </div>
    </>
  )
});
export default memo(HDNumeric);