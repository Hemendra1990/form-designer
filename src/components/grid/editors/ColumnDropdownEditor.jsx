import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";

const ColumnDropdownEditor = (props) => {
  const { meta, options, rows, element, columnId } = props;

  const [optionLabel, setOptionLabel] = useState("");
  const [optionValue, setOptionValue] = useState("");

  useEffect(() => {
    if (meta?.currentElement?.attributes?.config?.dropdownType === "static") {
      setOptionLabel("label");
      setOptionValue("value");
    } else {
      setOptionLabel(element.attributes.config[columnId].dropdownLabel);
      setOptionValue(element.attributes.config[columnId].dropdownValue);
    }

  }, []);

  return (
    <Dropdown
      value={options.value || ""}
      options={meta?.currentElement?.attributes?.config?.dropdownType === "static" ? meta?.currentElement?.attributes?.config?.staticOptionList : rows}
      optionLabel={optionLabel}
      optionValue={optionValue}
      onChange={(e) => options.editorCallback(e.value)}
    ></Dropdown>
  );
};

export default ColumnDropdownEditor;
