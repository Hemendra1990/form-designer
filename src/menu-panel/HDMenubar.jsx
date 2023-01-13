import { Menubar } from "primereact/menubar";
import React, { memo, useRef, useState } from "react";
import ApiModeler from "../api-modeler/ApiModeler";
import ReportConfiguration from "../configuration/ReportConfiguration";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import SaveFormDesignResource from "./SaveFormDesignResource";
import { useNavigate } from "react-router-dom";

const HDMenubar = (props) => {
  const reportConfigRef = useRef();
  const apiConfigRef = useRef();

  const [showDatasourceBuilder, setShowDatasourceBuilder] = useState(false);
  const [showSQLBuilder, setShowSQLBuilder] = useState(false);
  const [showFormSaveModal, setShowFormSaveModal] = useState(false);

  const [openReportConfiguration, setOpenReportConfiguration] = useState(false);
  const {
    clearAll,
    openReport,
    togglePlaygroundMode,
    saveReport,
    configure,
    configureApi,
    configureDataSource,
    configureQueryBuilder,
  } = useUpdateMetaContext();
  let navigate = useNavigate();
  const start = (
    <img
      alt="logo"
      src="/logo-white.png"
      height="40"
      className="mr-2 mt-2 ml-4"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/")}
    ></img>
  );
  const meta = useMetaContext();

  const menuItems = [
    {
      label: "Home",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-plus",
          command: () => {
            clearAll();
          },
        },
        {
          label: "Open",
          icon: "pi pi-fw pi-folder-open",
          command: () => {
            //openReport();
            navigate("resources");
          },
        },
        {
          label: "Preview/Edit",
          icon: "pi pi-eye",
          command: () => {
            togglePlaygroundMode();
          },
        },
        {
          label: "Save",
          icon: "pi pi-fw pi-save",
          command: () => {
            setShowFormSaveModal(true);
            setTimeout(() => {
              saveReport();
            }, 0);
          },
        },
        {
          label: "Configure",
          icon: "fa fa-wrench",
          command: () => {
            setOpenReportConfiguration(true);
            configure(reportConfigRef);
          },
        },
      ],
    },
    {
      label: "Configure",
      items: [
        {
          label: "Events",
          icon: "pi pi-fw pi-cog",
          command: () => {
            /*props.toggleEventModal();*/
            navigate("event-builder");
          },
        },
        {
          label: "Data Source",
          icon: "pi pi-database",
          command: () => {
            /*setShowDatasourceBuilder(true);
            setTimeout(() => {
              configureDataSource(dataSourceConfigRef);
            }, 0);*/
            navigate("datasource-builder");
          },
        },
        {
          label: "SQL",
          icon: "pi pi-table",
          command: () => {
            /*setShowSQLBuilder(true);
            setTimeout(() => {
              configureQueryBuilder(sqlQueryBuilderRef);
            }, 0);*/
            navigate("sql-builder");
          },
        },
        {
          label: "API",
          icon: "fa fa-plug",
          command: () => {
            configureApi(apiConfigRef);
          },
        },
      ],
    },
  ];

  const menuBar = () => {
    if (meta.editMode) {
      return <Menubar model={menuItems} start={start} />;
    } else {
      return <Menubar model={[]} start={start} />;
    }
  };

  return (
    <>
      {menuBar()}
      <ReportConfiguration ref={reportConfigRef} />
      <ApiModeler ref={apiConfigRef} />

      {showFormSaveModal && (
        <SaveFormDesignResource
          setShowFormSaveModal={setShowFormSaveModal}
        ></SaveFormDesignResource>
      )}
    </>
  );
};

export default memo(HDMenubar);
