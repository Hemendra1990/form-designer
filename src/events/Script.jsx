import React, { memo, useState } from "react";
import { Handle } from "reactflow";
import TargetHandle from "./model/TargetHandle";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import {SCRIPT_CONFIRM_TYPE} from "../service/EventConstant";


const Script = (props) => {
    const { data, isConnectable, meta, setMeta } = props;
    const [scriptText, setScriptText] = useState(data?.eventInfo?.scriptText || "");

    const handleScriptTextChange = (e) => {
        setScriptText(e.target.value);
        data.eventInfo.scriptText  = scriptText;
    }
    function handleConnect(params) {
        
    }
    return(
        <Card>

            <InputTextarea rows={10} 
                    value={scriptText} 
                    onChange={handleScriptTextChange}/>

            <TargetHandle data={data} isConnectable={isConnectable} />
            <Handle
                type="source"
                id={SCRIPT_CONFIRM_TYPE.ACCEPT}
                position="right"
                style={{ top: 10, background: "#555", height:'10px', width: '10px' }}
                onConnect={(params) => handleConnect(params)}
                isConnectable={true}
            />
            <Handle
                type="source"
                id={SCRIPT_CONFIRM_TYPE.REJECT}
                position="right"
                style={{ bottom: 10, top: "auto", background: "#555", height:'10px', width: '10px' }}
                onConnect={(params) => handleConnect(params)}
                isConnectable={true}
            />
        </Card>
    )
}
export default memo(Script);
