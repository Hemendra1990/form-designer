
import React from "react";
import { InputText } from 'primereact/inputtext';
 

const ColumnTextEditor = (props) => {
    const {options} = props;

    return (
        <InputText type="text" className="block mb-2" value={options.value} onChange={(e) => options.editorCallback(e.target.value)}  />
    )

};

export default ColumnTextEditor;