import React, { createContext, useContext, useState } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

export const ConfirmationContext = createContext();

export const useConfirmationContext = () => {
  return useContext(ConfirmationContext);
};

const uniqueConfirmDialogId = (() => {
  let i = 0;
  return () => i++;
})();

const ConfirmationContextProvider = ({ children }) => {
  const [confirmDialogs, setConfirmDialogs] = useState([]);

  const confirmActions = {
    push(content, onHideCallback, onAcceptCallback, onRejectCallback) {
      const modal = (
        <ConfirmDialog
          visible={true}
          onHide={() => this.onHide(onHideCallback)}
          message="Are you sure you want to proceed?"
          header="Confirmation"
          icon="pi pi-exclamation-triangle"
          accept={() => this.onAccept(onAcceptCallback)}
          reject={() => this.onReject(onRejectCallback)}
        />
      );
      setConfirmDialogs((modals) => [...modals, modal]);
    },
    onHide(onHideCallback) {
      let prevModal = "";
      setConfirmDialogs((prevModals) => {
        prevModal = prevModals[prevModals.length - 1];
        prevModals.pop();
        return [...prevModals];
      });
      onHideCallback && onHideCallback(prevModal); //This is call back method sot
    },
    onAccept(onAcceptCallback) {
        onAcceptCallback();
    },
    onReject(onRejectCallback) {
        onRejectCallback();
    }
  };

  return (
    <ConfirmationContext.Provider value={{confirmActions, confirmDialogs}}>{children}</ConfirmationContext.Provider>
  );
};

export default ConfirmationContextProvider;
