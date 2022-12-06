import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from "react";


const AttrInput = (props) => {
  const { meta, handleAttributeChange, eventOptions } = props; //Spread
  const currAttribute = meta?.currentElement?.attributes;
  const [onBlur, setonBlur] = useState("");
  const [onFocus, setonFocus] = useState("");
  const [onKeyup, setonKeyup] = useState("");
  const [onKeyDown, setonKeyDown] = useState("");

  const handleBlurChange = (e) => {
    setonBlur(e.value);
    currAttribute.onblur = e.value;
  }

  const handleFocusChange = (e) => {
    setonFocus(e.value);
    currAttribute.onfocus = e.value;
  }

  const handleKeyupChange = (e) => {
    setonKeyup(e.value);
    currAttribute.onkeyup = e.value;
  }

  const handleKeydownChange = (e) => {
    setonKeyDown(e.value);
    currAttribute.onkeydown = e.value;
  }

  return (
    <>
      <div className="field col-12">
        <label htmlFor="controlId">Control ID</label>
        <InputText name="placeholder" value={meta.currentElement.id} disabled />
      </div>
      <div className="field col-12">
        <label htmlFor="maxLen">Max Length</label>
        <InputNumber
          name="maxLength"
          inputId="maxLen"
          onChange={handleAttributeChange}
          value={currAttribute?.maxLength}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onBlur">On Blur</label>
        <Dropdown
          name="onblur"
          value={onBlur}
          options={eventOptions}
          placeholder="Select a Blur Event"
          onChange={e => {handleBlurChange(e)}}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onFocus">On Focus</label>
        <Dropdown
          name="onfocus"
          value={onFocus}
          options={eventOptions}
          placeholder="Select a Focus Event"
          onChange={e => {handleFocusChange(e)}}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onKeyup">On Keyup</label>
        <Dropdown
          name="onkeyup"
          value={onKeyup}
          options={eventOptions}
          placeholder="Select a onKeyup Event"
          onChange={e => {handleKeyupChange(e)}}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onKeyDown">On KeyDown</label>
        <Dropdown
          name="onkeydown"
          value={onKeyDown}
          options={eventOptions}
          placeholder="Select a onKeyDown Event"
          onChange={e => {handleKeydownChange(e)}}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="maxLen">
          Placeholder {currAttribute?.placeholder}{" "}
        </label>
        <InputText
          name="placeholder"
          placeholder="Enter Placeholder"
          onChange={handleAttributeChange}
          value={currAttribute?.placeholder || ""}
        />
      </div>
    </>
  );
};

export default AttrInput;
