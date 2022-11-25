import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useImperativeHandle } from "react";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";

const HDInput = React.forwardRef((props, ref) => {
  
  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext()
  const { element } = props;
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
  }));

  useEffect(() => {
    console.log('Input render sarila');
    updateMeta(meta); //This is necesary, put in all the components... we need to update the meta.elementMap so need to call thuis method after the input is rendered
  }, []);
  


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
