import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import React, { Fragment, useEffect, useState } from "react";

const AttrLabel = (props) => {
  const { currentElement, eventOptions } = props;
  const currAttribute = currentElement.attributes;

  const [contentEditable, setContentEditable] = useState(false);
  const [onClickEvent, setOnClickEvent] = useState("");

  useEffect(() => {
    setContentEditable(currAttribute.contentEditable || false);
    setOnClickEvent(currAttribute.onclick || "");
  }, []);

  return (
    <Fragment>
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
      <div className="field col-12">
        <label className="block">On Click</label>
        <Dropdown
          style={{ width: "100%" }}
          name="onclick"
          value={onClickEvent}
          options={eventOptions}
          placeholder="Select a onClick Event"
          onChange={(e) => {
            setOnClickEvent(e.value);
            currAttribute.onclick = e.value;
          }}
        />
      </div>
    </Fragment>
  );
};

export default AttrLabel;
