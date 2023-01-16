import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

const AttrLabel = (props) => {
  const { handleAttributeChange, currentElement, meta } = props;
  const currAttribute = meta?.currentElement?.attributes;

  const [contentEditable, setContentEditable] = useState(false);
  const [controlName, setControlName] = useState(meta.currentElement.id || "");

  useEffect(() => {
    setContentEditable(currAttribute.contentEditable || false);
    setControlName(currAttribute?.name || meta.currentElement.id);
  }, [meta.currentElement]);

  return (
    <>
      <div className="field col-12">
        <label htmlFor="controlId" className="block">Control ID</label>
        <InputText name="placeholder"
          style={{ width: '100%' }}
          value={meta.currentElement.id} disabled />
      </div>
      <div className="field col-12">
        <label htmlFor="controlName" className="block">
          Name
        </label>
        <InputText
          name="name"
          style={{ width: "100%" }}
          value={controlName}
          onChange={(e) => {
            setControlName(e.target.value);
            handleAttributeChange(e);
          }}
        />
      </div>
      <div className="field col-12">
        <label className="block">Content Editable?</label>
        <Checkbox
          inputId="binary"
          name="contentEditable"
          checked={contentEditable}
          onChange={(e) => {
            setContentEditable(e.checked);
            currAttribute.contentEditable = e.checked;
          }}
        />
      </div>
    </>
  );
};

export default AttrLabel;
