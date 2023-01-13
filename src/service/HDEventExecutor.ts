import { HDEventExecutorService } from "./HDEventExecutorService";

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
    const targetEvent = edges
      .filter((edge: any) => edge.source === rootId)
      .map((edge: any) => this.buildEventTree(nodes, edges, edge.target));

    return {
      ...rootNode,
      targetEvent,
    };
  }

  executeEvent(meta: any, eventId: string, data: any) {
    if (meta.editMode === true || eventId === undefined) {
      console.info("Event cannot be executed on edit mode.");
      return;
    }
    const eventToExecute = meta.events.find((ev: any) => ev.id === eventId);
    const edges = eventToExecute.bucket.edges;
    const nodes = eventToExecute.bucket.nodes;
    let executorService = new HDEventExecutorService(
      HDEventExecutor.modalContext,
      HDEventExecutor.confirmContext,
      HDEventExecutor.toastContext,
      nodes,
      edges
    );

    if (
      eventToExecute &&
      eventToExecute.bucket &&
      eventToExecute.bucket.edges &&
      eventToExecute.bucket.edges.length > 0
    ) {
      const startNode = this.findStartNode(nodes, edges);
      const eventTree = this.buildEventTree(nodes, edges, startNode);
      console.log(eventTree);
      executorService.execute(meta, eventTree);
    } else if (
      eventToExecute &&
      eventToExecute.bucket &&
      eventToExecute.bucket.nodes &&
      eventToExecute.bucket.nodes.length === 1
    ) {
      executorService.execute(meta, eventToExecute.bucket.nodes[0]);
    }
  }

  findStartNode(nodes: any, edges: any) {
    const parent = [];
    parent[0] = 0;
    for (let i = 1; i <= edges.length + 1; i++) {
      parent[i] = i;
    }

    for (let edge of edges) {
      parent[edge?.target] = parseInt(edge.source);
    }
    const startNode = parent.filter(
      (n, index) => n === index && index !== 0
    )[0];

    return "" + startNode;
  }
}
