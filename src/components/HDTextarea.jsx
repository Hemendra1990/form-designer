import React, { memo } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import { useImperativeHandle } from "react";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";

const HDTextarea = React.forwardRef((props, ref) => {
  const { element, meta, setMeta } = props;
  const [value, setValue] = useState(element.value || "");
  const [controlStyle, setControlStyle] = useState('');

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

  const handleChange = (e) => {
    setValue(e.target.value);
    element.value = e.target.value;
  };

  return (
    <>
      <div>
        <style>
            {controlStyle}
        </style>
        <InputTextarea
          ref={ref}
          maxLength={element?.attributes?.maxLength}
          rows={element?.attributes?.rows}
          cols={element?.attributes?.cols}
          placeholder={element?.attributes?.placeholder}
          name={props.name}
          id={props.name}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
});

export default memo(HDTextarea);
