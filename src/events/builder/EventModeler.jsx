import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";
import { EVENTS, NODE_TYPES } from "../model/EventModel";
import "./EventModeler.css";

const initialNodes = [
  /* {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: `Action_${1}` },
    draggable: true,
    selectable: true,
  }, */
];
const initialEdges = [];
const initBgColor = "#1A192B";
const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];
const nodeTypes = NODE_TYPES();

const EventModeler = (props) => {
  const { meta, setMeta } = props;
  const op = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  if (!meta.events) {
    meta["events"] = [];
  }
  const [eventName, setEventName] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [bgColor, setBgColor] = useState(initBgColor);
  
  const onChange = (event) => {
    setNodes((nds) =>
      nds.map((node) => {
        const color = event.target.value;
        setBgColor(color);
        return {
          ...node,
          data: {
            ...node.data,
            color
          },
        };
      })
    );
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
      ), [setEdges]
  );

  const addNewActionNode = (e) => {
    op.current.toggle(e);
  };

  const onActionSelection = (action) => {
    setNodes((prevNodes) => {
        return prevNodes.concat({
          type: action.value.eventNodeType,
          id: `${prevNodes.length + 1}`,
          position: {
            x: 0,
            y: 0,
          },
          data: {
            label: `Action_${prevNodes.length + 1}`,
            onChange: onChange,
            updateEvent: updateEvent,
            color: initBgColor,
            eventInfo: {
              type: action.value.eventNodeType
            },
            meta,
          },
        });
      });
  };

  const updateEvent = (eventInfo, nodeId) => {
    console.log(eventInfo);
  }

  const saveEvent = (eventData) => {
    console.log(nodes);
    const event = {
      name: eventName,
      bucket: {nodes, edges} 
    };
    setMeta((prevMeta)=> {
      return {
        ...prevMeta,
        events: [...prevMeta.events, event]
      }
    })

    console.log('Saving events into meta', meta);
  }

  return (
    <div>
      <OverlayPanel ref={op} style={{ width: "400px" }}>
        <DataTable
          value={EVENTS}
          selectionMode="single"
          paginator
          rows={5}
          selection={selectedProduct}
          onSelectionChange={onActionSelection}
        >
          <Column field="name" header="Action Name" sortable />
        </DataTable>
      </OverlayPanel>
      <div className="grid">
        <div className="col">
          <InputText
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          ></InputText>
        </div>
        <div className="col gap-2">
          <Button label="Add Action" onClick={addNewActionNode}/>
          <Button style={{marginLeft: '5px'}} className="p-button-danger" label="Save Event" onClick={saveEvent}/>
        </div>
      </div>
      <div className="grid">
        <div className="col" style={{ height: 600 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            snapToGrid={true}
            snapGrid={snapGrid}
            style={{ background: bgColor }}
            connectionLineStyle={connectionLineStyle}
          >
            <MiniMap
              nodeStrokeColor={(n) => {
                if (n.type === "alert") return "#0041d0";
                if (n.type === "confirmation") return bgColor;
                if (n.type === "script") return "#ff0072";
              }}
              nodeColor={(n) => {
                if (n.type === "confirmation") return bgColor;
                return "#fff";
              }}
            />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default EventModeler;
