import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import React, { Fragment, memo, useEffect, useState } from "react";

interface SelectItem {
  label: string;
  value: string;
}

interface AttrPasswordProps {
  handleAttributeChange: Function;
  currentElement: any;
  availableEvents: SelectItem[];
  meta: any;
}

const AttrPassword = (props: AttrPasswordProps) => {
  const { handleAttributeChange, currentElement, availableEvents, meta } =
    props;

  const currAttribute = meta?.currentElement?.attributes;
  const [showStrengthIndicator, setShowStrengthIndicator] = useState<any>(null);
  const [showIconToDisplayPassword, setShowIconToDisplayPassword] = useState<any>(null);
  const [panelFooterForPassword, setPanelFooterForPassword] = useState<any>(null);
  const [controlName, setControlName] = useState(meta.currentElement.id || "");

  const handleShowStrengthIndicatorChange = (e: any) => {
    setShowStrengthIndicator(e.checked);
    handleAttributeChange(e);
  };

  const handelShowIconToDisplayPassword = (e: any) => {
    setShowIconToDisplayPassword(e.checked);
    handleAttributeChange(e);
  }

  const handelPanelFooterForPassword = (e: any) => {
    setPanelFooterForPassword(e.checked)
    handleAttributeChange(e);
  }

  useEffect(() => {
    setShowStrengthIndicator(currAttribute?.showStrengthIndicator || "");
    setShowIconToDisplayPassword(currAttribute?.showIconToDisplayPassword || "");
    setPanelFooterForPassword(currAttribute?.panelFooterForPassword || "");
    setControlName(currAttribute?.name || meta.currentElement.id);
  }, [meta.currentElement]);

  return (
    <>
      <div className="field col-12">
        <label htmlFor="controlId" className="block">
          Control ID
        </label>
        <InputText
          style={{ width: "100%" }}
          name="controlId"
          value={currentElement.id}
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
      <div className="field col-12">
        <label htmlFor="" className="block">
          Placeholder
        </label>
        <InputText
          style={{ width: "100%" }}
          name="placeholder"
          value={currAttribute?.placeholder}
          onChange={(e) => {
            currAttribute.placeholder = e.target.value;
            handleAttributeChange(e);
          }}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="" className="block">
          Show the strength indicator or not?
        </label>
        <Checkbox
          name="showStrengthIndicator"
          inputId="binary"
          checked={showStrengthIndicator}
          onChange={handleShowStrengthIndicatorChange}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="" className="block">
          Whether to show an icon to display the password as plain text?
        </label>
        <Checkbox
          name="showIconToDisplayPassword"
          inputId="binary"
          checked={showIconToDisplayPassword}
          onChange={handelShowIconToDisplayPassword}
        />
      </div>
      <div className="field col-12">
        <label htmlFor="" className="block">
          Template of panel footer for password format(<b>Strength indicator must be enabled?</b>)
        </label>
        <Checkbox
          name="panelFooterForPassword"
          inputId="binary"
          checked={panelFooterForPassword}
          onChange={handelPanelFooterForPassword}
        />
      </div>
    </>
  );
};

export default AttrPassword;
