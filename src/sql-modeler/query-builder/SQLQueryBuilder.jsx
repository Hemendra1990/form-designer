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
import randomstring from "randomstring";
import { useMetaContext, useUpdateMetaContext } from "../../context/MetaContext";
import {useNavigate} from "react-router-dom";

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

const SQLQueryBuilder = (props) => {
  const { setShowSQLBuilder } = props;
  const [showQueryModeler, setShowQueryModeler] = useState(true);
  const [sqlQueryTabs, setSQLQueryTabs] = useState([]);
  const [dataSources, setDataSources] = useState([]);
  const [tabActiveIndex, setTabActiveIndex] = useState(0);
  const [queryTestResult, setQueryTestResult] = useState("");
  const [queryTestStatus, setQueryTestStatus] = useState(null);

  const meta = useMetaContext();
  const { updateMeta } = useUpdateMetaContext();
  let navigate = useNavigate();

  const fetchDataSources = () => {
    httpService.JNDI.list().then((res) => {
      setDataSources(res.data);
    });
  };

  useEffect(() => {
    fetchDataSources();
  }, []);

  /*useImperativeHandle(ref, () => {
    return {
      openSqlQueryBuilder() {
        setShowQueryModeler(true);
      },

      currentTab(tab) {
        console.log("Current Tab", tab);
      },
    };
  });*/

  const testQuery = (e) => {
    const currTab = sqlQueryTabs[tabActiveIndex - 1];
    console.log(currTab);
    const testQueryData = {
      usedPlaceHolderList: [],
      sqlVariables: {},
      extraParam: {
        controlIds: [],
        paginationInfo: "1-25",
        placeHolders: {},
      },
      query: currTab.query,
      type: currTab.type,
      queryId: currTab.queryId,
      datasourceName: currTab.dataSourceName.name,
      name: currTab.name,
      sort: {},
      orderBy: false,
    };
    httpService.QUERY.test(testQueryData)
      .then((res) => {
        console.log("Query Test Response", res);
        const resData = res.data;
        setQueryTestStatus(resData.status);
        setQueryTestResult(resData.msg);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSaveQuery = () => {
    const currTab = sqlQueryTabs[tabActiveIndex - 1];
    const cacheQueryData = {
      [currTab.queryId]: `${currTab.query}`,
    };
    httpService.QUERY.cacheQuery(meta.sessionId, cacheQueryData).then((res) => {
      console.log("Cache Query response", res);
      if (res.data.status) {
        //Save the query in the meta.sqlList
        const saveQueryData = {
          sqlvariables: {},
          extraParam: {
            controlIds: [],
            paginationInfo: "1-25",
            placeHolders: {},
          },
          type: currTab.type,
          queryId: currTab.queryId,
          datasourceName: currTab.dataSourceName.name,
          name: currTab.name,
          sort: {},
          orderBy: false,
          sessionId: meta.sessionId,
        };
        meta.sqlList.push(saveQueryData);
        updateMeta(meta);
        console.log(meta);
        setShowQueryModeler(false);

        //setShowSQLBuilder(false); //Menubar parent
      }
      navigate(-1);
    });
  };

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
        onClick={testQuery}
      />
      <Button
        className="p-button-outlined p-button-success"
        label="Save"
        icon="pi pi-save"
        onClick={handleSaveQuery}
      />
      {/* onClick={() => setShowQueryModeler(false)} */}
      <Button
        className="p-button-outlined p-button-danger"
        label="Cancel"
        icon="pi pi-times"
        onClick={() => {setShowQueryModeler(false); navigate(-1)}}
      />
    </div>
  );

  const addNewQuery = () => {
    const uuid = uuidv4();
    tab.id = uuid;
    tab.queryId = randomstring.generate(8);
    tab.name = `sql_query_${sqlQueryTabs.length}`;
    const tabs = [...sqlQueryTabs, JSON.parse(JSON.stringify(tab))];
    setSQLQueryTabs(tabs);
    setTabActiveIndex(tabs.length);
  };

  const handleTabChange = (e) => {
    setTabActiveIndex(e.index);
    console.log("Tab Changed!!", e);
  };

  const renderHeader = () => {
    if (queryTestStatus) {
      return (
        <Fragment>
          SQL
          <label className="pull-right" style={{ color: "green" }}>
            {"Valid Query"}
          </label>
        </Fragment>
      );
    } else if (queryTestStatus != null && !queryTestStatus) {
      return (
        <Fragment>
          SQL
          <label className="pull-right" style={{ color: "red" }}>
            {queryTestResult}
          </label>
        </Fragment>
      );
    }
  };

  return (
    <>
      <Dialog
        header={renderHeader}
        visible={showQueryModeler}
        style={{ width: "70vw" }}
        footer={footer}
        onHide={() => {
          setShowQueryModeler(false);
        }}
        closable={false}
      >
        <TabView activeIndex={tabActiveIndex} onTabChange={handleTabChange}>
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
};

export default SQLQueryBuilder;
