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
            <div className="col-9">
              <TabView
                activeIndex={activeIndex1}
                onTabChange={(e) => setActiveIndex1(e.index)}
              >
                <TabPanel header="Header">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                </TabPanel>
                <TabPanel header="Cell">
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Consectetur, adipisci
                    velit, sed quia non numquam eius modi.
                  </p>
                </TabPanel>
                <TabPanel header="Cell Template">
                  <GridCellTemplate meta={meta} element={element}></GridCellTemplate>
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default React.memo(GridEditOptions);
