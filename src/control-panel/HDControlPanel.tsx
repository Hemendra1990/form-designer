import { InputText } from "primereact/inputtext";
import { ListBox } from "primereact/listbox";
import React, { SyntheticEvent, useCallback, useRef, useState } from "react";
import { CONTROL_ITEMS } from "../constants/Elements";
import { SelectItem } from "../model/SelectItem";
import { FilterService } from "primereact/api";

import "./ControlPanel.css";
import { useDrag } from "react-dnd";
import { ItemType } from "../model/ItemType";
import { useMetaContext } from "../context/MetaContext";

interface ControlItemProp {
  index: number;
  controlItem: { label: string; value: string };
}

function HDControlPanel() {
  const wrapperRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLInputElement>(null);

  const controlItems: Array<SelectItem> = CONTROL_ITEMS();
  const [items, setItems] = useState(controlItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [left, setLeft] = useState(220);
  const [top, setTop] = useState(400);

  const meta = useMetaContext();

  const searchFields = ["name", "label", "value"];
  const onFilter = (e: any) => {
    const filterValue = e.target.value;
    setSearchTerm(filterValue);
    const filteredItems = FilterService.filter(
      controlItems,
      searchFields,
      filterValue,
      "contains"
    );
    setItems(filteredItems);
  };

  const moveControlPanel = useCallback(
    (left: number, top: number) => {
      if (left) {
        setLeft(left);
      }
      if (top) {
        setTop(top);
      }
    },
    [top, left]
  );

  const [{ isDragging }, dragPanel] = useDrag(
    () => ({
      type: ItemType.CONTROL_PANEL,
      item: { left, top, moveControlPanel, },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
      canDrag: () => {
        return meta.editMode;
      }
      
      
    }),
    [top, left]
  );

  const ControlItem = ({ index, controlItem }: ControlItemProp) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemType.HD_ELEMENT, //"hdElement"
      item: { index, controlItem, type: ItemType.HD_ELEMENT },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }));

    return (
      <li ref={drag} className="p-listbox-item draggable no-select">
        {controlItem.label}{" "}
      </li>
    );
  };

  return (
    <>
      <div
        className="control-panel-wrapper"
        ref={dragPanel}
        style={{ zIndex: "1000", left, top }}
      >
        <header ref={headerRef}>
          <i style={{ color: "#5b5252" }} className="fa fa-bars"></i>
        </header>
        <div className="control-panel-content">
          <div className="p-listbox p-component">
            <div className="p-listbox-header">
              <div className="p-listbox-filter-container">
                <InputText
                  type="text"
                  value={searchTerm}
                  onChange={onFilter}
                  className="p-listbox-filter"
                />
                <span className="p-listbox-filter-icon pi pi-search"></span>
              </div>
            </div>
            <div className="p-listbox-list-wrapper">
              <ul className="p-listbox-list">
                {items.map((controlItem, index) => {
                  return (
                    <ControlItem
                      key={index}
                      index={index}
                      controlItem={controlItem}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HDControlPanel;
