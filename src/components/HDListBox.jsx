import React, { useEffect, useImperativeHandle, useState, useRef } from "react";
import { ListBox } from "primereact/listbox";
import EventExecutor from "../service/EventExecutor";

const HDListBox = React.forwardRef((props, parentRef) => {
  const { element } = props;
  const [selectedValue, setSelectedValue] = useState(null);
  const [listOptions, setListOptions] = useState([]);

  const [labelValueOptions, setLabelValueOptions] = useState([]);

  const primeListRef = useRef(parentRef);

  console.log(element);

  const handleOnChangeEvent = (e) => {
    if (element.attributes && element.attributes.onchangeevent) {
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onchangeevent,
        null,
        null
      );
    }
  };
  const handleFilterValueChangeEvent = (e) => {
    if (element.attributes && element.attributes.onfiltervaluechange) {
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onfiltervaluechange,
        null,
        null
      );
    }
  };

  const operations = {
    setResult: (result) => {
      const rows = result.rows || [];
      if (result.columns && result.columns.length > 0) {
        setLabelValueOptions(result.columns);
      }
      if (rows.length <= 0) {
        setListOptions(element.attributes.staticLabelAndValueList);
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

    primeListRef,
  };


  useImperativeHandle(parentRef, () => {
    return operations;
  });

  useEffect(() => {
    element.attributes = element.attributes || {};
    element.attributes.multiple = false;
  }, []);

  return (
    <>
      <ListBox
        ref={primeListRef}
        value={selectedValue}
        options={listOptions}
        onChange={(e) => {
          setSelectedValue(e.value);
          handleOnChangeEvent(e);
          handleFilterValueChangeEvent(e);
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
      {/* multiple={element.attributes?.multiple || false} */}
    </>
  );
});

export default HDListBox;
