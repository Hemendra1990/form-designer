import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from "react";


const AttrInput = (props) => {
  const { meta, handleAttributeChange, eventOptions } = props; //Spread
  const currAttribute = meta?.currentElement?.attributes;
  const [defaultValue, setDefaultValue] = useState("");


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
        <label htmlFor="maxLen" className="block">
          Placeholder
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
