import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { memo } from "react";
import { useEffect } from "react";
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
    value: "success",
  },
  {
    label: "Info",
    value: "info",
  },
  {
    label: "Warn",
    value: "warn",
  },
  {
    label: "Error",
    value: "error",
  },
];

const MessageAlert = (props) => {
  
  const { data, isConnectable, meta, setMeta } = props;
  const [header, setHeader] = useState(data?.eventInfo?.data?.header || '');
  const [message, setMessage] = useState(data?.eventInfo?.data?.message || '');
  const [selectedType, setSelectedType] = useState(data?.eventInfo?.data?.type || '');
  const [selectedPosition, setselectedPosition] = useState(data?.eventInfo?.data?.position || '');
  
  const onTypeChange = (e) => {
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
      
      <div className="grid fluid">
          <div className="col-12">
            <label className="block">Header</label>
            <InputText value={header} style={{width : '100%'}} onChange={(e)=> {console.log('Header Change'); setHeader(e.target.value)}} />
          </div>
          <div className="col-12">
            <label className="block">
              Message
            </label>
            <InputText value={message} style={{width : '100%'}} onChange={(e)=> setMessage(e.target.value)} />
          </div>
          <div className="col-6">
            <label className="block">Type</label>
            <Dropdown name="type" style={{width : '100%'}} options={types} value={selectedType} onChange={onTypeChange} />
          </div>
          <div className="col-6">
            <label className="block">Position</label>
            <Dropdown
              style={{width : '100%'}}
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
