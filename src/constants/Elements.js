import HDButton from "../components/HDButton";
import HDTextarea from "../components/HDTextarea";
import HDInput from "../components/HDInput";
import HDContainer from "../components/HDContainer";
import HDPanel from "../components/HDPanel";
import HDFieldset from "../components/HDFieldset";
import HDRadioButton from "../components/HDRadioButton";
import HDListBox from "../components/HDListBox";
import HDHtmlEditor from "../components/HDHtmlEditor";
import HDGrid from "../components/grid/HDGrid";
import HDNumeric from "../components/HDNumeric";
import HDLabel from "../components/HDLabel";
import HDPassword from "../components/HDPassword";
import HDDropDown from "../components/HDDropDown";
import HDToogleButton from "../components/HDToggleButton";
import HDDatePicker from "../components/HDDatePicker";

const ComponentConfig = [
  {
    label: "Textarea",
    name: "textarea",
    component: HDTextarea,
  },
  {
    label: "Input",
    name: "input",
    component: HDInput,
  },
  {
    label: "Button",
    name: "button",
    component: HDButton,
  },
  {
    label: "Container",
    name: "container",
    component: HDContainer,
  },
  {
    label: "Panel",
    name: "panel",
    component: HDPanel,
  },
  {
    label: "Fieldset",
    name: "fieldset",
    component: HDFieldset,
  },
  {
    label: "Radio",
    name: "radio",
    component: HDRadioButton,
  },
  {
    label: "Listbox",
    name: "listbox",
    component: HDListBox,
  },
  {
    label: "HTML Editor",
    name: "dynamicHtmlContainer",
    component: HDHtmlEditor,
  },
  {
    label: "Grid",
    name: "grid",
    component: HDGrid,
  },
  {
    label: "Numeric",
    name: "numeric",
    component: HDNumeric,
  },
  {
    label: "Label",
    name: "label",
    component: HDLabel,
  },
  {
    label: "Password",
    name: "password",
    component: HDPassword,
  },
  {
    label: "ButtonToggle",
    name: "buttontoggle",
    component: HDToogleButton,
  },
  {
    label: "Dropdown",
    name: "dropdown",
    component: HDDropDown,
  },
  {
    label: "Datepicker",
    name: "datepicker",
    component: HDDatePicker,
  },
];
export default ComponentConfig;

const CONTROL = {
  BUTTON: "button",
  INPUT: "input",
  TEXTAREA: "textarea",
  CONTAINER: "container",
  PANEL: "panel",
  FIELDSET: "fieldset",
  RADIO: "radio",
  LISTBOX: "listbox",
  DYNAMIC_HTMLEDITOR: "dynamicHtmlContainer",
  GRID: "grid",
  NUMERIC: "numeric",
  LABEL: "label",
  PASSWORD: "password",
  TOOGLEBUTTON: "buttontoggle",
  DROPDOWN: "dropdown",
  DATEPICKER: "datepicker"
};

const CONTROL_ITEMS = () => {
  return ComponentConfig.map((comp) => {
    let item = {};
    item.label = comp.label;
    item.value = comp.name;
    return item;
  }).sort((a, b) => (a.label > b.label ? 1 : -1));
};

export { CONTROL, CONTROL_ITEMS };
