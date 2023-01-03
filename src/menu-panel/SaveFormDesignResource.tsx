import React, { Fragment, memo, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SaveResource } from "../model/SaveResource";
import { useMetaContext } from "../context/MetaContext";
import { HttpFormResourceService } from "../http-service/HttpFormResourceService";
import { jsonStringifyIgnoredList } from "../constants/HemendraConstants";
import httpService from "../http-service/http-service";

interface SaveFormProp {
  setShowFormSaveModal: Function;
}
const SaveFormDesignResource = (props: SaveFormProp) => {
  const [showModal, setShowModal] = useState(true);
  const [resourceName, setResourceName] = useState("");
  const [resourceDescription, setResourceDescription] = useState("");
  const meta = useMetaContext();

  const handleSave = () => {
    let formResourceData = new SaveResource();
    if (resourceName === undefined || resourceName == "") {
      alert("Blank Report cannot be saved!!");
      return;
    }

    const metaJson = JSON.stringify(meta, (key, value) => {
      return jsonStringifyIgnoredList.includes(key) ? undefined : value;
    });

    const tempMeta = JSON.parse(metaJson);

    formResourceData.resourceName = resourceName;
    formResourceData.comment = "Some comment";
    formResourceData.description = resourceDescription;
    formResourceData.json.elements = tempMeta.elements;
    formResourceData.json.sqlList = meta.sqlList;
    formResourceData.json.apiList = meta.apiList;
    formResourceData.json.apiList = meta.apiList;
    formResourceData.json.events = meta.events;
    formResourceData.json.configuration = meta.configuration;
    formResourceData.json.version = "v1.0";
    formResourceData.images = []; //TODO: need to be added later
    formResourceData.assetIds = []; //TODO: need to be added later
    formResourceData.sessionId = meta.sessionId;
    if (
      formResourceData.json.sqlList !== undefined &&
      formResourceData.json.sqlList.length > 0
    ) {
      formResourceData.json.sqlList.forEach((data) => {
        if (data.extraParam.searchFilters != undefined) {
          data.extraParam.searchFilters = {};
        }
      });
    }

    let formSaveHttpService = new HttpFormResourceService();
    /* httpService.SAVE_FORM.save(formResourceData)
      .then((res) => {
        console.log("From Java script", res);
      })
      .catch((err) => console.error(err)); */
    formSaveHttpService
      .save(formResourceData)
      .then((res) => {
        console.log(res);
        setShowModal(false);
        props.setShowFormSaveModal(false);
      })
      .catch((err) => {
        console.error(err);
      });
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
