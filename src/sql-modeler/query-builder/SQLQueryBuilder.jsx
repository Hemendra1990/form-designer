import {
  forwardRef,
  Fragment,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { TabPanel, TabView } from "primereact/tabview";
import AddSQL from "./AddSQL";
import { v4 as uuidv4 } from "uuid";
import httpService from "../../http-service/http-service";

const tab = {
  id: 0,
  queryId: "",
  type: "select" | "insert" | "update" | "delete" | "procedure",
  name: "",
  query: "",
  orderBy: false,
  isTesting: false,
  queryStatus: "",
  disablePagination: false,
  isError: false,
  sory: {},
  paginationInfo: {},
  isSqlEdit: false,
  sqlNameEdited: false,
  dataSourceName: {
    name: "",
    id: "",
    url: "",
  },
};

const queryTypes = [
  { label: "SELECT", value: "select" },
  { label: "INSERT", value: "insert" },
  { label: "UPDATE", value: "update" },
  { label: "DELETE", value: "delete" },
  { label: "PROCEDURE", value: "procedure" },
];

const SQLQueryBuilder = forwardRef((props, ref) => {
  const [showQueryModeler, setShowQueryModeler] = useState(false);
  const [sqlQueryTabs, setSQLQueryTabs] = useState([]);
  const [dataSources, setDataSources] = useState([]);

  const fetchDataSources = () => {
    httpService.JNDI.list().then((res) => {
      setDataSources(res.data);
    });
  };

  useEffect(() => {
    fetchDataSources();
  }, []);

  useImperativeHandle(ref, () => {
    return {
      openSqlQueryBuilder() {
        setShowQueryModeler(true);
      },
    };
  });

  const footer = (
    <div>
      <Button
        icon="pi pi-plus"
        className="p-button-outlined p-button-warning "
        label="Add New Query"
        onClick={(e) => {
          addNewQuery();
        }}
      />
      <Button
        className="p-button-outlined p-button-secondary"
        label="Test"
        icon="pi pi-check"
        onClick={() => setShowQueryModeler(false)}
      />
      <Button
        className="p-button-outlined p-button-success"
        label="Save"
        icon="pi pi-save"
        onClick={() => setShowQueryModeler(false)}
      />
      <Button
        className="p-button-outlined p-button-danger"
        label="No"
        icon="pi pi-times"
        onClick={() => setShowQueryModeler(false)}
      />
    </div>
  );

  const addNewQuery = () => {
    const uuid = uuidv4();
    tab.id = uuid;
    tab.name = `sql_query_${sqlQueryTabs.length}`;
    const tabs = [...sqlQueryTabs, JSON.parse(JSON.stringify(tab))];
    setSQLQueryTabs(tabs);
  };

  return (
    <>
      <Dialog
        header="SQL"
        visible={showQueryModeler}
        style={{ width: "70vw" }}
        footer={footer}
        onHide={() => {
          setShowQueryModeler(false);
        }}
        closable={false}
      >
        <TabView>
          <TabPanel header="List">
            <p>Show List of SQLs</p>
          </TabPanel>
          {sqlQueryTabs.map((tab) => (
            <TabPanel key={tab.id} header={tab.name} closable>
              <AddSQL
                tab={tab}
                dataSources={dataSources}
                queryTypes={queryTypes}
              ></AddSQL>
            </TabPanel>
          ))}
        </TabView>
      </Dialog>
    </>
  );
});

export default memo(SQLQueryBuilder);
