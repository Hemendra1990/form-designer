import React from "react";
import { Handle } from "reactflow";

const TargetHandle = ({ data, isConnectable }) => {
  return (
    <Handle
      type="target"
      position="left"
      style={{ background: "#a6ba0d", height:'10px', width: '10px' }}
      onConnect={(params) => {}}
      isConnectable={isConnectable}
    />
  );
};

export default TargetHandle;
