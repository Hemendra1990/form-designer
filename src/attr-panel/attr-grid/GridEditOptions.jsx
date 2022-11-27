import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { TabView, TabPanel } from "primereact/tabview";
import { ListBox } from "primereact/listbox";
import GridCellTemplate from "./GridCellTemplate";
import { element } from "prop-types";

const GridEditOptions = ({ meta, currentElement, hideModal, columns }) => {
  const [showGridOptionsModal, setShowGridOptionsModal] = useState(true);
  const [activeIndex1, setActiveIndex1] = useState(0);
  const [selectedColumn, setSelectedColumn] = useState(null);

  const applyGridOptions = () => {
    console.log("Apply Grid Options to the Grid...");
  };

  const onClick = (name, position) => {};
  const onHide = (name) => {};

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => hideModal(name)}
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
          <p>
            Header styles and other options
          </p>
        </TabPanel>
        <TabPanel header="Cell">
          <p>
            Cell Styles and Other Options
          </p>
        </TabPanel>
        <TabPanel header="Cell Template">
          <GridCellTemplate meta={meta} element={element} selectedColumn={selectedColumn}></GridCellTemplate>
        </TabPanel>
      </TabView>
    </div>
  );

  return (
    <>
      <Dialog
        header="Grid Options"
        visible={showGridOptionsModal}
        style={{ width: "70vw" }}
        footer={renderFooter("displayBasic")}
        onHide={() => hideModal()}
      >
        <div>
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
        </div>
      </Dialog>
    </>
  );
};

export default React.memo(GridEditOptions);
