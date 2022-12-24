import React, { forwardRef, memo, useImperativeHandle, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { TabView, TabPanel } from "primereact/tabview";
import { Button } from "primereact/button";
import AddNewApi from "./AddNewApi";

const ApiModeler = forwardRef((props, ref) => {
  const [showApiModel, setShowApiModel] = useState(false);

  useImperativeHandle(ref, () => ({
    openApiConfigModeler() {
      setShowApiModel(true);
    },
  }));

  const footer = (
    <div>
      <Button
        className="p-button-warning"
        label="Yes"
        icon="pi pi-check"
        onClick={() => setShowApiModel(false)}
      />
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setShowApiModel(false)}
      />
    </div>
  );
  return (
    <>
      <Dialog
        header="API"
        visible={showApiModel}
        style={{ width: "70vw" }}
        footer={footer}
        onHide={() => {
          setShowApiModel(false);
        }}
      >
        <TabView>
          <TabPanel header="List">
            <p>Show List of APIs</p>
          </TabPanel>
          <TabPanel header="Add New">
            <AddNewApi />
          </TabPanel>
        </TabView>
      </Dialog>
    </>
  );
});

export default memo(ApiModeler);
