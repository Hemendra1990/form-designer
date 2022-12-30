import ComponentConfig from "./Elements";

const getComponent = (componentName) => {
  let comp = ComponentConfig.find((comp) => comp.name === componentName);
  return comp.component;
};

export const jsonStringifyIgnoredList = [
  "meta",
  "component",
  "stateNode",
  "Provider",
  "ref",
  "toastRef",
  "currentElement",
  "reactComponent",
  "elementMap",
];

export default getComponent;
