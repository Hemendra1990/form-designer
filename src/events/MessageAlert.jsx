import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { memo } from "react";
import { useState } from "react";
import { Handle } from "reactflow";
import TargetHandle from "./model/TargetHandle";

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

const MessageAlert = (props) => {
  const { data, isConnectable, meta, setMeta } = props;
  const [header, setHeader] = useState('');
  const [message, setMessage] = useState('');
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPosition, setselectedPosition] = useState(null);

  
  
  const onTypeChange = (e) => {
    console.log(e);
    setSelectedType(e.value);
  }

  const onPositionChange = (e) => {
    setselectedPosition(e.value);
  }

  const saveAlert = (e) => {
    const alertEventData = {
      header,
      message,
      type: selectedType,
      position: selectedPosition
    }
    data.eventInfo = {...data.eventInfo, data: alertEventData}
    //data.updateEvent(alertEventData);
  }

  const footer = <span> 
    <Button label="Save" icon="pi pi-check" style={{marginRight: '.25em'}} onClick={saveAlert}/>
    <Button label="Clear" icon="pi pi-times" className="p-button-secondary"/>
  </span>;


  return (
    <Card
      title="Message Alert"
      style={{ width: "20rem", marginBottom: "2em" }}
      footer={footer}
    >
      
      <div className="grid">
          <div className="col-12">
            <label>
              Header <span style={{ color: "red" }}>*</span>
            </label>
            <InputText value={header} onChange={(e)=> setHeader(e.target.value)} />
          </div>
          <div className="col-12">
            <label>
              Message<span style={{ color: "red" }}>*</span>
            </label>
            <InputText value={message} onChange={(e)=> setMessage(e.target.value)} />
          </div>
          <div className="col-12">
            <label>Type</label>
            <Dropdown name="type" options={types} value={selectedType} onChange={onTypeChange} />
          </div>
          <div className="col-12">
            <label>Position</label>
            <Dropdown
              name="position"
              options={positions}
              value={selectedPosition}
              onChange={onPositionChange}
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
