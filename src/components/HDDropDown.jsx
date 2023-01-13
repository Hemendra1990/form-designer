import React, { useImperativeHandle, useState, useRef, useEffect } from "react";
import { Dropdown } from 'primereact/dropdown';
import EventExecutor from '../service/EventExecutor';
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";

const HDDropDown = React.forwardRef((props, parentRef) => {
  const { element } = props;
  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext()

  const [listOptions, setListOptions] = useState([]);
  const [labelValueOptions, setLabelValueOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [controlStyle, setControlStyle] = useState();

  const getPrimeDropdownRef = useRef(parentRef);

  useEffect(() => {
    updateMeta(meta);
    setSelectedValue(element.attributes?.selectedValue || "");
    setLabelValueOptions(element.attributes?.labelValueOptions || []);
    setListOptions(element.attributes?.listOptions || []);
    //Apply style if the element already has
    if (element.style) {
      setTimeout(() => {
        const elementStyle = addElementStyle(
          element.style,
          element,
          meta,
          setControlStyle
        );
        setControlStyle(elementStyle);
      }, 100);
    }
  }, []);

  const operations = {
    setResult: (result) => {
      const rows = result.rows || [];
      if (result.columns && result.columns.length > 0) {
        setLabelValueOptions(result.columns);
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

    disableDropdown() {
      if (element.attributes && element.attributes.disabled !== undefined) {
        element.attributes.disabled = true;
      }
    },

    getSelectedValue() {
      return selectedValue;
    },

    updateValue: (value) => {
      setSelectedValue(value);
    },

    getActualRef: () => {
      return { ...parentRef };
    },

    getStyleAttributes: () => {
      return ControlStyleModel.getDropdownStyle();
    },

    addStyle(style = "") {
      setControlStyle(style);
    },

    getPrimeDropdownRef,
  }

  useImperativeHandle(parentRef, () => {
    return operations;
  });

  const executeOnChangeEvent = (event) => {
    if (element.attributes && element.attributes.onChangeEvent) {
      EventExecutor.executeEvent(props.meta, element.attributes.onChangeEvent, { data: event.value }, null);
    }
  }
  const executeOnMouseDownEvent = (event) => {
    if (element.attributes && element.attributes.onMouseDownEvent) {
      EventExecutor.executeEvent(props.meta, element.attributes.onMouseDownEvent, { data: event.value }, null);
    }
  }
  const executeOnContextMenuEvent = (event) => {
    if (element.attributes && element.attributes.onContextMenuEvent) {
      EventExecutor.executeEvent(props.meta, element.attributes.onContextMenuEvent, { data: event.value }, null);
    }
  }
  const executeOnFilterEvent = (event) => {
    if (element.attributes && element.attributes.onFilterEvent) {
      EventExecutor.executeEvent(props.meta, element.attributes.onFilterEvent, { data: event.value }, null);
    }
  }
  const executeFocusEvent = (event) => {
    if (element.attributes && element.attributes.onFocus) {
      EventExecutor.executeEvent(props.meta, element.attributes.onFocus, { data: event.value }, null);
    }
  }
  const executeBlurEvent = (event) => {
    if (element.attributes && element.attributes.onBlur) {
      EventExecutor.executeEvent(props.meta, element.attributes.onBlur, { data: event.value }, null);
    }
  }

  return (
    <>
      <style>{controlStyle}</style>
      <div id={element.id}>
        <Dropdown
          ref={getPrimeDropdownRef}
          value={selectedValue}
          options={
            listOptions.length > 0
              ? listOptions
              : element.attributes?.config?.staticOptionList || []
          }
          placeholder={element.attributes?.placeholder || "Please Select an Option"}
          onBlur={(e) => { executeBlurEvent(e) }}
          onFocus={(e) => { executeFocusEvent(e) }}
          onChange={(e) => { setSelectedValue(e.value); executeOnChangeEvent(e); }}
          onMouseDown={(e) => { executeOnMouseDownEvent(e) }}
          onContextMenu={(e) => { executeOnContextMenuEvent(e) }}
          onFilter={(e) => { executeOnFilterEvent(e) }}
          disabled={element.attributes?.disabled || false}
          filter={element.attributes?.filter || false}
          filterBy={element.attributes?.filterby}
          optionValue={element.attributes.optionValue || "value"}
          optionLabel={element.attributes.optionLabel || "label"}
          tooltip={element.attributes?.tooltip}
          showClear={element.attributes?.showClear || false}
        />
      </div>
    </>
  )
});
export default (HDDropDown);
