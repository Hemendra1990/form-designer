import { MultiSelect } from 'primereact/multiselect';
import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";
import EventExecutor from '../service/EventExecutor';

const HDMultiSelect = React.forwardRef((props, parentRef) => {
    const { element } = props;
    const meta = useMetaContext();
    const { updateMeta } = useUpdateMetaContext()
    const [selectedValue, setSelectedValue] = useState(null);
    const [controlStyle, setControlStyle] = useState();
    const [multiSelectOptions, setMultiSelectOptions] = useState([]);
    const [labelValueOptions, setLabelValueOptions] = useState([]);
    const [isRefInitialize, setRefInitialize] = useState(false);

    const getPrimeMultiSelectRef = useRef(parentRef);

    const executeOnChangeEvent = (event) => {
        if (element.attributes && element.attributes.onChangeEvent) {
            props.meta.sqlVariables = {
                ...props.meta.sqlVariables,
                [element.attributes.name]: event.value,
            };
            EventExecutor.executeEvent(props.meta, element.attributes.onChangeEvent, { data: event.value }, null);
        }
    }
    const executeOnFilterEvent = (event) => {
        if (element.attributes && element.attributes.onFilterEvent) {
            props.meta.sqlVariables = {
                ...props.meta.sqlVariables,
                [element.attributes.name]: event.value,
            };
            EventExecutor.executeEvent(props.meta, element.attributes.onFilterEvent, { data: event.value }, null);
        }
    }

    /* const executeFocusEvent = (event) => {
         if (element.attributes && element.attributes.onFocus) {
             props.meta.sqlVariables = {
                 ...props.meta.sqlVariables,
                 [element.attributes.name]: event.value,
             };
             EventExecutor.executeEvent(props.meta, element.attributes.onFocus, { data: event.value }, null);
         }
     }
     const executeBlurEvent = (event) => {
         if (element.attributes && element.attributes.onBlur) {
             props.meta.sqlVariables = {
                 ...props.meta.sqlVariables,
                 [element.attributes.name]: event.value,
             };
             EventExecutor.executeEvent(props.meta, element.attributes.onBlur, { data: event.value }, null);
         }
     }*/

    const operations = {
        setResult: (result) => {
            const rows = result.rows || [];
            if (result.columns && result.columns.length > 0) {
                setLabelValueOptions(result.columns);
            }
            setMultiSelectOptions(rows);
        },

        getLabelAndValueOptions() {
            return labelValueOptions;
        },

        getSelectedValue() {
            return selectedValue;
        },

        setMultiSelectValue(value) {
            setSelectedValue(value);
        },

        startLoader: (value) => {
            //do some stuff
        },

        getActualRef: () => {
            return { ...parentRef };
        },

        getStyleAttributes: () => {
            return ControlStyleModel.getMultiSelectStyle();
        },

        addStyle(style = "") {
            setControlStyle(style);
        },

        disableMultiSelect() {
            if (element.attributes && element.attributes.disabled !== undefined) {
                element.attributes.disabled = true;
            }
        },

        getPrimeMultiSelectRef,
    }

    useImperativeHandle(parentRef, () => {
        setRefInitialize(true);
        return operations;
    });

    useEffect(() => {
        updateMeta(meta);
        setSelectedValue(element.attributes?.selectedValue || "");
        setLabelValueOptions(element.attributes?.labelValueOptions || []);
        setMultiSelectOptions(element.attributes?.multiSelectOptions || []);

        //Apply style if the element already has
        if (element.ref && element.ref.current && element.ref.current.getStyleAttributes) {
            if (element.style) {
                const elementStyle = addElementStyle(
                    element.style,
                    element,
                    meta,
                    setControlStyle
                );
                setControlStyle(elementStyle);
            }
        }
    }, [isRefInitialize]);

    return (
        <>
            <style>{controlStyle}</style>
            <div id={element.id}>
                <MultiSelect
                    value={selectedValue}
                    ref={getPrimeMultiSelectRef}
                    options={
                        multiSelectOptions.length > 0
                            ? multiSelectOptions
                            : element.attributes?.config?.staticOptionList || []
                    }
                    onChange={(e) => { setSelectedValue(e.value); executeOnChangeEvent(e); }}
                    // onBlur={(e) => { executeBlurEvent(e) }}
                    //  onFocus={(e) => { executeFocusEvent(e) }}
                    onFilter={(e) => { executeOnFilterEvent(e) }}
                    placeholder={element.attributes?.placeholder || "Select Your Options"}
                    disabled={element.attributes?.disabled || false}
                    filter={element.attributes?.filter || false}
                    filterBy={element.attributes?.filterBy?.toString()}
                    optionValue={element.attributes.optionValue || "value"}
                    optionLabel={element.attributes.optionLabel || "label"}
                    showClear={element.attributes?.showClear || false}
                    showSelectAll={element.attributes?.showSelectAll || false}
                    tooltip={element.attributes?.tooltip}
                    filterPlaceholder={element.attributes?.filterPlaceholder || "Enter Your Filter Option"}
                    emptyFilterMessage={element.attributes?.emptyFilterMessage || "No Records Found"}
                    resetFilterOnHide={element.attributes?.resetFilterOnHide || true}
                    display={element.attributes?.display || "label"}
                    maxSelectedLabels={element.attributes?.maxSelectedLabels || 3}
                />
            </div>
        </>
    );
})

export default HDMultiSelect;