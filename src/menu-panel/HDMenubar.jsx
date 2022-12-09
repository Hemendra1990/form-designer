import { Menubar } from "primereact/menubar";
import React, { memo, useRef, useState } from "react"
import ApiModeler from "../api-modeler/ApiModeler";
import ReportConfiguration from "../configuration/ReportConfiguration";
import { useUpdateMetaContext } from "../context/MetaContext";

const HDMenubar = (props) => {
    const reportConfigRef = useRef()
    const apiConfigRef = useRef()
    const [openReportConfiguration, setOpenReportConfiguration] = useState(false);
    const {clearAll, openReport, togglePlaygroundMode, saveReport, configure, configureApi } = useUpdateMetaContext();
    const end = <p style={{ fontWeight: 400, color:'#fff'}}>Hemendra's Low Code Designer</p>;
    const start = <img alt="logo" src="/logo-white.png" height="40" className="mr-2 mt-2 ml-4"></img>;

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
              }
            },
            {
              label: "Configure",
              icon: "pi pi-fw pi-cog",
              command: () => {
                setOpenReportConfiguration(true);
                configure(reportConfigRef);
              }
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
            { label: "Data Source", icon: "pi pi-database" },
            { 
              label: "API", icon: "", command: ()=> {
                
                configureApi(apiConfigRef);
              } 
            },
            { label: "SQL", icon: "" },
          ],
        },
      ];

    return(
        <>
        <Menubar model={menuItems} start={start} />
          <ReportConfiguration ref={reportConfigRef}/>
          <ApiModeler ref={apiConfigRef}/>
        </>
    )
}

export default memo(HDMenubar);