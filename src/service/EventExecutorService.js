import { Toast } from "primereact/toast";
import React from "react";
import  ReactDOM from 'react-dom';
import { EVENT_TYPE } from "../events/model/EventModel";

export const EventExecutorService = {
  execute: async (meta, eventNode) => {
    const eventDetail = eventNode.data.eventInfo;
    if (eventNode.type === EVENT_TYPE.ALERT) {
      await executeMessageAlert(meta, eventNode);
    } else if (eventNode.type === EVENT_TYPE.SCRIPT) {
      await executeScript(meta, eventNode);
    } else if (eventNode.type === EVENT_TYPE.CONFIRMATION) {
      console.log("Event type Confirmation", eventDetail);
    }
  },
};

async function executeMessageAlert(meta, eventNode) {
    const { eventInfo } = eventNode.data;
    const { header, message, position, type} = eventInfo.data
    console.log("🚀 ~ file: EventExecutorService.js ~ line 19 ~ executeMessageAlert ~ header, message, position, type", header, message, position, type)
  if (meta.toastRef) {
    setTimeout(()=> {
      const toastElem = React.createElement(Toast, {ref: React.createRef()});
      console.log(toastElem);
      meta.toastRef.current.show({
          severity: type,
          summary: header,
          detail: message
        });
      meta.toastRef.current.props.position = position;
    },10)
  } else {
    alert("toast service failed!");
  }
}

function executeScript(meta, eventNode) {
  const scriptEventDetail = eventNode.data.eventInfo;
  const Reference = {
    of: (elementId) => {
      return meta.elementMap[elementId].ref.current;
    }
  };
  const scriptFun = new Function(`
        const meta = arguments[0];
        const Reference = arguments[1];
        const ReactDOM = arguments[2];
        const React = arguments[3];
        ${scriptEventDetail.scriptText}
    `);
  scriptFun(meta, Reference, ReactDOM, React);
}
