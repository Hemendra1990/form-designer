import React from "react";
import {Button} from "primereact/button";


const getReactComps = {
  "button": Button,
}

const executeEvent = (eventName, row) => {
  console.log('execute event on grid item click...');
}

let getNodes = (str) =>
  new DOMParser().parseFromString(str, "text/html").body.childNodes;
let createJSX = (nodeArray, rowData) => {
  return nodeArray.map((node) => {
    let attributeObj = {rowData};
    const { attributes, localName, childNodes, nodeValue } = node;
    if (attributes) {
      Array.from(attributes).forEach((attribute) => {
        if (attribute.name === "style") {
          attribute.nodeValue = attribute.nodeValue.trim();
          let styleAttributes = attribute.nodeValue.split(";");
          let styleObj = {};
          styleAttributes.forEach((attribute) => {
            let [key, value] = attribute.trim().split(":");
            styleObj[key] = value;
          });
          attributeObj[attribute.name] = styleObj;
        } else {
          if(attribute.name === 'classname') {
            attributeObj["className"] = attribute.nodeValue;
          } else if(attribute.name === 'onclick') {
            attributeObj["onClick"] = (e) => {
              debugger;
              const fun = new Function('event', 'row', 'nodeVal', 'attributeObj', `
                              debugger;
                              console.log(nodeVal);
                              let t = new Function('row', nodeVal);
                              return t(row)`);
              fun(e, attributeObj.rowData, attribute.nodeValue, attributeObj);
            };
          } else if(attributeObj[attribute.name] !== 'rowData') {
            attributeObj[attribute.name] = attribute.nodeValue;
          }
        }
      });
    }
    return localName
      ? React.createElement(
          getReactComps[localName] || localName,
          attributeObj,
          childNodes && Array.isArray(Array.from(childNodes))
            ? createJSX(Array.from(childNodes), rowData)
            : childNodes
        )
      : nodeValue.includes("{")? replaceVal(rowData, nodeValue): nodeValue;
  });
};

const replaceVal = new Function('row', 'expr', `
  let key = expr.split('\${row.')[1];
  key = key.replace('}','');
  const result = row[key];
  return row[key];
`);/*eslint no-new-func: */

export const StringToJSX = ({domString, rowData}) => {
  return createJSX(Array.from(getNodes(domString)), rowData);
};
