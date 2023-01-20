import ConfirmationAlert from "../ConfirmationAlert";
import LoadReportInContainer from "../LoadReportInContainer";
import MessageAlert from "../MessageAlert";
import PopupModal from "../PopupModal";
import RefreshElements from "../RefreshElements";
import Script from "../Script";
import ShowHideControl from "../ShowHideControl";

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
  {
    name: "Load Report",
    eventNodeType: "loadReport",
    eventNodeTypeComponent: LoadReportInContainer,
  },
  {
    name: "Show/Hide Control",
    eventNodeType: "showHideControl",
    eventNodeTypeComponent: ShowHideControl,
  },
];

export const NODE_TYPES = () => {
  let ans = {};
  EVENTS.forEach((ev) => {
    ans = { ...ans, [ev.eventNodeType]: ev.eventNodeTypeComponent };
  });
  return ans;
};

export const EVENT_TYPE = {
  SCRIPT: "script",
  ALERT: "alert",
  CONFIRMATION: "confirmation",
  POP_UP: "popup",
  REFRESH_ELEMENTS: "refreshElements",
  LOAD_REPORT: "loadReport",
  SHOWHIDE_CONTROL: "showHideControl"
};