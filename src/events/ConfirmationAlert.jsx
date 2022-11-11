import React, { memo } from "react";
import { Handle } from "reactflow";
import { Card } from "primereact/card";
import TargetHandle from "./model/TargetHandle";

const ConfirmationAlert = (props) => {
  const { data, isConnectable, meta, setMeta } = props;

  /* const addLeftHandler = ()=>{
    if(data.meta.events.length > 0) {
      return (
        <Handle
        type="target"
        position="left"
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      )
    }

    return <></>
  } */
  
  return (
    <>
      <Card>
        <TargetHandle data={data} isConnectable={isConnectable} />
        <div>
         Confirmation Alert: <strong>{data.color}</strong>
        </div>
        <input
          className="nodrag"
          type="color"
          onChange={data.onChange}
          defaultValue={data.color}
        />
        <Handle
          type="source"
          position="right"
          id="a"
          style={{ top: 10, background: "#555" }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position="right"
          id="b"
          style={{ bottom: 10, top: "auto", background: "#555" }}
          isConnectable={isConnectable}
        />
      </Card>
    </>
  );
};

export default memo(ConfirmationAlert);
