import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { memo } from "react";
import { Handle } from "reactflow";
import TargetHandle from "./model/TargetHandle";
import { ScrollPanel } from "primereact/scrollpanel";

const MessageAlert = (props) => {
  const { data, isConnectable, meta, setMeta } = props;
  const positions = [
    { label: "Top Left", value: "top-left" },
    { label: "Bottom Left", value: "bottom-left" },
    { label: "Bottom Right", value: "bottom-right" },
    { label: "Bottom Center", value: "bottom-center" },
  ];

  const types = [
    {
      label: "Success",
      value: "p-button-success",
    },
    {
      label: "Info",
      value: "p-button-info",
    },
    {
      label: "Warn",
      value: "p-button-warning",
    },
    {
      label: "Error",
      value: "p-button-danger",
    },
  ];
  return (
    <Card
      title="Message Alert"
      style={{ width: "15rem", marginBottom: "2em" }}
    >
      
      <div className="grid">
          <div className="col-12">
            <label>
              Header <span style={{ color: "red" }}>*</span>
            </label>
            <InputText />
          </div>
          <div className="col-12">
            <label>
              Message<span style={{ color: "red" }}>*</span>
            </label>
            <InputText />
          </div>
          <div className="col-12">
            <label>Type</label>
            <Dropdown name="type" options={types} onChange={(e) => {}} />
          </div>
          <div className="col-12">
            <label>Position</label>
            <Dropdown
              name="position"
              options={positions}
              onChange={(e) => {}}
            />
          </div>
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

export default memo(MessageAlert);
