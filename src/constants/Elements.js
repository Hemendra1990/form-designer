import HemendraButton from "../components/HemendraButton";
import HemendraTextarea from "../components/HemendraTextarea";
import HemendraInput from "../components/HemendraInput";
import HemendraContainer from "../components/HemendraContainer";

const ComponentConfig = [
    {
        label: "Textarea",
        name: "textarea",
        component: HemendraTextarea
    },
    {
        label: "Input",
        name: "input",
        component: HemendraInput
    },
    {
        label: "Button",
        name: "button",
        component: HemendraButton
    },
    {
        label: "Container",
        name: "container",
        component: HemendraContainer
    },
]
export default ComponentConfig;


const CONTROL = {
    BUTTON : 'button',
    INPUT :'input',
    TEXTAREA: 'textarea',
    CONTAINER: 'container'
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
