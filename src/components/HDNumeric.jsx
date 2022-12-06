import React, { memo, useState } from "react";
import { InputNumber } from 'primereact/inputnumber';

const HDNumeric = React.forwardRef((props, ref) => {
    const [value, setValue] = useState("");

    return (
        <>
            <InputNumber ref={ref} value={value} onValueChange={(e) => setValue(e.value)} />
        </>
    )
});
export default memo(HDNumeric);