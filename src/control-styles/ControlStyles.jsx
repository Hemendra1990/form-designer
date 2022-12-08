import React, { memo, useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { AutoComplete } from "primereact/autocomplete";
import { ListBox } from "primereact/listbox";
import { SelectButton } from "primereact/selectbutton";
import { useForm, Controller } from "react-hook-form";
import { useMetaContext } from "../context/MetaContext";

import "./ControlStyles.css";

const ControlStyles = (props) => {
  const [elementStyles, setElementStyles] = useState(null);

  const [showControlStyle, setShowControlStyle] = useState(true);
  const [styleTemplate, setStyleTemplate] = useState(null);
  const [filteredStyleTemplates, setFilteredStyleTemplates] = useState(null);
  const [selectedStyleClass, setSelectedStyleClass] = useState(null);
  const [selectedState, setSelectedState] = useState("default");

  const [selectedStateObj, setSelectedStateObj] = useState();

  /* const [styleStateList, setStyleStateList] = useState([]); */
  let styleClasses = [];

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({});

  const meta = useMetaContext();
  const styleStateList = [
    { label: "Default", value: "default" },
    { label: "Hover", value: "hover" },
    { label: "Focus", value: "focus" },
    { label: "Active", value: "active" },
    { label: "Before", value: "before" },
    { label: "After", value: "after" },
    { label: "Last Child", value: "last-child" },
  ];

  const element = meta.currentElement;

  const populateStyleJson = (style) => {
    styleClasses.forEach((el) => {
      if (style[el.value] === undefined) {
        style[el.value] = {};
      }
      if (style[el.value].default === undefined) {
        style[el.value].default = {};
      }
      if (style[el.value].hover === undefined) {
        style[el.value].hover = {};
      }
      if (style[el.value].active === undefined) {
        style[el.value].active = {};
      }
      if (style[el.value].focus === undefined) {
        style[el.value].focus = {};
      }
      if (style[el.value].before === undefined) {
        style[el.value].before = {};
      }
      if (style[el.value].after === undefined) {
        style[el.value].after = {};
      }
      if (style[el.value]["last-child"] === undefined) {
        style[el.value]["last-child"] = {};
      }
      if (el.hasOwnProperty("selected")) {
        style[el.value].selected = {};
      }
    });
  };

  if (element) {
    const elementInstance = meta.currentElement.ref.current;
    if (elementInstance && elementInstance.getStyleAttributes) {
      styleClasses = [...elementInstance.getStyleAttributes()];
    }

    if (!element.style) {
      element.style = {};
    }
    populateStyleJson(element.style);
  }

  useEffect(() => {
    setElementStyles(element.style); //style is another property inside meta
    setSelectedState("default");
    if (styleClasses) {
      setSelectedStyleClass(styleClasses[0]?.value);
      styleClasses.forEach((stl) => {
        if (stl.label === "Header Cell") {
          const selectedStyleClasses = stl.label; //TODO: convert it to the state variables
        }
      });
      //onStyleClassChange();
      if (elementStyles) {
        setSelectedStateObj(
          elementStyles[styleClasses[0]?.value][selectedState]
        );
      } else {
        const elementStyles = element.style;
        setSelectedStateObj(
          elementStyles[styleClasses[0]?.value][selectedState]
        );
      }
    }
  }, []);

  const clearField = () => {
    //TODO: Clear all the fields
  };

  const enableFields = () => {
    //TODO: enable fields
  };

  const saveTemplate = () => {
    //TODO: save template
  };

  const searchStyleTemplate = () => {
    //TODO: implementation is pending
  };

  const onStyleClassChange = (e) => {
    //TODO: style clas change implementation pending
    setSelectedStateObj(elementStyles[selectedStyleClass][selectedState]);
  };

  const onAddRow = () => {
    //TODO: Implementation is pending
    elementStyles[selectedStyleClass][selectedState][""] = "";
  };

  const onSubmit = (data) => {
    //TODO: handle form submit
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => {}}
          className="p-button-text"
        />
        <Button label="Yes" icon="pi pi-check" onClick={() => {}} autoFocus />
      </div>
    );
  };

  return (
    <Dialog
      breakpoints={{ "1360px": "75vw", "960px": "75vw", "640px": "90vw" }}
      header="Control Style"
      focusOnShow={false}
      visible={showControlStyle} /* TODO: this needs to checked later */
      style={{ width: "85%", height: "80vh" }}
      footer={renderFooter("displayBasic2")}
      onHide={() => setShowControlStyle(false)}
      modal={true}
      draggable="true"
      resizable="true"
    >
      <div className="p-d-flex p-ai-center p-jc-center">
        {/* If loading.... */}
        <ProgressSpinner
          style={{ width: "25px", height: "25px", float: "left" }}
          strokeWidth="5"
          fill="#ffffff"
          animationDuration="0.5s"
        />
        <span className="ml-2">Loading...</span>
      </div>

      <div className="overflow-x-hidden">
        {/* If not not loading... */}
        <div className="flex align-items-end">
          <div className="col-5">
            <p className="list-mw">Style templates</p>
            <div className="p-fluid">
              <span className="p-float-label p-input-icon-left">
                <AutoComplete
                  value={styleTemplate}
                  suggestions={filteredStyleTemplates}
                  completeMethod={searchStyleTemplate}
                  field="caption"
                  onChange={(e) => setStyleTemplate(e.value)}
                  aria-label="Countries"
                  dropdownAriaLabel="Select Style Template"
                  autoHighlight={true}
                  dropdown={true}
                  onSelect={(e) => {}}
                  onClear={(e) => {}}
                  onHide={(e) => {}}
                  placeholder="Select style template"
                  emptyMessage="No templates present"
                />
              </span>
            </div>
          </div>
          <div className="p-mb-4 p-ml-auto">
            <Button
              icon="pi pi-undo"
              label="Reset"
              tooltip="Edit style template"
              onClick={clearField}
            ></Button>
            <Button
              icon="pi pi-pencil"
              label="Edit"
              tooltip="Edit style template"
              onClick={enableFields}
            ></Button>
            <Button
              icon="pi pi-save"
              label="Save"
              tooltip="Edit style template"
              onClick={saveTemplate}
            ></Button>
          </div>
        </div>

        <div className="grid border-top">
          <div className="p-sm-3 cs-listbox p-pb-3">
            <ListBox
              filter={true}
              value={selectedStyleClass}
              onChange={
                onStyleClassChange
              } /* (e) => setSelectedStyleClass(e.value);  */
              options={styleClasses}
              style={{ width: "15rem" }}
            />
          </div>

          <div className="p-sm-9 border-left p-mb-2 ovf-auto">
            <div className="container">
              <div className="grid align-items-center">
                <div className="col-12">
                  <SelectButton
                    value={selectedState}
                    options={styleStateList}
                    onChange={onStyleClassChange}
                  ></SelectButton>
                </div>

                <div className="grid col-12 ml-2">
                  <div className="grid col-11 mt-0">
                    <h6>Value</h6>
                    <span
                      className="ml-2 mt-1 align-items-start flex"
                      title="Table header and teable cell styles like background-color, text-align, text-decoration etc handle with Edit Options"
                    >
                      {/* if control type grid */}
                      <em className="pi pi-info-circle"></em>
                    </span>
                  </div>
                  <div className="col-1 ml-auto">
                    <em
                      title="Add Property"
                      onClick={onAddRow}
                      className="pi pi-plus-circle cursp"
                    ></em>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="form_height">
                <div className="p-grid p-ai-center"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default memo(ControlStyles);
