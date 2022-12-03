import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { TabView, TabPanel } from "primereact/tabview";
import { ListBox } from "primereact/listbox";
import GridCellTemplate from "./GridCellTemplate";
import GridOptions from "./GridOptions";

const GridEditAttributes = ({ meta, currentElement, hideModal, columns }) => {
  const [showGridOptionsModal, setShowGridOptionsModal] = useState(true);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedEditableType, setSelectedEditableType] = useState(null);

  const editableFieldTypes = ['None', 'Text', 'Dropdown', 'Multiselect', 'Checkbox', 'Datepicker'];

  const gridOptionsRef = useRef();

  const applyGridOptions = () => {
    console.log("Calling Attr Grid...", gridOptionsRef);
    hideModal();
  };

  function updateElement(e) {
    setSelectedEditableType(e.value); 
    if(currentElement.attributes) {
      currentElement.attributes.config = currentElement.attributes.config || {};
      currentElement.attributes.config[selectedColumn.id] = currentElement.attributes.config[selectedColumn.id] || {}
      currentElement.attributes.config[selectedColumn.id].editable = true;
      currentElement.attributes.config[selectedColumn.id].editableType = e.value;
    }
    
  }

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => hideModal()}
          className="p-button-text p-button-danger"
        />
        <Button
          label="Apply"
          icon="pi pi-check"
          onClick={() => applyGridOptions()}
          autoFocus
        />
      </div>
    );
  };

  const showColumnOptionTabs = (
    <div className="col-9">
      <TabView
        activeIndex={activeIndex1}
        onTabChange={(e) => setActiveIndex1(e.index)}
      >
        <TabPanel header="Header">
          <p>Header styles and other options</p>
        </TabPanel>
        <TabPanel header="Cell">
          <p>Cell Styles and Other Options</p>
        </TabPanel>
        <TabPanel header="Cell Template">
          <GridCellTemplate
            meta={meta}
            element={currentElement}
            selectedColumn={selectedColumn}
          ></GridCellTemplate>
        </TabPanel>
        <TabPanel header="Editable">
          <Dropdown value={selectedEditableType} options={editableFieldTypes} onChange={(e)=> {updateElement(e)}}></Dropdown>
        </TabPanel>
      </TabView>
    </div>
  );

  return (
    <>
      <Dialog
        header="Grid Attributes"
        visible={showGridOptionsModal}
        style={{ width: "70vw", height: "90vh" }}
        footer={renderFooter("displayBasic")}
        onHide={() => hideModal()}
      >
        <div>
          <TabView>
            <TabPanel header="Columns">
              <div className="grid">
                <div className="col-3">
                  <ListBox
                    value={selectedColumn}
                    options={columns}
                    onChange={(e) => setSelectedColumn(e.value)}
                    optionLabel="header"
                    style={{ width: "15rem" }}
                  />
                </div>
                {selectedColumn && showColumnOptionTabs}
              </div>
            </TabPanel>
            <TabPanel header="Options">
              <GridOptions ref={gridOptionsRef} element={currentElement}/>
            </TabPanel>
          </TabView>
        </div>
      </Dialog>
    </>
  );
};

export default React.memo(GridEditAttributes);
