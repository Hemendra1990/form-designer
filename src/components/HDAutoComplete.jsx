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
    const [columnList, setColumnList] = useState([])

    const handleOnChangeEvent = (e) => {
        if (meta && element.attributes.onChangeEvent) {
            EventExecutor.executeEvent(props.meta,
                element.attributes.onChangeEvent,
                { data: e.value },
                null);
        }

    }

    /* const handelOnBlurEvent = (e) => {
        if (meta && element.attributes.onBlurEvent) {
            EventExecutor.executeEvent(props.meta,
                element.attributes.onBlurEvent,
                { data: e.value },
                null);
        }
    }

    const handelOnFocusEvent = (e) => {
        if (meta && element.attributes.onFocusEvent) {
            EventExecutor.executeEvent(props.meta,
                element.attributes.onFocusEvent,
                { data: e.value },
                null);
        }
    } */

    const handelOnSelectEvent = (e) => {
        if (meta && element.attributes.onSelectEvent) {
            EventExecutor.executeEvent(props.meta,
                element.attributes.onSelectEvent,
                { data: e.value },
                null);
        }
    }

    const handelOnUnSelectEvent = (e) => {
        if (meta && element.attributes.onUnSelectEvent) {
            EventExecutor.executeEvent(props.meta,
                element.attributes.onUnSelectEvent,
                { data: e.value },
                null);
        }
    }
    const handelOnDropdownClickEvent = (e) => {
        if (meta && element.attributes.onDropdownClick) {
            EventExecutor.executeEvent(props.meta,
                element.attributes.onDropdownClick,
                { data: e.value },
                null);
        }
    }

    const handelOnClickEvent = (e) => {
        if (meta && element.attributes.onClick) {
            EventExecutor.executeEvent(props.meta,
                element.attributes.onClick,
                { data: e.value },
                null);
        }
    }

    const handelOnDoubleClickEvent = (e) => {
        if (meta && element.attributes.onDoubleClick) {
            EventExecutor.executeEvent(props.meta,
                element.attributes.onDoubleClick,
                { data: e.value },
                null);
        }
    }

    const handelOnMouseClick = (e) => {
        if (meta && element.attributes.onMouseDown) {
            EventExecutor.executeEvent(props.meta,
                element.attributes.onMouseDown,
                { data: e.value },
                null);
        }
    }
    const handelOnKeyUp = (e) => {
        if (meta && element.attributes.onKeyUp) {
            EventExecutor.executeEvent(props.meta,
                element.attributes.onKeyUp,
                { data: e.value },
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
    };

    useImperativeHandle(parentRef, () => {
        return operations;
    });


    useEffect(() => {
        /*This is necesary, put in all the components...
        we need to update the meta.elementMap so need
        to call this method after the input is rendered */
        updateMeta(meta);

        setSelectedValue(element?.attributes?.selectedValue || null)

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
                <AutoComplete
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