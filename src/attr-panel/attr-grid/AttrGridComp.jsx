import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { DataConnector } from "../data-connector/DataConnector";
import { Button } from "primereact/button";
import { useState } from "react";
import GridEditAttributes from "./GridEditAttributes";

const AttrGrid = (props) => {
  const meta = props.meta;
  const { handleAttributeChange, updateClass } = props;
  const element = meta.currentElement;
  const currAttribute = meta.currentElement?.attributes;
  const dataConnector = new DataConnector(meta);

  const [enbleGridModal, setGridModal] = useState(false);
  const [controlName, setControlName] = useState(meta.currentElement.id || "");

  const openGridoptions = () => {
    setGridModal(true);
  };

  const applyGridOptions = () => {
    setGridModal(false);
    element.ref.current.applyGridOptions &&
      element.ref.current.applyGridOptions(); //calls HDGrid.applyGridOptions()
  };

  return (
    <>
      <div className="field col-12">
        <label htmlFor="controlId" className="block">Control ID</label>
        <InputText
          style={{ width: '100%' }}
          name="placeholder"
          value={meta.currentElement.id}
          disabled
        />
      </div>
      <div className="field col-12">
        <label htmlFor="controlName" className="block">
          Name
        </label>
        <InputText
          name="name"
          style={{ width: "100%" }}
          value={controlName}
          onChange={(e) => {
            setControlName(e.target.value);
            handleAttributeChange(e);
          }}
        />
      </div>
      <div className="field col-12">
        <label className="block">Class</label>
        <InputText
          style={{ width: "100%" }}
          name="className"
          placeholder="col-12 md:col-6 lg:col-3"
          value={currAttribute?.className || ""}
          onChange={updateClass}
        />
      </div>
      <div className="field col-12">
        <Button
          label="Edit Grid Options"
          className="p-button-danger"
          onClick={openGridoptions}
        />
      </div>
      {enbleGridModal && (
        <GridEditAttributes
          meta={meta}
          columns={dataConnector.getColumns()}
          currentElement={element}
          hideModal={applyGridOptions}
        ></GridEditAttributes>
      )}
    </>
  );
};

export default AttrGrid;
