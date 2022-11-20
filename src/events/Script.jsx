import React, { memo, useState } from "react";
import { Handle } from "reactflow";
import TargetHandle from "./model/TargetHandle";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";


const Script = (props) => {
    const { data, isConnectable, meta, setMeta } = props;
    const [scriptText, setScriptText] = useState(data?.eventInfo?.scriptText || "");

    const handleScriptTextChange = (e) => {
        setScriptText(e.target.value);
        data.eventInfo.scriptText  = scriptText;
    }
    function handleConnect(params) {
        console.log({params, data, meta});
    }
    return(
        <Card>

            <InputTextarea rows={10} 
                    value={scriptText} 
                    onChange={handleScriptTextChange}/>

            <TargetHandle data={data} isConnectable={isConnectable} />
            <Handle
                type="source"
                position="right"
                style={{ background: "#555", height:'10px', width: '10px' }}
                onConnect={(params) => handleConnect(params)}
                isConnectable={true}
            />
        </Card>
    )
}
export default memo(Script);
