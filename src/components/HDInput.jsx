import { InputText } from "primereact/inputtext";
import React, { memo, useState } from "react";
import { useImperativeHandle } from "react";

const HDInput = React.forwardRef((props, ref) => {
  
  const { element, meta, setMeta } = props;
  console.log("🚀 ~ file: HDInput.jsx ~ line 6 ~ HDInput ~ element", element)

  const [value, setValue] = useState(element.value || "");
  
  /**
   * We can play with the component dynamically
   */
  useImperativeHandle(ref, ()=> ({
    sayHello() {
      alert('Hello Imperative handle')
    },
    updateValue(value) {
      setValue(value);
    }
  }))
  


  const handleBlur = (e) => {
    element.value = value;
  };

  return (
    <>
      <InputText
        ref={ref}
        maxLength={element?.attributes?.maxLength}
        placeholder={element?.attributes?.placeholder}
        name={props.name}
        id={props.name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
      />
    </>
  );
});

export default HDInput;
