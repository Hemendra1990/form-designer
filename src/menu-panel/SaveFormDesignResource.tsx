import React, { Fragment, memo, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface SaveFormProp {
  setShowFormSaveModal: Function;
}
const SaveFormDesignResource = (props: SaveFormProp) => {
  const [showModal, setShowModal] = useState(true);
  const [resourceName, setResourceName] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");

  const handleSave = () => {
    setShowModal(false);
    props.setShowFormSaveModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    props.setShowFormSaveModal(false);
  };

  const footer = (
    <div>
      <Button
        label="Save"
        className="p-button-outlined p-button-secondary"
        icon="pi pi-check"
        onClick={() => {
          handleSave();
        }}
      />
      <Button
        label="Cancel"
        className="p-button-outlined p-button-danger"
        icon="pi pi-times"
        onClick={() => {
          handleCancel();
        }}
      />
    </div>
  );
  return (
    <Fragment>
      <Dialog
        header="Save"
        closable={false}
        visible={showModal}
        style={{ width: "30vw" }}
        footer={footer}
        onHide={() => setShowModal(false)}
      >
        <div className="grid">
          <div className="col-12">
            <InputText
              style={{ width: "100%" }}
              placeholder="Resource Name"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
            />
          </div>
          <div className="col-12">
            <InputText
              style={{ width: "100%" }}
              placeholder="Resource Description"
              value={resourceDescription}
              onChange={(e) => setResourceDescription(e.target.value)}
            ></InputText>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
};

export default memo(SaveFormDesignResource);
