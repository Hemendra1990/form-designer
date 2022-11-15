import { InputText } from "primereact/inputtext";
import React, { memo, useState } from "react";

const HDInput = React.forwardRef((props, ref) => {
  const { element, meta, setMeta } = props;

  const [value, setValue] = useState(element.value || "");

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

export default memo(HDInput);
