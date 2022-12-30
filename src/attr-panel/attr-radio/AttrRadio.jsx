import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import React, { useState } from "react";

const AttrRadio = (props) => {
  const { meta, handleAttributeChange, eventOptions } = props;
  const currAttribute = meta?.currentElement?.attributes;
  const [value, setValue] = useState("");

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
