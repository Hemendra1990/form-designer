import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React, { Fragment, useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useUpdateMetaContext } from "../../context/MetaContext";
import { Slider } from "primereact/slider";

const AttrRadio = (props) => {
  const { meta, handleAttributeChange, updateClass, eventOptions } = props;
  const currAttribute = meta?.currentElement?.attributes;

  const emptyOption = [{ name: 'Male', id: "M" }, { name: "Female", id: "F" }];
  const { updateMeta } = useUpdateMetaContext(); //This is important, unless we update the meta attributes won't automatically reflect the changes

  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const [className, setClassName] = useState("");
  const [staticOptionDialog, setStaticOptionDialog] = useState(false);
  const [staticOptionList, setStaticOptionList] = useState(emptyOption);
  const [heightSize, setHeightSize] = useState(null);
  const [controlName, setControlName] = useState(meta.currentElement.id || "");
  const [colValue, setColValue] = useState(4);

  const handelDisableEventContent = (e) => {
    setDisabled(e.checked);
    handleAttributeChange(e);
  }
  const handelTooltipEventContent = (e) => {
    setTooltip(e.target.value);
    handleAttributeChange(e);
  }
  const handelRequiredEventContent = (e) => {
    setRequired(e.checked);
    handleAttributeChange(e);
  }

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
    setClassName(currAttribute.className || "");
    setDisabled(currAttribute.disabled || false);
    setRequired(currAttribute.required || false);
    setTooltip(currAttribute.tooltip || "");
    setHeightSize(currAttribute.heightSize || null);
    setControlName(currAttribute?.name || meta.currentElement.id);
    setStaticOptionList(
      currAttribute?.config?.staticOptionList || emptyOption
    );
  }, [meta.currentElement])

  return (
    <>
      <div className="field col-12">
        <label htmlFor="controlId" className="block">
          Control ID
        </label>
        <InputText
          name="placeholder"
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
      <div className="grid col-12">
        <div className="grid col-6">
          <div className="field col-6">
            <label htmlFor="maxLen" className="block">
              Disabled
            </label>
            <Checkbox
              inputId="binary"
              name="disabled"
              checked={currAttribute?.disabled}
              onChange={handelDisableEventContent}
            />
          </div>
        </div>
        <div className="grid col-6">
          <div className="field col-6">
            <label htmlFor="maxLen" className="block">
              Required
            </label>
            <Checkbox
              inputId="binary"
              name="required"
              checked={currAttribute?.required}
              onChange={handelRequiredEventContent}
            />
          </div>
        </div>
      </div>
      <div className="field col-12">
        <label htmlFor="maxLen" className="block">
          tooltip
        </label>
        <InputText
          style={{ width: '100%' }}
          name="tooltip"
          placeholder="Enter tooltip value"
          value={currAttribute?.tooltip || tooltip}
          onChange={handelTooltipEventContent}
        />
      </div>
      <div className="field col-12">
        <label className="block">Height</label>
        <InputNumber
          style={{ width: "100%" }}
          name="heightSize"
          placeholder="Enter height"
          value={heightSize}
          onChange={(e) => {
            setHeightSize(e.value);
            handleAttributeChange(e);
          }}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="class" className="block">
          Class ( col -{currAttribute.classNameSlider || 4} )
        </label>
        <InputText
          name="className"
          className="mt-3"
          placeholder="col-12 md:col-6 lg:col-3"
          value={currAttribute?.className || ""}
          style={{ width: "100%" }}
          onChange={updateClass}
        />
        <Slider
          name="classNameSlider"
          value={currAttribute.classNameSlider || 4}
          onChange={(e) => {
            setColValue(e.value);
            if (!currAttribute) {
              currAttribute = {};
            }
            currAttribute.classNameSlider = e.value;
            currAttribute.className = 'col-' + colValue;
            updateClass(e);
          }}
          min={1}
          max={12}
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
                    name="name"
                    key={index}
                    value={staticOption.name || ""}
                    placeholder="Label"
                    onChange={(event) => {
                      handelInputChange(event, index);
                    }}
                  />
                </div>
                <div className="col-5">
                  <InputText
                    style={{ width: "100%" }}
                    name="id"
                    key={index}
                    value={staticOptionList[index].id || ""}
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
  );
};

export default AttrRadio;
