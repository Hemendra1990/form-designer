import {EventExecutorService} from "./EventExecutorService";

const EventExecutor = {
    executeEvent : (meta, eventId) => {
        //get the event detail from the eventId, we will do it later
        //Initially I am trying with Script Event
        console.log(`Executing ${eventId}`);
        if(meta.editMode) {
            console.log(`Event cannot be executed on Edit mode.`);
            return;
        }
        const eventToExecute = meta.events.find(ev => ev.id ==eventId);
        if(eventToExecute && eventToExecute.bucket && eventToExecute.bucket.edges && eventToExecute.bucket.edges.length>0) {
            const edges = eventToExecute.bucket.edges;
            const nodes = eventToExecute.bucket.nodes;
            let eventNodeIds = new Set();
            edges.forEach(edge => {
                const source = edge.source;
                const target = edge.target;
                eventNodeIds.add(source);
                eventNodeIds.add(target);
            })
            
            eventNodeIds.forEach(nodeId => {
                const eventNode = nodes.find(node => node.id === nodeId);
                EventExecutorService.execute(meta, eventNode);
            })
        } else if(eventToExecute && eventToExecute.bucket && eventToExecute.bucket.nodes?.length === 1) {
            const nodes = eventToExecute.bucket.nodes;
            EventExecutorService.execute(meta, nodes[0]);
        }
    }
}





export default EventExecutor;