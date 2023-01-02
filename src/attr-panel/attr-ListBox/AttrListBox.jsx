import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from 'primereact/dialog';
import { Button } from "primereact/button";


// interface SelectItem {
//   label: string;
//   value: any;
// }

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
  const [staticOptionList, setStaticOptionList] = useState([{}]);
  const [staticOptionDialog, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState('center');

  const handelInputChange = (e, index) => {
    // meta.currenteElement.attributes.config = meta.currenteElement.attributes.config || {};
    // const config = meta.currenteElement.attributes.config;
    console.log(currAttribute);
    const { name, value } = e.target;
    const list = [...staticOptionList];
    list[index][name] = value;
    setStaticOptionList(list);
    console.log(staticOptionList);
    meta.currentElement.attributes.staticOptionList = staticOptionList;
  }
  const handelAddclick = () => {
    setStaticOptionList([...staticOptionList, {}])
    onClick('staticOptionDialog')
  }

  const handelRemoveButton = index => {
    const list = [...staticOptionList];
    list.splice(index, 1);
    setStaticOptionList(list)
  }

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  }
  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }
  const dialogFuncMap = {
    'staticOptionDialog': setDisplayBasic,
  }

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
      <div className="field col-12" >
        <Button icon="pi pi-plus" label="Add Static Options " style={{ width: "100%" }} onClick={() => { onClick('staticOptionDialog') }} />
      </div>
      <Dialog visible={staticOptionDialog} style={{ width: '45vw' }} onHide={() => onHide('staticOptionDialog')}>
        {
          staticOptionList.map((x, i) => {
            return (
              <div style={{ marginTop: "5px" }}>
                <div className="field col-6">
                  <label className="block">Label</label>
                  <InputText
                    style={{ width: "100%" }}
                    name="label"
                    key={i}
                    value={staticOptionList[i].label}
                    placeholder="Label"
                    onChange={(e) => {
                      handelInputChange(e, i)
                    }}
                  />
                </div>
                <div className="field col-6" style={{ float: "right", marginTop: "-19%" }}>
                  <label className="block">Value</label>
                  <InputText
                    style={{ width: "100%" }}
                    name="value"
                    key={i}
                    value={staticOptionList[i].value}
                    placeholder="Value"
                    onChange={(e) => {
                      handelInputChange(e, i)
                    }}
                  />
                </div>
                {staticOptionList.length - 1 === i &&
                  <div className="field col-12" >

                    <Button icon="pi pi-plus" label="Add More" style={{ width: "100%", marginTop: "-24px" }} onClick={handelAddclick} />
                  </div>
                }
                {staticOptionList.length !== 1 &&
                  <div className="field col-12" >
                    <Button icon="pi pi-times" label="Remove" className="p-button-danger" style={{ width: "100%", marginTop: "-24px" }} onClick={() => handelRemoveButton(i)} />
                  </div>
                }
              </div>
            );
          })
        }
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
    </>
  );
};

export default AttrListBox;
