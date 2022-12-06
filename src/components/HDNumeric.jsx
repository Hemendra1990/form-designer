import React, { memo, useState } from "react";
import { InputNumber } from 'primereact/inputnumber';

const HDNumeric = React.forwardRef((props, ref) => {

    const InputNumberDemo = () => {
        const [values, setValues] = useState("");

        return (
            <div>
                <div className="p-fluid grid formgrid">
                    <div className="field col-12 md:col-3">
                        <label htmlFor="integeronly"></label>
                        <InputNumber inputId="integeronly" value={values} onValueChange={(e) => setValues(e.value)}/>
                    </div>
                </div>
            </div>
        )
    }
});
export default memo(HDNumeric);