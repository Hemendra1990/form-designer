import ComponentConfig from "./Elements";

const getComponent = (componentName) => {
    let comp = ComponentConfig.find(comp => comp.name === componentName)
    return comp.component;
}

export default getComponent;