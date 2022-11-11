import ConfirmationAlert from "../ConfirmationAlert";
import MessageAlert from "../MessageAlert";
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
];

export const NODE_TYPES = () => {
  let ans = {};
  EVENTS.forEach((ev) => {
    ans = { ...ans, [ev.eventNodeType]: ev.eventNodeTypeComponent };
  });
  return ans;
};
