import React, { memo, useEffect, useImperativeHandle, useState } from "react";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { useModalContext } from "../context/ModalContext";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { Calendar } from "primereact/calendar";
import { addElementStyle } from "../control-styles/ControlStyles";
import EventExecutor from "../service/EventExecutor";



const HDDatePicker = React.forwardRef((props, ref) => {
    const element = props.element;
    const { actions, modals } = useModalContext();
    const { updateMeta } = useUpdateMetaContext();
    const meta = useMetaContext();
    const [controlStyle, setControlStyle] = useState();
    const [date, setDate] = useState(null);


    const executeFocusEvent = (event) => {
        if (element.attributes && element.attributes.onFocus) {
            EventExecutor.executeEvent(props.meta, element.attributes.onFocus, { data: event.value }, null);
        }
    }
    const executeBlurEvent = (event) => {
        if (element.attributes && element.attributes.onBlur) {
            EventExecutor.executeEvent(props.meta, element.attributes.onBlur, { data: event.value }, null);
        }
    }

    const executeInputEvents = (event) => {
        if (element.attributes && element.attributes.onInput) {
            EventExecutor.executeEvent(props.meta, element.attributes.onInput, { data: event.value }, null);
        }
    }

    const executeSelectEvents = (event) => {
        if (element.attributes && element.attributes.onSelect) {
            EventExecutor.executeEvent(props.meta, element.attributes.onSelect, { data: event.value }, null);
        }
    }

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
                    placeholder={element?.attributes?.placeholder || ""}
                    dateFormat={element?.attributes?.dataFormat || ""}
                    showWeek={element?.attributes?.showWeek || false}
                    value={date}
                    onChange={(e) => setDate(e.value)}
                    hideOnDateTimeSelect={element?.attributes?.hideOnDateTimeSelect || false}
                    showTime={element?.attributes?.showTime || false}
                    showIcon={element?.attributes?.showIcon || false}
                    icon={element?.attributes?.calenderIcon}
                    selectionMode={element?.attributes?.selectionMode || "single"}
                    showButtonBar={element?.attributes?.showButtonBar || false}
                    onBlur={(e) => executeBlurEvent(e)}
                    onFocus={(e) => { executeFocusEvent(e) }}
                    onInput={(e) => { executeInputEvents(e) }}
                    onSelect={(e) => { executeSelectEvents(e) }}

                >
                </Calendar>
            </div>
        </>
    );
});
export default memo(HDDatePicker);