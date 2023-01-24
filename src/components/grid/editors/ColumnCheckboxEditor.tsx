import { Checkbox } from "primereact/checkbox";
import React, { useEffect, useState } from "react";

interface ColumnCheckboxEditorProps {
    meta: any;
    options: any;
    columnId: string;
}
const ColumnCheckboxEditor = (props: ColumnCheckboxEditorProps) => {
    const { meta, options, columnId } = props;
    return (
        <>
            <Checkbox inputId="binary" checked={options.value} onChange={(e) => {
                options.editorCallback(e.value);
            }} />
        </>
    );
}

export default ColumnCheckboxEditor