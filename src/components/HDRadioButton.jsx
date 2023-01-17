import React, { useState, useEffect, useRef } from "react";
import { RadioButton } from "primereact/radiobutton";
import { useImperativeHandle } from "react";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import EventExecutor from "../service/EventExecutor";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";
import { Tooltip } from 'primereact/tooltip';

const HDRadioButton = React.forwardRef((props, parentRef) => {

  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext();
  const { element } = props;

  const emptyOption = [{ name: 'Male', id: 'm' }, { name: 'Female', id: 'f' }];

  const getPrimeRadioRef = useRef(parentRef);

  const [controlStyle, setControlStyle] = useState();
  const [selectedValue, setSelectedValue] = useState([emptyOption]);
  const [columnOption, setColumnOption] = useState([emptyOption]);
  const [radioButtonList, setRadioButtonList] = useState([emptyOption]);
  const [checkEmptyList, setCheckEmptyList] = useState(false);
  const [isRefInitialize, setRefInitialize] = useState(false);

  const handleOnChangeEvent = (event) => {
    if (element.attributes && element.attributes.onChange) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onChange,
        { data: event.value },
        null
      );
    }
  };

  const operations = {
    setResult: (result) => {
      const rows = result.rows || [];
      if (result.columns && result.columns.length > 0) {
        setColumnOption(result.columns || []);
      }
      if (rows.length <= 0) {
        setRadioButtonList(element.attributes?.config?.staticOptionList || []);
      }
      else {
        setRadioButtonList(rows);
        setCheckEmptyList(true);
      }

    },

    getColumnList() {
      return columnOption
    },

    sayHello() {
      alert("Hello Imperative handle");
    },

    getStyleAttributes: () => {
      return ControlStyleModel.getRadioStyle();
    },

    addStyle(style = "") {
      setControlStyle(style);
    },

    setRadioButtonValue(value) {
      setSelectedValue(value);
    },

    getRadioButtonValue() {
      return selectedValue;
    },

    getDisableRadioButton() {
      if (element.attributes && element.attributes.disabled !== undefined) {
        return element.attributes.disabled;
      }
    },

    setDisableRadioButton(value) {
      return element.attributes.disabled = value;
    },

    getRequiredRadioButton() {
      if (element.attributes && element.attributes.required !== undefined) {
        return element.attributes.required;
      }
    },

    setRequiredRadioButton(value) {
      return element.attributes.required = value;
    },

    getPrimeRadioRef
  }


  useImperativeHandle(parentRef, () => {
    setRefInitialize(true);
    return operations;
  });

  const renderOptionList = () => {
    let result = [];
    if (checkEmptyList) {
      result = radioButtonList;
    } else {
      result = element?.attributes?.config?.staticOptionList || emptyOption;
    }
    return (<>
      {result.map((item) => {
        return (
          <div key={item.id} className="field-radiobutton">
            <RadioButton
              ref={getPrimeRadioRef}
              inputId={item.id}
              key={item.id}
              name="selectedValue"
              value={item}
              onChange={(e) => {
                setSelectedValue(e.value);
                handleOnChangeEvent(e);
              }}
              tooltip={item.name}
              checked={selectedValue.id === item.id}
              disabled={element?.attributes?.disabled || false}
              required={element?.attributes?.required || false}
            />
            <label htmlFor={item.key} >{item.name}</label>
          </div>
        );
      })}
    </>)
  }

  useEffect(() => {
    updateMeta(meta);
    setSelectedValue(element?.attributes?.selectedValue || [emptyOption]);
    // setColumnOption(element?.attributes?.columnOption || [emptyOption]);
    // setRadioButtonList(element?.attributes?.radioButtonList || [emptyOption]);
    // setCheckEmptyList(element.attributes.checkEmptyList)

    //Apply style if the element already has
    if (element.ref && element.ref.current && element.ref.current.getStyleAttributes) {
      if (element.style) {
        const elementStyle = addElementStyle(
          element.style,
          element,
          meta,
          setControlStyle
        );
        setControlStyle(elementStyle);
      }
    }
  }, [isRefInitialize]);

  return (
    <>
      <style>{controlStyle}</style>
      <div id={element.id} style={{ overflow: "auto", height: `${element.attributes.heightSize || 10}vh` }}>
        {renderOptionList()}
      </div>
    </>
  );
});

export default HDRadioButton;
