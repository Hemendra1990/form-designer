import React, { memo, useEffect, useRef } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { useImperativeHandle } from "react";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";

const HDTextarea = React.forwardRef((props, ref) => {
  const { element, meta, setMeta } = props;
  const [value, setValue] = useState(element.value || "");
  const [controlStyle, setControlStyle] = useState('');
  const [isRefInitialize, setRefInitialize] = useState(false);

  const { updateMeta } = useUpdateMetaContext();

  const primeTextAreaRef = useRef(ref);

  const operations = {
    updateValue: (value) => {
      setValue(value);
    },
    getActualRef: () => {
      return { ...ref };
    },
    getStyleAttributes: () => {
      return ControlStyleModel.getTextareaStyle();
    },
    addStyle(style = "") {
      setControlStyle(style);
    }
  }
  useImperativeHandle(ref, () => {
    setRefInitialize(true);
    return operations;
  });
  useEffect(() => {
    updateMeta(meta);

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

  const handleChange = (e) => {
    setValue(e.target.value);
    element.value = e.target.value;
  };

  return (
    <>
      <style>
        {controlStyle}
      </style>
      <div id={props.name}>

        <InputTextarea
          ref={primeTextAreaRef}
          maxLength={element?.attributes?.maxLength}
          rows={element?.attributes?.rows}
          cols={element?.attributes?.cols}
          placeholder={element?.attributes?.placeholder}
          name={props.name}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
});

export default memo(HDTextarea);
