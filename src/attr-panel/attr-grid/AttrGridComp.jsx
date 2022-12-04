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
  
  const openGridoptions = () => {
    setGridModal(true);
  };

  const applyGridOptions = () => {
    setGridModal(false);
    element.ref.current.applyGridOptions && element.ref.current.applyGridOptions(); //calls HDGrid.applyGridOptions()
  }
  
  const ds = ["API-1", "API-2"];

  return (
    <>
      <label>
        <b>Grid Attributes</b>
        <i>(API as datasource is the first implementation)</i>
      </label>
      <div className="field col-12">
        <label htmlFor="datasource">Datasource</label>
        <Dropdown
          name="datasource"
          value={meta.currentElement?.attributes?.datasource}
          options={ds}
          onChange={(e) => {
            handleAttributeChange(e);
            dataConnector.handleDatasourceChange(element);
          }}
          placeholder="Select Datasource"
        />
      </div>
      <div className="field col-12">
        <label htmlFor="datasource">
          <b>Response to use</b>(
          <i>
            use like 'response.data or response.result' an array from the
            response
          </i>
          )
        </label>
        <InputText
          name="responseToUse"
          onChange={e => handleAttributeChange(e)}
          onBlur={(e) => {
            dataConnector.handleDatasourceChange(element);
          }}
          value={currAttribute?.responseToUse}
          placeholder="response.data or response.result"
        />
      </div>
      <div className="field col-12">
        <label htmlFor="class">Class</label>
        <InputText
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
      {enbleGridModal && 
        <GridEditAttributes meta={meta} columns={dataConnector.getColumns()} currentElement={element} hideModal={applyGridOptions}></GridEditAttributes>}
    </>
  );
};

export default AttrGrid;
