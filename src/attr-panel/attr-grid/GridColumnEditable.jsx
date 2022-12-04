import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";

const GridColumnEditable = (props) => {
  const { element, selectedColumn, columns } = props;
  const [selectedEditableType, setSelectedEditableType] = useState(null);
  const [selectedEditableDropdownOptionLable, setSelectedEditableDropdownOptionLable] = useState(null);
  const [selectedEditableDropdownOptionValue, setSelectedEditableDropdownOptionValue] = useState(null);

  useEffect(() => {
    if (
      selectedColumn &&
      element.attributes.config &&
      element.attributes.config[selectedColumn.id]
    ) {
      setSelectedEditableType(
        element.attributes.config[selectedColumn.id].editableType
      );

      setSelectedEditableDropdownOptionLable(element.attributes.config[selectedColumn.id].dropdownLabel || null);
      setSelectedEditableDropdownOptionValue(element.attributes.config[selectedColumn.id].dropdownValue || null);
    } else {
      setSelectedEditableType(null);
      setSelectedEditableDropdownOptionLable(null);
      setSelectedEditableDropdownOptionValue(null);
    }
  }, [selectedColumn]);

  const editableFieldTypes = [
    "None",
    "Text",
    "Dropdown",
    "Multiselect",
    "Checkbox",
    "Datepicker",
  ];

  const updateElement = (e) => {
    setSelectedEditableType(e.value);
    if (element.attributes) {
      element.attributes.config = element.attributes.config || {};
      element.attributes.config[selectedColumn.id] =
        element.attributes.config[selectedColumn.id] || {};
      element.attributes.config[selectedColumn.id].editable = true;
      element.attributes.config[selectedColumn.id].editableType = e.value;
    }
  };

  const renderOtherOptions = () => {
    
    switch(selectedEditableType) {
        case 'Dropdown':
            return (
                <>
                    <div className="col-4 lg:col-4 sm:col-12">
                        <label className="block mb-2">Option Lable</label>
                        <Dropdown options={columns} optionLabel="header" optionValue="field" value={selectedEditableDropdownOptionLable} onChange={(e) => {setSelectedEditableDropdownOptionLable(e.value); element.attributes.config[selectedColumn.id].dropdownLabel = e.value;}} />
                    </div>
                    <div className="col-4 lg:col-4 sm:col-12">
                        <label className="block mb-2">Option Value</label>
                        <Dropdown options={columns} optionLabel="header" optionValue="field" value={selectedEditableDropdownOptionValue} onChange={(e) => {setSelectedEditableDropdownOptionValue(e.value); element.attributes.config[selectedColumn.id].dropdownValue = e.value;}} />
                    </div>
                </>
            )
            default:
                return <></>
    }
  }

  return (
    <>
     <div className="grid p-fluid">
        <div className="col-4 lg:col-4 sm:col-12">
            <Dropdown
                value={selectedEditableType}
                options={editableFieldTypes}
                onChange={(e) => {
                updateElement(e);
                }}
            ></Dropdown>
        </div>
        <div className="col-12">
            <div className="grid p-fluid">
                {renderOtherOptions()}
            </div>
        </div>
     </div>

      
    </>
  );
};

export default GridColumnEditable;
