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
  const { updateMeta } = useUpdateMetaContext();
  const primeTextAreaRef = useRef(ref);
  useImperativeHandle(ref, () => ({
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
  }));
  useEffect(() => {
    updateMeta(meta);
    //Apply style if the element already has
    if (element.style) {
      setTimeout(() => {
        const elementStyle = addElementStyle(
          element.style,
          element,
          meta,
          setControlStyle
        );
        setControlStyle(elementStyle);
      }, 100);


    }
  }, []);

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
