import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Handle } from "reactflow";
import TargetHandle from "./model/TargetHandle";

const PopupModal = (props) => {
  const { data, isConnectable, meta, setMeta } = props;
  const [popupMessage, setPopupMessage] = useState(data?.eventInfo?.popupText || "");
  const [selectedPosition, setSelectedPosition] = useState(data?.eventInfo?.position || "");

  
  const positions = [{label: 'Left', value: 'left'}, {label: 'Right', value: 'right'}, {label: 'Top', value: 'top'}, {label: 'Bottom', value: 'bottom'}]

  const handelPopupTextChange = (e) => {
    setPopupMessage(e.target.value)
    data.eventInfo.popupText  = popupMessage;
  }

  const onPositionChange = (e) => {
    setSelectedPosition(e.value);
    data.eventInfo.position  = selectedPosition;
  }
  return (
    <Card style={{height: 'fit-content', width: '100%'}}>
        <div className="grid">
            <div className="col">
                <label>Popup Message</label>
                <InputText value={popupMessage} onChange={handelPopupTextChange} />
                <Dropdown value={selectedPosition} options={positions} onChange={onPositionChange} placeholder="Select Position" />
            </div>
        </div>
      <TargetHandle data={data} isConnectable={isConnectable} />
      <Handle
        type="source"
        position="right"
        style={{ background: "#555", height: "10px", width: "10px" }}
        onConnect={(params) => {}}
        isConnectable={true}
      />
    </Card>
  );
};

export default PopupModal;
