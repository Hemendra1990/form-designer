import { AutoComplete } from "primereact/autocomplete";
import React, { useEffect, useRef, useState } from "react";
import { useImperativeHandle } from "react";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { ControlStyleModel } from "../control-styles/ControlStyleModel";
import { addElementStyle } from "../control-styles/ControlStyles";
import EventExecutor from '../service/EventExecutor';


const HDAutoComplete = React.forwardRef((props, parentRef) => {

    const meta = useMetaContext();
    const { updateMeta } = useUpdateMetaContext()
    const { element } = props;

    const getPrimeAutoCompleteRef = useRef(parentRef);

    const [filterValueList, setFilterValueList] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);
    const [filteredValue, setFilteredValue] = useState(null);
    const [controlStyle, setControlStyle] = useState();
    const [columnList, setColumnList] = useState([]);
    const [isRefInitialize, setRefInitialize] = useState(false);
    const [showHideFlag, setShowHideFlag] = useState(true);

    const showHide = (value) => {//expecing the value to be boolean
        setShowHideFlag(value);
    }
    const handleOnChangeEvent = (event) => {
        if (element.attributes && element.attributes.onChangeEvent) {
            props.meta.sqlVariables = {
                ...props.meta.sqlVariables,
                [element.attributes.name]: event.value,
            };
            EventExecutor.executeEvent(
                props.meta,
                element.attributes.onChangeEvent,
                { data: event.value },
                null
            );
        }
    }

    /* const handelOnBlurEvent = (event) => {
        if (element.attributes && element.attributes.onBlurEvent) {
             props.meta.sqlVariables = {
                ...props.meta.sqlVariables,
                [element.attributes.name]: event.value,
            };
            EventExecutor.executeEvent(props.meta,
                element.attributes.onBlurEvent,
                { data: event.value },
                null);
        }
    }

    const handelOnFocusEvent = (event) => {
         if (element.attributes && element.attributes.onFocusEvent) {
            props.meta.sqlVariables = {
                ...props.meta.sqlVariables,
                [element.attributes.name]: event.value,
            };
            EventExecutor.executeEvent(props.meta,
                element.attributes.onFocusEvent,
                { data: event.value },
                null);
        }
    } */

    const handelOnSelectEvent = (event) => {
        if (element.attributes && element.attributes.onSelectEvent) {
            props.meta.sqlVariables = {
                ...props.meta.sqlVariables,
                [element.attributes.name]: event.value,
            };
            EventExecutor.executeEvent(props.meta,
                element.attributes.onSelectEvent,
                { data: event.value },
                null);
        }
    }

    const handelOnUnSelectEvent = (event) => {
        if (element.attributes && element.attributes.onUnSelectEvent) {
            props.meta.sqlVariables = {
                ...props.meta.sqlVariables,
                [element.attributes.name]: event.value,
            };
            EventExecutor.executeEvent(props.meta,
                element.attributes.onUnSelectEvent,
                { data: event.value },
                null);
        }
    }
    const handelOnDropdownClickEvent = (event) => {
        if (element.attributes && element.attributes.onDropdownClick) {
            props.meta.sqlVariables = {
                ...props.meta.sqlVariables,
                [element.attributes.name]: event.value,
            };
            EventExecutor.executeEvent(props.meta,
                element.attributes.onDropdownClick,
                { data: event.value },
                null);
        }
    }

    const handelOnClickEvent = (event) => {
        if (element.attributes && element.attributes.onClick) {
            props.meta.sqlVariables = {
                ...props.meta.sqlVariables,
                [element.attributes.name]: event.value,
            };
            EventExecutor.executeEvent(props.meta,
                element.attributes.onClick,
                { data: event.value },
                null);
        }
    }

    const handelOnDoubleClickEvent = (event) => {
        if (element.attributes && element.attributes.onClick) {
            props.meta.sqlVariables = {
                ...props.meta.sqlVariables,
                [element.attributes.name]: event.value,
            };
            EventExecutor.executeEvent(props.meta,
                element.attributes.onDoubleClick,
                { data: event.value },
                null);
        }
    }

    const handelOnMouseClick = (event) => {
        if (element.attributes && element.attributes.onClick) {
            props.meta.sqlVariables = {
                ...props.meta.sqlVariables,
                [element.attributes.name]: event.value,
            };
            EventExecutor.executeEvent(props.meta,
                element.attributes.onMouseDown,
                { data: event.value },
                null);
        }
    }
    const handelOnKeyUp = (event) => {
        if (element.attributes && element.attributes.onClick) {
            props.meta.sqlVariables = {
                ...props.meta.sqlVariables,
                [element.attributes.name]: event.value,
            };
            EventExecutor.executeEvent(props.meta,
                element.attributes.onKeyUp,
                { data: event.value },
                null);
        }
    }

    const searchCountry = (event) => {
        setTimeout(() => {
            let filteredByColumn;
            if (!event.query.trim().length) {
                filteredByColumn = [...filterValueList];
            }
            else {
                filteredByColumn = filterValueList.filter((item) => {
                    if (element.attributes.optionFilterValue) {
                        return item[element.attributes.optionFilterValue].toLowerCase().startsWith(event.query.toLowerCase());
                    } else {
                        return item[columnList[0].field].toLowerCase().startsWith(event.query.toLowerCase());
                    }

                });
            }
            setFilteredValue(filteredByColumn);
        }, 100);
    }

    const operations = {
        setResult: (result) => {
            const rows = result.rows || [];
            if (result.columns && result.columns.length > 0) {
                setColumnList(result.columns || []);
            }
            setFilterValueList(rows);
        },

        getColumnList() {
            return columnList;
        },

        getValue() {
            return selectedValue;
        },

        setValue(value) {
            setSelectedValue(value)
        },

        getStyleAttributes: () => {
            return ControlStyleModel.getAutoCompleteStyle();
        },

        addStyle(style = "") {
            setControlStyle(style);
        },

        getPrimeAutoCompleteRef,
        showHide
    };

    useImperativeHandle(parentRef, () => {
        setRefInitialize(true);
        return operations;
    });

    useEffect(() => {
        /*This is necesary, put in all the components...
        we need to update the meta.elementMap so need
        to call this method after the input is rendered */
        updateMeta(meta);
        setSelectedValue(element?.attributes?.selectedValue || null);
        setFilterValueList(element?.attributes?.filterValueList || []);
        setFilteredValue(element?.attributes?.filteredValue || null);
        setColumnList(element?.attributes?.columnList || []);

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
                <AutoComplete
                    style={showHideFlag ? { display: 'flex' } : { display: 'none' }}
                    ref={getPrimeAutoCompleteRef}
                    placeholder={element?.attributes?.placeholder || "Search"}
                    value={selectedValue}
                    suggestions={filteredValue}
                    completeMethod={searchCountry}
                    field={element?.attributes?.optionLabel || "name"}
                    autoHighlight={element?.attributes?.autoHighlightEnable || false}
                    dropdown={element?.attributes?.dropdownEnable || false}
                    showEmptyMessage={element?.attributes?.showEmptyMessage || false}
                    emptyMessage={element?.attributes?.emptyMessageValue || "No results found."}
                    onChange={(e) => {
                        setSelectedValue(e.value);
                        handleOnChangeEvent(e);
                    }}
                    /* onBlur={(e) => {
                        handelOnBlurEvent(e);
                    }}
                    onFocus={(e) => {
                        handelOnFocusEvent(e);
                    }} */
                    onSelect={(e) => {
                        handelOnSelectEvent(e);
                    }}
                    onUnselect={(e) => {
                        handelOnUnSelectEvent(e);
                    }}
                    onDropdownClick={(e) => {
                        handelOnDropdownClickEvent(e);
                    }}
                    onClick={(e) => {
                        handelOnClickEvent(e);
                    }}
                    onDoubleClick={(e) => {
                        handelOnDoubleClickEvent(e);
                    }}
                    onMouseDown={(e) => {
                        handelOnMouseClick(e);
                    }}
                    onKeyUp={(e) => handelOnKeyUp(e)}
                    dropdownAriaLabel="Select"
                />
            </div>
        </>
    );

})

export default HDAutoComplete;