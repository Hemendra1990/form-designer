import { Menubar } from "primereact/menubar";
import React, { memo } from "react"
import { useUpdateMetaContext } from "../context/MetaContext";

const HDMenubar = (props) => {
    const {clearAll, openReport, togglePlaygroundMode, saveReport, configure } = useUpdateMetaContext();
    const end = <label style={{ fontWeight: 800 }}>Hemendra's Low Code Designer</label>;
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
              label: "Open Report",
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
              label: "Save Report",
              icon: "pi pi-fw pi-save",
              command: () => {
                saveReport();
              }
            },
            {
              label: "Configure",
              icon: "pi pi-fw pi-save",
              command: () => {
                configure();
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
            { label: "SQL", icon: "pi pi-database" },
          ],
        },
      ];

    return(
        <div className="p-fluid grid menubar" style={{ background: "#ffffff" }}>
        <div className="col">
          <Menubar className="z-5" model={menuItems} end={end} />
        </div>
      </div>
    )
}

export default memo(HDMenubar);