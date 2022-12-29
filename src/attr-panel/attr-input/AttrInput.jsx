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
  const [defaultValue, setDefaultValue] = useState("");

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
  const handelDefaltValue = (e) => {
    setDefaultValue(e.value);
    handleAttributeChange(e);
  }

  return (
    <>
      <div className="field col-12">
        <label htmlFor="controlId" className="block">Control ID</label>
        <InputText name="placeholder" style={{ width: '100%' }} value={meta.currentElement.id} disabled />
      </div>
      <div className="field col-12">
        <label htmlFor="maxLen">Max Length</label>
        <InputNumber
          style={{ width: '100%' }}
          name="maxLength"
          inputId="maxLen"
          onChange={handleAttributeChange}
          value={currAttribute?.maxLength}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onBlur" className="block">On Blur</label>
        <Dropdown
          style={{ width: '100%' }}
          name="onblur"
          value={onBlur}
          options={eventOptions}
          placeholder="Select a Blur Event"
          onChange={e => { handleBlurChange(e) }}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onFocus" className="block">On Focus</label>
        <Dropdown
          style={{ width: '100%' }}
          name="onfocus"
          value={onFocus}
          options={eventOptions}
          placeholder="Select a Focus Event"
          onChange={e => { handleFocusChange(e) }}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onKeyup" className="block">On Keyup</label>
        <Dropdown
          style={{ width: '100%' }}
          name="onkeyup"
          value={onKeyup}
          options={eventOptions}
          placeholder="Select a onKeyup Event"
          onChange={e => { handleKeyupChange(e) }}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onKeyDown" className="block">On KeyDown</label>
        <Dropdown
          style={{ width: '100%' }}
          name="onkeydown"
          value={onKeyDown}
          options={eventOptions}
          placeholder="Select a onKeyDown Event"
          onChange={e => { handleKeydownChange(e) }}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="maxLen" className="block">
          Placeholder {currAttribute?.placeholder}{" "}
        </label>
        <InputText
          style={{ width: '100%' }}
          name="placeholder"
          placeholder="Enter Placeholder"
          onChange={handleAttributeChange}
          value={currAttribute?.placeholder || ""}
        />
      </div>

      <div className="field col-12">
        <label htmlFor="maxLen" className="block">
          Default Value
        </label>
        <InputText
          style={{ width: '100%' }}
          name="defaultValue"
          placeholder="Enter Default value"
          value={currAttribute?.defaultValue}
          onChange={handelDefaltValue}
        />
      </div>
    </>
  );
};

export default AttrInput;
