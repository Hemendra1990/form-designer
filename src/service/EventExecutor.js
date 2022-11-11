import {defaultScriptTextForTesting} from "../App";
import { EVENT_TYPE } from "../events/model/EventModel";

const EventExecutor = {
    executeEvent : (meta, eventId) => {
        //get the event detail from the eventId, we will do it later
        //Initially I am trying with Script Event
        console.log(`Executing ${eventId}`);

        const eventToExecute = meta.events.find(ev => ev.id ==eventId);
        if(eventToExecute && eventToExecute.bucket && eventToExecute.bucket.edges && eventToExecute.bucket.edges.length>0) {
            const edges = eventToExecute.bucket.edges;
            const nodes = eventToExecute.bucket.nodes;
            let eventExecutionMap = {};
            let eventNodeIds = new Set();
            edges.forEach(edge => {
                const source = edge.source;
                const target = edge.target;
                eventNodeIds.add(source);
                eventNodeIds.add(target);
            })
            
            eventNodeIds.forEach(nodeId => {
                const eventNode = nodes.find(node => node.id === nodeId);
                execute(meta, eventNode);
            })
        }

        //scriptExecutor(meta, eventId); //We must check what event type is coming, but for testing leaving it for script only
    }
}

const execute = (meta, eventNode) => {
    const eventDetail = eventNode.data.eventInfo;
    if(eventNode.type === EVENT_TYPE.ALERT) {
        console.log('Event type Alert', eventDetail);
    } else if(eventNode.type === EVENT_TYPE.SCRIPT) {
        console.log('Executing Script');
        executeScript(meta, eventNode);
    } else if(eventNode.type === EVENT_TYPE.CONFIRMATION) {
        console.log('Event type Confirmation', eventDetail);
    }
}

const executeScript = (meta, eventNode) => {
    const scriptEventDetail = eventNode.data.eventInfo;
    const scriptFun = new Function(`
        const meta = arguments[0];
        ${scriptEventDetail.scriptText}
    `);
    scriptFun(meta);
}

export default EventExecutor;