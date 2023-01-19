import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { useUpdateMetaContext } from "../../context/MetaContext";
import React, { useEffect, useState, Fragment } from "react";

const GridColumnEditable = (props) => {
  const { meta, element, selectedColumn, columns } = props;
  const currAttribute = meta?.currentElement?.attributes;

  const emptyOption = { label: "", value: "" };
  const { updateMeta } = useUpdateMetaContext();

  const [selectedEditableType, setSelectedEditableType] = useState(null);
  const [selectedEditableDropdownOptionLable, setSelectedEditableDropdownOptionLable] = useState(null);
  const [selectedEditableDropdownOptionValue, setSelectedEditableDropdownOptionValue] = useState(null);
  const [selctedEditableDropdownType, setSelctedEditableDropdownType] = useState("datasource");
  const [staticOptionDialog, setStaticOptionDialog] = useState(false);
  const [staticOptionList, setStaticOptionList] = useState([emptyOption]);


  const handelInputChange = (event, index) => {
    const updatedStaticOptionList = staticOptionList.map((field, i) => {
      if (i === index) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        return { ...field, ...obj };
      }
      return field;
    });
    setStaticOptionList(updatedStaticOptionList);
  };

  const handelAddclick = () => {
    setStaticOptionList([...staticOptionList, {}]);
  };

  const handelRemoveButton = (index) => {
    const list = [...staticOptionList];
    list.splice(index, 1);
    setStaticOptionList(list);
  };

  const onClick = () => {
    setStaticOptionDialog(true);
    setTimeout(() => {
      setStaticOptionDialog(false);
    }, 20)
  };

  const onHide = () => {
    setStaticOptionDialog(false);
    currAttribute.config = currAttribute.config || {};
    currAttribute.config.staticOptionList = [...staticOptionList];
    setTimeout(() => {
      updateMeta(meta);
    }, 1);
  };

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
    setStaticOptionList(
      currAttribute?.config?.staticOptionList || [emptyOption]
    );
    currAttribute.config.dropdownType = currAttribute?.config?.dropdownType || "datasource";
    setSelctedEditableDropdownType(currAttribute.config.dropdownType);
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

  const selectDropdownType = (e) => {
    if (e.value === 'static') {
      setStaticOptionDialog(true);
    } else {
      setStaticOptionDialog(false);
    }
    setSelctedEditableDropdownType(e.value);
    currAttribute.config.dropdownType = e.value;
    setTimeout(() => {
      updateMeta(meta);
    }, 1);
  }

  const renderOtherOptions = () => {

    switch (selectedEditableType) {
      case 'Dropdown':
        return (
          <>
            <div className="grid col-12 mt-2">
              <div className="field-radiobutton ml-2">
                <RadioButton inputId="city1" name="selectDropdown" value="static"
                  onChange={(e) => selectDropdownType(e)} onClick={(e) => selectDropdownType(e)} checked={selctedEditableDropdownType === 'static'} />
                <label htmlFor="static">Static</label>
              </div>
              <div className="field-radiobutton ml-3">
                <RadioButton inputId="city2" name="selectDropdown" value="datasource"
                  onChange={(e) => selectDropdownType(e)} checked={selctedEditableDropdownType === 'datasource'} />
                <label htmlFor="static">Data Source</label>
              </div>
            </div>
            {selctedEditableDropdownType === "datasource" && <div className="grid col-12">
              <div className="col-4 lg:col-4 sm:col-12">
                <label className="block mb-2">Option Lable</label>
                <Dropdown options={columns} optionLabel="header" optionValue="field" value={selectedEditableDropdownOptionLable} onChange={(e) => { setSelectedEditableDropdownOptionLable(e.value); element.attributes.config[selectedColumn.id].dropdownLabel = e.value; }} />
              </div>
              <div className="col-4 lg:col-4 sm:col-12">
                <label className="block mb-2">Option Value</label>
                <Dropdown options={columns} optionLabel="header" optionValue="field" value={selectedEditableDropdownOptionValue} onChange={(e) => { setSelectedEditableDropdownOptionValue(e.value); element.attributes.config[selectedColumn.id].dropdownValue = e.value; }} />
              </div>
            </div>
            }
            {
              selctedEditableDropdownType === "static" &&
              <Button label="Add Static Options" onClick={(e) => {
                setStaticOptionDialog(true);
              }} className="p-button-raised p-button-success p-button-text" />
            }

            <Dialog
              header="Static Options"
              position="center"
              visible={staticOptionDialog}
              style={{ width: "45vw", height: "60vh" }}
              onHide={() => onHide()}
            >
              <div
                className="grid col-12 ml-1 mr-1"
                style={{ borderBottom: "0.4px solid #c7c2c2" }}
              >
                <div className="grid col-5 mt-0 align-items-center">
                  <h5>Label</h5>
                </div>
                <div className="grid col-5 mt-0 ml-4 align-items-center">
                  <h5>Value</h5>
                </div>
                <div className="col-1 ml-auto">
                  <em
                    title="Add Property"
                    onClick={handelAddclick}
                    className="pi pi-plus-circle "
                  ></em>
                </div>
              </div>
              {staticOptionList.map((staticOption, index) => {
                return (
                  <Fragment key={index}>
                    <div className="grid align-items-center mt-1">
                      <div className="col-5">
                        <InputText
                          style={{ width: "100%" }}
                          name="label"
                          key={index}
                          value={staticOption.label || ""}
                          placeholder="Label"
                          onChange={(event) => {
                            handelInputChange(event, index);
                          }}
                        />
                      </div>
                      <div className="col-5">
                        <InputText
                          style={{ width: "100%" }}
                          name="value"
                          key={index}
                          value={staticOptionList[index].value || ""}
                          placeholder="Value"
                          onChange={(e) => {
                            handelInputChange(e, index);
                          }}
                        />
                      </div>
                      {staticOptionList.length !== 1 && (
                        <div className="col-2">
                          <Button
                            icon="pi pi-times"
                            className="p-button-rounded p-button-danger p-button-outlined"
                            onClick={() => handelRemoveButton(index)}
                          />
                        </div>
                      )}
                    </div>
                  </Fragment>
                );
              })}
            </Dialog>
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
