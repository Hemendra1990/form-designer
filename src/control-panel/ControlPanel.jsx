import { Button } from "primereact/button";
import { ListBox } from "primereact/listbox";
import getComponent from "../constants/HemendraConstants";
import { createElementId } from "../utils/Utils";

const ControlPanel = (props) => {
  /**
   * Add Element to the Playground
   *
   * @param  event
   */
  const addElement = (event) => {
    if (event.value === "clear") {
      clearAll();
    } else {
      const id = createElementId();
      if (!props.meta.elements) {
        props.meta.elements = [];
      }
      const component = getComponent(event.value);
      const element = {
        type: event.value.toLowerCase(),
        name: `${event.value}-${id}`,
        id: `${event.value}-${id}`,
        component,
      };
      props.setMeta((prevValue) => {
        prevValue.elements.push(element);
        return {
          ...prevValue,
        };
      });
    }
  };

  /**
   * Clear the Playground
   */
  const clearAll = () => {
    props.setMeta((prevValue) => {
      prevValue.elements.length = 0;
      return {
        ...prevValue,
        currentElement: null,
      };
    });
  };

  const CONTROL_LIST = [
    {
      label: "Input",
      value: "input",
    },
    {
      label: "Textarea",
      value: "textarea",
    },
    {
      label: "Button",
      value: "button",
    },
    {
      label: "Clear All",
      value: "clear",
    },
  ];

  return (
    <>
      <ListBox options={CONTROL_LIST} onChange={addElement} />
    </>
  );
};

export default ControlPanel;
