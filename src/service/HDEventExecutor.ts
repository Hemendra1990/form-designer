import {HDEventExecutorService} from "./HDEventExecutorService"

/**
 * Going to replace my first implementation of the event executor to the robust one :)
 * I feel there are issues in the first event implementation
 */
export class HDEventExecutor {

    static modalContext: any;
    static confirmContext: any;
    static toastContext: any;

    constructor(modalContext?: any, confirmContext?: any, toastContext?: any) {
        HDEventExecutor.modalContext = modalContext;
        HDEventExecutor.confirmContext = confirmContext;
        HDEventExecutor.toastContext = toastContext;
    }

    buildEventTree(nodes: any, edges: any, rootId: string | number) {
        const rootNode = nodes.find((node: any) => node.id === rootId);
        const targetEvent = edges.filter((edge: any) => edge.source === rootId)
            .map((edge: any) => this.buildEventTree(nodes, edges, edge.target))

        return {
            ...rootNode,
            targetEvent
        }
    }

    executeEvent(meta: any, eventId: string, data: any) {
        if (meta.editMode === true || eventId === undefined) {
            console.info("Event cannot be executed on edit mode.");
            return;
        }
        const eventToExecute = meta.events.find((ev: any) => ev.id === eventId);
        if (eventToExecute && eventToExecute.bucket && eventToExecute.bucket.edges && eventToExecute.bucket.edges.length > 0) {
            const edges = eventToExecute.bucket.edges;
            const nodes = eventToExecute.bucket.nodes;

            //Sort the edges to properly find the the source
            edges.sort((a: any, b: any) => parseInt(a.target) - parseInt(b.target));
            const eventTree = this.buildEventTree(nodes, edges, edges[0].source);
            console.log(eventTree);
            let executorService = new HDEventExecutorService(HDEventExecutor.modalContext, HDEventExecutor.confirmContext, HDEventExecutor.toastContext, nodes, edges);
            executorService.execute(meta, eventTree);
        }

    }

}