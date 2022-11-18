import HDButton from "../components/HDButton";
import HDTextarea from "../components/HDTextarea";
import HDInput from "../components/HDInput";
import HDContainer from "../components/HDContainer";
import HDPanel from "../components/HDPanel";
import HDFieldset from "../components/HDFieldset";
import HDRadioButton from "../components/HDRadioButton";
import HDListBox from "../components/HDListBox";

const ComponentConfig = [
    {
        label: "Textarea",
        name: "textarea",
        component: HDTextarea
    },
    {
        label: "Input",
        name: "input",
        component: HDInput
    },
    {
        label: "Button",
        name: "button",
        component: HDButton
    },
    {
        label: "Container",
        name: "container",
        component: HDContainer
    },
    {
        label: "Panel",
        name: "panel",
        component: HDPanel
    },
    {
        label: "Fieldset",
        name: "fieldset",
        component: HDFieldset
    },
    {
        label: "Radio",
        name: "radio",
        component: HDRadioButton
    },
    {
        label: "ListBox",
        name: "listbox",
        component: HDListBox
    },
]
export default ComponentConfig;


const CONTROL = {
    BUTTON : 'button',
    INPUT :'input',
    TEXTAREA: 'textarea',
    CONTAINER: 'container',
    PANEL: 'panel',
    FIELDSET: 'fieldset',
    RADIO: 'radio',
    LISTBOX: 'listbox'
}

const CONTROL_ITEMS = () => {
    return ComponentConfig.map(comp => {
        let item = {};
        item.label = comp.label;
        item.value = comp.name;
        return item;
    })
}

export {CONTROL, CONTROL_ITEMS};
