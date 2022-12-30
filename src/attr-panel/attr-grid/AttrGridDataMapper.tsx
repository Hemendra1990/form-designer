import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { TabPanel, TabView } from 'primereact/tabview';
import React from 'react';
import { DataConnector } from "../data-connector/DataConnector";

interface AttrGridDataMapperProps {
    meta: any;
    handleAttributeChange: Function
    updateClass: Function
}

const AttrGridDataMapper = (props: AttrGridDataMapperProps) => {
    const { meta, handleAttributeChange, updateClass } = props;
    const element = meta.currentElement;
    const dataConnector = new DataConnector(meta);

    const ds = ["API-1", "API-2"];
    const dsSQL = meta.sqlList;
    const handleSQLDataSourceChange = (e: any) => {
        handleAttributeChange(e);
        console.log(e.value);
        const selectedDs = e.value;
        selectedDs.extraParam.controlIds.push(element.id);
        dataConnector.handleDatasourceChange(element);
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
                                value={meta.currentElement?.attributes?.datasource}
                                options={dsSQL}
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
    )
}

export default AttrGridDataMapper;