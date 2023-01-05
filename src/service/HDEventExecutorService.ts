import {EVENT_TYPE} from "../events/model/EventModel";
import {Reference} from "../utils/Utils";
import ReactDOM from "react-dom";
import React from "react";
import {DataConnector} from "../attr-panel/data-connector/DataConnector";
import {CONFIRMATION_TYPE, SCRIPT_CONFIRM_TYPE} from "./EventConstant";

export class HDEventExecutorService {

    modalContext: any;
    confirmContext: any;
    toastContext: any;
    nodes: any;
    edges: any;

    constructor(modalContext: any, confirmContext: any, toastContext: any, nodes: any, edges: any) {
        this.modalContext = modalContext;
        this.confirmContext = confirmContext;
        this.toastContext = toastContext;
        this.nodes = nodes;
        this.edges = edges;
    }

    /**
     *
     * @param meta
     * @param eventTreeNode
     */
    execute(meta: any, eventTreeNode: any) {
        const eventDetail = eventTreeNode.data.eventInfo;
        if (eventTreeNode.type === EVENT_TYPE.ALERT) {
            this.executeMessageAlert(meta, eventTreeNode);
        } else if (eventTreeNode.type === EVENT_TYPE.SCRIPT) {
            this.executeScript(meta, eventTreeNode);
        } else if (eventTreeNode.type === EVENT_TYPE.CONFIRMATION) {
            this.executeConfirmation(meta, eventTreeNode);
        } else if (eventTreeNode.type === EVENT_TYPE.POP_UP) {
            this.executePopupModal(meta, eventTreeNode);
        } else if (eventTreeNode.type === EVENT_TYPE.REFRESH_ELEMENTS) {
            this.executeRefreshElement(meta, eventTreeNode);
        } else if (eventTreeNode.type === EVENT_TYPE.LOAD_REPORT) {
            const containerInstance = Reference.of(meta, eventDetail.data.contianer);
            if (containerInstance.loadReport) {
                containerInstance.loadReport(eventDetail.data.resource || eventDetail.data.resourceId, meta);
            }
            if(eventTreeNode.targetEvent !== undefined && eventTreeNode.targetEvent.length > 0) {
                this.execute(meta, eventTreeNode.targetEvent[0]);
            }
        }

    }

    executeMessageAlert(meta: any, eventNode: any) {
        const { eventInfo } = eventNode.data;
        const { header, message, position, type } = eventInfo.data;

        if (this.toastContext && this.toastContext.toastRef.current.show) {
            this.toastContext.setToastPosition(position);
            this.toastContext.toastRef.current.show({
                severity: type,
                summary: header,
                detail: message,
            });
        } else {
            alert("toast service failed!");
        }
        if(eventNode.targetEvent !== undefined && eventNode.targetEvent.length > 0) {
            this.execute(meta, eventNode.targetEvent[0]);
        }
    }

    /**
     * TODO: For script event accept and reject flow has to be there...
     *
     * @param meta
     * @param eventNode
     */
    executeScript(meta: any, eventNode: any) {
        const scriptEventDetail = eventNode.data.eventInfo;
        const Reference = {
            of: (elementId: any) => {
                return meta.elementMap[elementId].ref.current;
            },
        };
        const accept = () => {
            console.log('Script Signals to execute Next');
            this.executeEventAfterMultipleHandler(meta, eventNode, this.edges, SCRIPT_CONFIRM_TYPE.ACCEPT);
        };
        const reject = ()=> {
            console.log('Script Signals to Stop Execution');
            this.executeEventAfterMultipleHandler(meta, eventNode, this.edges, SCRIPT_CONFIRM_TYPE.ACCEPT);
        }
        const scriptFun = new Function(`
        const meta = arguments[0];
        const Reference = arguments[1];
        const ReactDOM = arguments[2];
        const React = arguments[3];
        const accept = arguments[4];
        const reject = arguments[5];
        function executeScript() {
         //we must use accept() or reject() method to signal to execute next event
        \t\t  ${scriptEventDetail.scriptText}
        }
        executeScript();
    `);
        scriptFun(meta, Reference, ReactDOM, React, accept, reject);
    }

    executeConfirmation(meta: any, eventNode: any) {
        const { confirmActions } = this.confirmContext;
        const ConfirmationDialogHideCallback = () => {};

        const ConfirmationDialogAcceptCallback = () => {
            this.executeEventAfterMultipleHandler(meta, eventNode, this.edges, CONFIRMATION_TYPE.YES);
        };
        const ConfirmationDialogRejectCallback = () => {
            this.executeEventAfterMultipleHandler(meta, eventNode, this.edges, CONFIRMATION_TYPE.NO);
        };
        confirmActions.push(
            "This is test",
            ConfirmationDialogHideCallback,
            ConfirmationDialogAcceptCallback,
            ConfirmationDialogRejectCallback
        );
    }

    executePopupModal(meta: any, eventNode: any) {
        const { actions } = this.modalContext;
        const popupEvDetail = eventNode.data.eventInfo;
        actions.push(popupEvDetail);
    }

    async executeRefreshElement(meta: any, eventNode: any) {
        const dataConnector = new DataConnector();
        let promises: any = [];
        eventNode.data.eventInfo.data.forEach((refElementId: any) => {
            const element = meta.elementMap[refElementId];
            const promise = new Promise<void>((resolve, reject) => {
                try {
                    dataConnector.handleDatasourceChange(element);
                    resolve();
                } catch (e) {
                    reject(e);
                }
            });
            promises.push(promise);
        });

        Promise.all(promises).then(
            (resolveData) => {
                if(eventNode.targetEvent !== undefined && eventNode.targetEvent.length > 0) {
                    this.execute(meta, eventNode.targetEvent[0]);
                }
            }
        );
    }

    private executeEventAfterMultipleHandler(meta: any, eventNode: any, edges: any, confirmationType: string) {
        const edge = edges.find((edge: any)=> edge.source === eventNode.id && edge.sourceHandle === confirmationType);
        if(edge) {
            const nextEventId = edge.target;
            const nextEventNode = eventNode.targetEvent.find((tEvent:any) => tEvent.id == nextEventId);
            if (nextEventNode) {
                this.execute(meta, nextEventNode);
            }
        }
    }
}