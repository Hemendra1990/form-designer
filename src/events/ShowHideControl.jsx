import { Card } from "primereact/card";
import React, { memo, useEffect, useState } from "react";
import { Handle } from "reactflow";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import TargetHandle from "./model/TargetHandle";
import { SelectButton } from "primereact/selectbutton";
import { Button } from "primereact/button";

const ShowHideControl = (props) => {
    const meta = useMetaContext();
    const { data, isConnectable } = props;
    const emptyOption = { elementId: "", controlType: "" };
    const [elements, setElements] = useState([]);
    const [showHideOptionList, setShowHideOptionList] = useState(data?.eventInfo?.data?.showHideOptionList || [emptyOption]);

    const controlTypeOptions = ["show", "hide"];

    const handelAddclick = () => {
        setShowHideOptionList([...showHideOptionList, {}]);
    };

    const handelRemoveButton = (index) => {
        const list = [...showHideOptionList];
        list.splice(index, 1);
        setShowHideOptionList(list);
    };

    const handelInputChange = (event, index) => {
        const updatedShowHideList = showHideOptionList.map((field, i) => {
            if (i === index) {
                const obj = {};
                if (event.value) {
                    obj[event.target.name] = event.value;
                } else {
                    obj[event.target.name] = event.target.value;
                }
                return { ...field, ...obj };
            }
            return field;
        });
        setShowHideOptionList(updatedShowHideList);
    };

    useEffect(() => {
        if (meta.elementMap != undefined) {
            const playgroundElements = Object.keys(meta.elementMap).map((key) => key);
            setElements(playgroundElements);
        }
    }, []);
    useEffect(() => {
        const showHideEventData = {
            showHideOptionList
        }
        data.eventInfo = { ...data.eventInfo, data: showHideEventData }
    }, [showHideOptionList]);

    return (
        <Card title="ShowHide Control" style={{ width: "25rem", marginBottom: "2em", maxHeight: "350px", overflowY: "auto", padding: "0" }}>
            <div
                className="grid col-12 ml-1 mr-1 mb-2"
                style={{ borderBottom: "0.4px solid #c7c2c2" }}
            >
                <div className="grid col-5 mt-0 align-items-center">
                    Element Id<span style={{ color: "red" }}>(*)</span>{" "}
                </div>
                <div className="grid col-5 mt-0 ml-4 align-items-center">
                    Control Type<span style={{ color: "red" }}>(*)</span>
                </div>
                <div className="col-1 ml-auto">
                    <em
                        title="Add Property"
                        onClick={handelAddclick}
                        className="pi pi-plus-circle "
                        style={{ fontSize: "1.2rem" }}
                    ></em>
                </div>
            </div>
            {
                showHideOptionList.map((showHideObj, index) => {
                    return (
                        <div className="grid p-fluid" key={index}>
                            <div className="col-5 p-2">
                                <Dropdown
                                    value={showHideObj.elementId || " "}
                                    name="elementId"
                                    options={elements}
                                    onChange={(e) => {
                                        handelInputChange(e, index);
                                    }}
                                    placeholder=""
                                    style={{ width: "100%" }}
                                    key={index}
                                />
                            </div>
                            <div className="col-5 p-2">
                                <SelectButton
                                    name="controlType"
                                    value={showHideObj.controlType}
                                    options={controlTypeOptions}
                                    onChange={(e) => {
                                        handelInputChange(e, index);
                                    }}
                                    key={index}
                                ></SelectButton>
                            </div>
                            {showHideOptionList.length !== 1 && (
                                <div className="col-2 p-2">
                                    <Button
                                        icon="pi pi-times"
                                        className="p-button-rounded p-button-danger p-button-outlined"
                                        onClick={() => handelRemoveButton(index)}
                                    />
                                </div>
                            )}

                        </div>
                    );
                })
            }



            <TargetHandle data={data} isConnectable={isConnectable} />
            <Handle
                type="source"
                position="right"
                style={{ background: "#555", height: "10px", width: "10px" }}
                onConnect={(params) => console.log("handle onConnect", params)}
                isConnectable={true}
            />
        </Card >
    );
};

export default memo(ShowHideControl);