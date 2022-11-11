import React, { memo } from "react";
import { Handle } from "reactflow";
import TargetHandle from "./model/TargetHandle";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";


const Script = (props) => {
    const { data, isConnectable, meta, setMeta } = props;
    return(
        <Card>

            <InputTextarea rows={10} cols={40}/>

            <TargetHandle data={data} isConnectable={isConnectable} />
            <Handle
                type="source"
                position="right"
                style={{ background: "#555", height:'10px', width: '10px' }}
                onConnect={(params) => console.log("handle onConnect", params)}
                isConnectable={true}
            />
        </Card>
    )
}
export default memo(Script);
