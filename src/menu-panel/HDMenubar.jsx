import { Menubar } from "primereact/menubar";
import React, { memo, useRef } from "react"
import ReportConfiguration from "../configuration/ReportConfiguration";
import { useUpdateMetaContext } from "../context/MetaContext";

const HDMenubar = (props) => {
    const reportConfigRef = useRef()
    const {clearAll, openReport, togglePlaygroundMode, saveReport, configure } = useUpdateMetaContext();
    const end = <p style={{ fontWeight: 800 }}>Hemendra's Low Code Designer</p>;

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
            { label: "API", icon: "" },
            { label: "SQL", icon: "" },
          ],
        },
      ];

    return(
        <div className="grid menubar" style={{ background: "#ffffff" }}>
        <div className="col-12">
          <Menubar className="z-5" model={menuItems} end={end} />
        </div>
        <ReportConfiguration ref={reportConfigRef}/>
      </div>
    )
}

export default memo(HDMenubar);