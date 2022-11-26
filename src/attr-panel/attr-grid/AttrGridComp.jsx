import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { DataConnector } from "../data-connector/DataConnector";


const AttrGrid = (props) => {
  const meta = props.meta;
  const { handleAttributeChange } = props;
  const element = meta.currentElement;
  const currAttribute = meta.currentElement?.attributes;
  const dataConnector = new DataConnector(meta);
  const ds = ["API-1", "API-2"]

  return (
    <>
    
      <label>
          <b>Grid Attributes 
          </b>
          <i>(API as datasource is the first implementation)</i>
      </label>
      <div className="field col-12">
        <label htmlFor="datasource">Datasource</label>
        <Dropdown
          name="datasource"
          value={meta.currentElement?.attributes?.datasource}
          options={ds}
          onChange={(e) => { handleAttributeChange(e); dataConnector.handleDatasourceChange(element);} }
          placeholder="Select Datasource"
        />
      </div>
      <div className="field col-12">
        <label htmlFor="datasource"><b>Response to use</b>
        (<i>use like 'response.data or response.result' an array from the response</i>)
        </label>
        <InputText
          name="responseToUse"
          onBlur={(e) => {handleAttributeChange(e); dataConnector.handleDatasourceChange(element);}}
          value={currAttribute?.responseToUse} /* value={currAttribute?.maxLength} */
          placeholder="response.data or response.result"
        />
      </div>
      
    </>
  );
};

export default AttrGrid;
