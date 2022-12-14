import React, { memo } from "react";
import { Handle } from "reactflow";
import { Card } from "primereact/card";
import TargetHandle from "./model/TargetHandle";
import {CONFIRMATION_TYPE} from "../service/EventConstant";

const ConfirmationAlert = (props) => {
  const { data, isConnectable, meta, setMeta } = props;
  
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
          id={CONFIRMATION_TYPE.YES}
          style={{ top: 10, background: "#555" }}
          isConnectable={isConnectable}
        />
        <Handle
          type="source"
          position="right"
          id={CONFIRMATION_TYPE.NO}
          style={{ bottom: 10, top: "auto", background: "#555" }}
          isConnectable={isConnectable}
        />
      </Card>
    </>
  );
};

export default memo(ConfirmationAlert);
