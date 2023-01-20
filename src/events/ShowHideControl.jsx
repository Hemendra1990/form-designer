import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import React, { memo, useEffect, useState } from "react";
import { Handle } from "reactflow";
import { useMetaContext } from "../context/MetaContext";
import TargetHandle from "./model/TargetHandle";
import { SelectButton } from "primereact/selectbutton";
import { MultiSelect } from "primereact/multiselect";

const ShowHideControl = (props) => {
    const meta = useMetaContext();
    const { data, isConnectable } = props;

    const [selectedControl, setSelectedControl] = useState(null);
    const [selectedControlType, setSelectedControlType] = useState(null);
    const [elementId, setElementId] = useState("");
    const [elements, setElements] = useState([]);

    const controlTypeOptions = ["Show", "Hide"];
    const [showElement, setShowElement] = useState(true);

    useEffect(() => {
        if (meta.elementMap != undefined) {
            const playgroundElements = Object.keys(meta.elementMap).map((key) => key);
            setElements(playgroundElements);
        }
    }, []);
    useEffect(() => {
        const showHideEventData = {
            selectedControlType,
            elementId,
            selectedControl
        }
        data.eventInfo = { ...data.eventInfo, data: showHideEventData }
    }, [selectedControlType, elementId, selectedControl]);

    const handleResourceTypeChange = (e) => {
        setSelectedControlType(e.value);
        if (e.value === 'Show') {
            setSelectedControl(null)
        } else {
            setElementId(null);
        }
    }

    const showResource = () => {
        if (selectedControlType === 'Show' || 'Hide') {
            return (
                <div className="col-12 p-2">
                    <label className="block">
                        Element Id<span style={{ color: "red" }}>(*)</span>{" "}
                    </label>
                    <MultiSelect
                        value={elementId}
                        options={elements}
                        onChange={(e) => {
                            setElementId(e.target.value);
                        }}
                        placeholder=""
                        style={{ width: "100%" }}
                    />
                </div>
            );
        }
    };
    return (
        <Card title="ShowHide Report" style={{ width: "15rem", marginBottom: "2em" }}>
            <div className="grid p-fluid">
                <div className="col-12 p-2">
                    <label className="block">
                        Control Type<span style={{ color: "red" }}>(*)</span>
                    </label>
                    <SelectButton
                        value={selectedControlType}
                        options={controlTypeOptions}
                        onChange={handleResourceTypeChange}
                    ></SelectButton>
                </div>
                {showResource()}
            </div>
            <TargetHandle data={data} isConnectable={isConnectable} />
            <Handle
                type="source"
                position="right"
                style={{ background: "#555", height: "10px", width: "10px" }}
                onConnect={(params) => console.log("handle onConnect", params)}
                isConnectable={true}
            />
        </Card>
    );
};

export default memo(ShowHideControl);