import React, { useState } from "react";
import { RadioButton } from "primereact/radiobutton";
import { useImperativeHandle } from "react";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import EventExecutor from "../service/EventExecutor";
import { InputNumber } from "primereact/inputnumber";

const HDRadioButton = React.forwardRef((props, ref) => {
  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext();
  const { element } = props;

  const [value, setValue] = useState(element.value || "");

  useImperativeHandle(ref, () => ({
    sayHello() {
      alert("Hello Imperative handle");
    },
    updateValue(value) {
      setValue(value);
    },
  }));

  const executeFocusEvent = () => {
    if (element.attributes && element.attributes.onfocus) {
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onfocus,
        null,
        null
      );
    }
  };
  const executeBlurEvent = () => {
    if (element.attributes && element.attributes.onblur) {
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onblur,
        null,
        null
      );
    }
  };

  const executeKeyupEvent = () => {
    if (element.attributes && element.attributes.onkeyup) {
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onkeyup,
        null,
        null
      );
    }
  };

  const executeKeyDownEvent = () => {
    if (element.attributes && element.attributes.onkeydown) {
      EventExecutor.executeEvent(
        props.meta,
        element.attributes.onkeydown,
        null,
        null
      );
    }
  };

  const handleBlur = (e) => {
    element.value = value;
  };

  /**Below are the sample code for radio button coped from primeng */
  const categories = [
    { name: "Accounting", key: "A" },
    { name: "Marketing", key: "M" },
    { name: "Production", key: "P" },
    { name: "Research", key: "R" },
  ];
  
  const [selectedCategory, setSelectedCategory] = useState(categories[1]);

  return (
    <>
      {categories.map((category) => {
        return (
          <div key={category.key} className="field-radiobutton">
            <RadioButton
              inputId={category.key}
              name="category"
              value={category}
              onChange={(e) => setSelectedCategory(e.value)}
              checked={selectedCategory.key === category.key}
              disabled={category.key === "R"}
            />
            <label htmlFor={category.key}>{category.name}</label>
          </div>
        );
      })}
    </>
  );
});

export default HDRadioButton;
