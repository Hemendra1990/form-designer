import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { memo } from "react";

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
  return (
    <>
      <div className="field col-12">
        <label htmlFor="controlId" className="block">Control ID</label>
        <InputText
          style={{width:'100%'}}
          name="placeholder"
          value={meta.currentElement.id}
          disabled
        />
      </div>
      <div className="field col-12">
        <label htmlFor="eventId" className="block">Event ID</label>
        <Dropdown
          name="eventId"
          value={meta.currentElement?.attributes?.eventId}
          options={eventOptions || []}
          onChange={handleAttributeChange}
          placeholder="Select a Event"
          style={{width:'100%'}}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="label" className="block">Label</label>
        <InputText
          name="label"
          placeholder="Enter Button Label"
          onChange={handleAttributeChange}
          value={meta.currentElement?.attributes?.label}
          style={{width:'100%'}}
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
          style={{width:'100%'}}
        />
      </div>
    </>
  );
};

export default memo(AttrButton);
