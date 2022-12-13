import { EventExecutorService } from "./EventExecutorService";

const startExecution = function (
  meta,
  adjList,
  edges,
  nodeId,
  eventToExecute,
  modalContext,
  confirmContext,
  toastContext
) {
  const node = eventToExecute.bucket.nodes.find((nd) => nd.id == nodeId);
  const excutionPromise = EventExecutorService.execute(
    meta,
    node,
    modalContext,
    confirmContext,
    toastContext
  );

  excutionPromise.then(
    () => {
      //'Yes'
      console.log(
        "%c Inside Yes Success",
        "background: #222, color: green",
        node
      );

      const adjNodes = adjList[nodeId];
      if (!adjNodes) {
        return;
      }

      let nextNode;
      for (const adjNode of adjNodes) {
        nextNode = edges.find(
          (edg) => edg.target == adjNode && edg.sourceHandle === "Yes"
        );
        if (nextNode) {
          break;
        }
      }
      //

      let nextNodeId = undefined;
      if (nextNode && nextNode.target) {
        nextNodeId = nextNode.target;
      } else {
        nextNodeId = adjNodes[0];
      }
      if (nextNodeId) {
        startExecution(
          meta,
          adjList,
          edges,
          nextNodeId,
          eventToExecute,
          modalContext,
          confirmContext,
          toastContext
        );
      }
    },
    (error) => {
      //'No'
      //
      const adjNodes = adjList[nodeId];
      if (!adjNodes) {
        return;
      }

      let nextNode;
      for (const adjNode of adjNodes) {
        nextNode = edges.find(
          (edg) => edg.target == adjNode && edg.sourceHandle === "No"
        );
        if (nextNode) {
          break;
        }
      }
      //

      let nextNodeId = undefined;
      if (nextNode && nextNode.target) {
        nextNodeId = nextNode.target;
      } else {
        nextNodeId = adjNodes[0];
      }
      if (nextNodeId) {
        startExecution(
          meta,
          adjList,
          edges,
          nextNodeId,
          eventToExecute,
          modalContext,
          confirmContext,
          toastContext
        );
      }
    }
  );
};

const groupEdge = (xs, key) => {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

class EventExecutor {
  static modalContext;
  static confirmContext;
  static toastContext;
  constructor(modalContext, confirmContext, toastContext) {
    EventExecutor.modalContext = modalContext;
    EventExecutor.confirmContext = confirmContext;
    EventExecutor.toastContext = toastContext;
  }

  static async executeEvent(meta, eventId, data) {
    //get the event detail from the eventId, we will do it later
    //Initially I am trying with Script Event
    if (meta.editMode) {
      console.info("Event cannot be executed on edit mode.");
      return;
    }
    const eventToExecute = meta.events.find((ev) => ev.id === eventId);
    if (
      eventToExecute &&
      eventToExecute.bucket &&
      eventToExecute.bucket.edges &&
      eventToExecute.bucket.edges.length > 0
    ) {
      const edges = eventToExecute.bucket.edges;
      const nodes = eventToExecute.bucket.nodes;
      let eventNodeIds = new Array();
      let parent = [];
      parent[0] = 0;
      edges.forEach((edge) => {
        const source = edge.source;
        const target = edge.target;
        eventNodeIds.push(source);
        eventNodeIds.push(target);
      });

      //===========

      let adjList = [];
      adjList[0] = null;
      const vis = Array(nodes.length).fill(false);
      edges.forEach((edge) => {
        if (!adjList[edge.source]) {
          adjList[edge.source] = [];
          adjList[edge.source].push(edge.target);
        } else {
          let list = adjList[edge.source];
          list.push(edge.target);
        }
      });

      startExecution(
        meta,
        adjList,
        edges,
        1,
        eventToExecute,
        this.modalContext,
        this.confirmContext,
        this.toastContext
      );

      //test

      /* eventNodeIds.forEach((nodeId) => {
                const eventNode = nodes.find(node => node.id === nodeId);
                EventExecutorService.execute(meta, eventNode, this.modalContext, this.confirmContext);
            }) */
    } else if (
      eventToExecute &&
      eventToExecute.bucket &&
      eventToExecute.bucket.nodes?.length === 1
    ) {
      const nodes = eventToExecute.bucket.nodes;
      EventExecutorService.execute(
        meta,
        nodes[0],
        this.modalContext,
        this.confirmContext,
        this.toastContext
      );
    }
  }
}

export default EventExecutor;
