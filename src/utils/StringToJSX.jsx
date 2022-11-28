import React from "react";

let getNodes = (str) =>
  new DOMParser().parseFromString(str, "text/html").body.childNodes;
let createJSX = (nodeArray, rowData) => {
  return nodeArray.map((node) => {
    let attributeObj = {rowData};
    const { attributes, localName, childNodes, nodeValue } = node;
    if (attributes) {
      Array.from(attributes).forEach((attribute) => {
        if (attribute.name === "style") {
          let styleAttributes = attribute.nodeValue.split(";");
          let styleObj = {};
          styleAttributes.forEach((attribute) => {
            let [key, value] = attribute.split(":");
            styleObj[key] = value;
          });
          attributeObj[attribute.name] = styleObj;
        } else {
          attributeObj[attribute.name] = attribute.nodeValue;
        }
      });
    }
    return localName
      ? React.createElement(
          localName,
          attributeObj,
          childNodes && Array.isArray(Array.from(childNodes))
            ? createJSX(Array.from(childNodes), rowData)
            : childNodes
        )
      : nodeValue;
  });
};

export const StringToJSX = ({domString, rowData}) => {
  return createJSX(Array.from(getNodes(domString)), rowData);
};
