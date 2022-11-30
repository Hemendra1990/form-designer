import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { element } from "prop-types";

const AttrListBox = (props) => {
  const { meta, eventOptions, updateClass, handleAttributeChange } = props;
  const currAttribute = meta?.currentElement?.attributes;

  const [className, setClassName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [multiple, setMultiple] = useState(false);
  const [filter, setFilter] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const [filterby, setFilterBy] = useState("");
  const [optionLabel, setOptionLabel] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setClassName(currAttribute.className || "");
    setDisabled(currAttribute.disabled || false);
    setMultiple(currAttribute.multiple || false);
    setFilter(currAttribute.filter || false);
    setTooltip(currAttribute.tooltip || "");
    setOptionLabel(currAttribute.optionLabel || "");
    setOptionValue(currAttribute.optionValue || "");
  }, []);

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
    </>
  );
};

export default AttrListBox;
