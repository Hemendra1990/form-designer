import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { createElementId } from "../../utils/Utils";
import React, { useCallback, useEffect, useRef, useState } from "react";

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
import { Dropdown } from "primereact/dropdown";
import {
  useMetaContext,
  useToastContext,
  useUpdateMetaContext,
} from "../../context/MetaContext";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";

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
  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext();
  const { toastRef } = useToastContext();
  let navigate = useNavigate();

  const op = useRef(null);
  const [eventId, setEventId] = useState("");
  if (!meta.events) {
    meta["events"] = [];
  }
  const [eventName, setEventName] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [bgColor, setBgColor] = useState(initBgColor);
  const [selectedEvent, setSelectedEvent] = useState("");

  const onChange = (event) => {
    setNodes((nds) =>
      nds.map((node) => {
        const color = event.target.value;
        setBgColor(color);
        return {
          ...node,
          data: {
            ...node.data,
            color,
          },
        };
      })
    );
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
      ),
    [setEdges]
  );

  const addNewActionNode = (e) => {
    op.current.toggle(e);
  };

  const onActionSelection = (action) => {
    setNodes((prevNodes) => {
      return prevNodes.concat({
        type: action.value.eventNodeType, //'type' is very important as we are using custom nodes... By providing the type value react-flow renders that components
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
            type: action.value.eventNodeType,
          },
          meta,
        },
      });
    });
  };

  const updateEvent = (eventInfo, nodeId) => { };

  const saveEvent = (eventData) => {
    if (nodes && nodes.length === 0) {
      toastRef.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "No new event created as no action is choosen.",
      });
      props.hide();
      return;
    }

    if (eventName) {
      const event = {
        id: eventId,
        name: eventName,
        bucket: { nodes, edges },
      };

      const existingEventId = meta.events.find((ev) => ev.id === eventId);
      let eventBuckets = [];
      if (existingEventId) {
        eventBuckets = meta.events.map((pEvent) => {
          if (pEvent.id === eventId) {
            pEvent.bucket = { nodes, edges };
            return pEvent;
          } else return pEvent;
        });
      } else {
        eventBuckets = [...meta.events, event];
      }

      meta.events = [...eventBuckets];
      updateMeta(meta);

      //props.hide();
      navigate(-1);
    } else {
      toastRef.current.show({
        severity: "error",
        summary: "Error",
        detail: "Event Can't be saved without a name.",
      });
    }
  };

  const onEventSelection = (e) => {
    setSelectedEvent(e.value);
    setEventId(e.value);
    const metaEvent = meta.events.find((me) => me.id === e.value);
    setEventName(metaEvent.name);
    setEdges(metaEvent.bucket.edges);
    setNodes(metaEvent.bucket.nodes);
  };

  const handleEventNameChange = (e) => {
    let value = e.target.value;
    value = value.split(" ").join("_");
    setEventName(value);
  };

  useEffect(() => {
    setEventId(`event-${createElementId()}`);
  }, []);

  return (
    <Dialog header="Event Modeler"
      style={{ width: "95vw" }}
      visible={true}
      onHide={() => {
        navigate(-1);
      }}
    >
      <div>
        <OverlayPanel ref={op} style={{ width: "400px" }}>
          <DataTable
            value={EVENTS}
            selectionMode="single"
            paginator
            rows={4}
            onSelectionChange={onActionSelection}
          >
            <Column field="name" header="Action Name" sortable />
          </DataTable>
        </OverlayPanel>

        <div className="flex">
          <div className="flex-1 flex align-items-start justify-content-start text-gray-900 m-2 px-5 py-3 border-round">
            <Dropdown
              className="mr-2"
              options={meta.events}
              optionLabel="name"
              optionValue="id"
              value={selectedEvent} onChange={onEventSelection} />
            <InputText
              placeholder="Event Id"
              value={eventId}
              disabled
            ></InputText>
            <InputText
              className="ml-2"
              placeholder="Event Name"
              value={eventName}
              onChange={handleEventNameChange}
            ></InputText>
          </div>

          <div className="flex-1 flex align-items-end justify-content-end text-gray-900 m-2 px-5 py-3 border-round">
            <Button label="Add Action" onClick={addNewActionNode} />
            <Button style={{ marginLeft: '5px' }} className="p-button-danger" label="Save Event" onClick={saveEvent} />
          </div>
        </div>

        <div className="grid">
          <div className="col" style={{ height: '60vh' }}>
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
            Info : Backspace for delete action
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default EventModeler;
