import React, { memo, useEffect, useImperativeHandle, useState } from "react";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { useModalContext } from "../context/ModalContext";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { Calendar } from "primereact/calendar";
import { addElementStyle } from "../control-styles/ControlStyles";



const HDDatePicker = React.forwardRef((props, ref) => {
    const element = props.element;
    const { actions, modals } = useModalContext();
    const { updateMeta } = useUpdateMetaContext();
    const meta = useMetaContext();
    const [controlStyle, setControlStyle] = useState();
    const [date, setDate] = useState(null);
    useImperativeHandle(ref, () => ({
        getStyleAttributes: () => {
            return ControlStyleModel.getDatePickerStyle();
        },
        addStyle(style = "") {
            setControlStyle(style);
        }
    }));
    useEffect(() => {
        updateMeta(meta);
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
    if (!(element.attributes && element.attributes.label)) {
        if (!element.attributes) element.attributes = {};
        element.attributes.label = "Choose date";
    }
    return (
        <>
            <style>{controlStyle}</style>
            <div id={element.id}>
                <Calendar
                    dateFormat="dd/mm/yy"
                    value={date}
                    onChange={(e) => setDate(e.value)}>

                </Calendar>
            </div>
        </>
    );
});
export default memo(HDDatePicker);