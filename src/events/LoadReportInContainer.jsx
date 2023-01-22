import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import React, { memo, useEffect, useState } from "react";
import { Handle } from "reactflow";
import { useMetaContext } from "../context/MetaContext";
import TargetHandle from "./model/TargetHandle";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";


//Test
const testReSources = ["rid-0123", "rid-1345", "8040d729-1d14-46d6-b35e-9556835cf821"];

//TODO: LoadInContainer event will have two optionn, 1) Dynamic 2) Static
//1. Dynamic: The user can use the sqlVariable to pass the resourceId(report Id) and this value will be evaluated in the runtinme and report will be loaded to the target container
//2. Static: User will see the list of reports available(will be coming from server) and will choose these reports
const LoadReportInContainer = (props) => {
  const meta = useMetaContext();
  const { data, isConnectable } = props;

  const [selectedContainer, setSelectedContainer] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedResourceType, setSelectedResourceType] = useState(null);
  const [resourceId, setResourceId] = useState("");

  const resourceTypeOptions = ["Dynamic", "Static"];
  //fetch the list of containers available in the meta for the current report
  const containers = Object.keys(meta.elementMap || [])
    .filter((key) => key.includes("container-"))
    .map((key) => key);

  useEffect(() => {

    const loadReportData = {
      contianer: selectedContainer,
      resource: selectedResource,
      type: selectedResourceType,
      resourceId
    }

    data.eventInfo = { ...data.eventInfo, data: loadReportData };

  }, [selectedResource, selectedContainer, selectedResourceType, resourceId])


  const handleResourceTypeChange = (e) => {
    setSelectedResourceType(e.value);
    if (e.value === 'Dynamic') {
      setSelectedResource(null)
    } else {
      setResourceId(null);
    }
  }

  const showResource = () => {
    if (selectedResourceType === 'Dynamic') {
      return (
        <div className="col-12 p-2">
          <label className="block">
            Resource Id<span style={{ color: "red" }}>(*)</span>{" "}
          </label>
          <InputText
            value={resourceId}
            onChange={(e) => setResourceId(e.target.value)}
          />
        </div>
      );
    } else {
      return (
        <div className="col-12 p-2">
          <label className="block">
            Resource<span style={{ color: "red" }}>(*)</span>{" "}
          </label>
          <Dropdown
            options={testReSources}
            value={selectedResource}
            onChange={(e) => setSelectedResource(e.value)}
          ></Dropdown>
        </div>
      );
    }
  };
  return (
    <Card title="Load Report" style={{ width: "15rem", marginBottom: "2em" }}>
      <div className="grid p-fluid">
        <div className="col-12 p-2">
          <label className="block">
            Contianer<span style={{ color: "red" }}>(*)</span>{" "}
          </label>
          <Dropdown
            options={containers}
            value={selectedContainer}
            onChange={(e) => setSelectedContainer(e.value)}
          ></Dropdown>
        </div>
        <div className="col-12 p-2">
          <label className="block">
            Resource Type<span style={{ color: "red" }}>(*)</span>
          </label>
          <SelectButton
            value={selectedResourceType}
            options={resourceTypeOptions}
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

export default memo(LoadReportInContainer);
