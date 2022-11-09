import HemendraButton from "../components/HemendraButton";
import HemendraTextarea from "../components/HemendraTextarea";
import HemendraInput from "../components/HemendraInput";

const ComponentConfig = [
    {
        name: "textarea",
        component: HemendraTextarea
    },
    {
        name: "input",
        component: HemendraInput
    },
    {
        name: "button",
        component: HemendraButton
    },
]
export default ComponentConfig;


const CONTROL = {
    BUTTON : 'button',
    INPUT :'input',
    TEXTAREA: 'textarea'
}

export {CONTROL};
