import { Menubar } from "primereact/menubar";
import React, { memo, useRef, useState } from "react";
import ApiModeler from "../api-modeler/ApiModeler";
import ReportConfiguration from "../configuration/ReportConfiguration";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import DataSourceBuilder from "../sql-modeler/DataSourceBuilder";

const HDMenubar = (props) => {
  const reportConfigRef = useRef();
  const apiConfigRef = useRef();
  const dataSourceConfigRef = useRef();
  const [openReportConfiguration, setOpenReportConfiguration] = useState(false);
  const {
    clearAll,
    openReport,
    togglePlaygroundMode,
    saveReport,
    configure,
    configureApi,
    configureDataSource,
  } = useUpdateMetaContext();
  const end = (
    <p style={{ fontWeight: 400, color: "#fff" }}>
      Hemendra's Low Code Designer
    </p>
  );
  const start = (
    <img
      alt="logo"
      src="/logo-white.png"
      height="40"
      className="mr-2 mt-2 ml-4"
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
            openReport();
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
            saveReport();
          },
        },
        {
          label: "Configure",
          icon: "pi pi-fw pi-cog",
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
            props.toggleEventModal();
          },
        },
        {
          label: "Data Source",
          icon: "pi pi-database",
          command: () => {
            configureDataSource(dataSourceConfigRef);
          },
        },
        {
          label: "API",
          icon: "",
          command: () => {
            configureApi(apiConfigRef);
          },
        },
        { label: "SQL", icon: "" },
      ],
    },
  ];

  const menuBar = () => {
    console.log(meta);
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
      <DataSourceBuilder ref={dataSourceConfigRef}></DataSourceBuilder>
    </>
  );
};

export default memo(HDMenubar);
