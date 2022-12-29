import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { memo, useEffect, useState } from "react";

const BUTTON_TYPES = [
  "p-button-link",
  "p-button-secondary",
  "p-button-success",
  "p-button-info",
  "p-button-warning",
  "p-button-help",
  "p-button-danger",
];

const AttrButton = (props) => {
  const meta = props.meta;
  const { eventOptions, handleAttributeChange } = props;

  const currAttribute = meta?.currentElement?.attributes;
  const [hideLabelContent, setHideLabelContent] = useState(false);

  const handelHideLableContent = (e) => {
    setHideLabelContent(e.checked);
    handleAttributeChange(e);
  }

  useEffect(() => {
    setHideLabelContent(currAttribute.hideLabelContent || false);
    if (currAttribute.hideLabelContent) {
      currAttribute.label = "Click Here";
    }
    // handleAttributeChange(contentEditable ? meta.currentElement?.attributes?.label : 'Click Here')
  }, []);


  return (
    <>
      <div className="field col-12">
        <label htmlFor="controlId" className="block">Control ID</label>
        <InputText
          style={{ width: '100%' }}
          name="placeholder"
          value={meta.currentElement.id}
          disabled
        />
      </div>
      <div className="field col-12">
        <label className="block">Hide label Content</label>
        <Checkbox
          inputId="binary"
          name="hideLabelContent"
          checked={hideLabelContent}
          onChange={handelHideLableContent}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="label" className="block">Label</label>
        <InputText
          name="label"
          placeholder="Enter Button Label"
          onChange={handleAttributeChange}
          value={meta.currentElement?.attributes?.label}
          style={{ width: '100%' }}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="label" className="block">Type</label>
        <Dropdown
          name="type"
          value={meta.currentElement?.attributes?.type}
          options={BUTTON_TYPES}
          onChange={handleAttributeChange}
          placeholder="Select type"
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
};

export default memo(AttrButton);
