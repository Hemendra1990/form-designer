import { Toast } from "primereact/toast";
import React from "react";
import ReactDOM from 'react-dom';
import { EVENT_TYPE } from "../events/model/EventModel";

export const EventExecutorService = {
  execute: (meta, eventNode, modalContext, confirmDialogContext) => {
    const eventDetail = eventNode.data.eventInfo;
    if (eventNode.type === EVENT_TYPE.ALERT) {
      executeMessageAlert(meta, eventNode);
    } else if (eventNode.type === EVENT_TYPE.SCRIPT) {
      executeScript(meta, eventNode);
    } else if (eventNode.type === EVENT_TYPE.CONFIRMATION) {
      console.log("Event type Confirmation", eventDetail);
      executeConfirmation(meta, eventNode, confirmDialogContext);
    } else if (eventNode.type === EVENT_TYPE.POP_UP) {
      console.log("Event type Confirmation", eventDetail);
      executePopupModal(meta, eventNode, modalContext)
    }
  },
};

const onHideCallback = () => {
  console.log('On Hide Confirmatino Callback');
}

const onAcceptCallback = () => {
  console.log('%c on Accept Confirmatin Callback', 'background: #222; color: green');
}

const onRejectCallback = () => {
  console.log('%c on Reject Confirmatin Callback', 'background: #222; color: red');
} 

function executeConfirmation(meta, eventNode, confirmDialogContext) {
  const {confirmActions} = confirmDialogContext;
  confirmActions.push('This is test', onHideCallback, onAcceptCallback, onRejectCallback)
}


function executeMessageAlert(meta, eventNode) {
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

/* function executeModal(meta, eventNode) {
  const [actions, modals] = React.useContext(ModalContext)
} */

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

function executePopupModal(meta, eventNode, modalContext) {
  const { actions } = modalContext;
  const popupEvDetail = eventNode.data.eventInfo;
  actions.push(popupEvDetail);
  console.log(JSON.stringify(popupEvDetail) + 'Popup Modal executed at ', new Date().toLocaleTimeString())
}
