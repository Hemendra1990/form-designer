import React, { useEffect, useImperativeHandle, useState, useRef } from "react";
import { ListBox } from "primereact/listbox";
import EventExecutor from "../service/EventExecutor";

const HDListBox = React.forwardRef((props, parentRef) => {
  const { element } = props;
  const [selectedValue, setSelectedValue] = useState(null);
  const [listOptions, setListOptions] = useState([]);

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
      console.log("HD Listbox", result);
      const rows = result.rows || [];
      setListOptions(rows);
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
      />
      {/* multiple={element.attributes?.multiple || false} */}
    </>
  );
});

export default HDListBox;
