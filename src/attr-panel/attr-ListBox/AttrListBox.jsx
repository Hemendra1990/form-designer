import React, { useEffect, useState, Fragment } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useUpdateMetaContext } from "../../context/MetaContext";

const AttrListBox = (props) => {
  const { meta, updateClass, handleAttributeChange } = props;
  const currAttribute = meta?.currentElement?.attributes;

  const emptyOption = { label: "", value: "" };
  const { updateMeta } = useUpdateMetaContext(); //This is important, unless we update the meta attributes won't automatically reflect the changes

  const [className, setClassName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [filter, setFilter] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const [filterby, setFilterBy] = useState("");
  const [optionLabel, setOptionLabel] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [options, setOptions] = useState([]);
  const [staticOptionList, setStaticOptionList] = useState([emptyOption]);
  const [staticOptionDialog, setStaticOptionDialog] = useState(false);
  const [controlName, setControlName] = useState(meta.currentElement.id || "");

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
    getLabelValueOptions();
    setClassName(currAttribute.className || "");
    setDisabled(currAttribute.disabled || false);
    setMultiple(currAttribute.multiple || false);
    setFilter(currAttribute.filter || false);
    setTooltip(currAttribute.tooltip || "");
    setOptionLabel(currAttribute.optionLabel || undefined);
    setOptionValue(currAttribute.optionValue || undefined);
    setControlName(currAttribute?.name || meta.currentElement.id);
    setStaticOptionList(
      currAttribute?.config?.staticOptionList || [emptyOption]
    );
  }, [meta.currentElement]);

  const getLabelValueOptions = () => {
    setOptions(
      meta?.currentElement?.ref.current?.getLabelAndValueOptions() || []
    );
  };

  return (
    <>
      <div className="field col-12">
        <label htmlFor="controlId" className="block">
          Control ID
        </label>
        <InputText
          name="controlId"
          style={{ width: "100%" }}
          value={meta.currentElement.id}
          disabled
        />
      </div>
      <div className="field col-12">
        <label htmlFor="controlName" className="block">
          Name
        </label>
        <InputText
          name="name"
          style={{ width: "100%" }}
          value={controlName}
          onChange={(e) => {
            setControlName(e.target.value);
            handleAttributeChange(e);
          }}
        />
      </div>
      <div className="field-checkbox">
        <Checkbox
          name="disabled"
          inputId="binary"
          checked={disabled}
          onChange={(e) => {
            setDisabled(e.checked);
            handleAttributeChange(e);
          }}
        />
        <label htmlFor="disabled" className="p-checkbox-label">
          Disabled
        </label>
      </div>
      <div className="field-checkbox">
        <Checkbox
          name="multiple"
          inputId="binary"
          checked={multiple}
          onChange={(e) => {
            setMultiple(e.checked);
            handleAttributeChange(e);
          }}
        />
        <label htmlFor="multiple" className="p-checkbox-label">
          Multiple
        </label>
      </div>
      <div className="field-checkbox">
        <Checkbox
          name="filter"
          inputId="binary"
          checked={filter}
          onChange={(e) => {
            setFilter(e.checked);
            handleAttributeChange(e);
          }}
        />
        <label htmlFor="filter" className="p-checkbox-label">
          Filter
        </label>
      </div>
      {filter && (
        <div className="field col-12">
          <label htmlFor="filterby">Filter By</label>
          <InputText
            value={filterby}
            style={{ width: "100%" }}
            name="filterby"
            onChange={(e) => {
              setFilterBy(e.target.value);
              handleAttributeChange(e);
            }}
          />
        </div>
      )}
      <div className="field col-12">
        <label htmlFor="filterby">Option Label</label>
        <Dropdown
          showClear={true}
          value={optionLabel}
          options={options}
          style={{ width: "100%" }}
          name="optionLabel"
          onFocus={getLabelValueOptions}
          onChange={(e) => {
            setOptionLabel(e.value);
            handleAttributeChange(e);
          }}
          optionLabel="header"
          optionValue="field"
        />
      </div>
      <div className="field col-12">
        <label htmlFor="filterby">Option Value</label>
        <Dropdown
          showClear={true}
          options={options}
          value={optionValue}
          style={{ width: "100%" }}
          name="optionValue"
          onChange={(e) => {
            setOptionValue(e.value);
            handleAttributeChange(e);
          }}
          onFocus={getLabelValueOptions}
          optionLabel="header"
          optionValue="field"
        />
      </div>
      <div className="field col-12">
        <label htmlFor="tooltip">Tooltip</label>
        <InputText
          name="tooltip"
          style={{ width: "100%" }}
          value={tooltip}
          tooltipOptions={{ position: "right", mouseTrack: true }}
          onChange={(e) => {
            setTooltip(e.target.value);
            handleAttributeChange(e);
          }}
        />
      </div>

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

      <div className="field col-12">
        <label className="block">Class</label>
        <InputText
          style={{ width: "100%" }}
          name="className"
          placeholder="col-12 md:col-6 lg:col-3"
          value={className}
          onChange={(e) => {
            setClassName(e.target.value);
            updateClass(e);
          }}
        />
      </div>
      <div className="field col-12">
        <Button
          className="p-button-danger"
          icon="pi pi-plus"
          label="Add Static Options "
          style={{ width: "100%" }}
          onClick={() => {
            onClick();
          }}
        />
      </div>
    </>
  );
};

export default AttrListBox;
