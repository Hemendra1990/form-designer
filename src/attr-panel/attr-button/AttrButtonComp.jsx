import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { memo } from "react";
import { useMetaContext } from "../../context/MetaContext";

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
        <label htmlFor="controlId">Control ID</label>
        <InputText
          name="placeholder"
          value={meta.currentElement.id}
          disabled
        />
      </div>
      <div className="field col-12">
        <label htmlFor="eventId">Event ID</label>
        <Dropdown
          name="eventId"
          value={meta.currentElement?.attributes?.eventId}
          options={eventOptions || []}
          onChange={handleAttributeChange}
          placeholder="Select a Event"
        />
      </div>
      <div className="field col-12">
        <label htmlFor="label">Label</label>
        <InputText
          name="label"
          placeholder="Enter Button Label"
          onChange={handleAttributeChange}
          value={meta.currentElement?.attributes?.label}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="label">Type</label>
        <Dropdown
          name="type"
          value={meta.currentElement?.attributes?.type}
          options={BUTTON_TYPES}
          onChange={handleAttributeChange}
          placeholder="Select type"
        />
      </div>
    </>
  );
};

export default memo(AttrButton);
