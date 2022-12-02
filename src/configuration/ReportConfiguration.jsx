import React, { forwardRef, memo, useImperativeHandle, useState } from "react";
import { Dialog } from "primereact/dialog";

const ReportConfiguration = forwardRef((props, ref) => {
  const [showConfigure, setShowConfigure] = useState(false);

  useImperativeHandle(ref, () => ({
    showReportConfigure() {
        console.log('Report Configuration ');
        setShowConfigure(true);
    }
  }));

  return (
    <>
      <Dialog
        header="Configuration"
        visible={showConfigure}
        style={{ width: "50vw" }}
        onHide={(e)=> setShowConfigure(false)}
      >
        <div className="grid">
            <div className="col-12">
                <label className="block">Before Load</label>
                <p>Hello</p>
            </div>
            <div className="col-12">
                <label className="block">On Load</label>
                <p>Hello</p>
            </div>
            <div className="col-12">
                <label className="block">After View Rendered</label>
                <p>Hello</p>
            </div>
        </div>
      </Dialog>
    </>
  );
});

export default memo(ReportConfiguration);
