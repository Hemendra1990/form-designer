import React, {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { useMetaContext, useUpdateMetaContext } from "../context/MetaContext";
import { Button } from "primereact/button";

const ReportConfiguration = forwardRef((props, ref) => {
  const [showConfigure, setShowConfigure] = useState(false);
  const [selectedBeforeLoadEvent, setSelectedBeforeLoadEvent] = useState(null);
  const [selectedOnLoadEvent, setSelectedOnLoadEvent] = useState(null);
  const [selectedAfterViewRenderedEvent, setSelectedAfterViewRenderedEvent] = useState(null);

  const meta = useMetaContext();
  const { saveReportConfiguration } = useUpdateMetaContext()

  const [eventOptions, setEventOptions] = useState([]);

  useImperativeHandle(ref, () => ({
    showReportConfigure() {
      setShowConfigure(true);
    },
    getEventConfiguration() {
      return {
        selectedBeforeLoadEvent,
        selectedOnLoadEvent,
        selectedAfterViewRenderedEvent
      }
    }
  }));

  useEffect(() => {
    if(meta.events) {
      const events = meta.events.map(ev => ev.id)
      setEventOptions(events);
    }
  }, [meta.events]);

  const footer = (
    <div>
        <Button label="Yes" icon="pi pi-check" onClick={(e)=> {setShowConfigure(false); saveReportConfiguration(ref);}} />
        <Button label="No" icon="pi pi-times" onClick={(e)=> {setShowConfigure(false);}} />
    </div>
);

  return (
    <>
      <Dialog
        header="Configuration"
        visible={showConfigure}
        style={{ width: "30vw" }}
        onHide={(e) => setShowConfigure(false)}
        footer={footer}
      >
        <div className="grid">
          <div className="col-12">
            <label className="block p-2">Before Load</label>
            <Dropdown
              value={selectedBeforeLoadEvent}
              options={eventOptions}
              onChange={(e) => {setSelectedBeforeLoadEvent(e.value)}}
              style={{width: '100%'}}
              showClear
            ></Dropdown>
          </div>
          <div className="col-12">
            <label className="block p-2">On Load</label>
            <Dropdown
              value={selectedOnLoadEvent}
              options={eventOptions}
              onChange={(e) => {setSelectedOnLoadEvent(e.value)}}
              style={{width: '100%'}}
              showClear
            ></Dropdown>
          </div>
          <div className="col-12">
            <label className="block p-2">After View Rendered</label>
            <Dropdown
              value={selectedAfterViewRenderedEvent}
              options={eventOptions}
              onChange={(e) => {setSelectedAfterViewRenderedEvent(e.value)}}
              style={{width: '100%'}}
              showClear
            ></Dropdown>
          </div>
        </div>
      </Dialog>
    </>
  );
});

export default memo(ReportConfiguration);
