import React, { useEffect, useState } from "react";
import { ListBox } from "primereact/listbox";
import EventExecutor from "../service/EventExecutor";

const HDListBox = React.forwardRef((props, ref) => {
  const { element } = props;
  const [selectedValue, setSelectedValue] = useState(null);

  const handleOnChangeEvent = (e) => {
    if (element.attributes && element.attributes.onchangeevent) {
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onchangeevent,
        null,
        null
      );
    }
  };
  const handleFilterValueChangeEvent = (e) => {
    if (element.attributes && element.attributes.onfiltervaluechange) {
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onfiltervaluechange,
        null,
        null
      );
    }
  };

  const listOptions = [
    /* This value will come from user's input or from datasource in future */
    { label: "New York", value: "NY", country: "USA" },
    { label: "Rome", value: "RM", country: "Italy" },
    { label: "London", value: "LDN", country: "UK" },
    { label: "Istanbul", value: "IST", country: "Turkey" },
    { label: "Paris", value: "PRS", country: "France" },
  ];

  useEffect(() => {
    element.attributes = element.attributes || {};
    element.attributes.multiple = false;
  }, []);

  return (
    <>
      <ListBox
        value={selectedValue}
        options={listOptions}
        onChange={(e) => {
          setSelectedValue(e.value);
          handleOnChangeEvent(e);
          handleFilterValueChangeEvent(e);
        }}
        optionValue={element.attributes.optionValue || "value"}
        optionLabel={element.attributes.optionLabel || "label"}
        disabled={element.attributes?.disabled || false}
        filter={element.attributes?.filter || false}
        filterBy={element.attributes?.filterby}
        tooltip={element.attributes?.tooltip}
      />
      {/* multiple={element.attributes?.multiple || false} */}
    </>
  );
});

export default HDListBox;
