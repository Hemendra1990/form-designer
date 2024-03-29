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
  const [icon, setIcon] = useState("");
  const [controlName, setControlName] = useState(meta.currentElement.id || "");

  const handelHideLableContent = (e) => {
    setHideLabelContent(e.checked);
    handleAttributeChange(e);
  }

  const handleIconChange = (e) => {
    setIcon(e.target.value);
    handleAttributeChange(e);
  }

  useEffect(() => {
    setHideLabelContent(currAttribute.hideLabelContent || false);
    setControlName(currAttribute?.name || meta.currentElement.id);
    setIcon(currAttribute?.icon || "")
    if (currAttribute.hideLabelContent) {
      currAttribute.label = "";
    }
    // handleAttributeChange(contentEditable ? meta.currentElement?.attributes?.label : 'Click Here')
  }, [meta.currentElement]);


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
        <label className="block">Hide label Content</label>
        <Checkbox
          inputId="binary"
          name="hideLabelContent"
          value={meta.currentElement?.attributes?.hideLabelContent}
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
      <div className="field col-12">
        <label htmlFor="label" className="block">Icon</label>
        <InputText
          name="icon"
          placeholder="e.g. pi pi-pencil"
          onChange={handleIconChange}
          value={icon}
          style={{ width: '100%' }}
        />
      </div>
    </>
  );
};

export default memo(AttrButton);
