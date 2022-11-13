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
  const { eventOptions, updateMeta } = props;
  return (
    <>
      <div className="field col-12">
        <label htmlFor="controlId">Control ID</label>
        <InputText
          name="placeholder"
          value={props.meta.currentElement.id}
          disabled
        />
      </div>
      <div className="field col-12">
        <label htmlFor="eventId">Event ID</label>
        <Dropdown
          name="eventId"
          value={props.meta.currentElement?.attributes?.eventId}
          options={eventOptions}
          onChange={updateMeta}
          placeholder="Select a Event"
        />
      </div>
      <div className="field col-12">
        <label htmlFor="label">Label</label>
        <InputText
          name="label"
          placeholder="Enter Button Label"
          onChange={updateMeta}
          value={props.meta.currentElement?.attributes?.label}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="label">Type</label>
        <Dropdown
          name="type"
          value={props.meta.currentElement?.attributes?.type}
          options={BUTTON_TYPES}
          onChange={updateMeta}
          placeholder="Select type"
        />
      </div>
    </>
  );
};

export default memo(AttrButton);
