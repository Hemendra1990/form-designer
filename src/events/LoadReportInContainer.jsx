import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import React, { memo, useEffect, useState } from "react";
import { Handle } from "reactflow";
import { useMetaContext } from "../context/MetaContext";
import TargetHandle from "./model/TargetHandle";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { HttpFormResourceService } from "../http-service/HttpFormResourceService";


//Test
const testReSources = ["rid-0123", "rid-1345", "b0547ce9-ea2a-4e9c-8ef2-f8a3997f6565"];

//TODO: LoadInContainer event will have two optionn, 1) Dynamic 2) Static
//1. Dynamic: The user can use the sqlVariable to pass the resourceId(report Id) and this value will be evaluated in the runtinme and report will be loaded to the target container
//2. Static: User will see the list of reports available(will be coming from server) and will choose these reports
const LoadReportInContainer = (props) => {
  const meta = useMetaContext();
  const { data, isConnectable } = props;

  const [selectedContainer, setSelectedContainer] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedResourceType, setSelectedResourceType] = useState(null);
  const [resourceId, setResourceId] = useState("");
  const httpResourceService = new HttpFormResourceService();

  const resourceTypeOptions = ["Dynamic", "Static"];
  //fetch the list of containers available in the meta for the current report
  const containers = Object.keys(meta.elementMap || [])
    .filter((key) => key.includes("container-"))
    .map((key) => key);

  let param = {
    totalPages: 99,
    totalRows: 99,
    pageNumber: 0,
    pageSize: 10,
  }

  useEffect(() => {
    httpResourceService.getAllDetails(param).then(res => {
      const { data } = res.data;
      setOptions(data);
    }).catch(err => { console.error(err) });
  }, [])

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
            options={options}
            value={selectedResource}
            optionLabel={"resourceName"}
            optionValue={"resourceId"}
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
            Container<span style={{ color: "red" }}>(*)</span>{" "}
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
