import { Card } from "primereact/card";
import { MultiSelect } from "primereact/multiselect";
import React, { memo, useEffect, useState } from "react";
import { Handle } from "reactflow";
import { useMetaContext } from "../context/MetaContext";
import TargetHandle from "./model/TargetHandle";

//This list will grow in future as we will be adding different components
const candidateRefreshElemnts = ["grid", "combobox", "autocomplete"];

const RefreshElements = (props) => {
  const meta = useMetaContext();
  const { data, isConnectable } = props;
  const [selectedRefreshElements, setSelectedRefreshElements] = useState(null);
  const [elements, setElements] = useState([]);

  //We should list all those controls who has a datasource connected, otherwise adding refreshElement event makes no sense
  useEffect(() => {
    const eles = Object.keys(meta.elementMap)
      .filter(
        (k) =>
          candidateRefreshElemnts.includes(k.split("-")[0]) &&
          meta.elementMap[k].attributes &&
          (meta.elementMap[k].attributes.datasource ||
            meta.elementMap[k].attributes.sqldatasource)
      )
      .map((key) => key);
    setElements(eles);

    setSelectedRefreshElements(data?.eventInfo?.data);
  }, []);

  const udpateEventData = (e) => {
    if (data.eventInfo.data) {
      data.eventInfo.data = [...e.value];
    } else {
      data.eventInfo.data = [];
      data.eventInfo.data = [...e.value];
    }
  };

  return (
    <>
      <Card
        title="Refresh Elements"
        style={{ minWidth: "20rem", maxWidth: "30rem", marginBottom: "2em" }}
      >
        <div className="grid">
          <div className="col-12">
            <label className="block">Control</label>
            <MultiSelect
              value={selectedRefreshElements}
              options={elements}
              onChange={(e) => {
                setSelectedRefreshElements(e.value);
                udpateEventData(e);
              }}
              placeholder=""
              style={{ width: "100%" }}
            />
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
    </>
  );
};

export default memo(RefreshElements);
