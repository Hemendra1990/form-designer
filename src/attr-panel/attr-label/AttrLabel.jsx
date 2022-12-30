import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import React, { Fragment, useEffect, useState } from "react";

const AttrLabel = (props) => {
  const { currentElement, eventOptions } = props;
  const currAttribute = currentElement.attributes;

  const [contentEditable, setContentEditable] = useState(false);
  useEffect(() => {
    setContentEditable(currAttribute.contentEditable || false);

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

    </Fragment>
  );
};

export default AttrLabel;
