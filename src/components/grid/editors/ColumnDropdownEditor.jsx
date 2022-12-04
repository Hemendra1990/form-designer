import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";

const ColumnDropdownEditor = (props) => {
  const { options, rows, element, columnId } = props;

  const [optionLabel, setOptionLabel] = useState("");
  const [optionValue, setOptionValue] = useState("");

  useEffect(() => {
    setOptionLabel(element.attributes.config[columnId].dropdownLabel);
    setOptionValue(element.attributes.config[columnId].dropdownValue);
  }, []);

  return (
    <Dropdown
      value={options.value}
      options={rows}
      optionLabel={optionLabel}
      optionValue={optionValue}
      onChange={(e) => options.editorCallback(e.value)}
    ></Dropdown>
  );
};

export default ColumnDropdownEditor;
