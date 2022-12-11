import { ListBox } from "primereact/listbox";
import { useEffect, useRef, useState } from "react";
import { CONTROL_ITEMS } from "../constants/Elements";
import getComponent from "../constants/HemendraConstants";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { createElementId } from "../utils/Utils";
import Draggable from "react-draggable";

import "./ControlPanel.css";

const ControlPanel = () => {
  const meta = useMetaContext();
  const { addElement } = useUpdateMetaContext();
  const wrapperRef = useRef();
  const headerRef = useRef();

  /**
   * Add Element to the Playground
   *
   * @param  event
   */
  const handleElementClick = (event) => {
    const id = createElementId();
    if (!meta.elements) {
      meta.elements = [];
    }
    const component = getComponent(event.value);
    const element = {
      type: event.value.toLowerCase(),
      name: `${event.value}-${id}`,
      id: `${event.value}-${id}`,
      component,
    };

    addElement(element);
  };

  useEffect(() => {
    /* const wrapperElement = wrapperRef.current;
    const headerElement = headerRef.current;

    headerElement.addEventListener("mousedown", () => {
      headerElement.classList.add("active");
      headerElement.addEventListener("mousemove", onDrag);
    });

    document.addEventListener("mouseup", () => {
      headerElement.classList.remove("active");
      headerElement.removeEventListener("mousemove", onDrag);
    }); */
  }, []);

  /* 
  const header = wrapper.querySelector("header"); */
  /* const onDrag = ({ movementX, movementY }) => {
    const wrapper = document.querySelector(".control-panel-wrapper");
    let getStyle = window.getComputedStyle(wrapper);
    let left = parseInt(getStyle.left);
    let top = parseInt(getStyle.top);
    wrapper.style.left = `${left + movementX}px`;
    wrapper.style.top = `${top + movementY}px`;
  }; */

  return (
    /* This draggable is from https://www.npmjs.com/package/react-draggable */
    <Draggable>
      <div
        className="control-panel-wrapper"
        ref={wrapperRef}
        style={{ zIndex: "1000" }}
      >
        <header ref={headerRef}>
          <i style={{ color: "#5b5252" }} className="fa fa-bars"></i>
        </header>
        <div className="control-panel-content">
          <ListBox
            filter={true}
            options={CONTROL_ITEMS()}
            onChange={handleElementClick}
            listStyle={{ height: "180px" }}
          />
        </div>
      </div>
    </Draggable>
  );
};

export default ControlPanel;
