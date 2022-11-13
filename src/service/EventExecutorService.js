import { EVENT_TYPE } from "../events/model/EventModel";

export const EventExecutorService = {
  execute: (meta, eventNode) => {
    const eventDetail = eventNode.data.eventInfo;
    if (eventNode.type === EVENT_TYPE.ALERT) {
      executeMessageAlert(meta, eventNode);
    } else if (eventNode.type === EVENT_TYPE.SCRIPT) {
      executeScript(meta, eventNode);
    } else if (eventNode.type === EVENT_TYPE.CONFIRMATION) {
      console.log("Event type Confirmation", eventDetail);
    }
  },
};

function executeMessageAlert(meta, eventNode) {
    const { eventInfo } = eventNode.data;
    const { header, message, position, type} = eventInfo.data
  if (meta.toastRef) {
    meta.toastRef.current.props.position = position;
    meta.toastRef.current.show({
        severity: type,
        summary: header,
        detail: message,
        life: 1000,
        position: position,
      });
  } else {
    alert("toast service failed!");
  }
}

function executeScript(meta, eventNode) {
  const scriptEventDetail = eventNode.data.eventInfo;
  const scriptFun = new Function(`
        const meta = arguments[0];
        ${scriptEventDetail.scriptText}
    `);
  scriptFun(meta);
}
