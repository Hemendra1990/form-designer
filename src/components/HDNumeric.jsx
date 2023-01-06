import React, { memo, useEffect, useImperativeHandle, useState, useRef } from "react";
import { InputNumber } from 'primereact/inputnumber';
import { addElementStyle } from "../control-styles/ControlStyles";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { useUpdateMetaContext } from "../context/MetaContext";


const HDNumeric = React.forwardRef((props, ref) => {
    const meta = useUpdateMetaContext();
    const { updateMeta } = useUpdateMetaContext()
    const { element } = props;
    const parentRef = useRef(ref);

    const [value, setValue] = useState("");
    const [controlStyle, setControlStyle] = useState();

    useImperativeHandle(ref, () => {
        return operations;
    });

    const operations = {
        getStyleAttributes: () => {
            return ControlStyleModel.getInputnumberStyle();
        },
        addStyle(style = "") {
            setControlStyle(style);
        },
        parentRef
    }

    useEffect(() => {
        updateMeta(meta); //This is necesary, put in all the components... we need to update the meta.elementMap so need to call thuis method after the input is rendered
        //Apply style if the element already has
        if (element.style) {
            const elementStyle = addElementStyle(
                element.style,
                element,
                meta,
                setControlStyle
            );
            setControlStyle(elementStyle);
        }
    }, []);

    return (
        <>
            <style>{controlStyle}</style>
            <div id={element.id}>
                <InputNumber ref={parentRef} value={value} buttonLayout={"horizontal"} onValueChange={(e) => setValue(e.value)} />
            </div>

        </>
    )
});
export default memo(HDNumeric);