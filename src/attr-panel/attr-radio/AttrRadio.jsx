import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";

const AttrRadio = (props) => {
  const { meta, handleAttributeChange, eventOptions } = props;
  const currAttribute = meta?.currentElement?.attributes;
  const [value, setValue] = useState("");
  const [onBlur, setonBlur] = useState("");
  const [onFocus, setonFocus] = useState("");
  const [onKeyup, setonKeyup] = useState("");
  const [onKeyDown, setonKeyDown] = useState("");

  const handleBlurChange = (e) => {
    setonBlur(e.value);
    currAttribute.onblur = e.value;
  };

  const handleFocusChange = (e) => {
    setonFocus(e.value);
    currAttribute.onfocus = e.value;
  };

  const handleKeyupChange = (e) => {
    setonKeyup(e.value);
    currAttribute.onkeyup = e.value;
  };

  const handleKeydownChange = (e) => {
    setonKeyDown(e.value);
    currAttribute.onkeydown = e.value;
  };

  return (
    <>
      <div className="field col-12">
        <label htmlFor="controlId" className="block">
          Control ID
        </label>
        <InputText
          name="placeholder"
          style={{ width: "100%" }}
          value={meta.currentElement.id}
          disabled
        />
      </div>
      <div className="field col-12">
        <label htmlFor="maxLen">Max Length</label>
        <InputNumber
          style={{ width: "100%" }}
          name="maxLength"
          inputId="maxLen"
          onChange={handleAttributeChange}
          value={currAttribute?.maxLength}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onBlur" className="block">
          On Blur
        </label>
        <Dropdown
          style={{ width: "100%" }}
          name="onblur"
          value={onBlur}
          options={eventOptions}
          placeholder="Select a Blur Event"
          onChange={(e) => {
            handleBlurChange(e);
          }}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onFocus" className="block">
          On Focus
        </label>
        <Dropdown
          style={{ width: "100%" }}
          name="onfocus"
          value={onFocus}
          options={eventOptions}
          placeholder="Select a Focus Event"
          onChange={(e) => {
            handleFocusChange(e);
          }}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onKeyup" className="block">
          On Keyup
        </label>
        <Dropdown
          style={{ width: "100%" }}
          name="onkeyup"
          value={onKeyup}
          options={eventOptions}
          placeholder="Select a onKeyup Event"
          onChange={(e) => {
            handleKeyupChange(e);
          }}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onKeyDown" className="block">
          On KeyDown
        </label>
        <Dropdown
          style={{ width: "100%" }}
          name="onkeydown"
          value={onKeyDown}
          options={eventOptions}
          placeholder="Select a onKeyDown Event"
          onChange={(e) => {
            handleKeydownChange(e);
          }}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="maxLen" className="block">
          Placeholder {currAttribute?.placeholder}{" "}
        </label>
        <InputNumber
          style={{ width: "100%" }}
          value={value}
          onValueChange={(e) => setValue(e.value)}
          onChange={handleAttributeChange}
          mode="decimal"
        />
      </div>
    </>
  );
};

export default AttrRadio;
