import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { ListBox } from "primereact/listbox";
import { ProgressSpinner } from "primereact/progressspinner";
import { SelectButton } from "primereact/selectbutton";
import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useMetaContext, useToastContext } from "../context/MetaContext";

import { InputText } from "primereact/inputtext";
import { Reference } from "../utils/Utils";
import "./ControlStyles.css";

/* Final Expectaion */
/**
 * 
  <element-id><classname> {
    html css classes
  }
 
 #button-JRzr3Cab.p-button {
	color: green;
	background-color: #fafaca;
} 

#button-JRzr3Cab .p-button-label { 
  color: violet;
}

*/

const ControlStyles = (props) => {
  const meta = useMetaContext();
  const element = meta.currentElement;

  const { toastRef } = useToastContext();

  const [elementStyles, setElementStyles] = useState(null);
  const [styleTemplate, setStyleTemplate] = useState(null);
  const [filteredStyleTemplates, setFilteredStyleTemplates] = useState(null);
  const [styleClassChanged, setStyleClassChanged] = useState(true);
  const [selectedStateChanged, setSelectedStateChanged] = useState(true);

  const [selectedStateObj, setSelectedStateObj] = useState();
  const [isLoading, setLoading] = useState(true);

  const { showControlStyle, setShowControlStyle } = props;
  const formRef = useRef();
  const refSubmitButton = useRef();

  /* const [styleStateList, setStyleStateList] = useState([]); */
  let styleClasses = [];

  //Hook form for adding property
  const { control, handleSubmit, reset, watch, getValues } = useForm({
    defaultValues: element.style || {},
  });
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({ control, name: "cssprops" });

  const styleStateList = [
    { label: "Default", value: "default" },
    { label: "Hover", value: "hover" },
    { label: "Focus", value: "focus" },
    { label: "Active", value: "active" },
    { label: "Before", value: "before" },
    { label: "After", value: "after" },
    { label: "Last Child", value: "last-child" },
  ];

  const populateStyleJson = useCallback((style) => {
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
  });

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
    setLoading(false);
    setElementStyles(element.style); //style is another property inside meta
    if (styleClasses) {
      styleClasses.forEach((stl) => {
        if (stl.label === "Header Cell") {
          const selectedStyleClasses = stl.label; //TODO: convert it to the state variables
        }
      });
      //onStyleClassChange();
      if (elementStyles) {
        setSelectedStateObj();
      } else {
        const elementStyles = element.style;
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
    /* setSelectedStyleClass(e.value); */
    //TODO: style clas change implementation pending
    /* setSelectedStateObj(elementStyles[selectedStyleClass][selectedState]); */
  };

  /**
   * Append New Row
   */
  const onAddRow = () => {
    if (getValues().selectedStyleClass && getValues().selectedState) {
      append({
        selectedStyleClass: getValues().selectedStyleClass,
        selectedState: getValues().selectedState,
      });
    } else if (!getValues().selectedStyleClass) {
      toastRef.current.show({
        severity: "error",
        summary: "Choose Class",
        detail: "Choose Class from listbox",
      });
    } else if (!getValues().selectedState) {
      toastRef.current.show({
        severity: "error",
        summary: "Choose State",
        detail: "Choose State from Switces",
      });
    }
  };

  const saveDetails = (data) => {
    //TODO: handle form submit
    console.log(data);
  };

  const handleApply = (e) => {
    console.log(refSubmitButton);
    console.log(formRef);
    e.preventDefault();
    const formValues = getValues();
    console.log(formValues);
    const elementStyle = addElementStyle(
      formValues,
      element,
      meta,
      setShowControlStyle
    );
    element.style = { ...formValues };
    Reference.of(meta, element.id).addStyle(elementStyle);
    console.log(elementStyle);
    setShowControlStyle(false);
  };

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => {}}
          className="p-button-text"
        />
        <Button
          label="Apply"
          icon="pi pi-check"
          onClick={(data) => {
            handleApply(data);
          }}
        />
      </div>
    );
  };

  const showSpinner = () => {
    if (isLoading) {
      return (
        <div className="p-d-flex p-ai-center p-jc-center">
          <ProgressSpinner
            style={{ width: "25px", height: "25px", float: "left" }}
            strokeWidth="5"
            fill="#ffffff"
            animationDuration="0.5s"
          />
          <span className="ml-2">Loading...</span>
        </div>
      );
    }
    return <></>;
  };

  return (
    <Dialog
      breakpoints={{ "1360px": "75vw", "960px": "75vw", "640px": "90vw" }}
      header="Control Style"
      focusOnShow={false}
      visible={showControlStyle} /* TODO: this needs to checked later */
      style={{ width: "85%", height: "80vh" }}
      footer={renderFooter("displayBasic2")}
      onHide={() => {
        setShowControlStyle(false);
      }}
      modal={true}
      draggable="true"
      resizable="true"
    >
      {showSpinner()}
      <div className="overflow-x-hidden">
        <div className="flex align-items-end">
          <div className="col-5 mb-2">
            <p className="list-mw">Style templates</p>
            <div className="fluid">
              <span className="float-label p-input-icon-left">
                <AutoComplete
                  value={styleTemplate}
                  suggestions={filteredStyleTemplates}
                  completeMethod={(e) => {
                    searchStyleTemplate(e);
                  }}
                  field="caption"
                  onChange={(e) => {
                    setStyleTemplate(e.value);
                  }}
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
          <div className="mb-4 ml-auto flex gap-1">
            <Button
              icon="pi pi-undo"
              label="Reset"
              tooltip="Edit style template"
              onClick={(e) => {
                clearField(e);
              }}
            ></Button>
            <Button
              icon="pi pi-pencil"
              label="Edit"
              tooltip="Edit style template"
              onClick={(e) => {
                enableFields(e);
              }}
            ></Button>
            <Button
              icon="pi pi-save"
              label="Save"
              tooltip="Edit style template"
              onClick={(e) => {
                saveTemplate(e);
              }}
            ></Button>
          </div>
        </div>

        <form>
          <div className="grid border-top">
            <div className="m-3 cs-listbox pb-3">
              <Controller
                name="selectedStyleClass"
                control={control}
                render={({ field }) => (
                  <ListBox
                    id={field.name}
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e.value);
                      setStyleClassChanged(false);
                      setTimeout(() => {
                        setStyleClassChanged(true);
                      }, 10);
                    }}
                    options={styleClasses}
                    filter={true}
                    style={{ width: "15rem" }}
                  />
                )}
              />
            </div>

            <div className="col-9 sm-9 border-left mb-2 ovf-auto">
              <div className="container">
                <div className="align-items-center">
                  <div className="col-12">
                    <Controller
                      name="selectedState"
                      control={control}
                      render={({ field }) => (
                        <SelectButton
                          id={field.name}
                          value={field.value}
                          options={styleStateList}
                          onChange={(e) => {
                            field.onChange(e.value);
                            setSelectedStateChanged(false);
                            setTimeout(() => {
                              setSelectedStateChanged(true);
                            }, 10);
                          }}
                        ></SelectButton>
                      )}
                    />
                  </div>

                  <div className="grid col-12 ml-2">
                    <div className="grid col-11 mt-0">
                      <h6>Value</h6>
                      <span
                        className="ml-2 mt-1 align-items-start flex"
                        title="Table header and teable cell styles like background-color, text-align, text-decoration etc handle with Edit Options"
                      >
                        <em className="pi pi-info-circle"></em>
                      </span>
                    </div>
                    <div className="col-1 ml-auto">
                      <em
                        title="Add Property"
                        onClick={(e) => {
                          console.log("Add property", getValues());
                          onAddRow(e);
                        }}
                        className="pi pi-plus-circle cursp"
                      ></em>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid align-items-center mt-1">
                {/* Add new rows for the class names */}
                {styleClassChanged &&
                  selectedStateChanged &&
                  getValues().selectedStyleClass &&
                  getValues().selectedState &&
                  fields
                    .filter((fld) => {
                      console.log("----", fld);
                      return (
                        fld.selectedStyleClass ===
                          getValues().selectedStyleClass &&
                        fld.selectedState === getValues().selectedState
                      );
                    })
                    .map((item, index) => {
                      let selectedStyleClass = getValues().selectedStyleClass;
                      let selectedState = getValues().selectedState;
                      //cssprops

                      return (
                        <Fragment key={item.id}>
                          <div className="col-5">
                            <Controller
                              control={control}
                              name={`${selectedStyleClass}.${selectedState}.cssprops[${index}].className`}
                              render={({ field }) => (
                                <InputText
                                  key={field.id}
                                  value={field.value}
                                  placeholder="background-color"
                                  id={field.name}
                                  {...field}
                                  style={{ width: "100%" }}
                                  autoFocus
                                />
                              )}
                            />
                          </div>
                          <div key={item.id} className="col-5">
                            <Controller
                              control={control}
                              name={`${selectedStyleClass}.${selectedState}.cssprops[${index}].classValue`}
                              render={({ field }) => (
                                <InputText
                                  key={field.id}
                                  value={field.value}
                                  placeholder="#fafacd"
                                  id={field.name}
                                  {...field}
                                  style={{ width: "100%" }}
                                />
                              )}
                            />
                          </div>
                          <div className="col-2">
                            <Button
                              icon="pi pi-times"
                              onClick={() => {
                                remove(index);
                              }}
                              className="p-button-rounded p-button-danger p-button-outlined"
                            />
                          </div>
                        </Fragment>
                      );
                    })}
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default memo(ControlStyles);

export function addElementStyle(
  formValues,
  element,
  meta,
  setShowControlStyle
) {
  const { cssprops } = formValues;

  if (cssprops && cssprops.length > 0) {
    let ans = "";

    let elementStyle = "";
    cssprops.forEach(({ selectedState, selectedStyleClass }) => {
      ans = `#${element.id}`;
      const classStr = selectedStyleClass.substring(
        1,
        selectedStyleClass.length
      );
      const stateStr =
        selectedState.charAt(0) === "."
          ? selectedState.substring(1, selectedState.length)
          : selectedState;
      const styleProps = formValues[classStr][stateStr].cssprops;
      const result = styleProps
        .map(({ className, classValue }) => {
          return `${className}:${classValue}`;
        })
        .join(";");

      if (selectedState === "default") {
        ans += ` ${selectedStyleClass} { ${result}} `;
      } else {
        ans += ` ${selectedStyleClass}:${selectedState} { ${result}} `;
      }

      elementStyle += ans;
    });

    return elementStyle;
  }
}
