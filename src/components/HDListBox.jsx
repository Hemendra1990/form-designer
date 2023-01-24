import React, { useEffect, useImperativeHandle, useState, useRef } from "react";
import { ListBox } from "primereact/listbox";
import EventExecutor from "../service/EventExecutor";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";
import { useMetaContext } from "../context/MetaContext";

const HDListBox = React.forwardRef((props, parentRef) => {
  const { element } = props;
  const [selectedValue, setSelectedValue] = useState(null);
  const [listOptions, setListOptions] = useState([]);
  const [labelValueOptions, setLabelValueOptions] = useState([]);
  const getPrimeListRef = useRef(parentRef);
  const [controlStyle, setControlStyle] = useState();
  const [isRefInitialize, setRefInitialize] = useState(false);

  const { meta } = useMetaContext();
  const [showHideFlag, setShowHideFlag] = useState(true);

  const showHide = (value) => {//expecing the value to be boolean
    setShowHideFlag(value);
  }

  const handleOnChangeEvent = (event) => {
    if (element.attributes && element.attributes.onchangeevent) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onchangeevent,
        { data: event.value },
        null
      );
    }
  };
  const handleFilterValueChangeEvent = (event) => {
    if (element.attributes && element.attributes.onfiltervaluechange) {
      props.meta.sqlVariables = {
        ...props.meta.sqlVariables,
        [element.attributes.name]: event.value,
      };
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onfiltervaluechange,
        { data: event.value },
        null
      );
    }
  };

  const operations = {
    setResult: (result) => {
      const rows = result.rows || [];
      if (result.columns && result.columns.length > 0) {
        setLabelValueOptions(result.columns || []);
      }
      if (rows.length <= 0) {
        setListOptions(element.attributes?.config?.staticOptionList || []);
      }
      setListOptions(rows);
    },

    getLabelAndValueOptions() {
      return labelValueOptions;
    },

    startLoader: (value) => {
      //do some stuff
    },

    sayHello(value) {
      alert(value);
    },

    getStyleAttributes: () => {
      return ControlStyleModel.getListboxStyle();
    },

    addStyle(style = "") {
      setControlStyle(style);
    },
    getListBoxValue() {
      return selectedValue
    },
    setListBoxValue(value) {
      setSelectedValue(value);
    },
    getPrimeListRef,
    showHide
  };

  useImperativeHandle(parentRef, () => {
    setRefInitialize(true);
    return operations;
  });

  useEffect(() => {
    element.attributes = element.attributes || {};
    element.attributes.multiple = false;
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
      <div id={element.id}>
        <ListBox
          style={showHideFlag ? { display: 'block' } : { display: 'none' }}
          ref={getPrimeListRef}
          value={selectedValue}
          options={
            listOptions.length > 0
              ? listOptions
              : element.attributes?.config?.staticOptionList || []
          }
          onChange={(event) => {
            setSelectedValue(event.value);
            handleOnChangeEvent(event);
            handleFilterValueChangeEvent(event);
          }}
          optionValue={element.attributes.optionValue || "value"}
          optionLabel={element.attributes.optionLabel || "label"}
          disabled={element.attributes?.disabled || false}
          filter={element.attributes?.filter || false}
          filterBy={element.attributes?.filterby}
          tooltip={element.attributes?.tooltip}
          listStyle={{
            maxHeight: element.attributes?.maxHeight || "225px",
          }}
        />
      </div>
      {/* multiple={element.attributes?.multiple || false} */}
    </>
  );
});

export default HDListBox;
