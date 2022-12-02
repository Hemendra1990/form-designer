import ConfirmationAlert from "../ConfirmationAlert";
import MessageAlert from "../MessageAlert";
import PopupModal from "../PopupModal";
import RefreshElements from "../RefreshElements";
import Script from "../Script";

export const EVENTS = [
  {
    name: "Script",
    eventNodeType: "script",
    eventNodeTypeComponent: Script,
  },
  {
    name: "Confirmation",
    eventNodeType: "confirmation",
    eventNodeTypeComponent: ConfirmationAlert,
  },
  {
    name: "Message Alert",
    eventNodeType: "alert",
    eventNodeTypeComponent: MessageAlert,
  },
  {
    name: "Popup Modal",
    eventNodeType: "popup",
    eventNodeTypeComponent: PopupModal,
  },
  {
    name: "Refresh Elements",
    eventNodeType: "refreshElements",
    eventNodeTypeComponent: RefreshElements,
  },
];

export const NODE_TYPES = () => {
  let ans = {};
  EVENTS.forEach((ev) => {
    ans = { ...ans, [ev.eventNodeType]: ev.eventNodeTypeComponent };
  });
  return ans;
};

export const EVENT_TYPE  = {
  SCRIPT: "script",
  ALERT: "alert",
  CONFIRMATION: "confirmation",
  POP_UP: "popup",
  REFRESH_ELEMENTS: "refreshElements"
};