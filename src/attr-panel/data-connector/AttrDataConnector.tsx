import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useEffect, useState } from "react";
import { DataConnector } from "../data-connector/DataConnector";

interface AttrDataConnectorProps {
  meta: any;
  handleAttributeChange: Function;
  updateClass: Function;
}

const AttrDataConnector = (props: AttrDataConnectorProps) => {
  const { meta, handleAttributeChange, updateClass } = props;
  const element = meta.currentElement;
  const dataConnector = new DataConnector(meta);

  const [sqlDataSource, setSqlDataSource] = useState();
  const [datasource, setDataSource] = useState();

  useEffect(() => {
    setSqlDataSource(meta.currentElement?.attributes?.sqldatasource);
    setDataSource(meta.currentElement?.attributes?.datasource);
  }, []);

  const ds = ["API-1", "API-2"];
  const dsSQL = meta.sqlList;
  const handleSQLDataSourceChange = (e: any) => {
    setSqlDataSource(e.value);
    handleAttributeChange(e);
    console.log(e.value);
    const selectedDs = e.value;
    if (selectedDs !== undefined) {
      selectedDs.extraParam.controlIds.push(element.id);
    }
    dataConnector.handleDatasourceChange(element, meta);
  };

  return (
    <>
      <div className="card">
        <TabView>
          <TabPanel header="SQL">
            <div className="field col-12">
              <label htmlFor="datasource" className="block">
                SQL Datasource
              </label>
              <Dropdown
                style={{ width: "100%" }}
                name="sqldatasource"
                value={sqlDataSource}
                options={dsSQL}
                showClear={true}
                optionLabel="name"
                onChange={handleSQLDataSourceChange}
                placeholder="Select SQL Datasource"
              />
            </div>
          </TabPanel>
          <TabPanel header="API">
            <label>
              <b>Grid Attributes</b>
              <i>(API as datasource is the first implementation)</i>
            </label>
            <div className="field col-12">
              <label htmlFor="datasource" className="block">
                Datasource
              </label>
              <Dropdown
                style={{ width: "100%" }}
                name="datasource"
                value={datasource}
                options={ds}
                showClear={true}
                onChange={(e) => {
                  setDataSource(e.value);
                  handleAttributeChange(e);
                  dataConnector.handleDatasourceChange(element);
                }}
                placeholder="Select Datasource"
              />
            </div>
            <div className="field col-12">
              <label htmlFor="datasource" className="block">
                <b>Response to use</b>(
                <i>
                  use like 'response.data or response.result' an array from the
                  response
                </i>
                )
              </label>
              <InputText
                style={{ width: "100%" }}
                name="responseToUse"
                onChange={(e) => handleAttributeChange(e)}
                onBlur={(e) => {
                  dataConnector.handleDatasourceChange(element);
                }}
                value={element?.attributes?.responseToUse}
                placeholder="response.data or response.result"
              />
            </div>
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default AttrDataConnector;
