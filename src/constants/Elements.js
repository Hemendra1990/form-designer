import HDButton from "../components/HDButton";
import HDTextarea from "../components/HDTextarea";
import HDInput from "../components/HDInput";
import HDContainer from "../components/HDContainer";

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
