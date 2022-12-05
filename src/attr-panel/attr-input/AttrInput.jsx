import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React from "react";

const AttrInput = (props) => {
  const { meta, handleAttributeChange, eventOptions } = props; //Spread
  const currAttribute = meta?.currentElement?.attributes;

  console.log(meta);

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
