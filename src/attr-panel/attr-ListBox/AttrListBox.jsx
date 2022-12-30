import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

const AttrListBox = (props) => {
  const { meta, eventOptions, updateClass, handleAttributeChange } = props;
  const currAttribute = meta?.currentElement?.attributes;

  const [disabled, setDisabled] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [filter, setFilter] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const [filterby, setFilterBy] = useState("");
  const [onChangeEvent, setOnChangeEvent] = useState("");
  const [onFilterChange, setOnFilterChange] = useState("");

  useEffect(() => {
    setDisabled(currAttribute.disabled || false);
    setMultiple(currAttribute.multiple || false);
    setFilter(currAttribute.filter || false);
    setTooltip(currAttribute.tooltip || false);
    setOnChangeEvent(currAttribute.onChangeEvent || false);
    setOnFilterChange(currAttribute.onFilterChange || false);
  }, []);

  const handleOnChangeEvent = (e) => {
    setOnChangeEvent(e.value);
    currAttribute.onchangeevent = e.value;
    handleAttributeChange(e);
  };
  const handleFilterValueChangeEvent = (e) => {
    setOnFilterChange(e.value);
    currAttribute.onfiltervaluechange = e.value;
    handleAttributeChange(e);
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
      <div className="field col-12">
        <label htmlFor="onChangeEvent" className="block">
          onChange
        </label>
        <Dropdown
          style={{ width: "100%" }}
          name="onchangeevent"
          value={onChangeEvent}
          options={eventOptions}
          placeholder="Select a onChange Event"
          onChange={(e) => {
            handleOnChangeEvent(e);
          }}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="onFilterValueChange" className="block">
          onFilterValueChange
        </label>
        <Dropdown
          style={{ width: "100%" }}
          name="onfiltervaluechange"
          value={onFilterChange}
          options={eventOptions}
          placeholder="Select a onFilterChange Event"
          onChange={(e) => {
            handleFilterValueChangeEvent(e);
          }}
        />
      </div>
      <div className="field col-12">
        <label className="block">Class</label>
        <InputText
          style={{ width: "100%" }}
          name="className"
          placeholder="col-12 md:col-6 lg:col-3"
          value={currAttribute?.className || ""}
          onChange={updateClass}
        />
      </div>
    </>
  );
};

export default AttrListBox;
